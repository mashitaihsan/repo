import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import CommaSeparatedListOutputParser

load_dotenv()
llm = ChatGoogleGenerativeAI(
    model="",
    api_key=os.getenv("GEMINI_API_KEY")
)

output_parser = CommaSeparatedListOutputParser()