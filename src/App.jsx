// src/App.jsx
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Toast, Button } from "react-bootstrap";
import { MOCK_EMPLOYEES } from "./data/mockData";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import EmployeeList from "./components/EmployeeList";
import AddTaskModal from "./components/AddTaskModal";
import "./index.css";

const LOCAL_KEY = "employee_task_data_v1";

function App() {
  const [employees, setEmployees] = useState([]);
  const [filter, setFilter] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);

  // UI helpers
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest"); // newest | oldest

  // toast / undo
  const [showUndoToast, setShowUndoToast] = useState(false);
  const [lastDeleted, setLastDeleted] = useState(null);

  // newly added animation tracking
  const [newlyAddedId, setNewlyAddedId] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (raw) {
      try {
        setEmployees(JSON.parse(raw));
      } catch {
        setEmployees(MOCK_EMPLOYEES);
      }
    } else {
      setEmployees(MOCK_EMPLOYEES);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(employees));
  }, [employees]);

  function addTask(employeeId, title) {
    const createdAt = Date.now();
    const id = createdAt; // unique
    setEmployees(prev =>
      prev.map(emp =>
        emp.id === employeeId
          ? { ...emp, tasks: [{ id, title, status: "Pending", createdAt }, ...emp.tasks] }
          : emp
      )
    );
    // mark for animation
    setNewlyAddedId(id);
    // clear after animation
    setTimeout(() => setNewlyAddedId(null), 900);
  }

  function updateTaskStatus(employeeId, taskId, newStatus) {
    setEmployees(prev =>
      prev.map(emp =>
        emp.id === employeeId ? {
          ...emp,
          tasks: emp.tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t)
        } : emp
      )
    );
  }

  function deleteTask(employeeId, taskId) {
    // find deleted task
    let deleted = null;
    setEmployees(prev =>
      prev.map(emp => {
        if (emp.id === employeeId) {
          const task = emp.tasks.find(t => t.id === taskId);
          deleted = { ...task, employeeId, employeeName: emp.name };
          return { ...emp, tasks: emp.tasks.filter(t => t.id !== taskId) };
        }
        return emp;
      })
    );
    if (deleted) {
      setLastDeleted(deleted);
      setShowUndoToast(true);
      // auto clear after 6s if not undone
      setTimeout(() => setShowUndoToast(false), 6000);
    }
  }

  function undoDelete() {
    if (!lastDeleted) return;
    setEmployees(prev =>
      prev.map(emp =>
        emp.id === lastDeleted.employeeId
          ? { ...emp, tasks: [ { id: lastDeleted.id, title: lastDeleted.title, status: lastDeleted.status, createdAt: lastDeleted.createdAt || Date.now() }, ...emp.tasks ] }
          : emp
      )
    );
    setLastDeleted(null);
    setShowUndoToast(false);
  }

  // build filtered list (apply filter, search, and sort)
  const filteredEmployees = employees.map(emp => {
    // filter by task status
    let tasks = filter === "All" ? emp.tasks : emp.tasks.filter(t => t.status === filter);

    // search by title
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      tasks = tasks.filter(t => t.title.toLowerCase().includes(q));
    }

    // sort
    tasks = tasks.slice().sort((a, b) => {
      const aTime = a.createdAt || 0;
      const bTime = b.createdAt || 0;
      return sortOrder === "newest" ? bTime - aTime : aTime - bTime;
    });

    return { ...emp, tasks };
  });

  return (
    <>
      <Header
        filter={filter}
        onFilterChange={setFilter}
        onOpenAdd={() => setShowAddModal(true)}
        employees={employees}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />

      <Container className="my-4">
        <Row>
          <Col md={4}>
            <Dashboard employees={employees} />
          </Col>
          <Col md={8}>
            <EmployeeList
              employees={filteredEmployees}
              onStatusChange={updateTaskStatus}
              onDeleteTask={deleteTask}
              newlyAddedId={newlyAddedId}
            />
          </Col>
        </Row>
      </Container>

      <AddTaskModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        employees={employees}
        onAddTask={(empId, title) => {
          addTask(empId, title);
          setShowAddModal(false);
        }}
      />

      {/* Undo Toast */}
      <div style={{ position: "fixed", right: 20, bottom: 20, zIndex: 1100 }}>
        <Toast show={showUndoToast} onClose={() => setShowUndoToast(false)}>
          <Toast.Header>
            <strong className="me-auto">Task deleted</strong>
            <small className="text-muted">just now</small>
          </Toast.Header>
          <Toast.Body>
            <div>
              Deleted <strong>{lastDeleted?.title}</strong> from <em>{lastDeleted?.employeeName}</em>
            </div>
            <div className="mt-2 d-flex justify-content-end">
              <Button size="sm" variant="outline-secondary" onClick={() => setShowUndoToast(false)}>Dismiss</Button>
              <Button size="sm" className="ms-2" onClick={undoDelete}>Undo</Button>
            </div>
          </Toast.Body>
        </Toast>
      </div>
    </>
  );
}

export default App;
