const poolConnection = require("../server/database");

function fetchMaintenanceInfo(req, res) {
  const query = `SELECT * FROM Maintenance`;

  poolConnection.query(query, (error, results) => {
    if (error) {
      console.error("Failed to fetch maintenance info:", error);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Failed to fetch maintenance info" }));
      return;
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(results));
  });
}

module.exports = fetchMaintenanceInfo;
