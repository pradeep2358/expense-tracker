import { Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import { Login, Register } from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import ExpenseForm from "./pages/ExpenseForm";

function Protected({ children }) {
  return localStorage.getItem("token") ? children : <Navigate to="/login" />;
}

function Navbar() {
  const navigate = useNavigate();
  if (!localStorage.getItem("token")) return null;
  const logout = () => { localStorage.clear(); navigate("/login"); };
  return (
    <nav>
      <b>Expense Tracker</b>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/expenses">Expenses</Link>
      <Link to="/expenses/add">Add Expense</Link>
      <button onClick={logout}>Logout</button>
    </nav>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
          <Route path="/expenses" element={<Protected><Expenses /></Protected>} />
          <Route path="/expenses/add" element={<Protected><ExpenseForm /></Protected>} />
          <Route path="/expenses/:id/edit" element={<Protected><ExpenseForm /></Protected>} />
        </Routes>
      </div>
    </>
  );
}
