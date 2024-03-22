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
      status,
      department,
    } = JSON.parse(body);

    // Assuming your 'Employees' table columns match the variable names directly
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

    // Make sure to destructure the address object to get street, city, state, and zipcode
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
          res.end(JSON.stringify({ message: "Error adding employee" }));
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
