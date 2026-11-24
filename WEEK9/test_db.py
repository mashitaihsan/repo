import os
from dotenv import load_dotenv
from langgraph.checkpoint.postgres import PostgresSaver

# Load environment variables from .env
load_dotenv()
DB_URI = os.getenv("DB_URI")

print("Attempting to connect to the database...")

try:
    # Use PostgresSaver context manager to test the connection and setup tables
    with PostgresSaver.from_conn_string(DB_URI) as checkpointer:
        checkpointer.setup()
        print("Success! Connected to PostgreSQL and set up checkpoint tables successfully.")
except Exception as e:
    print(f"Connection failed! Error: {e}")