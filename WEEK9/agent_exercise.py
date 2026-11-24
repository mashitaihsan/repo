import os
from dotenv import load_dotenv
from tavily import TavilyClient
from langchain.tools import tool
from langchain.agents import create_agent
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage
import requests
from typing import Dict, Any

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")

# 2. Initialize the Gemini model
llm = ChatGoogleGenerativeAI(model="gemini-3.6-flash", api_key=GEMINI_API_KEY)

@tool("currency_exchange", description="Fetches the latest foreign exchange rates. Provide base and target currencies like USD to MYR.")
def currency_tool(base: str = "USD", target: str = "MYR") -> str:
    """Fetch recent exchange rates using the Frankfurter API."""
    try:
        url = f"https://api.frankfurter.app/latest?from={base.upper()}&to={target.upper()}"
        response = requests.get(url)
        data = response.json()
        
        if "rates" in data:
            rate = data["rates"].get(target.upper())
            return f"The current exchange rate from {base.upper()} to {target.upper()} is {rate} as of {data.get('date')}."
        else:
            return f"Could not retrieve exchange rates: {data}"
    except Exception as e:
        return f"Error: {e}"

@tool("calculator", description="Performs mathematical calculations.")
def calculator_tool(expression: str) -> str:
    try:
        return str(eval(expression))
    except Exception as e:
        return f"Error: {e}"

tools = [currency_tool, calculator_tool]
agent = create_agent(
    model=llm,
    tools=tools,
    system_prompt="You are a helpful financial assistant with tool access."
)

question = HumanMessage(content="What is the current exchange rate from US dollars to Malaysian Ringgit?")
response = agent.invoke({"messages": [question]})

final_message = response['messages'][-1]
print("\n--- EXERCISE RESULT ---")
print(final_message.text)