import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function MaintenanceRequestForm() {
  // State for managing the date input
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <>
      <div className="row justify-content-center">
        <div className="col md-4 mb-4">
          <div className="card MaintReq">
            <div className="card-body">
              <h1 className="my-2 text-center" style={{ color: "#2F4858" }}>
                Create New Maintenance Request
              </h1>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-2">
                    <label
                      htmlFor="userID"
                      className="form-label"
                      style={{
                        color: "#2F4858",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      Employee ID*
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Numeric ID assigned to each employee"
                      aria-label="Numeric ID assigned to each employee"
                    ></input>
                  </div>

                  <div className="mb-2">
                    <label
                      htmlFor="attractionID"
                      className="form-label"
                      style={{
                        color: "#2F4858",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      Department ID*
                    </label>
                    <input
                      className="form-control"
                      type="int"
                      placeholder="Numeric ID assigned to each department"
                      aria-label="$"
                    ></input>
                  </div>

                  <div className="mb-2">
                    <label
                      htmlFor="attractionID"
                      className="form-label"
                      style={{
                        color: "#2F4858",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      Attraction ID*
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Numeric ID assigned to each attraction"
                      aria-label="Numeric ID assigned to each attraction"
                    ></input>
                  </div>

                  <div className="mb-2">
                    <label
                      htmlFor="attractionID"
                      className="form-label"
                      style={{
                        color: "#2F4858",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      Briefly Describe the Problem*
                    </label>
                    <div class="mb-3">
                      <textarea
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-0">
                    <label
                      htmlFor="datePicker"
                      className="form-label"
                      style={{
                        color: "#2F4858",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      Date Submitted*
                    </label>
                  </div>
                  <div>
                    <div style={{ marginBottom: "10px" }}>
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        className="form-control"
                        dateFormat="MMMM d, yyyy"
                      />
                    </div>
                  </div>

                  <div className="mb-0">
                    <label
                      htmlFor="datePicker"
                      className="form-label"
                      style={{
                        color: "#2F4858",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      Expected Completion Date*
                    </label>
                  </div>
                  <div>
                    <div style={{ marginBottom: "10px" }}>
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        className="form-control"
                        dateFormat="MMMM d, yyyy"
                      />
                    </div>

                    <div className="mb-2">
                      <label
                        htmlFor="attractionID"
                        className="form-label"
                        style={{
                          color: "#2F4858",
                          fontSize: "18px",
                          fontWeight: "bold",
                        }}
                      >
                        Maintenance Status*
                      </label>
                      <div style={{ marginBottom: "10px" }}>
                        <select
                          class="form-select"
                          aria-label="Default select example"
                        >
                          <option selected>Select Menu</option>
                          <option value="1">Pending</option>
                          <option value="2">Active</option>
                          <option value="3">Completed</option>
                        </select>
                      </div>

                      <div className="mb-2">
                        <label
                          htmlFor="attractionID"
                          className="form-label"
                          style={{
                            color: "#2F4858",
                            fontSize: "18px",
                            fontWeight: "bold",
                          }}
                        >
                          Cost of Maintenance*
                        </label>
                        <input
                          className="form-control"
                          type="float"
                          placeholder="$"
                          aria-label="$"
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
