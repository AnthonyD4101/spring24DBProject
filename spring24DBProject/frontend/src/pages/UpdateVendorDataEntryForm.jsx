import React, { useState, useEffect } from "react";

export default function UpdateVendor() {
  const [vendorID, setVendorID] = useState("");
  const [vendorData, setVendorData] = useState(null);
  const [isSubmitted, setisSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const vendorTypes = ["Concession Stand", "Gift Shop"];

  useEffect(() => {
    if (vendorID) {
      /* Fetch vendor data from your backend based on the vendorID to be implemented later (backend)
      fetch(`your_api_endpoint/${vendorID}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to fetch vendor data");
          }
        })
        .then((data) => setVendorData(data))
        .catch((error) => setError(error.message));*/

      setVendorData({
        name: "Flowery Boutique",
        type: "Gift Shop",
        status: "Active",
        department: "Vendor",
      });
    }
  }, [vendorID]);

  const handleSubmitOne = (e) => {
    e.preventDefault();
    setisSubmitted(true);
    // Form submission logic
    console.log(vendorData);
  };

  const handleSubmitTwo = (e) => {
    e.preventDefault();
    // Form submission logic
    console.log(vendorData);
    alert("Vendor Information has been Updated");
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
              Please enter the Vendor ID of the Vendor you would like to update.
            </div>
            <form onSubmit={handleSubmitOne}>
              <div className="mb-3 mt-3">
                <label htmlFor="vendorID" className="form-label">
                  Enter Vendor ID:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="vendorID"
                  name="vendorID"
                  placeholder="12345"
                  maxLength="10"
                  required
                  value={vendorID}
                  onChange={(e) => setVendorID(e.target.value)}
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
              </form>
            )}
            {error && <div>Error: {error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
