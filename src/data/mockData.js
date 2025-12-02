// src/data/mockData.js
export const MOCK_EMPLOYEES = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Frontend Developer",
    tasks: [
      { id: 101, title: "Build login page", status: "Completed" },
      { id: 102, title: "Implement dashboard", status: "In Progress" }
    ]
  },
  {
    id: 2,
    name: "Bob Smith",
    role: "Backend Developer",
    tasks: [
      { id: 103, title: "API integration", status: "Pending" }
    ]
  },
  {
    id: 3,
    name: "Carol Lee",
    role: "QA Engineer",
    tasks: [
      { id: 104, title: "Write test cases", status: "Pending" },
      { id: 105, title: "Run regression suite", status: "In Progress" }
    ]
  }
];
