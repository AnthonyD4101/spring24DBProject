import React, { useState } from "react";

export default function AddDepartment() {
  const [name, setName] = useState("");
  const [mggrUserID, setMggrUserID] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit data to backend or perform further processing
    const formData = {
      name,
      mggrUserID,
    };
    console.log(formData);
    alert("Department has been added");
  };

  return (
    <div className="row justify-content-center">
      <div className="col md-4 mb-4">
        <div className="card dataEntryForm">
          <div className="card-body">
            <h1 className="my-2 text-center" style={{ color: "#2F4858" }}>
              Add Department
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="row mb-3 mt-3">
                <div className="col">
                  <label htmlFor="name" className="form-label">
                    Department Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Sales"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="col">
                  <label htmlFor="mggr" className="form-label">
                    Department Manager's EmployeeID:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="mggr"
                    name="mggr"
                    placeholder="12345"
                    required
                    value={mggrUserID}
                    onChange={(e) => setMggrUserID(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3 text-center">
                  <button id="button" type="submit" className="btn btn-primary">
                    Add Department
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
