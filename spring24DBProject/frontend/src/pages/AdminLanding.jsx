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
import AddAttraction from "./AddAttractionDataEntryForm";
import UpdateAttraction from "./UpdateAttractionDataEntryForm";
import DeleteAttraction from "./DeleteAttractionDataEntryForm";
import AddVendor from "./AddVendorDataEntryForm";
import UpdateVendor from "./UpdateVendorDataEntryForm";
import DeleteVendor from "./DeleteVendorDataEntryForm";
import AddAttractionLog from "./AddAttractionLogDataEntryForm";
import AddWeatherLog from "./AddWeatherLogDataEntryForm";
import AddDepartment from "./AddDepartmentDataEntryForm.";
import UpdateDepartment from "./UpdateDepartmentDataEntryForm";
import AddProduct from "./AddProductDataEntryForm";
import UpdateProduct from "./UpdateProductDataEntryForm";
import DeleteProduct from "./DeleteProductDataEntryForm";

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
            {selectedPage === "Add Attraction Data Entry Form" && <AddAttraction />}
            {selectedPage === "Update Attraction Data Entry Form" && <UpdateAttraction />}
            {selectedPage === "Delete Attraction Data Entry Form" && <DeleteAttraction />}
            {selectedPage === "Add Vendor Data Entry Form" && <AddVendor />}
            {selectedPage === "Update Vendor Data Entry Form" && <UpdateVendor />}
            {selectedPage === "Delete Vendor Data Entry Form" && <DeleteVendor />}
            {selectedPage === "Add Attraction Log Data Entry Form" && <AddAttractionLog />}
            {selectedPage === "Add Weather Log Data Entry Form" && <AddWeatherLog />}
            {selectedPage === "Add Department Data Entry Form" && <AddDepartment />}
            {selectedPage === "Update Department Data Entry Form" && <UpdateDepartment />}
            {selectedPage === "Add Product Data Entry Form" && <AddProduct />}
            {selectedPage === "Update Product Data Entry Form" && <UpdateProduct />}
            {selectedPage === "Delete Product Data Entry Form" && <DeleteProduct />}
            {/* Add more pages as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLanding;
