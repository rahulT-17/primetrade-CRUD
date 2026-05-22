import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/client";

export default function Register() {
  const [form, setForm] = useState({ email: "", username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.detail || err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="page">
      <div className="auth-layout fade-in">
        <section className="auth-brand">
          <div className="brand-mark">PT</div>
          <h1>Create your space</h1>
          <p>
            Build a simple task rhythm. Register once and keep your workflow
            focused.
          </p>
          <ul className="brand-list">
            <li>
              <span className="brand-dot" />
              Personal task ownership
            </li>
            <li>
              <span className="brand-dot" />
              Minimal, clean UI
            </li>
            <li>
              <span className="brand-dot" />
              Fast login and logout
            </li>
          </ul>
        </section>
        <form className="card auth-card" onSubmit={handleSubmit}>
          <h2>Register</h2>
          <p className="muted">Create a new account in seconds.</p>
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
            <span>Username</span>
            <input
              className="input"
              name="username"
              placeholder="your handle"
              value={form.username}
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
              placeholder="At least 8 characters"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>
          {error && <div className="alert error">{error}</div>}
          <button className="button primary" type="submit">
            Create account
          </button>
          <p className="helper">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}