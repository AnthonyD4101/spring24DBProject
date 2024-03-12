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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
