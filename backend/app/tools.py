from langchain_core.tools import tool
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models import Interaction


def get_db() -> Session:
    db = SessionLocal()
    return db


@tool
def log_interaction(
    hcp_name: str,
    interaction_date: str,
    interaction_type: str,
    discussion: str,
    products: str,
    follow_up: str,
    sentiment: str,
    summary: str
):
    """
    Log a new HCP interaction.
    """

    db = get_db()

    try:
        interaction = Interaction(
            hcp_name=hcp_name,
            interaction_date=interaction_date,
            interaction_type=interaction_type,
            discussion=discussion,
            products=products,
            follow_up=follow_up,
            sentiment=sentiment,
            summary=summary
        )

        db.add(interaction)
        db.commit()
        db.refresh(interaction)

        return f"Interaction logged successfully with id {interaction.id}"

    finally:
        db.close()


@tool
def edit_interaction(
    interaction_id: int,
    discussion: str = "",
    products: str = "",
    follow_up: str = "",
    sentiment: str = "",
    summary: str = ""
):
    """
    Edit an existing interaction.
    """

    db = get_db()

    try:

        interaction = (
            db.query(Interaction)
            .filter(Interaction.id == interaction_id)
            .first()
        )

        if interaction is None:
            return "Interaction not found."

        if discussion:
            interaction.discussion = discussion

        if products:
            interaction.products = products

        if follow_up:
            interaction.follow_up = follow_up

        if sentiment:
            interaction.sentiment = sentiment

        if summary:
            interaction.summary = summary

        db.commit()

        return "Interaction updated successfully."

    finally:
        db.close()


@tool
def search_hcp(name: str):
    """
    Search HCP by name.
    """

    db = get_db()

    try:

        interactions = (
            db.query(Interaction)
            .filter(
                Interaction.hcp_name.ilike(f"%{name}%")
            )
            .all()
        )

        if not interactions:
            return "No HCP found."

        result = []

        for item in interactions:
            result.append(
                {
                    "id": item.id,
                    "hcp_name": item.hcp_name,
                    "interaction_date": str(item.interaction_date),
                    "interaction_type": item.interaction_type
                }
            )

        return result

    finally:
        db.close()


@tool
def interaction_history(hcp_name: str):
    """
    Return complete interaction history.
    """

    db = get_db()

    try:

        history = (
            db.query(Interaction)
            .filter(
                Interaction.hcp_name == hcp_name
            )
            .order_by(
                Interaction.interaction_date.desc()
            )
            .all()
        )

        if not history:
            return "No interaction history found."

        output = []

        for item in history:
            output.append(
                {
                    "Date": str(item.interaction_date),
                    "Type": item.interaction_type,
                    "Discussion": item.discussion,
                    "Products": item.products,
                    "Sentiment": item.sentiment,
                    "Summary": item.summary
                }
            )

        return output

    finally:
        db.close()


@tool
def suggest_follow_up(previous_discussion: str):
    """
    Suggest follow-up message.
    """

    return f"""
Suggested Follow-up

Thank the HCP for the previous discussion.

Mention the discussed therapy.

Share any new clinical updates.

Ask whether another meeting should be scheduled.

Previous Discussion:
{previous_discussion}
"""


TOOLS = [
    log_interaction,
    edit_interaction,
    search_hcp,
    interaction_history,
    suggest_follow_up
]