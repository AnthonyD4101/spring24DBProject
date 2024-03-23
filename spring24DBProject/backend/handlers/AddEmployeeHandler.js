const poolConnection = require("../server/database");

function handleAddEmployee(req, res) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const {
      userId,
      firstName,
      middleName,
      lastName,
      phoneNumber,
      email,
      position,
      supUserId,
      salary,
      address,
      department,
    } = JSON.parse(body);

    let status = "Active";

    const query = `
      INSERT INTO Employee (
        userId,
        firstName, 
        middleName, 
        lastName, 
        phoneNumber, 
        email, 
        position, 
        supUserId, 
        salary, 
        street, 
        city, 
        state, 
        zipcode, 
        status, 
        depName
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const { street, city, state, zipcode } = address;

    poolConnection.query(
      query,
      [
        userId,
        firstName,
        middleName,
        lastName,
        phoneNumber,
        email,
        position,
        supUserId,
        salary,
        street,
        city,
        state,
        zipcode,
        status,
        department,
      ],
      (error, results) => {
        if (error) {
          console.error("Error inserting employee into database:", error);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Error adding employee", status }));
          return;
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            message: "Employee added successfully",
            employeeId: results.insertId,
          })
        );
      }
    );
  });
}

module.exports = handleAddEmployee;
