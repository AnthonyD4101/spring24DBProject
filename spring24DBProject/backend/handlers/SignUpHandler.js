const poolConnection = require('../server/database');
const bcrypt = require("bcryptjs");

function handleSignUp(req, res, connection) {
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

    const accountType = "Customer";

    const hashedPassword = bcrypt.hashSync(password, 10);
    const accountQuery =
      "INSERT INTO Account (accountType, firstName, middleName, lastName, email, dateOfBirth, phoneNumber, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const customerQuery =
      "INSERT INTO Customer (UserID, FirstName, LastName, DateOfBirth) VALUES (?, ?, ?, ?)";

    poolConnection.query(
      accountQuery,
      [accountType, firstName, middleName, lastName, email, dateOfBirth, phoneNumber, hashedPassword],
      (error, results) => {
        if (error) {
          console.error("Error inserting user into the database:", error);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Error creating user" }));
          return;
        }

        const userId = results.insertId;

        poolConnection.query(
          customerQuery,
          [userId, firstName, lastName, dateOfBirth],
          (error, results) => {
            if (error) {
              console.error("Error inserting customer into the database:", error);
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ message: "Error creating user" }));
              return;
            }

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({
                message: "User created successfully",
                userId: userId,
              })
            );
          }
        );
      }
    );
  });
}

module.exports = handleSignUp;
