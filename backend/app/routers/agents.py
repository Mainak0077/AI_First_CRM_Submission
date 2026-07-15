from fastapi import APIRouter
from pydantic import BaseModel

from app.agent import CRMAgent

router = APIRouter(
    prefix="/agent",
    tags=["AI Agent"]
)


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    response: str


@router.post(
    "/chat",
    response_model=ChatResponse
)
def chat(request: ChatRequest):

    reply = CRMAgent.chat(request.message)

    return ChatResponse(
        response=reply
    )