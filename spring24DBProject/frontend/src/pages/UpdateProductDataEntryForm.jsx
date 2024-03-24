import React, { useState, useEffect } from "react";

export default function UpdateProduct() {
  const [itemID, setItemID] = useState("");
  const [productData, setProductData] = useState(null);
  const [isSubmitted, setisSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const vendors = ["Adventure Bites Eatery", "Fantasy Finds Boutique"];
  
  const [products, setProducts] = useState(null);
  const [isSet, setIsSet] = useState(false);
  const [creationSuccess, setCreationSuccess] = useState(false);
  const [errors, setErrors] = useState([]);
  const [errorFields, setErrorFields] = useState([]);
  
  useEffect(() => {

    /*
    if (itemID) {
      /* Fetch product data from your backend based on the itemID to be implemented later (backend)
          fetch(`your_api_endpoint/${itemID}`)
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error("Failed to fetch product data");
              }
            })
            .then((data) => setProductData(data))
            .catch((error) => setError(error.message));*/
/*
      setProductData({
        name: "Pizza Delight Bundle",
        vendor: "Adventure Bites Eatery",
        acquisitionCost: "5.00",
        salePrice: "15.00",
        description: "This product includes two slices of pizza and a drink.",
        status: "Active",
      });
    }
    */
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
  },[]);// [itemID]);

  const handleSubmitOne = async (e) => {
    e.preventDefault();
    setProductData(null);
    setisSubmitted(false);
    // Form submission logic

    try {
      const response = await fetch(`http://localhost:3001/getProduct/${encodeURIComponent(itemID)}`, {
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
        setProductData(json[0]);
        setisSubmitted(true);
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  const handleSubmitTwo = async (e) => {
    e.preventDefault();
    setCreationSuccess(false);

    const formData = productData;

    try {
      const response = await fetch(`http://localhost:3001/updateProduct/${encodeURIComponent(itemID)}`, {
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
              Update Product
            </h1>
            <div className="text-center">
              Please enter the Product ID of the Product you would like to
              update.
            </div>

            {isSet && (
            <form onSubmit={handleSubmitOne}>
              <div className="mb-3 mt-3">
                <label htmlFor="itemID" className="form-label">
                  Enter Product ID:
                </label>
                <input
                  list="products"
                  type="number"
                  className="form-control"
                  id="itemID"
                  name="itemID"
                  placeholder="12345"
                  maxLength="10"
                  required
                  value={itemID}
                  onChange={(e) => setItemID(e.target.value)}
                />
                <datalist id="products">
                  {products.map((type, index) => (
                    <option key={index} value={type.ItemID} />
                  ))}
                </datalist>
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3 text-center">
                  <button id="button" type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </div>
            </form>)}

            {isSubmitted && (
              <form onSubmit={handleSubmitTwo}>
                <div className="row mb-3 mt-3">
                  <div className="col">
                    <label htmlFor="name" className="form-label">
                      Name of Product:
                    </label>
                    <input
                      type="text"
                      className={errorFields.includes("NameOfItem") ? "error form-control" : "form-control"}
                      id="name"
                      name="name"
                      value={productData.NameOfItem}
                      onChange={(e) =>
                        setProductData({ ...productData, NameOfItem: e.target.value })
                      }
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="vendor" className="form-label">
                      Select Vendor:
                    </label>
                    <input
                      list="vendors"
                      className={errorFields.includes("NameOfVendor") ? "error form-control" : "form-control"}
                      id="vendor"
                      name="vendor"
                      value={productData.NameOfVendor}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          NameOfVendor: e.target.value,
                        })
                      }
                    />
                    <datalist id="vendors">
                      {vendors.map((vendor, index) => (
                        <option key={index} value={vendor} />
                      ))}
                    </datalist>
                  </div>
                </div>
                <div className="row mb-3 mt-3">
                  <div className="col">
                    <label htmlFor="cost" className="form-label">
                      Acquisition Cost:
                    </label>
                    <input
                      type="number"
                      className={errorFields.includes("AcquisitionCost") ? "error form-control" : "form-control"}
                      id="cost"
                      name="cost"
                      value={productData.acquisitionCost}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          AcquisitionCost: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3 mt-3">
                  <div className="col">
                    <label htmlFor="price" className="form-label">
                      Sale Price:
                    </label>
                    <input
                      type="number"
                      className={errorFields.includes("SalePrice") ? "error form-control" : "form-control"}
                      id="price"
                      name="price"
                      placeholder="15.00"
                      required
                      value={productData.salePrice}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          SalePrice: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="desc" className="form-label">
                      Description of Product:
                    </label>
                    <textarea
                      className={errorFields.includes("Description") ? "error form-control" : "form-control"}
                      id="desc"
                      name="desc"
                      rows="5"
                      value={productData.description}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          Description: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mt-6">
                  <div className="w-full px-3 text-center">
                    <button
                      id="button"
                      type="submit"
                      className="btn btn-primary"
                    >
                      Update Product
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
                Product Updated Successfully!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
