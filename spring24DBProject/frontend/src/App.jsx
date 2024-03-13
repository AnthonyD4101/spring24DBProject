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
import MaintenanceLanding from "./pages/MaintenanceLanding";

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
          <Route path="/maintenanceLanding" element={<MaintenanceLanding />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
