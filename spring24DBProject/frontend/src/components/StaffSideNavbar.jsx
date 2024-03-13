import React from "react";

const StaffSideNavbar = ({ onItemClick }) => {
  return (
    <div className="sidebar">
      <ul className="list-group">
        <li
          className="list-group-item"
          onClick={() => onItemClick("Dashboard")}
        >
          Dashboard
        </li>
        <li
          className="list-group-item"
          onClick={() => onItemClick("Department Management")}
        >
          Department Management
        </li>
        <li
          className="list-group-item"
          onClick={() => onItemClick("Data Reports")}
        >
          Data Reports
        </li>
        {/* Add more items as needed */}
      </ul>
    </div>
  );
};

export default StaffSideNavbar;
