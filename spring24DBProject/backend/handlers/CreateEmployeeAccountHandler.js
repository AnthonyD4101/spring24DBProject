const poolConnection = require("../server/database");
const bcrypt = require("bcryptjs");

function handleEmployeeAccountSignUp(req, res, connection) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const {
      firstName,
      middleName,
      lastName,
      email,
      dateOfBirth,
      phoneNumber,
      password,
    } = JSON.parse(body);

    const accountType = "Employee";

    const hashedPassword = bcrypt.hashSync(password, 10);
    const query =
      "INSERT INTO Account (accountType, firstName, middleName, lastName, email, dateOfBirth, phoneNumber, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    poolConnection.query(
      query,
      [
        accountType,
        firstName,
        middleName,
        lastName,
        email,
        dateOfBirth,
        phoneNumber,
        hashedPassword,
      ],
      (error, results) => {
        if (error) {
          console.error("Error inserting user into the database:", error);
          res.writeHead(500, { "Content-Type": "application/json" });
          // Providing more specific error message based on known error codes
          const message =
            error.code === "ER_DUP_ENTRY"
              ? "Email already exists."
              : "Error creating user";
          res.end(JSON.stringify({ message }));
          return;
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            message: "User created successfully",
            userId: results.insertId,
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            email: email,
            dateOfBirth: dateOfBirth,
            phoneNumber: phoneNumber,
          })
        );
      }
    );
  });
}

module.exports = handleEmployeeAccountSignUp;
