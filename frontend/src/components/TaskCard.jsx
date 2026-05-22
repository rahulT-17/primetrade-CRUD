import React from "react";

export default function TaskCard({ task, onUpdate, onDelete, index = 0 }) {
  return (
    <article
      className={`task-card${task.completed ? " done" : ""}`}
      style={{ "--delay": `${index * 70}ms` }}
    >
      <div className="task-header">
        <h3>{task.title}</h3>
        <span className={`status${task.completed ? " done" : ""}`}>
          {task.completed ? "Completed" : "Open"}
        </span>
      </div>
      <p className="muted">{task.description || "No description provided."}</p>
      <div className="task-actions">
        <button
          className="button ghost small"
          type="button"
          onClick={() => onUpdate(task.id, { completed: !task.completed })}
        >
          {task.completed ? "Mark open" : "Mark done"}
        </button>
        <button className="button ghost small" type="button" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </article>
  );
}