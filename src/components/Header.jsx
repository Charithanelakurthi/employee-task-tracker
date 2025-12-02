// src/components/Header.jsx
import React from "react";
import { Navbar, Container, Nav, Button, Form, InputGroup } from "react-bootstrap";

export default function Header({
  filter, onFilterChange, onOpenAdd, employees,
  searchQuery, onSearchChange, sortOrder, onSortChange
}) {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand>Employee Task Tracker</Navbar.Brand>

        <Nav className="me-auto align-items-center">
          <Form.Select
            aria-label="Filter tasks by status"
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
            style={{ width: 160 }}
          >
            <option value="All">All tasks</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </Form.Select>

          <InputGroup className="ms-3 search-input">
            <Form.Control
              placeholder="Search tasks..."
              aria-label="Search tasks by title"
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
            />
          </InputGroup>

          <Form.Select
            aria-label="Sort tasks"
            value={sortOrder}
            onChange={(e) => onSortChange(e.target.value)}
            style={{ width: 140, marginLeft: 12 }}
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </Form.Select>
        </Nav>

        <Nav>
          <Button onClick={onOpenAdd} aria-label="Open add task modal">+ Add Task</Button>
        </Nav>
      </Container>
    </Navbar>
  );
}
