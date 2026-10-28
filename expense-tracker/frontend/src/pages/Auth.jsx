import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";

export function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const data = await api("/auth/login", "POST", form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("name", data.name);
      navigate("/dashboard");
    } catch (err) { setError(err.message); }
    setLoading(false);
  };

  return (
    <form className="card" onSubmit={submit}>
      <h2>Welcome Back</h2>
      {error && <p className="error">{error}</p>}
      <input
        placeholder="Email"
        type="email"
        required
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Password"
        type="password"
        required
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button disabled={loading}>{loading ? "Loading..." : "Login"}</button>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </form>
  );
}

export function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      await api("/auth/register", "POST", form);
      navigate("/login");
    } catch (err) { setError(err.message); }
    setLoading(false);
  };

  return (
    <form className="card" onSubmit={submit}>
      <h2>Create Account</h2>
      {error && <p className="error">{error}</p>}
      <input placeholder="Name" required onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input
        placeholder="Email"
        type="email"
        required
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Password"
        type="password"
        required
        minLength={6}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button disabled={loading}>{loading ? "Loading..." : "Register"}</button>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </form>
  );
}
