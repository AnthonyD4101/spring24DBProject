const poolConnection = require('../server/database')
const bcrypt = require("bcryptjs");

function handleSignUp(req, res, connection) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const { firstName, middleName, lastName, email, phoneNumber, password } =
      JSON.parse(body);

    // Add server-side password strength validation if necessary

    const hashedPassword = bcrypt.hashSync(password, 10);
    const query =
      "INSERT INTO Account (firstName, middleName, lastName, email, phoneNumber, password) VALUES (?, ?, ?, ?, ?, ?)";

    poolConnection.query(
      query,
      [firstName, middleName, lastName, email, phoneNumber, hashedPassword],
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