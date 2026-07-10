from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(
    title="Expense Tracker API",
    version="1.0.0"
)

# Temporary storage
expenses = []


# Blueprint of an expense
class Expense(BaseModel):
    title: str
    amount: float
    category: str


# Home route
@app.get("/")
def root():
    return {
        "message": "Expense Tracker API is running!"
    }


# Get all expenses
@app.get("/expenses")
def get_expenses():
    return expenses


# Add an expense
@app.post("/expenses")
def add_expense(expense: Expense):
    expenses.append(expense)
    return {
        "message": "Expense added successfully",
        "expense": expense
    }