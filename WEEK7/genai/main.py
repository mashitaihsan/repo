import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

llm = ChatGoogleGenerativeAI(model="gemini-3.8-flash", api_key=GEMINI_API_KEY)

prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "You are a helpful assistant that translates {input_language} to {output_language}. Return only the translated text without extra explanations.",
        ),
        (
            "human",
            "{text_input}",
        ),
    ]
)

chain = prompt | llm | StrOutputParser()

class TranslationRequest(BaseModel):
    input_language: str
    output_language: str
    text_input: str

@app.post("/translate")
async def translate_text(request: TranslationRequest):
    translated_output = chain.invoke({
        "input_language": request.input_language,
        "output_language": request.output_language,
        "text_input": request.text_input
    })
    return {"translated_text": translated_output}