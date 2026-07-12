import { useEffect, useState } from "react";
import "./App.css";
import api from "./api/expenseApi";

function App() {
  const [expenses, setExpenses] = useState([]);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadExpenses();
  }, []);

  async function loadExpenses() {
    try {
      const response = await api.get("/expenses");
      setExpenses(response.data);
    } catch (error) {
      console.error("Failed to load expenses:", error);
    }
  }

  async function deleteExpense(id) {
    try {
      await api.delete(`/expenses/${id}`);
      loadExpenses();
    } catch (error) {
      console.error(error);
    }
  }

  function editExpense(expense) {
    setEditingId(expense.id);
    setTitle(expense.title);
    setAmount(expense.amount);
    setCategory(expense.category);
  }

  async function handleSubmit(e) {
  e.preventDefault();

  try {
    if (editingId) {
      await api.put(`/expenses/${editingId}`, {
        title,
        amount: Number(amount),
        category,
      });
    } else {
      await api.post("/expenses", {
        title,
        amount: Number(amount),
        category,
      });
    }

    setTitle("");
    setAmount("");
    setCategory("");
    setEditingId(null);

    loadExpenses();
  } catch (error) {
    console.error(error);
  }
}

  return (
    <div className="container">
      <h1>Expense Tracker</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Expense title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button type="submit">
          {editingId ? "Update Expense" : "Add Expense"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setTitle("");
              setAmount("");
              setCategory("");
            }}
          >
            Cancel
          </button>
        )}

      </form>

      <div className="expense-list">
        <h2>Expenses</h2>

        {expenses.map((expense) => (
          <div className="expense-item" key={expense.id}>
            <span>{expense.title}</span>

            <span>Rs. {expense.amount}</span>

            <span>{expense.category}</span>

            <button
              onClick={() => editExpense(expense)}
            >
              Edit
            </button>

            <button
              onClick={() => deleteExpense(expense.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;