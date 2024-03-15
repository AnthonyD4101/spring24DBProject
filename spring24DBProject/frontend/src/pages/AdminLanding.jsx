import React, { useState } from "react";
import StaffSideNavbar from "../components/StaffSideNavbar";
import AdminDashboard from "./AdminDashboard";
import AdminDataReports from "./AdminDataReports";
import AdminDepManagement from "./AdminDepManagement";
import AdminMainReports from "./AdminMainReports";
import TicketDataReports from "./TicketDataReports";
import RideDataReports from "./RideDataReports";
import RevenueDataReports from "./RevenueDataReports";
import AddEmployee from "./AddEmployeeDataEntryForm";
import UpdateEmployee from "./UpdateEmployeeDataEntryForm";
import DeleteEmployee from "./DeleteEmployeeDataEntryForm";

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
            {selectedPage === "Ticket Data Reports" && <TicketDataReports />}
            {selectedPage === "Ride Data Reports" && <RideDataReports />}
            {selectedPage === "Revenue Data Reports" && <RevenueDataReports />}
            {selectedPage === "Add Employee Data Entry Form" && <AddEmployee />}
            {selectedPage === "Update Employee Data Entry Form" && <UpdateEmployee />}
            {selectedPage === "Delete Employee Data Entry Form" && <DeleteEmployee />}
            {/* Add more pages as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLanding;
