import React, { useState } from "react";

export default function AddAttraction() {
  const [startOperatingHour, setStartOperatingHour] = useState("");
  const [endOperatingHour, setEndOperatingHour] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [capacity, setCapacity] = useState("");
  const [status, setStatus] = useState("Active");
  const [department, setDepartment] = useState("Attraction");

  const attractionTypes = ["Ride", "Show"]

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit data to backend or perform further processing
    const formData = {
        startOperatingHour,
        endOperatingHour,
        name,
        type,
        height,
        weight,
        capacity,
        status,
        department,
    };
    console.log(formData);
    alert("Attraction has been added");
  };

  return (
    <div className="row justify-content-center">
      <div className="col md-4 mb-4">
        <div className="card dataEntryForm">
          <div className="card-body">
            <h1 className="my-2 text-center" style={{ color: "#2F4858" }}>
              Add Attraction
            </h1>
            <form onSubmit={handleSubmit}>
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
                    required
                    value={startOperatingHour}
                    onChange={(e) => setStartOperatingHour(e.target.value)}
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
                    required
                    value={endOperatingHour}
                    onChange={(e) => setEndOperatingHour(e.target.value)}
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
                    placeholder="Twisted Waters"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    placeholder="Type to search..."
                    required
                    value={type}
                    onChange={(e) => setType(e.target.value)}
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
                    placeholder="4.0"
                    required
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
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
                    placeholder="355"
                    required
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
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
                    placeholder="1000"
                    required
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3 text-center">
                  <button id="button" type="submit" className="btn btn-primary">
                    Add Attraction
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
