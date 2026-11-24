import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import FewShotPromptTemplate, PromptTemplate
from langchain_core.output_parsers import StrOutputParser

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Using the required model identifier from the server response
llm = ChatGoogleGenerativeAI(model="gemini-3.8-flash", api_key=GEMINI_API_KEY)

# Exercise 1 Use Case: E-commerce Product Reviews
examples = [
    {
        "review": "The battery life is amazing and it charges super fast!",
        "sentiment": "Positive",
    },
    {
        "review": "Stopped working after two days. Total waste of money.",
        "sentiment": "Negative",
    },
    {
        "review": "It works fine, nothing extraordinary for the price.",
        "sentiment": "Neutral",
    },
]

example_prompt = PromptTemplate(
    input_variables=["review", "sentiment"],
    template="Product Review: {review}\nSentiment: {sentiment}",
)

prompt = FewShotPromptTemplate(
    examples=examples,
    example_prompt=example_prompt,
    prefix=(
        "Analyze the e-commerce product review sentiment.\nRespond with ONLY"
        " ONE WORD: Positive, Negative, Mixed, or Neutral.\n"
    ),
    suffix="Product Review: {input}\nSentiment:",
    input_variables=["input"],
)

chain = prompt | llm | StrOutputParser()

print("E-commerce Product Review Sentiment Analyzer (type 'quit' to exit)")
while True:
  review = input("Enter product review: ").strip()
  if not review:
    continue
  if review.lower() == "quit":
    break
  try:
    response = chain.invoke({"input": review})
    print(response.strip())
  except Exception as e:
    print(f"Error: {e}")

print("\nProgram ended.")