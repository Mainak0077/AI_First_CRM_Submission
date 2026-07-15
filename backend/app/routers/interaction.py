from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app import crud
from app.schemas import (
    InteractionCreate,
    InteractionResponse,
    InteractionUpdate
)

router = APIRouter(
    prefix="/interactions",
    tags=["Interactions"]
)


@router.post(
    "/",
    response_model=InteractionResponse
)
def create_interaction(
    interaction: InteractionCreate,
    db: Session = Depends(get_db)
):
    return crud.create_interaction(db, interaction)


@router.get(
    "/",
    response_model=List[InteractionResponse]
)
def get_all(db: Session = Depends(get_db)):
    return crud.get_all_interactions(db)


@router.get(
    "/{interaction_id}",
    response_model=InteractionResponse
)
def get_one(
    interaction_id: int,
    db: Session = Depends(get_db)
):
    interaction = crud.get_interaction(db, interaction_id)

    if not interaction:
        raise HTTPException(
            status_code=404,
            detail="Interaction not found"
        )

    return interaction


@router.put(
    "/{interaction_id}",
    response_model=InteractionResponse
)
def update(
    interaction_id: int,
    interaction: InteractionUpdate,
    db: Session = Depends(get_db)
):
    updated = crud.update_interaction(
        db,
        interaction_id,
        interaction
    )

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Interaction not found"
        )

    return updated


@router.delete("/{interaction_id}")
def delete(
    interaction_id: int,
    db: Session = Depends(get_db)
):
    deleted = crud.delete_interaction(
        db,
        interaction_id
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Interaction not found"
        )

    return {
        "message": "Interaction deleted successfully"
    }


@router.get(
    "/search/{hcp_name}",
    response_model=List[InteractionResponse]
)
def search(
    hcp_name: str,
    db: Session = Depends(get_db)
):
    return crud.search_hcp(db, hcp_name)


@router.get(
    "/history/{hcp_name}",
    response_model=List[InteractionResponse]
)
def history(
    hcp_name: str,
    db: Session = Depends(get_db)
):
    return crud.interaction_history(db, hcp_name)