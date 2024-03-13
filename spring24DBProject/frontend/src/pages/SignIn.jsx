import React from "react";

export default function SignIn() {
  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h1 className="my-4 text-center" style={{ color: "#2F4858" }}>
                Sign In
              </h1>
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail"
                    aria-describedby="emailHelp"
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
                  />
                </div>

                <div className="mt-3 text-center">
                  <button type="submit" className="btn btn-primary">
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
              <a href="/adminLogin" className="text-decoration-none text-white">
                Admin Login
              </a>
            </button>
          </span>
        </div>
      </footer>
    </div>
  );
}
