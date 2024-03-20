const poolConnection = require("../server/database");
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
          res.end(JSON.stringify({ message: "Error creating user" }));
          return;
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            message: "User created successfully",
            userId: results.insertId,
          })
        );
      }
    );
  });
}

module.exports = handleSignUp;
