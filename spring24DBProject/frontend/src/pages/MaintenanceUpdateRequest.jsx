import React from "react";
import { useState } from "react";
import MaintenanceFormTemplate from "../components/MaintenanceFormTemplate";

export default function MaintUpReq() {
  const [selectedRequest, setSelectedRequest] = useState("");

  const handleSelectChange = (event) => {
    setSelectedRequest(event.target.value);
  };

  const handleSubmit = (formData) => {
    // Handle the submitted form data specifically for Page 1
  };

  if (selectedRequest) {
    return (
      <div className="row justify-content-center">
        <div className="col md-4 mb-4">
          <div className="card MaintReq">
            <div className="card-body">
              <h1 className="my-2 text-center" style={{ color: "#2F4858" }}>
                Update Maintenance Request {selectedRequest}
              </h1>
              <MaintenanceFormTemplate onSubmit={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="row justify-content-center">
      <div className="col md-4 mb-4">
        <div className="card MaintReqUp">
          <div className="card-body">
            <h1 className="my-2 text-center" style={{ color: "#2F4858" }}>
              Select Request to Update
            </h1>
            <label
              htmlFor="userID"
              className="form-label"
              style={{
                color: "#2F4858",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              Request ID*
            </label>
            <select
              class="form-select"
              aria-label="Default select example"
              value={selectedRequest}
              onChange={handleSelectChange}
            >
              <option selected>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>

            <div className="mt-3 text-center">
              <img
                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXp3cXM3aXNqZ21kajNwZWJvcWFqZzF5NHR1c3ByM3l0aTM0OTduMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/G0bGhDeDDJhub3y6Ai/giphy-downsized-large.gif"
                alt="Description of the GIF"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
