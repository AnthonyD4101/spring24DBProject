import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Home from "./pages/Home";
import EmployeeLanding from "./pages/EmployeeLanding";
import CustomerLanding from "./pages/CustomerLanding";
import ParkInformation from "./pages/ParkInformation";
import EmployeeSignIn from "./pages/EmployeeSignIn";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AccountSetup from "./pages/AccountSetup";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import EmployeeDataReports from "./pages/EmployeeDataReports";
import EmployeeDepManagement from "./pages/EmployeeDepManagement";

import { Navbar } from "./components/Navbar";
import { StaffNavbar } from "./components/StaffNavbar";

function App() {
  const location = useLocation();

  const staffPaths = ["/employeeLanding"];

  const isStaffPage = staffPaths.includes(location.pathname);

  return (
    <>
      <div>
        {isStaffPage ? <StaffNavbar /> : <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employeeLanding" element={<EmployeeLanding />} />
          <Route path="/customerLanding" element={<CustomerLanding />} />
          <Route path="/parkInformation" element={<ParkInformation />} />
          <Route path="/employeeSignIn" element={<EmployeeSignIn />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/accountSetup" element={<AccountSetup />} />
          <Route path="/dashboard" element={<EmployeeDashboard />} />
          <Route path="/dataReports" element={<EmployeeDataReports />} />
          <Route path="/depManagement" element={<EmployeeDepManagement />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
