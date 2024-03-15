import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MaintenanceFormTemplate from "../components/MaintenanceFormTemplate";

export default function MaintenanceRequestForm() {
  const handleSubmit = (formData) => {
    // Handle the submitted form data specifically for Page 2
  };

  return (
    <>
      <div className="row justify-content-center">
        <div className="col md-4 mb-4">
          <div className="card MaintReq">
            <div className="card-body">
              <h1 className="my-2 text-center" style={{ color: "#2F4858" }}>
                Create New Maintenance Request
              </h1>
              <MaintenanceFormTemplate onSubmit={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
