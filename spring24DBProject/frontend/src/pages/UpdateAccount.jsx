import React, { useState } from "react";

export default function SignUp() {

  
  const [creationSuccess, setCreationSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if(value != "")
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to create account");
      }
      setCreationSuccess(true);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };


  return (
    <div className="row justify-content-center">
      <div className="col md-4 mb-4">
        <div className="card sign-up">
          <div className="card-body">
            <h1 className="my-2 text-center" style={{ color: "#2F4858" }}>
              Update Account
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="row mt-5 mb-3">
                <div className="col">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName} // Bind value to formData state
                    onChange={handleInputChange} // Handle input change
                  />
                </div>
                <div className="col-auto">
                  <label htmlFor="middleName" className="form-label">
                    Middle Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="middleName"
                    name="middleName"
                    value={formData.middleName} // Bind value to formData state
                    onChange={handleInputChange} // Handle input change
                  />
                </div>
                <div className="col">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName} // Bind value to formData state
                    onChange={handleInputChange} // Handle input change
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email} // Bind value to formData state
                    onChange={handleInputChange} // Handle input change
                  />
                </div>
                <div className="col">
                  <label htmlFor="phoneNumber" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber} // Bind value to formData state
                    onChange={handleInputChange} // Handle input change
                  />
                </div>
              </div>

              <div className="mt-5 text-center">
                <button type="submit" className="btn btn-primary">
                  Update Account
                </button>
              </div>
            </form>
            {creationSuccess && (
              <div className="alert alert-success my-3" role="alert">
                Account created successfully!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
