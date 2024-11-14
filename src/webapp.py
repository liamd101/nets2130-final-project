import json
import uuid
import time
import threading

from flask import Flask, jsonify, render_template, request

from quality_control import meets_tos

app = Flask(__name__)


def save_images(images, interval):
    while True:
        images.sort(key=lambda x: x["votes"], reverse=True)
        for image in images:
            if len(image["uuid"]) < 1:
                image["uuid"] = str(uuid.uuid4())
        with open("data/filtered-images.json", "w") as f:
            json.dump(images, f, indent=4)
        time.sleep(interval)


@app.route("/feed")
def index():
    return render_template("index.html")


@app.route("/images")
def get_images():
    topic = request.args.get("topic")
    if topic:
        filtered_images = [image for image in images if image["theme"] == topic]
    else:
        filtered_images = images
    return jsonify(filtered_images)


@app.route("/vote", methods=["POST"])
def vote():
    data = request.json
    image_index = data["index"]
    vote_type = data["vote_type"]
    if images[image_index].get("votes") is None:
        images[image_index]["votes"] = 0

    if vote_type == "upvote":
        images[image_index]["votes"] += 1
    elif vote_type == "downvote":
        images[image_index]["votes"] -= 1
    return jsonify(images[image_index])


@app.route("/upload", methods=["POST"])
def upload():
    data = request.json
    image_url = data["image_url"]
    topic = data["topic"]
    try:
        if meets_tos({"image_url": image_url}):
            images.append(
                {
                    "image_url": image_url,
                    "topic": topic,
                    "votes": 0,
                    "uuid": str(uuid.uuid4()),
                }
            )
            return jsonify({"status": "success"})
        else:
            return jsonify({"status": "rejected"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e), "code": 500})


if __name__ == "__main__":
    images = json.loads(open("data/raw-data.json").read())
    with app.app_context():
        interval = 5
        threading.Thread(
            target=save_images,
            args=(
                images,
                interval,
            ),
            daemon=True,
        ).start()
    app.run(debug=True, port=8000)
