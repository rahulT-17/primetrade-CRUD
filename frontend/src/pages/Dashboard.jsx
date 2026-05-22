import React, { useEffect, useState } from "react";
import api from "../api/client";
import { useAuth } from "../context/AuthContext";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/Taskform";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const { logout } = useAuth();

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      setError("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (data) => {
    try {
      await api.post("/tasks", data);
      fetchTasks();
    } catch {
      setError("Failed to create task");
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      await api.put(`/tasks/${id}`, data);
      fetchTasks();
    } catch {
      setError("Failed to update task");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch {
      setError("Failed to delete task");
    }
  };

  return (
    <div className="page" style={{ alignItems: "flex-start" }}>
      <div className="dashboard fade-in">
        <header className="topbar">
          <div className="brand-inline">
            <div className="brand-mark small">PT</div>
            <div>
              <div className="brand-title">PrimeTrade</div>
              <div className="brand-sub">Task console</div>
            </div>
          </div>
          <div className="top-actions">
            <span className="pill">JWT active</span>
            <button className="button ghost" onClick={logout} type="button">
              Logout
            </button>
          </div>
        </header>

        <div className="dashboard-grid">
          <section className="card panel">
            <h2 className="section-title">Create task</h2>
            <p className="muted">Keep each task small and specific.</p>
            <TaskForm onSubmit={handleCreate} />
          </section>

          <section className="card panel">
            <div className="section-row">
              <h2 className="section-title">Your tasks</h2>
              <span className="pill">{tasks.length} total</span>
            </div>
            {error && <div className="alert error">{error}</div>}
            <div className="task-grid">
              {tasks.length === 0 && (
                <div className="empty">No tasks yet. Add one to get started.</div>
              )}
              {tasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  index={index}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}