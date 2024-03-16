import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Home from "./pages/Home";
import ParkInformation from "./pages/ParkInformation";
import StaffSignIn from "./pages/StaffSignIn";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/signUp";
import TicketPurchase from "./pages/TicketPurchase";

import AdminLanding from "./pages/AdminLanding";
import AdminDashboard from "./pages/AdminDashboard";
import AdminDataReports from "./pages/AdminDataReports";
import AdminDepManagement from "./pages/AdminDepManagement";
import AdminMainReports from "./pages/AdminMainReports";
import MaintenanceRequestForm from "./pages/MaintenanceRequestForm";
import MaintenanceUpReq from "./pages/MaintenanceUpdateRequest";

import TicketDataReports from "./pages/TicketDataReports";
import RideDataReports from "./pages/RideDataReports";
import RevenueDataReports from "./pages/RevenueDataReports";

import AddEmployee from "./pages/AddEmployeeDataEntryForm";
import UpdateEmployee from "./pages/UpdateEmployeeDataEntryForm";
import DeleteEmployee from "./pages/DeleteEmployeeDataEntryForm";
import AddAttraction from "./pages/AddAttractionDataEntryForm";
import UpdateAttraction from "./pages/UpdateAttractionDataEntryForm";
import DeleteAttraction from "./pages/DeleteAttractionDataEntryForm";

import { Navbar } from "./components/Navbar";
import { StaffNavbar } from "./components/StaffNavbar";

function App() {
  const location = useLocation();

  const staffPaths = ["/adminLanding"];

  const isStaffPage = staffPaths.includes(location.pathname);

  return (
    <>
      <div>
        {isStaffPage ? <StaffNavbar /> : <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/parkInformation" element={<ParkInformation />} />
          <Route path="/staffSignIn" element={<StaffSignIn />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/ticketPurchase" element={<TicketPurchase />} />
          <Route path="/adminLanding" element={<AdminLanding />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/dataReports" element={<AdminDataReports />} />
          <Route path="/depManagement" element={<AdminDepManagement />} />
          <Route path="/mainReports" element={<AdminMainReports />} />
          <Route
            path="/maintenanceRequestForm"
            element={<MaintenanceRequestForm />}
          />
          <Route path="/ticketDataReports" element={<TicketDataReports />} />
          <Route path="/rideDataReports" element={<RideDataReports />} />
          <Route path="/revenueDataReports" element={<RevenueDataReports />} />
          <Route
            path="/maintenanceUpdateRequest"
            element={<MaintenanceUpReq />}
          />
          <Route path="/addemployeedataentryform" element={<AddEmployee />} />
          <Route path="/updateemployeedataentryform" element={<UpdateEmployee />} />
          <Route path="/deleteemployeedataentryform" element={<DeleteEmployee />} />
          <Route path="/addattractiondataentryform" element={<AddAttraction />} />
          <Route path="/updateattractiondataentryform" element={<UpdateAttraction />} />
          <Route path="/deleteattractiondataentryform" element={<DeleteAttraction />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
