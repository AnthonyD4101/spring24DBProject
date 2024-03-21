const poolConnection = require("../server/database");
const bcrypt = require("bcryptjs");

function handleStaffSignIn(req, res) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const { email, password } = JSON.parse(body);

    // Query to select the user account
    const accountQuery = "SELECT * FROM Account WHERE email = ?";

    poolConnection.query(accountQuery, [email], (error, results) => {
      if (error || results.length === 0) {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Incorrect User ID or Password" }));
        return;
      }

      const user = results[0];
      const passwordIsValid = bcrypt.compareSync(password, user.Password);

      if (!passwordIsValid) {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Incorrect User ID or Password" }));
        return;
      }

      // Query to select the employee's position using UserID
      const positionQuery = "SELECT position FROM Employee WHERE UserID = ?";

      poolConnection.query(
        positionQuery,
        [user.UserID],
        (error, positionResults) => {
          if (error || positionResults.length === 0) {
            // Handle the error or case where the employee does not have a position recorded
            console.error("Error fetching employee position", error);
            // Optionally send a response indicating the issue, or proceed without the position.
          }

          const position =
            positionResults.length > 0
              ? positionResults[0].position
              : "Not specified";

          // Sending the response with the position included
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              message: "Authentication successful",
              userID: user.UserID,
              firstName: user.FirstName,
              lastName: user.LastName,
              email: user.Email,
              accountType: user.AccountType,
              phoneNumber: user.PhoneNumber,
              position: position,
            })
          );
        }
      );
    });
  });
}

module.exports = handleStaffSignIn;
