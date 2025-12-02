// src/components/EmployeeList.jsx
import React from "react";
import { Accordion } from "react-bootstrap";
import EmployeeCard from "./EmployeeCard";

export default function EmployeeList({ employees, onStatusChange, onDeleteTask, newlyAddedId }) {
  return (
    <div>
      <h5>Employees</h5>
      <Accordion defaultActiveKey="0">
        {employees.map((emp, idx) => (
          <EmployeeCard
            key={emp.id}
            eventKey={String(idx)}
            employee={emp}
            onStatusChange={onStatusChange}
            onDeleteTask={onDeleteTask}
            newlyAddedId={newlyAddedId}
          />
        ))}
      </Accordion>
    </div>
  );
}
