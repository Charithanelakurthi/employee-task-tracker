// src/components/EmployeeCard.jsx
import React from "react";
import { Accordion, ListGroup, Button } from "react-bootstrap";

function statusBadge(status) {
  if (status === "Pending") return <span className="badge badge-pending px-2 py-1">Pending</span>;
  if (status === "In Progress") return <span className="badge badge-progress px-2 py-1">In Progress</span>;
  if (status === "Completed") return <span className="badge badge-completed px-2 py-1">Completed</span>;
  return <span className="badge bg-secondary">{status}</span>;
}

export default function EmployeeCard({ eventKey, employee, onStatusChange, onDeleteTask, newlyAddedId }) {
  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>
        {employee.name} — <small className="text-muted ms-2">{employee.role}</small>
      </Accordion.Header>
      <Accordion.Body>
        <ListGroup variant="flush">
          {employee.tasks.length === 0 && <div className="text-muted">No tasks</div>}
          {employee.tasks.map((t) => (
            <ListGroup.Item
              key={t.id}
              className={`d-flex justify-content-between align-items-center task-item ${t.id === newlyAddedId ? "fade-in" : ""}`}
              role="listitem"
            >
              <div>
                <div style={{ fontWeight: 600 }}>{t.title}</div>
                <div className="mt-1">
                  <small className="small-muted">{statusBadge(t.status)} <span className="ms-2"> • </span> <span className="ms-2">{new Date((t.createdAt || 0)).toLocaleString()}</span></small>
                </div>
              </div>

              <div className="d-flex align-items-center">
                <label htmlFor={`status-${t.id}`} className="visually-hidden">Change status</label>
                <select
                  id={`status-${t.id}`}
                  value={t.status}
                  onChange={(e) => onStatusChange(employee.id, t.id, e.target.value)}
                  className="form-select form-select-sm d-inline-block me-2"
                  style={{ width: 140 }}
                  aria-label={`Change status for ${t.title}`}
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>

                <Button variant="outline-danger" size="sm" onClick={() => {
                  if (confirm(`Delete "${t.title}"? This can be undone.`)) onDeleteTask(employee.id, t.id);
                }} aria-label={`Delete task ${t.title}`}>
                  Delete
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Accordion.Body>
    </Accordion.Item>
  );
}
