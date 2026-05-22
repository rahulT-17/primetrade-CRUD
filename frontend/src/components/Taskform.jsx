import React, { useState } from "react";

export default function TaskForm({ onSubmit }) {
  const [form, setForm] = useState({ title: "", description: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ title: "", description: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="field">
        <span>Title</span>
        <input
          className="input"
          name="title"
          placeholder="Define the task"
          value={form.title}
          onChange={handleChange}
          required
        />
      </label>
      <label className="field">
        <span>Description</span>
        <textarea
          className="input textarea"
          name="description"
          placeholder="Optional details"
          value={form.description}
          onChange={handleChange}
          rows={3}
        />
      </label>
      <button className="button primary" type="submit">
        Add task
      </button>
    </form>
  );
}