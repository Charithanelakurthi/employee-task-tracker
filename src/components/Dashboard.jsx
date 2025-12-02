// src/components/Dashboard.jsx
import React from "react";
import { Card, ListGroup } from "react-bootstrap";

export default function Dashboard({ employees }) {
  const allTasks = employees.flatMap(e => e.tasks);
  const total = allTasks.length;
  const completed = allTasks.filter(t => t.status === "Completed").length;
  const inProgress = allTasks.filter(t => t.status === "In Progress").length;
  const pending = allTasks.filter(t => t.status === "Pending").length;
  const completedPct = total ? Math.round((completed / total) * 100) : 0;

  return (
    <Card>
      <Card.Body>
        <Card.Title>Dashboard</Card.Title>

        <div className="d-flex align-items-center mb-3">
          <div className="radial-progress me-3" style={{["--pct"]: `${completedPct}%`}}>
            <div className="circle" style={{["--pct"]: `${completedPct}%`}} />
            <div className="radial-label">{completedPct}%</div>
          </div>

          <div>
            <div><strong>Total employees:</strong> {employees.length}</div>
            <div><strong>Total tasks:</strong> {total}</div>
          </div>
        </div>

        <ListGroup variant="flush">
          <ListGroup.Item>Completed: {completed}</ListGroup.Item>
          <ListGroup.Item>In Progress: {inProgress}</ListGroup.Item>
          <ListGroup.Item>Pending: {pending}</ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
