# app.py: FastAPI RAG endpoint with CORS and PDF vector store support
import os
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pymongo import MongoClient
from langchain_mongodb import MongoDBAtlasVectorSearch
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from embeddings import embeddings

load_dotenv()

app = FastAPI(title="Diabetes Diet RAG Chatbot API")

# Enable CORS so your frontend HTML file can communicate with this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for local testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
MONGODB_URI = os.getenv("MONGODB_ATLAS_CLUSTER_URI")

# Initialize the LLM
llm = ChatGoogleGenerativeAI(model="gemini-3.6-flash", api_key=GEMINI_API_KEY)

DB_NAME = "test_db"
COLLECTION_NAME = "test_collection_pdf"
ATLAS_VECTOR_SEARCH_INDEX_NAME = "test-index-pdf"

@app.get("/ask")
def ask_question(question: str = Query(..., description="Ask a question about your PDF")):
    client = MongoClient(MONGODB_URI)
    try:
        collection = client[DB_NAME][COLLECTION_NAME]
        
        vector_store = MongoDBAtlasVectorSearch(
            collection=collection,
            embedding=embeddings,
            index_name=ATLAS_VECTOR_SEARCH_INDEX_NAME,
            relevance_score_fn="cosine",
        )
        # Retrieve the top 10 most relevant chunks from your PDF
        retriever = vector_store.as_retriever(search_kwargs={"k": 10})

        system_prompt = (
            """
            Answer the question based only on the provided context. If the answer cannot be found, say "I don't know".
            Context:
            {context}
            """
        )
        prompt = ChatPromptTemplate.from_messages([
            ("system", system_prompt),
            ("human", "{input}"),
        ])

        def format_docs(docs):
            return "\n\n".join(doc.page_content for doc in docs)

        rag_chain = (
            {"context": retriever | format_docs, "input": RunnablePassthrough()}
            | prompt | llm | StrOutputParser()
        )

        response = rag_chain.invoke(question)
        return {"question": question, "answer": response}
    finally:
        client.close()