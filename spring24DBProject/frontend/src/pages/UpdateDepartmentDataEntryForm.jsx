import React, { useState, useEffect } from "react";

export default function UpdateDepartment() {
  const [department, setDepartment] = useState("");
  const [departmentData, setDepartmentData] = useState(null);
  const [isSubmitted, setisSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const departments = ["Attraction", "Vendor", "Maintenance"];

  useEffect(() => {
    if (department) {
      /* Fetch deparment data from your backend based on the department to be implemented later (backend)
          fetch(`your_api_endpoint/${department}`)
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error("Failed to fetch department data");
              }
            })
            .then((data) => setDepartmentData(data))
            .catch((error) => setError(error.message));*/

      setDepartmentData({
        name: "Attraction",
        mmgrUserID: "12345",
      });
    }
  }, [department]);

  const handleSubmitOne = (e) => {
    e.preventDefault();
    setisSubmitted(true);
    // Form submission logic
    console.log(departmentData);
  };

  const handleSubmitTwo = (e) => {
    e.preventDefault();
    // Form submission logic
    console.log(departmentData);
    alert("Department Information has been Updated");
  };

  return (
    <div className="row justify-content-center">
      <div className="col md-4 mb-4">
        <div className="card dataEntryForm">
          <div className="card-body">
            <h1 className="my-2 text-center" style={{ color: "#2F4858" }}>
              Update Department
            </h1>
            <div className="text-center">
              Please select the Department you would like to update.
            </div>
            <form onSubmit={handleSubmitOne}>
              <div className="mb-3 mt-3">
                <label htmlFor="departmentS" className="form-label">
                  Department:
                </label>
                <input
                  list="departments"
                  className="form-control"
                  id="departmentS"
                  name="departmentS"
                  placeholder="Type to search..."
                  required
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
                <datalist id="departments">
                  {departments.map((department, index) => (
                    <option key={index} value={department} />
                  ))}
                </datalist>
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3 text-center">
                  <button id="button" type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </div>
            </form>

            {isSubmitted && (
              <form onSubmit={handleSubmitTwo}>
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
                      value={departmentData.name}
                      onChange={(e) =>
                        setDepartmentData({
                          ...departmentData,
                          name: e.target.value,
                        })
                      }
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
                      value={departmentData.mmgrUserID}
                      onChange={(e) =>
                        setDepartmentData({
                          ...departmentData,
                          mggrUserID: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mt-6">
                  <div className="w-full px-3 text-center">
                    <button
                      id="button"
                      type="submit"
                      className="btn btn-primary"
                    >
                      Update Department
                    </button>
                  </div>
                </div>
              </form>
            )}
            {error && <div>Error: {error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
