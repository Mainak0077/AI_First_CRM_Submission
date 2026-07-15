from sqlalchemy.orm import Session
from app.models import Interaction
from app.schemas import InteractionCreate, InteractionUpdate


def create_interaction(db: Session, interaction: InteractionCreate):
    db_interaction = Interaction(**interaction.model_dump())

    db.add(db_interaction)
    db.commit()
    db.refresh(db_interaction)

    return db_interaction


def get_all_interactions(db: Session):
    return (
        db.query(Interaction)
        .order_by(Interaction.created_at.desc())
        .all()
    )


def get_interaction(db: Session, interaction_id: int):
    return (
        db.query(Interaction)
        .filter(Interaction.id == interaction_id)
        .first()
    )


def update_interaction(
    db: Session,
    interaction_id: int,
    interaction: InteractionUpdate
):
    db_interaction = get_interaction(db, interaction_id)

    if not db_interaction:
        return None

    update_data = interaction.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(db_interaction, key, value)

    db.commit()
    db.refresh(db_interaction)

    return db_interaction


def delete_interaction(db: Session, interaction_id: int):
    db_interaction = get_interaction(db, interaction_id)

    if not db_interaction:
        return None

    db.delete(db_interaction)
    db.commit()

    return db_interaction


def search_hcp(db: Session, name: str):
    return (
        db.query(Interaction)
        .filter(
            Interaction.hcp_name.ilike(f"%{name}%")
        )
        .all()
    )


def interaction_history(db: Session, hcp_name: str):
    return (
        db.query(Interaction)
        .filter(
            Interaction.hcp_name == hcp_name
        )
        .order_by(
            Interaction.interaction_date.desc()
        )
        .all()
    )