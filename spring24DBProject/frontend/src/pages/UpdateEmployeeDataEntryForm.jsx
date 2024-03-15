import React, { useState, useEffect } from "react";

export default function UpdateEmployee() {
  const [employeeId, setEmployeeId] = useState("");
  const [employeeData, setEmployeeData] = useState(null);
  const [isSubmitted, setisSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const positions = ["Admin", "Manager", "Maintenance", "Employee"];

  const departments = ["Attraction", "Vendor", "Maintenance"];

  useEffect(() => {
    if (employeeId) {
      /* Fetch employee data from your backend based on the employeeId to be implemented later (backend)
      fetch(`your_api_endpoint/${employeeId}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to fetch employee data");
          }
        })
        .then((data) => setEmployeeData(data))
        .catch((error) => setError(error.message));*/

      setEmployeeData({
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "123-456-7890",
        email: "johndoe@example.com",
        position: "Manager",
        supervisorUserId: "12345",
        salary: "50000",
        address: {
          street: "1111 FrostRiver Ln",
          city: "Houston",
          state: "TX",
          zipcode: "12345",
        },
        status: "Active",
        department: "Attraction",
      });
    }
  }, [employeeId]);

  const handleSubmitOne = (e) => {
    e.preventDefault();
    setisSubmitted(true);
    // Form submission logic
    console.log(employeeData);
  };

  const handleSubmitTwo = (e) => {
    e.preventDefault();
    // Form submission logic
    console.log(employeeData);
    alert("Employee Information has been Updated");
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        [name]: value,
      },
    }));
  };

  return (
    <div className="row justify-content-center">
      <div className="col md-4 mb-4">
        <div className="card dataEntryForm">
          <div className="card-body">
            <h1 className="my-2 text-center" style={{ color: "#2F4858" }}>
              Update Employee
            </h1>
            <div className="text-center">
              Please enter the Employee ID of the Employee you would like to
              update.
            </div>
            <form onSubmit={handleSubmitOne}>
              <div className="mb-3 mt-3">
                <label htmlFor="employeeID" className="form-label">
                  Enter Employee ID:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="employeeID"
                  name="employeeID"
                  placeholder="12345"
                  maxLength="10"
                  required
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                />
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
                    <label htmlFor="firstName" className="form-label">
                      First Name:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="firstName"
                      maxLength="30"
                      value={employeeData.firstName}
                      onChange={(e) =>
                        setEmployeeData({
                          ...employeeData,
                          firstName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="lastName" className="form-label">
                      Last Name:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      maxLength="30"
                      value={employeeData.lastName}
                      onChange={(e) =>
                        setEmployeeData({
                          ...employeeData,
                          lastName: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="phoneNumber" className="form-label">
                      Phone Number:
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={employeeData.phoneNumber}
                      onChange={(e) =>
                        setEmployeeData({
                          ...employeeData,
                          phoneNumber: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="email" className="form-label">
                      Email:
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="emaill"
                      value={employeeData.email}
                      onChange={(e) =>
                        setEmployeeData({
                          ...employeeData,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="position" className="form-label">
                      Position:
                    </label>
                    <input
                      list="positions"
                      className="form-control"
                      id="position"
                      name="position"
                      placeholder="Type to search..."
                      value={employeeData.position}
                      onChange={(e) =>
                        setEmployeeData({
                          ...employeeData,
                          position: e.target.value,
                        })
                      }
                    />
                    <datalist id="positions">
                      {positions.map((position, index) => (
                        <option key={index} value={position} />
                      ))}
                    </datalist>
                  </div>
                  <div className="col">
                    <label htmlFor="supUserID" className="form-label">
                      Supervisor ID:
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="supUserID"
                      name="supUserID"
                      value={employeeData.supervisorUserId}
                      onChange={(e) =>
                        setEmployeeData({
                          ...employeeData,
                          supervisorUserId: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="salary" className="form-label">
                      Salary:
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="salary"
                      name="salary"
                      value={employeeData.salary}
                      onChange={(e) =>
                        setEmployeeData({
                          ...employeeData,
                          salary: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="department" className="form-label">
                      Department:
                    </label>
                    <input
                      list="departments"
                      className="form-control"
                      id="department"
                      name="department"
                      placeholder="Type to search..."
                      value={employeeData.department}
                      onChange={(e) =>
                        setEmployeeData({
                          ...employeeData,
                          department: e.target.value,
                        })
                      }
                    />
                    <datalist id="departments">
                      {departments.map((department, index) => (
                        <option key={index} value={department} />
                      ))}
                    </datalist>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="mb-2">Address</div>
                  <div className="col">
                    <label htmlFor="street" className="form-label">
                      Street:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="street"
                      name="street"
                      value={employeeData.address.street}
                      onChange={handleAddressChange}
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="city" className="form-label">
                      City:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      name="city"
                      value={employeeData.address.city}
                      onChange={handleAddressChange}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="state" className="form-label">
                      State:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="state"
                      name="state"
                      value={employeeData.address.state}
                      onChange={handleAddressChange}
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="zipcode" className="form-label">
                      Zipcode:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="zipcode"
                      name="zipcode"
                      value={employeeData.address.zipcode}
                      onChange={handleAddressChange}
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
                      Update Employee
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
