import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api";

const empty = { title: "", amount: "", category: "", paymentMethod: "Cash", date: "", description: "" };

export default function ExpenseForm() {
  const { id } = useParams(); // id exists only in edit mode
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      api("/expenses/" + id)
        .then((e) => setForm({ ...e, date: e.date.slice(0, 10) }))
        .catch((e) => setError(e.message));
    }
  }, [id]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      if (id) await api("/expenses/" + id, "PUT", form);
      else await api("/expenses", "POST", form);
      navigate("/expenses");
    } catch (err) { setError(err.message); }
    setLoading(false);
  };

  return (
    <form className="card" onSubmit={submit}>
      <h2>{id ? "Edit Expense" : "Add Expense"}</h2>
      {error && <p className="error">{error}</p>}
      <input name="title" placeholder="Title" value={form.title} onChange={change} required />
      <input name="amount" type="number" placeholder="Amount" value={form.amount} onChange={change} required />
      <select name="category" value={form.category} onChange={change} required>
        <option value="">Select category</option>
        {["Food", "Transport", "Lifestyle", "Entertainment", "Education", "Other"].map((c) => <option key={c}>{c}</option>)}
      </select>
      <select name="paymentMethod" value={form.paymentMethod} onChange={change}>
        {["Cash", "UPI", "Card"].map((p) => <option key={p}>{p}</option>)}
      </select>
      <input name="date" type="date" value={form.date} onChange={change} />
      <textarea name="description" placeholder="Description" value={form.description} onChange={change} />
      <button disabled={loading}>{loading ? "Saving..." : "Save Expense"}</button>
    </form>
  );
}
