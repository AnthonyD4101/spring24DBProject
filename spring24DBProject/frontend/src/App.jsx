import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import EmployeeLanding from "./pages/EmployeeLanding";
import CustomerLanding from "./pages/CustomerLanding";
import ParkInformation from "./pages/ParkInformation";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/signUp";
import AccountSetup from "./pages/AccountSetup";

import { Navbar } from "./components/Navbar";

function App() {
  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employeeLanding" element={<EmployeeLanding />} />
          <Route path="/customerLanding" element={<CustomerLanding />} />
          <Route path="/parkInformation" element={<ParkInformation />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/accountSetup" element={<AccountSetup />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
