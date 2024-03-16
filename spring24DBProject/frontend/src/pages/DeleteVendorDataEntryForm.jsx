import React, { useState } from "react";

export default function DeleteVendor() {
  const [vendorID, setVendorID] = useState("");
  const [status, setStatus] = useState("");

  const reasons = ["Out of Order", "Inactive"];

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      vendorID,
      status,
    };

    console.log(formData);
    alert("Vendor has been Deleted");
  };

  return (
    <div className="row justify-content-center">
      <div className="col md-4 mb-4">
        <div className="card dataEntryForm">
          <div className="card-body">
            <h1 className="my-2 text-center" style={{ color: "#2F4858" }}>
              Delete Vendor
            </h1>
            <div className="text-center">
              Please enter the Vendor ID of the Vendor you would like to
              delete.
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 mt-3">
                <label htmlFor="vendorID" className="form-label">
                  Vendor ID:
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
              <div className="mb-3 mt-3">
                <label htmlFor="status" className="form-label">
                  Reason:
                </label>
                <input
                  list="reasons"
                  className="form-control"
                  id="status"
                  name="status"
                  placeholder="Type to search..."
                  required
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                />
                <datalist id="reasons">
                  {reasons.map((status, index) => (
                    <option key={index} value={status} />
                  ))}
                </datalist>
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3 text-center">
                  <button id="button" type="submit" className="btn btn-primary">
                    Delete Vendor
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
