import React, { useState } from "react";

export default function AddWeatherLog() {
  const [dateOfClosure, setDateOfClosure] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit data to backend or perform further processing
    const formData = {
      dateOfClosure,
      reason,
    };
    console.log(formData);
    alert(`Weather Log Info has been Added`);
  };

  return (
    <div className="row justify-content-center">
      <div className="col md-4 mb-4">
        <div className="card dataEntryForm">
          <div className="card-body">
            <h1 className="my-2 text-center" style={{ color: "#2F4858" }}>
              Add to Weather Log
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 mt-3">
                <div className="col">
                  <label htmlFor="date" className="form-label">
                    Date of Closure:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    name="date"
                    required
                    value={dateOfClosure}
                    onChange={(e) => setDateOfClosure(e.target.value)}
                  />
                </div>
                <div className="col mb-3 mt-3">
                  <label htmlFor="reason" className="form-label">
                    Reason for Closure:
                  </label>
                  <textarea
                    className="form-control"
                    id="reason"
                    name="reason"
                    max-length="350"
                    rows="5"
                    required
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3 text-center">
                  <button id="button" type="submit" className="btn btn-primary">
                    Add to Weather Log
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
