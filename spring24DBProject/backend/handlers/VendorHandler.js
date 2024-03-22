const poolConnection = require('../server/database');
const url = require('url');

//Add a vendor
function handleAddVendor(req,res){
    let requestBody = "";
    req.on("data", (chunk) => {
        requestBody += chunk.toString(); // Convert the chunk to string and append it to the body variable
    });

    req.on("end", () => {
        try{
            // Parse the body string to JSON
            const formData = JSON.parse(requestBody);
            const {
                name,
                type,
                status,//
                department,//
            } = formData;

            let errors = [];
            let errorFields = [];

            if (!name) {
                errors.push("Name is required.");
                errorFields.push("name");
            }

            if (!type) {
                errors.push("Type is required.");
                errorFields.push("type");
            }

            if(errors.length > 0){
                // Respond with error messages
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ errors, errorFields }));
            } else{
                //Query the database to add the new vendor
                poolConnection.query(
                    "INSERT INTO Vendor (NameOfVendor, VendorType, VendorStatus, DepName) VALUES (?, ?, ?, ?)",
                    [
                        name,
                        type,
                        status, //active 
                        department, //vendor
                    ],
                    (error, results, fields) => {
                        if (error) {
                            // Handle database query error
                            console.error("Database error:", error);
                            res.writeHead(500, { "Content-Type": "application/json" });
                            res.end(JSON.stringify({ error: "An error occurred while adding the vendor." }));
                        } else {
                            // Vendor added successfully
                            res.writeHead(200, { "Content-Type": "application/json" });
                            res.end(JSON.stringify({ message: "Vendor added successfully." }));
                        }
                    }
                );
            }
        } catch(error){
            // Handle parsing error or other unexpected errors
            console.error("Error processing request:", error);
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "An unexpected error occurred." }));
        }

    });
}

//Retrieves all vendors
function handleGetAllVendors(req,res){
    //Query the database to get all vendors
    const query = "SELECT * FROM Vendor WHERE VendorStatus=?";
    poolConnection.query(query,
        ['Active'], 
        (error, results) => {
          if (error) {
            console.log("Database error:", error);
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Server error" }));
            return;
          }
      
          // Vendor added successfully
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(results));
        });
}

//Retrieves a specific vendor
function handleGetVendor(req, res){
    try {
        // Extract vendor name from the URL path
        const pathname = url.parse(req.url).pathname;
        const name = decodeURIComponent(pathname.substring("/getVendor/".length));

        // Query the database to get a vendor
        const query = "SELECT * FROM Vendor WHERE NameOfVendor=?";
        poolConnection.query(query, [name], (error, results) => {
            if (error) {
                console.error("Database error:", error);
                res.statusCode = 500;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ message: "Server error" }));
            } else {
                if (results.length === 0) {
                    res.statusCode = 404;
                    res.setHeader("Content-Type", "application/json");
                    res.end(JSON.stringify({ message: "Vendor not found" }));
                } else {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.end(JSON.stringify(results));
                }
            }
        });
    } catch (error) {
        console.error("Error processing request:", error);
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "An unexpected error occurred" }));
    }
}

function handleUpdateVendor(req, res) {
    let requestBody = "";
    req.on("data", (chunk) => {
        requestBody += chunk.toString(); // Convert the chunk to string and append it to the body variable
    });

    req.on("end", () => {
        const formData = JSON.parse(requestBody);
        const {
            name
        } = formData;
        let errors = [];
        let errorFields = [];

    if(!name)
    {
        errors.push("Name is required");
        errorFields.push("name");
    }
    /*if(!pname)
    {
        errors.push("Name is required.");
        errorFields.push("pname");
    }*/
    if (errors.length > 0) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ errors, errorFields }));
      return;
    }

    //Query the database to add the new vendor
    const pathname = url.parse(req.url).pathname;
    const pname1 = decodeURIComponent(pathname.substring("/updateVendor/".length));
    const query = "UPDATE Vendor SET NameOfVendor=? WHERE NameOfVendor=?";
    poolConnection.query(query,
      [
        name,
        pname1
      ],
      (error, results) => {
        if (error) {
          console.log("Database error:", error);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Server error" }));
          return;
        }

        // Vendor updated successfully
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Vendor updated successfully" }));
      }
    );
  });

}

function handleDeleteVendor(req, res) {
//Query the database to get all vendors
const pathname = url.parse(req.url).pathname;
const name = decodeURIComponent(pathname.substring("/deleteVendor/".length));

const query = "UPDATE Vendor SET VendorStatus=? WHERE NameOfVendor=? AND VendorStatus=?";
poolConnection.query(query,
['Inactive', name, 'Active'], 
(error, results) => {
  if (error) {
    console.log("Database error:", error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Server error" }));
    return;
  }

  // Vendor added successfully
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Vendor deleted successfully" }));
});
}

module.exports = {
    handleAddVendor,
    handleGetAllVendors,
    handleGetVendor,
    handleUpdateVendor,
    handleDeleteVendor
};