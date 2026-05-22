import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(form.email, form.password);
    } catch (err) {
      setError(err.response?.data?.detail || err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="page">
      <div className="auth-layout fade-in">
        <section className="auth-brand">
          <div className="brand-mark">PT</div>
          <h1>PrimeTrade</h1>
          <p>
            Minimal task control with a warm, calm palette. Keep work visible,
            small, and deliberate.
          </p>
          <ul className="brand-list">
            <li>
              <span className="brand-dot" />
              Focused auth flow with JWT
            </li>
            <li>
              <span className="brand-dot" />
              Clean ownership rules
            </li>
            <li>
              <span className="brand-dot" />
              Fast API-ready UI
            </li>
          </ul>
        </section>
        <form className="card auth-card" onSubmit={handleSubmit}>
          <h2>Welcome back</h2>
          <p className="muted">Sign in to manage your tasks.</p>
          <label className="field">
            <span>Email</span>
            <input
              className="input"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>
          <label className="field">
            <span>Password</span>
            <input
              className="input"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>
          {error && <div className="alert error">{error}</div>}
          <button className="button primary" type="submit">
            Login
          </button>
          <p className="helper">
            New here? <Link to="/register">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}