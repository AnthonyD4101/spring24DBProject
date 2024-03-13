import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import EmployeeLanding from "./pages/EmployeeLanding";
import CustomerLanding from "./pages/CustomerLanding";
import SignIn from "./pages/SignIn";
import AccountSetup from "./pages/AccountSetup";
import MaintenanceLanding from "./pages/MaintenanceLanding";

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
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/accountSetup" element={<AccountSetup />} />
          <Route path="/maintenanceLanding" element={<MaintenanceLanding />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
