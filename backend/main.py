from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv
import os


app = FastAPI()

load_dotenv()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1",
    timeout=60
)

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat(req: ChatRequest):
    response = client.chat.completions.create(
        model="mistralai/mistral-7b-instruct",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a College Guidance Chatbot. "
                    "Guide students about streams after 12th, "
                    "college choices, entrance exams, and future career scope."
                )
            },
            {"role": "user", "content": req.message}
        ]
    )

    return {
        "reply": response.choices[0].message.content
    }
