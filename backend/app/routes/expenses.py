from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.expense import Expense

router = APIRouter()


class ExpenseCreate(BaseModel):
    title: str
    amount: float
    category: str


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/expenses")
def get_expenses(db: Session = Depends(get_db)):
    return db.query(Expense).all()


@router.post("/expenses")
def add_expense(
    expense: ExpenseCreate,
    db: Session = Depends(get_db)
):
    new_expense = Expense(
        title=expense.title,
        amount=expense.amount,
        category=expense.category,
    )

    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)

    return {
        "message": "Expense added successfully",
        "expense": new_expense,
    }