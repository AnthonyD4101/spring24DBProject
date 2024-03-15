import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
                onClick={() => onItemClick("Ticket Data Reports")}
              >
                Ticket Reports
              </li>
              <li
                className="list-group-submenu-item"
                onClick={() => onItemClick("Ride Data Reports")}
              >
                Ride Reports
              </li>
              <li
                className="list-group-submenu-item"
                onClick={() => onItemClick("Revenue Data Reports")}
              >
                Revenue Reports
              </li>
            </ul>
          )}
        </li>
        <li
          className="list-group-item"
          onClick={() => onItemClick("Maintenance Reports")}
        >
          Maintenance Reports
        </li>
      </ul>
    </div>
  );
};

export default StaffSideNavbar;
