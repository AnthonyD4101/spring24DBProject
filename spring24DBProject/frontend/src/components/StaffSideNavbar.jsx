import React, { useState } from "react";

const StaffSideNavbar = ({ onItemClick }) => {
  const [isDataReportsOpen, setIsDataReportsOpen] = useState(false);

  const toggleDataReportsDropdown = () => {
    setIsDataReportsOpen(!isDataReportsOpen);
  };

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
          className={`list-group-item ${isDataReportsOpen ? "active" : ""}`}
          onClick={toggleDataReportsDropdown}
        >
          Data Reports
          <ul className={`dropdown-menu ${isDataReportsOpen ? "show" : ""}`}>
            <li
              className="list-group-item"
              onClick={() => onItemClick("Daily Rides")}
            >
              Daily Rides
            </li>
            <li
              className="list-group-item"
              onClick={() => onItemClick("Daily Profit")}
            >
              Daily Profit
            </li>
          </ul>
        </li>
        {/* Add more items as needed */}
      </ul>
    </div>
  );
};

export default StaffSideNavbar;
