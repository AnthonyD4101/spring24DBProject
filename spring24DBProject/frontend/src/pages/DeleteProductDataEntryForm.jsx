import React, { useState, useEffect } from "react";

export default function DeleteProduct() {
  const [productID, setProductID] = useState("");
  const [status, setStatus] = useState("");

  const [products, setProducts] = useState(null);
  const [isSet, setIsSet] = useState(false);
  const [creationSuccess, setCreationSuccess] = useState(false);


  const reasons = ["Out of Order", "Inactive"];

  useEffect(() => {
    // Fetch product data from your backend based on the productID to be implemented later (backend)
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:3001/getProducts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();
      console.log(json);

      if (!response.ok) {
        console.log("Failed to fetch product data");
      }
      if (response.ok) {
        setProducts(json);
        setIsSet(true);
      }
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setCreationSuccess(false);

    const formData = {
      productID,
      status,
    };

    try {
      const response = await fetch(`http://localhost:3001/deleteProduct/${encodeURIComponent(productID)}`, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (!response.ok) {
        console.log(`Error: ${response.message}`)
      }
      if (response.ok) {
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
              Delete Product
            </h1>
            <div className="text-center">
              Please enter the Product ID of the Product you would like to
              delete.
            </div>
            {isSet && (
            <form onSubmit={handleSubmit}>
              <div className="mb-3 mt-3">
                <label htmlFor="productID" className="form-label">
                  Product ID:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="productID"
                  name="productID"
                  placeholder="12345"
                  maxLength="10"
                  required
                  value={productID}
                  onChange={(e) => setProductID(e.target.value)}
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
                    Delete Product
                  </button>
                </div>
              </div>
            </form>)}

            {creationSuccess && (
              <div className="alert alert-success my-3" role="alert">
                Product Deleted Successfully!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
