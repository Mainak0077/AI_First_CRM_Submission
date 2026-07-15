from dotenv import load_dotenv
import os

load_dotenv()

from langchain_groq import ChatGroq
from langgraph.prebuilt import create_react_agent

from app.tools import TOOLS
from app.prompts import SYSTEM_PROMPT

llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    api_key=os.getenv("groq_key"),
    temperature=0
)

graph = create_react_agent(
    model=llm,
    tools=TOOLS,
    prompt=SYSTEM_PROMPT
)