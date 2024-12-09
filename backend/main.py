from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from bson import ObjectId
import os
app = FastAPI(title="Event Image API")

# MongoDB connection
MONGO_URL = os.getenv("MONGO_URL")
client = AsyncIOMotorClient(MONGO_URL)
db = client.mosaic
users_collection = db.users
events_collection = db.events
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
    if user_id not in users_collection:
        users_collection.insert_one({"auth_id": user_id, "email": email, "name": name})



@app.post("/api/events/create")
async def create_event(event_id: str, user_id: str, event_name: str, event_date: str, event_location: str):
    events_collection.insert_one({"event_id": event_id, "user_id": user_id, "event_name": event_name, "event_date": event_date, "event_location": event_location})

@app.get("/upload")
async def upload_image(image: UploadFile = File(...)):
    
    return {"message": "Image uploaded successfully"}

@app.post("/api/users/check")
async def check_user(auth_id: str, email: str):
    # Check if user exists
    user = await users_collection.find_one({"user_id": auth_id})
    
    if not user:
        # Create new user if not found
        new_user = {
            "auth_id": auth_id,
            "email": email,
            "created_at": datetime.utcnow()
        }
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
