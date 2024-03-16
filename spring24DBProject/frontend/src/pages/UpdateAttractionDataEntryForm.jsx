import React, { useState, useEffect } from "react";

export default function UpdateAttraction() {
  const [attractionID, setAttractionID] = useState("");
  const [attractionData, setAttractionData] = useState(null);
  const [isSubmitted, setisSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const attractionTypes = ["Ride", "Show"]

  useEffect(() => {
    if (attractionID) {
      /* Fetch attraction data from your backend based on the attractionID to be implemented later (backend)
      fetch(`your_api_endpoint/${attractionID}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to fetch attraction data");
          }
        })
        .then((data) => setAttractionData(data))
        .catch((error) => setError(error.message));*/

      setAttractionData({
        startOperatingHour: "09:00",
        endOperatingHour: "17:00",
        name: "Twisted Waters",
        type: "Ride",
        height: "4.0",
        weight: "355",
        capacity: "1000",
        status: "Active",
        department: "Attraction",
      });
    }
  }, [attractionID]);

  const handleSubmitOne = (e) => {
    e.preventDefault();
    setisSubmitted(true);
    // Form submission logic
    console.log(attractionData);
  };

  const handleSubmitTwo = (e) => {
    e.preventDefault();
    // Form submission logic
    console.log(attractionData);
    alert("Attraction Information has been Updated");
  };

  return (
    <div className="row justify-content-center">
      <div className="col md-4 mb-4">
        <div className="card dataEntryForm">
          <div className="card-body">
            <h1 className="my-2 text-center" style={{ color: "#2F4858" }}>
              Update Attraction
            </h1>
            <div className="text-center">
              Please enter the Attraction ID of the Attraction you would like to
              update.
            </div>
            <form onSubmit={handleSubmitOne}>
              <div className="mb-3 mt-3">
                <label htmlFor="attractionID" className="form-label">
                  Enter Attraction ID:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="attractionID"
                  name="attractionID"
                  placeholder="12345"
                  maxLength="10"
                  required
                  value={attractionID}
                  onChange={(e) => setAttractionID(e.target.value)}
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
                    <label htmlFor="startOH" className="form-label">
                      Start Operating Hour:
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="startOH"
                      name="startOH"
                      value={attractionData.startOperatingHour}
                      onChange={(e) => setAttractionData({...attractionData, startOperatingHour: e.target.value,})}
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="endOH" className="form-label">
                      End Operating Hour:
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="endOH"
                      name="endOH"
                      value={attractionData.endOperatingHour}
                      onChange={(e) => setAttractionData({...attractionData, endOperatingHour: e.target.value,})}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="name" className="form-label">
                      Name of Attraction:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={attractionData.name}
                      onChange={(e) => setAttractionData({...attractionData, name: e.target.value,})}
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="type" className="form-label">
                      Attraction Type:
                    </label>
                    <input
                      list="types"
                      className="form-control"
                      id="type"
                      name="type"
                      value={attractionData.type}
                      onChange={(e) => setAttractionData({...attractionData, type: e.target.value,})}
                    />
                    <datalist id="types">
                      {attractionTypes.map((type, index) => (
                        <option key={index} value={type} />
                      ))}
                    </datalist>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="height" className="form-label">
                      Height Requirement in Feet (Enter 0 if no Height Requirement):
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="height"
                      name="height"
                      value={attractionData.height}
                      onChange={(e) => setAttractionData({...attractionData, height: e.target.value,})}
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="weight" className="form-label">
                      Weight Limit in Pounds (Enter 0 if no Weight Limit):
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="weight"
                      name="weight"
                      value={attractionData.weight}
                      onChange={(e) => setAttractionData({...attractionData, weight: e.target.value,})}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="capacity" className="form-label">
                      Attraction Capacity:
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="capacity"
                      name="capacity"
                      value={attractionData.capacity}
                      onChange={(e) => setAttractionData({...attractionData, capacity: e.target.value,})}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mt-6">
                  <div className="w-full px-3 text-center">
                    <button id="button" type="submit" className="btn btn-primary">
                      Update Attraction
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
