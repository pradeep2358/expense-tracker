import { useEffect, useState } from "react";
import { api } from "../api";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api("/expenses").then(setExpenses).catch((e) => setError(e.message)).finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div>
      <h2>Hello, {localStorage.getItem("name")}</h2>
      <div className="stats">
        <div className="card"><p>Total Expenses</p><h3>₹ {total}</h3></div>
        <div className="card"><p>Total Records</p><h3>{expenses.length}</h3></div>
      </div>
      <h3>Recent Expenses</h3>
      {expenses.slice(0, 5).map((e) => (
        <div className="card row" key={e._id}>
          <span>{e.title} <small>({e.category})</small></span>
          <b>₹ {e.amount}</b>
        </div>
      ))}
      {expenses.length === 0 && <p>No expenses yet.</p>}
    </div>
  );
}
