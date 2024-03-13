import React from "react";
import { Link } from "react-router-dom";

export const StaffNavbar = ({ firstName, lastName }) => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <a className="navbar-brand text-white" href="/">
          Wonderland
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link text-white" href="/employeeLanding">
                Employee Portal
              </a>
            </li>
            {/* Display "Welcome, {firstName lastName}" on the right side */}
            <li className="nav-item">
              <span className="nav-link text-white">
                Welcome, {firstName} {lastName}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
