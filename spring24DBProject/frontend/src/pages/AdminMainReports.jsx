import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Ensure you've installed axios for fetching

export default function AdminMainReports() {
  const navigate = useNavigate();
  const maintenanceRequests = [
    { id: 1, name: "Request A" },
    { id: 2, name: "Request B" },
    { id: 3, name: "Request C" },
    { id: 4, name: "Request D" },
    // Add more objects as needed
  ];
  /*const [maintenanceRequests, setMaintenanceRequests] = useState([]);

  useEffect(() => {
    fetchMaintenanceRequests();
  }, []);

  const fetchMaintenanceRequests = async () => {
    try {
      const response = await axios.get("/api/maintenance-requests"); // Adjust the URL to your API endpoint
      setMaintenanceRequests(response.data);
    } catch (error) {
      console.error("Error fetching maintenance requests:", error);
      // Handle the error appropriately in your application
    }
  };*/

  const handleClickNewRequest = () => {
    navigate("/adminLanding/maintenanceRequestForm");
  };
  const handleClickUpdateRequest = () => {
    navigate("/adminLanding/maintenanceUpdateRequest");
  };
  const handleClickCompleteRequest = () => {
    navigate("/adminLanding/maintenanceCompleteRequest");
  };
  const handleClickGenerateReport = () => {
    navigate("/adminLanding/GenerateMaintenanceReport");
  };

  return (
    <>
      <div className="row">
        <div className="col-1 col-md-5">
          <div className="card">
            <div className="card-body">
              <h1 className="my-4 text-center" style={{ color: "#2F4858" }}>
                Current Requests
              </h1>

              <ul className="list-group">
                {maintenanceRequests.map((request) => (
                  <li key={request.id} className="list-group-item">
                    {request.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-9 col-md-7">
          <div className="blank-card">
            <div className="blank-card-body d-flex flex-column align-items-center">
              <button
                className="button styled-button"
                onClick={handleClickNewRequest}
              >
                New Request
              </button>
              <button
                className="button styled-button"
                onClick={handleClickUpdateRequest}
              >
                Update Request
              </button>
              <button
                className="button styled-button"
                onClick={handleClickCompleteRequest}
              >
                Complete Request
              </button>
              <button
                className="button styled-button"
                onClick={handleClickGenerateReport}
              >
                Generate Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
