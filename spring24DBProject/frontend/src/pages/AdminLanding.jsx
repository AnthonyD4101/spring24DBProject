import React, { useState } from "react";
import StaffSideNavbar from "../components/StaffSideNavbar";
import AdminDashboard from "./AdminDashboard";
import AdminDataReports from "./AdminDataReports";
import AdminDepManagement from "./AdminDepManagement";
import AdminMainReports from "./AdminMainReports";

const AdminLanding = () => {
  const [selectedPage, setSelectedPage] = useState("Dashboard");

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
            {selectedPage === "Dashboard" && <AdminDashboard />}
            {selectedPage === "Department Management" && <AdminDepManagement />}
            {selectedPage === "Data Reports" && <AdminDataReports />}
            {selectedPage === "Maintenance Reports" && <AdminMainReports />}
            {/* Add more pages as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLanding;
