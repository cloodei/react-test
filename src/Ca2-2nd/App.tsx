import { useState } from "react";
import { ExpenseType } from "./types";
import data from "../lib/data3.json";
import Form from "./form";
import List from "./list";

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [expenses, setExpenses] = useState(data);

  const addExpense = (exp: ExpenseType) => setExpenses([...expenses, exp]);

  const removeExpense = (idx: number) => setExpenses(expenses.filter((expense, id) => id !== idx));

  return (
    <div className="py-4 min-h-screen">
      {showForm ? (
        <Form setShowForm={setShowForm} addExpense={addExpense} />
      ) : (
        <List expenses={expenses} setShowForm={setShowForm} removeExpense={removeExpense} />
      )}
    </div>
  );
}
