import os
from dotenv import load_dotenv
from tavily import TavilyClient
from langchain.tools import tool
from langchain.agents import create_agent
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage
from typing import Dict, Any

load_dotenv()

os.environ["LANGCHAIN_TRACING_V2"] = "true"
os.environ["LANGCHAIN_PROJECT"] = "my-agent-project"
if os.getenv("LANGCHAIN_API_KEY"):
    os.environ["LANGCHAIN_API_KEY"] = os.getenv("LANGCHAIN_API_KEY")

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")

print("--- CONFIG CHECK ---")
print("Gemini Key Loaded:", bool(GEMINI_API_KEY))
print("Tavily Key Loaded:", bool(TAVILY_API_KEY))
print("LangSmith Key Loaded:", bool(os.getenv("LANGCHAIN_API_KEY")))
print("--------------------")

tavily_client = TavilyClient(api_key=TAVILY_API_KEY)
llm = ChatGoogleGenerativeAI(model="gemini-3.6-flash", api_key=GEMINI_API_KEY)

@tool("calculator", description="Performs mathematical calculations. Use this for any math problems.")
def tool1(expression: str) -> str:
    try:
        result = eval(expression)
        return str(result)
    except Exception as e:
        return f"Error: {e}"

@tool("web_search", description="Search the web for information.")
def tool2(query: str) -> Dict[str, Any] | str:
    try:
        return tavily_client.search(query)
    except Exception as e:
        return f"Error: {e}"

tools = [tool1, tool2]
agent = create_agent(
    model=llm,
    tools=tools,
    system_prompt="You are a helpful assistant."
)

question = HumanMessage(content="What are the latest tech news updates today, and calculate 1500 * 0.05?")
response = agent.invoke({"messages": [question]})

final_message = response['messages'][-1]
print("\n--- FINAL ANSWER ---")
print(final_message.text)
