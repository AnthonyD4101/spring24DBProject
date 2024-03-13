import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminMainReports() {
  const navigate = useNavigate(); // For React Router v6

  const handleClickNewRequest = () => {
    navigate("/signIn"); // For React Router v6
  };
  return (
    <>
      <div className="justify">
        <div className="row justify-content-evenly">
          <div className="col-md-5 mb-1">
            <div className="card">
              <div className="card-body">
                <h1 className="my-4 text-center" style={{ color: "#2F4858" }}>
                  Current Requests
                </h1>
              </div>
            </div>
          </div>

          <div className="col-md-5 mb-1">
            <div className="blank-card">
              <div className="blank-card-body d-flex flex-column align-items-center">
                <button
                  className="button styled-button"
                  onClick={handleClickNewRequest}
                >
                  New Request
                </button>
                <button className="button styled-button">Update Request</button>
                <button className="button styled-button">
                  Complete Request
                </button>
                <button className="button styled-button">Button 4</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
