//Not Ready
import React from "react";

function vertNav() {
  const items = [
    "Dashboard",
    "Department Management",
    "Data Reports",
    "Maintenance",
  ];

  return (
    <>
      <h1>Navigation Bar</h1>
      <ul class="nav flex-column">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
}
