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
          {isDataReportsOpen && (
            <ul className="list-group-submenu">
              <li
                className="list-group-submenu-item"
                onClick={() => onItemClick("Daily Rides")}
              >
                Daily Rides
              </li>
              <li
                className="list-group-submenu-item"
                onClick={() => onItemClick("Daily Profit")}
              >
                Daily Profit
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default StaffSideNavbar;
