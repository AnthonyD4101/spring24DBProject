const poolConnection = require("../server/database");
const url = require("url");

//Retrieves all departments
function handleGetAllDepartments(req, res) {
  //Query the database to get all attractions
  const query = "SELECT * FROM Department";
  poolConnection.query(query, (error, results) => {
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

function handleAddDepartment(req, res) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const { name, hoursWorked, mggrUserID } = JSON.parse(body);

    const departmentQuery =
      "INSERT INTO Department (DepName, HoursWorked, ManagerUserID) VALUES (?, ?, ?)";
    const employeeQuery =
      "UPDATE Employee as A, Employee as B SET A.position=?, A.DepName=?, A.SupUserID=B.UserID WHERE A.UserID=? AND B.position=?";

    poolConnection.query(
      departmentQuery,
      [name, hoursWorked, mggrUserID],
      (error, results) => {
        if (error) {
          console.error("Error inserting user into the database:", error);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Error creating user" }));
          return;
        }

        poolConnection.query(
          employeeQuery,
          ["Department Manager", name, mggrUserID, "Park Manager"],
          (error, results) => {
            if (error) {
              console.error(
                "Error updating manager information in the database:",
                error
              );
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(
                JSON.stringify({
                  message: "Error updating manager information in the database",
                })
              );
              return;
            }

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({
                message: "Manager Information Saved Successfully",
              })
            );
          }
        );
      }
    );
  });
}

function handleGetDepartment(req, res) {
  //Query the database to get all attractions
  const pathname = url.parse(req.url).pathname;
  const depName = decodeURIComponent(
    pathname.substring("/getDepartment/".length)
  );

  const query = "SELECT * FROM Department Where DepName=?";
  poolConnection.query(query, [depName], (error, results) => {
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

function handleUpdateDepartment(req, res) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString(); // Convert the chunk to string and append it to the body variable
  });

  req.on("end", () => {
    // Parse the body string to JSON
    const {
      DepName: depName,
      HoursWorked: hoursWorked,
      ManagerUserID: mggrUserID,
      OldManagerUserID: oldMggrUserID,
      newDepartment: newDepName,
      newPosition: newPosition,
      newSupID: newSupID,
    } = JSON.parse(body);

    console.log(depName, hoursWorked, mggrUserID);
    const pathname = url.parse(req.url).pathname;
    const depN = decodeURIComponent(
      pathname.substring("/updateDepartment/".length)
    );

    const departmentQuery =
      "UPDATE Department SET DepName=?, ManagerUserID=? WHERE DepName=?";
    const employeeQuery =
      "UPDATE Employee as A, Employee as B SET A.position=?, A.DepName=?, A.SupUserID=B.UserID WHERE A.UserID=? AND B.position=?";
    const updateEmployeeQuery =
      "Update Employee Set position=?, SupUserID=?, DepName=? WHERE UserID=?";
    poolConnection.query(
      departmentQuery,
      [depName, mggrUserID, depN],
      (error, results) => {
        if (error) {
          console.log("Database error:", error);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Server error" }));
          return;
        }

        if (mggrUserID !== oldMggrUserID) {
          poolConnection.query(
            employeeQuery,
            ["Department Manager", depN, mggrUserID, "Park Manager"],
            (error, results) => {
              if (error) {
                console.error("Error updating new manager information:", error);
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "Error creating manager" }));
                return;
              }

              poolConnection.query(
                updateEmployeeQuery,
                [newPosition, newSupID, newDepName, oldMggrUserID],
                (error, results) => {
                  if (error) {
                    console.error(
                      "Error updating new manager information:",
                      error
                    );
                    res.writeHead(500, { "Content-Type": "application/json" });
                    res.end(
                      JSON.stringify({ message: "Error creating manager" })
                    );
                    return;
                  }
                }
              );
            }
          );
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            message: "Department and Manager updated successfully",
          })
        );
      }
    );
  });
}

module.exports = {
  handleGetAllDepartments,
  handleAddDepartment,
  handleGetDepartment,
  handleUpdateDepartment,
};
