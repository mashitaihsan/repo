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
fallback_model = ChatGoogleGenerativeAI(model="gemini-3.5-flash-lite", api_key=GEMINI_API_KEY)

print("Initializing Sabah Expedition Chronicler with PostgreSQL & Middleware...")

with PostgresSaver.from_conn_string(DB_URI) as checkpointer:
    
    summarization_mw = SummarizationMiddleware(
        model=fallback_model,
        trigger=("tokens", 300), 
        keep=("messages", 2)
    )

    fallback_mw = ModelFallbackMiddleware(
        fallback_model
    )

    agent = create_agent(
        model=primary_llm,
        checkpointer=checkpointer,
        middleware=[summarization_mw, fallback_mw],
        system_prompt=(
            "You are the Chief Archivist of East Malaysian History and Expedition Lore. "
            "You specialize in tracking deep historical journeys across Sabah—from the coastal waters "
            "of Semporna to the inland valleys of Kundasang. Maintain precise memory of all user milestones."
        )
    )

    config = {"configurable": {"thread_id": "sabah_expedition_alpha"}}

    print("\n--- Expedition Log Entry 1 ---")
    response1 = agent.invoke(
        {"messages": [HumanMessage(content="We are mapping an expedition route starting from Semporna up to Mount Kinabalu.")]},
        config
    )
    print("Chronicler:", response1["messages"][-1].text)

    print("\n--- Expedition Log Entry 2 ---")
    response2 = agent.invoke(
        {"messages": [HumanMessage(content="Where did we plan to begin our historical route based on my previous note?")]},
        config
    )
    print("Chronicler:", response2["messages"][-1].text)