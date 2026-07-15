from pydantic import BaseModel
from datetime import date, datetime
from typing import Optional


class InteractionBase(BaseModel):
    hcp_name: str
    interaction_date: date
    interaction_type: str
    discussion: str
    products: str
    follow_up: str
    sentiment: str
    summary: Optional[str] = None


class InteractionCreate(InteractionBase):
    pass


class InteractionUpdate(BaseModel):
    hcp_name: Optional[str] = None
    interaction_date: Optional[date] = None
    interaction_type: Optional[str] = None
    discussion: Optional[str] = None
    products: Optional[str] = None
    follow_up: Optional[str] = None
    sentiment: Optional[str] = None
    summary: Optional[str] = None


class InteractionResponse(InteractionBase):
    id: int
    created_at: datetime

    model_config = {
        "from_attributes": True
    }