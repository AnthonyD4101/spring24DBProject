const poolConnection = require("../server/database");

function handleMaintenanceUpdateRequest(req, res) {
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
      StateID,
      RequestID,
    } = JSON.parse(body);

    let incrementedStateID = StateID + 1;

    const query = `
  INSERT INTO Maintenance (UserID, DepName, NameOfAttraction, DescriptionOfRequest, Date, DateCompleted, MaintenanceStatus, Expense, StateID, RequestID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
        incrementedStateID,
        RequestID,
      ],
      (error, results) => {
        if (error) {
          console.error("Failed to insert maintenance request:", error);
          res.writeHead(500, { "Content-Type": "application/json" });

          if (error.code === "ER_DUP_ENTRY") {
            res.end(
              JSON.stringify({
                message:
                  "Please select the request with latest State ID to proceed.",
              })
            );
          } else {
            res.end(
              JSON.stringify({
                message: "Failed to submit maintenance request",
              })
            );
          }
          return;
        }

        console.log(
          `Maintenance request ${RequestID} updated successfully with new StateID: ${incrementedStateID}`
        );

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            message: "Maintenance request submitted successfully",
            RequestID,
            incrementedStateID,
          })
        );
      }
    );
  });
}

module.exports = handleMaintenanceUpdateRequest;
