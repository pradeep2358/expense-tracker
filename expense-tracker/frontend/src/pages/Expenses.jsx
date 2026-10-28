import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = () =>
    api("/expenses").then(setExpenses).catch((e) => setError(e.message)).finally(() => setLoading(false));

  useEffect(() => { load(); }, []);

  const remove = async (id) => {
    if (!window.confirm("Delete this expense?")) return;
    try { await api("/expenses/" + id, "DELETE"); load(); }
    catch (e) { setError(e.message); }
  };

  if (loading) return <p>Loading...</p>;

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div>
      <h2>All Expenses</h2>
      {error && <p className="error">{error}</p>}
      <p>Total: <b>₹ {total}</b> | Records: <b>{expenses.length}</b></p>
      <table>
        <thead>
          <tr><th>#</th><th>Title</th><th>Category</th><th>Amount</th><th>Date</th><th>Action</th></tr>
        </thead>
        <tbody>
          {expenses.map((e, i) => (
            <tr key={e._id}>
              <td>{i + 1}</td><td>{e.title}</td><td>{e.category}</td>
              <td>₹ {e.amount}</td><td>{new Date(e.date).toLocaleDateString()}</td>
              <td>
                <Link to={`/expenses/${e._id}/edit`}>Edit</Link>{" "}
                <button className="danger" onClick={() => remove(e._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {expenses.length === 0 && <p>No expenses found.</p>}
    </div>
  );
}
