from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from collections import defaultdict
from dotenv import load_dotenv
import os


app = FastAPI()

load_dotenv()

conversation_store = defaultdict(list)

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
    session_id: str
    message: str
    

@app.post("/chat")
async def chat(req: ChatRequest):
    print("SESSION ID RECEIVED:", req.session_id)
    print("MESSAGE:", req.message)

    history = conversation_store.setdefault(req.session_id, [])

    history.append({"role": "user", "content": req.message})

    response = client.chat.completions.create(
        model="mistralai/mistral-7b-instruct",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a College Guidance Chatbot. "
                    "You MUST remember and use information shared earlier "
                    "like name, degree, background."
                )
            },
            *history
        ]
    )

    assistant_reply = response.choices[0].message.content
    history.append({"role": "assistant", "content": assistant_reply})

    return {"reply": assistant_reply}
