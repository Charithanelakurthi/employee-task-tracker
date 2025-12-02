// src/components/AddTaskModal.jsx
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function AddTaskModal({ show, onHide, employees, onAddTask }) {
  const [employeeId, setEmployeeId] = useState(employees[0]?.id || "");
  const [title, setTitle] = useState("");

  React.useEffect(() => {
    if (employees[0]) setEmployeeId(employees[0].id);
  }, [employees]);

  function submit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTask(Number(employeeId), title.trim());
    setTitle("");
  }

  return (
    <Modal show={show} onHide={onHide} aria-labelledby="add-task-modal">
      <Form onSubmit={submit}>
        <Modal.Header closeButton>
          <Modal.Title id="add-task-modal">Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Assign to</Form.Label>
            <Form.Select
              aria-label="Assign task to employee"
              value={employeeId}
              onChange={e => setEmployeeId(e.target.value)}
            >
              {employees.map(e => <option value={e.id} key={e.id}>{e.name} — {e.role}</option>)}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Task title</Form.Label>
            <Form.Control
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g., Create signup form"
              aria-label="Task title"
              autoFocus
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Cancel</Button>
          <Button type="submit">Add Task</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
