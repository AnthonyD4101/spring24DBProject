import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StaffSideNavbar = ({ onItemClick }) => {
  const [isDataReportsOpen, setIsDataReportsOpen] = useState(false);
  const [isDataEntryFormsOpen, setIsDataEntryFormsOpen] = useState(false);

  const toggleDataReportsDropdown = () => {
    setIsDataReportsOpen(!isDataReportsOpen);
  };

  const toggleDataEntryFormsDropdown = () => {
    setIsDataEntryFormsOpen(!isDataEntryFormsOpen);
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
          className={`list-group-item ${isDataEntryFormsOpen ? "active" : ""}`}
          onClick={toggleDataEntryFormsDropdown}
        >
          Department Management
          {isDataEntryFormsOpen && (
            <ul className="list-group-submenu">
              <li
                className="list-group-submenu-item"
                onClick={() => onItemClick("Add Employee Data Entry Form")}
              >
                Add Employee
              </li>
              <li
                className="list-group-submenu-item"
                onClick={() => onItemClick("Update Employee Data Entry Form")}
              >
                Update Employee
              </li>
              <li
                className="list-group-submenu-item"
                onClick={() => onItemClick("Delete Employee Data Entry Form")}
              >
                Delete Employee
              </li>
              <li
                className="list-group-submenu-item"
                onClick={() => onItemClick("Add Attraction Data Entry Form")}
              >
                Add Attraction
              </li>
              <li
                className="list-group-submenu-item"
                onClick={() => onItemClick("Update Attraction Data Entry Form")}
              >
                Update Attraction
              </li>
              <li
                className="list-group-submenu-item"
                onClick={() => onItemClick("Delete Attraction Data Entry Form")}
              >
                Delete Attraction
              </li>
            </ul>
          )}
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
