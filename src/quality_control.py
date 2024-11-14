from dotenv import load_dotenv
from openai import OpenAI
import json

load_dotenv()

TOS_STRING = """
You are tasked with ensuring that images follow our content guidelines.
Please review the image and determine if it is appropriate for a general audience.
The image should not contain any of the following:
    - Nudity or sexually explicit content
    - Hate speech or symbols
    - Violence or gore
    - Illegal or dangerous activities
    - Misinformation or fake news
    - Sensitive personal information
If the image contains any of the above, return "Reject". Otherwise, return "Approve".
"""


def meets_tos(image):
    client = OpenAI()

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": TOS_STRING},
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": image["image_url"],
                            "detail": "low",
                        },
                    },
                ],
            },
        ],
        max_tokens=5,
    )

    return response.choices[0].message.content == "Approve"


def filter_input_data():
    images = json.loads(open("data/input-data.json").read())
    output_data = []
    for image in images:
        if meets_tos(image):
            output_data.append(
                {
                    "uuid": image["uuid"],
                    "image_url": image["image_url"],
                    "topic": image["topic"],
                    "status": "Approve",
                }
            )
    json.dump(output_data, open("data/filtered-images.json", "w"), indent=4)


if __name__ == "__main__":
    filter_input_data()
