import React, { useState } from "react";

export default function AddEmployee() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [supervisorUserId, setSupervisorUserId] = useState("");
  const [salary, setSalary] = useState("");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipcode: "",
  });
  const [status, setStatus] = useState("Active");
  const [department, setDepartment] = useState("");

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit data to backend or perform further processing
    const formData = {
      firstName,
      lastName,
      phoneNumber,
      email,
      position,
      supervisorUserId,
      salary,
      address,
      status,
      department,
    };
    console.log(formData);
    alert("Employee has been added");
  };

  const positions = ["Admin", "Manager", "Maintenance", "Employee"];

  return (
    <div className="row justify-content-center">
      <div className="col md-4 mb-4">
        <div className="card dataEntryForm">
          <div className="card-body">
            <h1 className="my-2 text-center" style={{ color: "#2F4858" }}>
              Add Employee
            </h1>
            <form onSubmit={handleSubmit}>
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
                    placeholder="John"
                    maxLength="30"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
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
                    placeholder="Doe"
                    maxLength="30"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
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
                    placeholder="(111)-111-1111"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
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
                    placeholder="johndoe@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    required
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
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
                    placeholder="12345"
                    required
                    value={supervisorUserId}
                    onChange={(e) => setSupervisorUserId(e.target.value)}
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
                    placeholder="65000"
                    required
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                  />
                </div>
                <div className="col">
                  <label htmlFor="department" className="form-label">
                    Department:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="department"
                    name="department"
                    placeholder="Attractions"
                    required
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  />
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
                    placeholder="1111 FrostRiver Ln"
                    required
                    value={address.street}
                    onChange={handleAddressChange}
                  />
                </div>
                <div className="col">
                  <label htmlFor="city" className="form-label">City:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    placeholder="City"
                    required
                    value={address.city}
                    onChange={handleAddressChange}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="state" className="form-label">State:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="state"
                    name="state"
                    placeholder="State"
                    required
                    value={address.state}
                    onChange={handleAddressChange}
                  />
                </div>
                <div className="col">
                  <label htmlFor="zipcode" className="form-label">Zipcode:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="zipcode"
                    name="zipcode"
                    placeholder="Zipcode"
                    required
                    value={address.zipcode}
                    onChange={handleAddressChange}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3 text-center">
                  <button id="button" type="submit" className="btn btn-primary">
                    Add Employee
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
