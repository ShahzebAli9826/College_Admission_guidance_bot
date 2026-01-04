# College_Admission_guidance_bot
This is an AI-powered chatbot that helps students explore different career paths, college options, entrance exams, and future scope after 12th grade with different streams(Science,Commerce and Humanities) across India.
I have built it using FastAPI, HTML , CSS ,JavaScript, and LLMs via OpenRouter, this project also provides real-time, conversational guidance through a modern chat interface.

Features:
1) Interactive AI chatbot for college and career guidance

2) Covers streams after 12th (PCM, PCB, Commerce, Arts)

3) College and entrance exam recommendations

4) Powered by Large Language Models (Mistral/Gemma/Qwen)

5) Backend built using FastAPI

6) Clean, responsive chat UI using HTML, CSS, JavaScript

Tech Stack:
  Backend:
    Python 3.11
    FastAPI
    Uvicorn
    OpenAI SDK (via OpenRouter)
    Pydantic
    Frontend
  Frontend:
    HTML5
    CSS3
    JavaScript
  LLM:
    OpenRouter
    Model used: mistralai/mistral-7b-instruct
Project Structure:
<img width="261" height="408" alt="image" src="https://github.com/user-attachments/assets/3101474d-7086-4c0f-aa85-d7b417a3da54" />

Installation & Setup:
  Clone the Repository:
    git clone <repository-url>
    cd college_admission_bot

  Create & Activate Virtual Environment:
    python -m venv venv

  Windows:
    venv\Scripts\activate

  Mac / Linux:
    source venv/bin/activate

  Install Backend Dependencies:
    pip install fastapi uvicorn openai pydantic

  Set Up API Key (Important 🔐):
    Create an API key from:
      https://openrouter.ai/
  
  In backend/main.py:
  client = OpenAI(
    api_key="YOUR_OPENROUTER_API_KEY",
    base_url="https://openrouter.ai/api/v1"
  )
  
  Run Backend Server:
    cd backend
    uvicorn main:app --reload

Backend will run at:
  http://127.0.0.1:8000

Test Backend (Swagger UI):
  Open in browser:
  http://127.0.0.1:8000/docs

Test the /chat endpoint with:
  {
    "message": "What are the best options after 12th PCM?"
  }

Run Frontend:
  Simply open:
    frontend/index.html

in your browser (Live Server recommended)

🔗 API Endpoint
POST /chat

Request Body

{
  "message": "Suggest engineering colleges in India"
}


Response

{
  "reply": "Some popular engineering colleges in India include IITs, NITs..."
}

