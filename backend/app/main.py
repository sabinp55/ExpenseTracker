from app.database.database import Base, engine
from app.models.expense import Expense
from fastapi import FastAPI
from app.routes.expenses import router as expense_router

app = FastAPI(
    title="Expense Tracker API",
    version="1.0.0"
)

Base.metadata.create_all(bind=engine)


@app.get("/")
def root():
    return {
        "message": "Expense Tracker API is running!"
    }


app.include_router(expense_router)