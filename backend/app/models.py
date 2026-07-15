from sqlalchemy import Column, Integer, String, Date, DateTime
from datetime import datetime

from app.database import Base


class Interaction(Base):
    __tablename__ = "interactions"

    id = Column(Integer, primary_key=True, index=True)

    hcp_name = Column(String, nullable=False)

    interaction_date = Column(Date)

    interaction_type = Column(String)

    discussion = Column(String)

    products = Column(String)

    follow_up = Column(String)

    sentiment = Column(String)

    summary = Column(String)

    created_at = Column(DateTime, default=datetime.utcnow)