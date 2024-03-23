const poolConnection = require("../server/database");

function handleMaintenanceRequest(req, res) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const {
      userID,
      departmentName,
      attractionName,
      reasonForRequest,
      submissionDate,
      completionDate,
      maintenanceStatus,
      estimatedCost,
    } = JSON.parse(body);

    let stateID = 0;

    const query = `
      INSERT INTO Maintenance (UserID, DepName, NameOfAttraction, DescriptionOfRequest, Date, DateCompleted, MaintenanceStatus, Expense, StateID)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    poolConnection.query(
      query,
      [
        userID,
        departmentName,
        attractionName,
        reasonForRequest,
        submissionDate,
        completionDate,
        maintenanceStatus,
        estimatedCost,
        stateID,
      ],
      (error, results) => {
        if (error) {
          console.error("Failed to insert maintenance request:", error);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({ message: "Failed to submit maintenance request" })
          );
          return;
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            message: "Maintenance request submitted successfully",
          })
        );
      }
    );
  });
}

module.exports = handleMaintenanceRequest;
