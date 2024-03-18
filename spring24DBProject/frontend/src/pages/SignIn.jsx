import React, { useState } from "react";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData); // Log form data for debugging

    try {
      const { email, password } = formData;

      const response = await fetch("http://localhost:3001/api/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to sign in");
      }

      console.log("Sign in successful:", data.message);
      window.alert("Login successful!");
      window.location.href = "/";
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  console.log("Rendering SignIn component"); // Log component rendering for debugging

  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-4 mb-8">
          <div className="card">
            <div className="card-body">
              <h1 className="my-4 text-center" style={{ color: "#2F4858" }}>
                Sign In
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    aria-describedby="emailHelp"
                    required
                  />
                </div>

                <div className="mb-3 pb-3">
                  <label htmlFor="exampleInputPassword" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mt-3 text-center">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={() => console.log("Sign In button clicked")}
                  >
                    Sign In
                  </button>
                </div>

                <div className="text-center">
                  <div className="mt-5 pb-3">
                    <p>
                      New User?{" "}
                      <a href="/signUp" className="text-decoration-none">
                        Create an Account
                      </a>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <footer
        className="footer py-3"
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          backgroundColor: "#33658A",
          width: "100%",
          textAlign: "right",
        }}
      >
        <div className="container text-right">
          <span className="text-muted">
            <button type="button" className="btn btn-secondary">
              <a
                href="/staffSignIn"
                className="text-decoration-none text-white"
              >
                Staff Login
              </a>
            </button>
          </span>
        </div>
      </footer>
    </div>
  );
}
