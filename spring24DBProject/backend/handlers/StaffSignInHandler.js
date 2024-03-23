const poolConnection = require("../server/database");
const bcrypt = require("bcryptjs");

function handleStaffSignIn(req, res) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const { email, password } = JSON.parse(body);

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

      if (user.AccountType == "Customer") {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ message: "Please use Customer Log In Portal" })
        );
        return;
      }

      // Modified query to fetch position and depname
      const positionQuery =
        "SELECT position, depname FROM Employee WHERE UserID = ?";

      poolConnection.query(
        positionQuery,
        [user.UserID],
        (error, positionResults) => {
          if (error || positionResults.length === 0) {
            console.error(
              "Error fetching employee position and department name",
              error
            );
          }

          const employeeDetails =
            positionResults.length > 0
              ? positionResults[0]
              : { position: "Not specified", depname: "Not specified" };

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
              position: employeeDetails.position, // Included position
              depname: employeeDetails.depname, // Included depname
            })
          );
        }
      );
    });
  });
}

module.exports = handleStaffSignIn;
