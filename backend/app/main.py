from app.database.database import Base, engine
from app.models.expense import Expense
from fastapi import FastAPI
from app.routes.expenses import router as expense_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Expense Tracker API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


@app.get("/")
def root():
    return {
        "message": "Expense Tracker API is running!"
    }


app.include_router(expense_router)