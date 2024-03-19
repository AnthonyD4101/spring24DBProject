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
                //Query the database to add the new vendor
                poolConnection.query(
                    "INSERT INTO vendor (NameOfVendor, VendorType, VendorStatus, DepName) VALUES (?, ?, ?, ?)",
                    [
                        name,
                        type,
                        status,
                        department,
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






module.exports = {
    handleAddVendor
};