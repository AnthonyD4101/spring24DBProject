import React, { useState, useEffect } from "react";

export default function UpdateVendor() {
  const [vendorName, setVendorName] = useState("");
  const [vendorData, setVendorData] = useState(null);
  const [isSubmitted, setisSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const [vendors, setVendors] = useState(null);
  const [isSet, setIsSet] = useState(false);
  const [creationSuccess, setCreationSuccess] = useState(false);
  const [errors, setErrors] = useState([]);
  const [errorFields, setErrorFields] = useState([]);

  const vendorTypes = ["Concession Stand", "Gift Shop"];

  useEffect(() => {
    const fetchVendors = async () => {
      const response = await fetch("http://localhost:3001/getVendors", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();
      console.log(json);

      if (!response.ok) {
        console.log("Failed to fetch vendor data");
      }
      if (response.ok) {
        setVendors(json);
        setIsSet(true);
      }
    };

    fetchVendors();
  }, []);

  const handleSubmitOne = async (e) => {
    e.preventDefault();
    setVendorData(null);
    setisSubmitted(false);

    // Form submission logic
    console.log(vendorData);
    try {
      const response = await fetch(`http://localhost:3001/getVendor/${encodeURIComponent(vendorName)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();
      console.log(json);

      if (!response.ok) {
        console.log("Failed to fetch vendor data");
      }
      if (response.ok) {
        setAttractionData(json[0]);
        setisSubmitted(true);
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  const handleSubmitTwo = async (e) => {
    e.preventDefault();
    setCreationSuccess(false);
    // Form submission logic
    console.log(vendorData);
    alert("Vendor Information has been Updated");

    const formData = vendorData;
    try {
      const response = await fetch(`http://localhost:3001/updateVendor/${encodeURIComponent(vendorName)}`, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setErrors(json.errors);
        setErrorFields(json.errorFields);
      }
      if (response.ok) {
        setErrors([]);
        setErrorFields([]);
        setCreationSuccess(true);
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col md-4 mb-4">
        <div className="card dataEntryForm">
          <div className="card-body">
            <h1 className="my-2 text-center" style={{ color: "#2F4858" }}>
              Update Vendor
            </h1>
            <div className="text-center">
              Please enter the Name of the Vendor you would like to update.
            </div>
            <form onSubmit={handleSubmitOne}>
              <div className="mb-3 mt-3">
                <label htmlFor="vendorName" className="form-label">
                  Enter Vendor Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="vendorName"
                  name="vendorName"
                  //placeholder="12345"
                  maxLength="15"
                  required
                  value={vendorName}
                  onChange={(e) => setVendorName(e.target.value)}
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
                    <label htmlFor="name" className="form-label">
                      Name of Vendor:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={vendorData.name}
                      onChange={(e) =>
                        setVendorData({ ...vendorData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="type" className="form-label">
                      Vendor Type:
                    </label>
                    <input
                      list="types"
                      className="form-control"
                      id="type"
                      name="type"
                      placeholder="Type to search..."
                      value={vendorData.type}
                      onChange={(e) =>
                        setVendorData({ ...vendorData, type: e.target.value })
                      }
                    />
                    <datalist id="types">
                      {vendorTypes.map((type, index) => (
                        <option key={index} value={type} />
                      ))}
                    </datalist>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mt-6">
                  <div className="w-full px-3 text-center">
                    <button
                      id="button"
                      type="submit"
                      className="btn btn-primary"
                    >
                      Update Vendor
                    </button>
                  </div>
                </div>
                {errors.length>0 ?  (
                <ul className="error">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              ) : ""}
              </form>
            )}
            {creationSuccess && (
              <div className="alert alert-success my-3" role="alert">
                Vendor Updated Successfully!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
