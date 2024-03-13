import React, { useState } from "react";
import StaffSideNavbar from "../components/StaffSideNavbar";
import EmployeeDashboard from "./EmployeeDashboard";
import EmployeeDataReports from "./EmployeeDataReports";
import EmployeeDepManagement from "./EmployeeDepManagement";

const EmployeeLanding = () => {
  const [selectedPage, setSelectedPage] = useState("");

  const handleItemClick = (pageName) => {
    setSelectedPage(pageName);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
          <StaffSideNavbar onItemClick={handleItemClick} />
        </div>
        {/* Main Content */}
        <div className="col-md-9">
          <div className="main-content">
            {/* Render the selected page */}
            {selectedPage === "Dashboard" && <EmployeeDashboardDashboard />}
            {selectedPage === "Data Reports" && (
              <EmployeeDataReportsDataReports />
            )}
            {selectedPage === "Department Management" && (
              <EmployeeDepManagement />
            )}
            {/* Add more pages as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLanding;
