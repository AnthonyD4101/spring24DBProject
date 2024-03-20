const poolConnection = require('../server/database');
const url = require('url');

//Retrieves all departments
function handleGetAllDepartments(req, res) {
    //Query the database to get all attractions
    const query = "SELECT * FROM Department";
    poolConnection.query(query,
    (error, results) => {
      if (error) {
        console.log("Database error:", error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Server error" }));
        return;
      }
  
      // Attraction added successfully
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(results));
    });
  }

  module.exports = {
    handleGetAllDepartments,
  }