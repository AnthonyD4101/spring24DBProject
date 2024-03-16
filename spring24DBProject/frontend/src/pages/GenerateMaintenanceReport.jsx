import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function GenerateMaintRep() {
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");

  const [selectedRequest, setSelectedRequest] = useState("");
  const handleSelectChange = (event) => {
    setSelectedRequest(event.target.value);
  };

  const [selectedAttraction, setSelectedAttraction] = useState("");
  const handleAttractionChange = (event) => {
    setSelectedAttraction(event.target.value);
  };

  const [selectedStatus, setSelectedStatus] = useState("");
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  return (
    <>
      <div className="container text-center">
        <div className="row">
          <h28 style={{ marginTop: "20px" }}>Maintenance Data Report Page</h28>
        </div>
      </div>

      <form>
        <div class="report-card">
          <div class="report-card-body">
            <div class="mt-2 mb-3">
              <label
                htmlFor="attractionID"
                className="form-label"
                style={{
                  color: "#2F4858",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                Start Date
              </label>
              <input
                id="dateValidStart"
                name="dateValid"
                type="date"
                class="form-control"
                style={{ marginBottom: "10px" }}
                maxLength="100"
                required
              />
              <label
                htmlFor="attractionID"
                className="form-label"
                style={{
                  color: "#2F4858",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                End Date
              </label>
              <input
                id="dateValidEnd"
                name="dateValid"
                type="date"
                class="form-control"
                style={{ marginBottom: "10px" }}
                maxLength="100"
                required
              />

              <label
                htmlFor="attractionID"
                className="form-label"
                style={{
                  color: "#2F4858",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                Maintenance ID
              </label>
              <select
                class="form-select"
                aria-label="Default select example"
                style={{ marginBottom: "10px" }}
                value={selectedRequest}
                onChange={handleSelectChange}
              >
                <option selected>Select Maintenence ID</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>

              <label
                htmlFor="attractionID"
                className="form-label"
                style={{
                  color: "#2F4858",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                Attraction Name
              </label>
              <select
                class="form-select"
                aria-label="Default select example"
                style={{ marginBottom: "10px" }}
                value={selectedAttraction}
                onChange={handleAttractionChange}
              >
                <option selected>Select Attraction</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>

              <label
                htmlFor="attractionID"
                className="form-label"
                style={{
                  color: "#2F4858",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                Maintenance Status
              </label>
              <select
                class="form-select"
                aria-label="Default select example"
                style={{ marginBottom: "10vh" }}
                value={selectedStatus}
                onChange={handleStatusChange}
              >
                <option selected>Select Status</option>
                <option value="1">Pending</option>
                <option value="2">Active</option>
                <option value="3">Completed</option>
              </select>

              <table class="table table-success table-striped">
                <thead>
                  <tr>
                    <th scope="col">ID #</th>
                    <th scope="col">Attraction Name</th>
                    <th scope="col">Status</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">Completion Date</th>
                    <th scope="col">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td colspan="2">Larry the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
