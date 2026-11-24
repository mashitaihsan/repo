import os
from dotenv import load_dotenv
from langchain.agents import create_agent
from langchain.agents.middleware import SummarizationMiddleware, ModelFallbackMiddleware
from langchain_google_genai import ChatGoogleGenerativeAI
from langgraph.checkpoint.postgres import PostgresSaver
from langchain_core.messages import HumanMessage

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
DB_URI = os.getenv("DB_URI")

primary_llm = ChatGoogleGenerativeAI(model="gemini-3.6-flash", api_key=GEMINI_API_KEY)
fallback1 = ChatGoogleGenerativeAI(model="gemini-1.5-flash", api_key=GEMINI_API_KEY)
fallback2 = ChatGoogleGenerativeAI(model="gemini-1.5-flash-lite", api_key=GEMINI_API_KEY)

with PostgresSaver.from_conn_string(DB_URI) as checkpointer:
    
    summarization_middleware = SummarizationMiddleware(
        model=fallback1,
        trigger=("tokens", 500),
        keep=("messages", 2)
    )

    fallback_middleware = ModelFallbackMiddleware(
        fallback1,
        fallback2,
    )

    agent = create_agent(
        model=primary_llm,
        checkpointer=checkpointer,
        middleware=[
            summarization_middleware,
            fallback_middleware
        ],
        system_prompt="You are a production-ready, highly resilient technical assistant with long-term memory."
    )

    config = {"configurable": {"thread_id": "production_thread_1"}}

    print("Starting interaction with the production-ready agent...")

    response = agent.invoke(
        {"messages": [HumanMessage(content="Hello! My name is Ali and I am building an AI agent in Sabah.")]}, 
        config
    )
    print("\nAI Response 1:", response["messages"][-1].text)

    response = agent.invoke(
        {"messages": [HumanMessage(content="What is my name and where am I building this?")]}, 
        config
    )
    print("\nAI Response 2:", response["messages"][-1].text)