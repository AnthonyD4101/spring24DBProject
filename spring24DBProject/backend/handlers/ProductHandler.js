const poolConnection = require('../server/database');
const url = require('url');

//Adds a product
function handleAddProduct(req, res) {
  let requestBody = "";
  req.on("data", (chunk) => {
    requestBody += chunk.toString(); // Convert the chunk to string and append it to the body variable
  });

  req.on("end", () => {
    // Parse the body string to JSON
    const formData = JSON.parse(requestBody);
    const {
      name,
      vendor,
      acquisitionCost,
      price,
      description,
      status,
    } = formData;

    let errors = [];
    let errorFields = [];

    let profit = price - acquisitionCost;

    if (name.length > 30) {
      errors.push("Name must be 30 characters or less");
      errorFields.push("name");
    }

    if (vendor.length > 30) {
      errors.push("Vendor name must be 30 characters or less");
      errorFields.push("vendor");
    }

    if (acquisitionCost < 0) {
      errors.push("Shipment Cost must be non-negative");
      errorFields.push("acquisitionCost");
    }


    if (price < 0) {
      errors.push("Sell Price must be non-negative");
      errorFields.push("price");
    }


    if (profit < 0) {
      errors.push("Profit must be non-negative");
      errorFields.push("profit");
    }


    if (errors.length > 0) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ errors, errorFields }));
      return;
    }

    //Query the database to add the new product
    poolConnection.query(
      "INSERT INTO Product (NameOfItem, NameOfVendor, AcquisitionCost, SalePrice, Profit, Description, ProductStatus) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        name,
        vendor,
        acquisitionCost,
        price,
        profit,
        description,
        status,
      ],
      (error, results) => {
        if (error) {
          console.log("Database error:", error);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Server error" }));
          return;
        }

        // Product added successfully
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Product added successfuly" }));
      }
    );
  });
}

//Retrieves all products
function handleGetAllProducts(req, res) {
  //Query the database to get all products
  const query = "SELECT * FROM Product WHERE ProductStatus=?";
  poolConnection.query(query,
  ['Active'], 
  (error, results) => {
    if (error) {
      console.log("Database error:", error);
      res.writeHead(500, { "Content-Type": "product/json" });
      res.end(JSON.stringify({ message: "Server error" }));
      return;
    }

    // Product added successfully
    res.writeHead(200, { "Content-Type": "product/json" });
    res.end(JSON.stringify(results));
  });
}

//Retrieves a specific product
function handleGetProduct(req, res) {
  //Query the database to get all products
  const pathname = url.parse(req.url).pathname;
  const name = decodeURIComponent(pathname.substring("/getProduct/".length));

  const query = "SELECT * FROM Product WHERE ProductStatus=? AND ItemID=?";
  poolConnection.query(query,
  ['Active', name], 
  (error, results) => {
    if (error) {
      console.log("Database error:", error);
      res.writeHead(500, { "Content-Type": "product/json" });
      res.end(JSON.stringify({ message: "Server error" }));
      return;
    }

    // Product added successfully
    res.writeHead(200, { "Content-Type": "product/json" });
    res.end(JSON.stringify(results));
  });
}

//Updates a specific product
function handleUpdateProduct(req, res) {
  let requestBody = "";
  req.on("data", (chunk) => {
    requestBody += chunk.toString(); // Convert the chunk to string and append it to the body variable
  });

  req.on("end", () => {
    // Parse the body string to JSON
    const formData = JSON.parse(requestBody);
    const {
      ItemID, //ignored
      NameOfItem,
      NameOfVendor,
      AcquisitionCost,
      SalePrice,
      Profit, //ignored
      Description,
      ProductStatus,
    } = formData;

    

    let errors = [];
    let errorFields = [];

    let profit = SalePrice - AcquisitionCost;

    if (NameOfItem.length > 30) {
      errors.push("Name must be 30 characters or less");
      errorFields.push("name");
    }

    if (NameOfVendor.length > 30) {
      errors.push("Vendor name must be 30 characters or less");
      errorFields.push("vendor");
    }

    if (AcquisitionCost < 0) {
      errors.push("Shipment Cost must be non-negative");
      errorFields.push("acquisitionCost");
    }


    if (SalePrice < 0) {
      errors.push("Sell Price must be non-negative");
      errorFields.push("price");
    }


    if (profit < 0) {
      errors.push("Profit must be non-negative");
      errorFields.push("profit");
    }


    if (errors.length > 0) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ errors, errorFields }));
      return;
    }

    //Query the database to add the new product
    const pathname = url.parse(req.url).pathname;
    const pname = decodeURIComponent(pathname.substring("/updateProduct/".length));

    const query = "UPDATE Product SET NameOfItem=?, NameOfVendor=?, AcquisitionCost=?, SalePrice=?, Profit=?, Description=? WHERE ProductStatus=? AND ItemID=?";
    poolConnection.query(query,
      [
        NameOfItem, 
        NameOfVendor, 
        AcquisitionCost, 
        SalePrice, 
        profit,
        Description, 
        "Active",
        pname
      ],
      (error, results) => {
        if (error) {
          console.log("Database error:", error);
          res.writeHead(500, { "Content-Type": "product/json" });
          res.end(JSON.stringify({ message: "Server error" }));
          return;
        }

        // Product added successfully
        res.writeHead(200, { "Content-Type": "product/json" });
        res.end(JSON.stringify({ message: "Product updated successfuly" }));
      }
    );
  });
}

//Updates the status of a specific product to 'Inactive'
function handleDeleteProduct(req, res) {
  //Query the database to get all products
  const pathname = url.parse(req.url).pathname;
  const name = decodeURIComponent(pathname.substring("/deleteProduct/".length));

  const query = "UPDATE Product SET ProductStatus=? WHERE ItemID=? AND ProductStatus=?";
  poolConnection.query(query,
  ['Inactive', name, 'Active'], 
  (error, results) => {
    if (error) {
      console.log("Database error:", error);
      res.writeHead(500, { "Content-Type": "product/json" });
      res.end(JSON.stringify({ message: "Server error" }));
      return;
    }

    // Product added successfully
    res.writeHead(200, { "Content-Type": "product/json" });
    res.end(JSON.stringify({ message: "Product deleted successfully" }));
  });
}

module.exports = {
  handleAddProduct,
  handleGetAllProducts,
  handleGetProduct,
  handleUpdateProduct,
  handleDeleteProduct
};
