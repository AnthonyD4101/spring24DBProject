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
                res.status(500).json({ message: "Server error" });
            } else {
                if (results.length === 0) {
                    res.status(404).json({ message: "Vendor not found" });
                } else {
                    res.status(200).json(results);
                }
            }
        });
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ message: "An unexpected error occurred" });
    }
}

function handleUpdateVendor(req, res) {
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
                status,
                department,
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
                //Query the database to update the vendor
                const pathname = url.parse(req.url).pathname;
                const pname = decodeURIComponent(pathname.substring("/updateVendor/".length));

                const query = "UPDATE Vendor SET NameOfVendor=?, VendorType=?, VendorStatus=? WHERE NameOfVendor=?";
                poolConnection.query(query,
                    [
                        name,
                        type,
                        status, //active 
                        'Vendor', //vendor
                    ],
                    (error, results, fields) => {
                        if (error) {
                            // Handle database query error
                            console.error("Database error:", error);
                            res.writeHead(500, { "Content-Type": "application/json" });
                            res.end(JSON.stringify({ error: "An error occurred while updating the vendor." }));
                        } else {
                            // Vendor updated successfully
                            res.writeHead(200, { "Content-Type": "application/json" });
                            res.end(JSON.stringify({ message: "Vendor updated successfully." }));
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

function handleDeleteVendor(req, res) {

    const vendorId = req.body.vendorId || req.query.vendorId;

    if (!vendorId) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Vendor ID is required." }));
    }

    // Query the database to delete the vendor
    poolConnection.query(
        "UPDATE Vendor SET VendorStatus=? WHERE NameOfVendor=? AND VendorStatus=?",
        ['Inactive',name,'Active'],
        (error, results, fields) => {
            if (error) {
                // Handle database query error
                console.error("Database error:", error);
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "An error occurred while deleting the vendor." }));
            } else {
                if (results.affectedRows > 0) {
                    // Vendor deleted successfully
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ message: "Vendor deleted successfully." }));
                } else {
                    // Vendor with the given ID not found
                    res.writeHead(404, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: "Vendor not found." }));
                }
            }
        }
    );
}








module.exports = {
    handleAddVendor,
    handleGetAllVendors,
    handleGetVendor,
    handleUpdateVendor,
    handleDeleteVendor
};