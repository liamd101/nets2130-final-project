from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from bson import ObjectId
import os
import boto3
import dotenv
from openai import OpenAI

dotenv.load_dotenv()
app = FastAPI(title="Event Image API")

BUCKET_NAME = os.getenv("BUCKET_NAME")
AWS_ACCESS_KEY = os.getenv("AWS_ACCESS_KEY")
AWS_SECRET_KEY = os.getenv("AWS_SECRET_KEY")

s3_client = boto3.client(
    "s3",
    aws_access_key_id=AWS_ACCESS_KEY,
    aws_secret_access_key=AWS_SECRET_KEY,
)

# MongoDB connection
MONGO_URL = os.getenv("MONGO_URL")
client = AsyncIOMotorClient(MONGO_URL)
db = client.mosaic
users_collection = db.users
events_collection = db.events
images_collection = db.images
# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your Next.js frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class UserUpdate(BaseModel):
    id: str
    name: str
    updated_at: str


# Pydantic model for response
class UserResponse(BaseModel):
    id: str
    name: str
    updated_at: str
    message: str


class User(BaseModel):
    auth_id: str
    email: str
    name: Optional[str] = None
    registered_events: list


class Event(BaseModel):
    event_id: str
    owner_id: str
    event_name: str
    images: list
    event_date: str
    event_location: str


class Image(BaseModel):
    event_id: str
    user_id: str
    image_url: str
    created_at: Optional[datetime] = None
    upvotes: dict = {}


@app.get("/")
async def read_root():
    """
    Root endpoint that returns a welcome message and API status
    """
    return {
        "message": "Welcome to the Event Image API",
        "status": "online",
        "version": "1.0.0",
    }


@app.post("/api/users/signup")
async def signup(user_id: str, email: str, name: str):
    if not name:
        name = email.split("@")[0]
    # create user in mongo
    existing_user = await users_collection.find_one({"auth_id": user_id})
    if not existing_user:
        users_collection.insert_one(
            {
                "auth_id": user_id,
                "email": email,
                "name": name,
                "registered_events": [],
            }
        )


@app.post("/api/events/create")
async def create_event(
    event_id: str,
    user_id: str,
    event_name: str,
    event_date: str,
    event_location: str,
):
    # Validate user
    user_data = await users_collection.find_one({"auth_id": user_id})
    if not user_data:
        raise HTTPException(status_code=404, detail="User not found")

    # Create the event
    event = Event(
        event_id=event_id,
        owner_id=user_id,
        event_name=event_name,
        images=[],
        event_date=event_date,
        event_location=event_location,
    )

    events_collection.insert_one(event.dict())


@app.post("/api/image/upload")
async def upload_image(user_id: str, event_id: str, image: UploadFile = File(...)):
    # Validate user
    user_data = await users_collection.find_one({"auth_id": user_id})
    if not user_data:
        raise HTTPException(status_code=404, detail="User not found")
    user = User(**user_data)

    # Validate if the user is registered for the event
    if event_id not in user.registered_events:
        raise HTTPException(
            status_code=403, detail="User is not registered for this event"
        )

    # Validate event
    event_data = await events_collection.find_one({"event_id": event_id})
    if not event_data:
        raise HTTPException(status_code=404, detail="Event not found")
    event = Event(**event_data)

    # Upload the image to S3
    file_content = await image.read()
    s3_key = (
        f"images/{user_id}/{event_id}/{image.filename.split('/')[-1].split('.')[0]}"
    )

    s3_client.put_object(
        Bucket=BUCKET_NAME,
        Key=s3_key,
        Body=file_content,
        ContentType=image.content_type,
    )

    s3_url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{s3_key}"

    if flagged(s3_url):
        s3_client.delete_object(Bucket=BUCKET_NAME, Key=s3_key)
        return {"message": "Image flagged for inappropriate content"}

    # Create an `Image` instance and insert it into the database
    new_image = Image(
        event_id=event_id,
        user_id=user_id,
        image_url=s3_url,
        created_at=datetime.utcnow(),
    )
    new_image.upvotes[event_id] = 0
    result = await images_collection.insert_one(new_image.dict())
    inserted_id = result.inserted_id

    # Update the event with the new image ID
    event.images.append(str(inserted_id))
    await events_collection.update_one(
        {"event_id": event_id}, {"$set": {"images": event.images}}
    )

    return {"message": "Image uploaded successfully", "image_url": s3_url}


def flagged(image_url):
    client = OpenAI()

    response = client.moderations.create(
        model="omni-moderation-2024-09-26",
        input=[{"type": "image_url", "image_url": {"url": image_url}}],
    )

    return response.results[0].flagged


@app.post("/api/event/register")
async def register_for_event(user_id: str, event_id: str):
    user_data = await users_collection.find_one({"auth_id": user_id})
    if not user_data:
        raise HTTPException(status_code=404, detail="User not found")
    user = User(**user_data)

    event_data = await events_collection.find_one({"event_id": event_id})
    if not event_data:
        raise HTTPException(status_code=404, detail="Event not found")

    if event_id not in user.registered_events:
        user.registered_events.append(event_id)
        await users_collection.update_one(
            {"auth_id": user_id},
            {"$set": {"registered_events": user.registered_events}},
        )

    return {"message": f"User {user_id} registered for event {event_id}"}


@app.post("/api/image/upvote")
async def upvote_image(
    user_id: str,
    event_id: str,
    image_id: str,
    upvote: bool,
):
    user_data = await users_collection.find_one({"auth_id": user_id})
    if not user_data:
        raise HTTPException(status_code=404, detail="User not found")
    user = User(**user_data)
    if event_id not in user.registered_events:
        raise HTTPException(
            status_code=403, detail="User is not registered for this event"
        )
    event_data = await events_collection.find_one({"event_id": event_id})
    if not event_data:
        raise HTTPException(status_code=404, detail="Event not found")
    event = Event(**event_data)

    if image_id not in event.images:
        raise HTTPException(status_code=400, detail="Image not in event")
    image_data = await images_collection.find_one({"_id": ObjectId(image_id)})
    if not image_data:
        raise HTTPException(status_code=404, detail="Image not found")
    image = Image(**image_data)

    if upvote:
        image.upvotes[event_id] += 1
    else:
        image.upvotes[event_id] -= 1
    await images_collection.update_one(
        {"_id": ObjectId(image_id)}, {"$set": {"upvotes": image.upvotes}}
    )

    return {"message": "Image upvoted successfully"}


@app.post("/api/users/check")
async def check_user(auth_id: str, email: str):
    # Check if user exists
    user = await users_collection.find_one({"user_id": auth_id})

    if not user:
        # Create new user if not found
        new_user = {"auth_id": auth_id, "email": email, "created_at": datetime.utcnow()}
        await users_collection.insert_one(new_user)
        return {"message": "User created", "is_new": True}

    return {"message": "User exists", "is_new": False}


## required routes - sign up flow for each event, so for each event we need to have a list of users that are part of the event
## we need to have a list of events that the user is part of
## For each event, if the user is part of the event, we need to have A. an upload option for the user and B. a mosaic of the pictures for the event
## wo our database will be structure - user -> event(list in nosql) -> mapping to event_id, which stores the images for the event
## then, for each image, we need to store the metadata in the image + upvotes and comments(done in unstructured format)
## also ability for user to add event (and also need a list of events that the user is admin for (created))

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
