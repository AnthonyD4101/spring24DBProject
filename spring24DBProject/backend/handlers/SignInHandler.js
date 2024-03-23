const poolConnection = require("../server/database");
const bcrypt = require("bcryptjs");

function handleSignIn(req, res, connection) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const { email, password } = JSON.parse(body);

    const query = "SELECT * FROM Account WHERE email = ?";

    poolConnection.query(query, [email], (error, results) => {
      if (error || results.length === 0) {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Incorrect User ID or Password" }));
        return;
      }

      const user = results[0];
      const passwordIsValid = bcrypt.compareSync(password, user.Password);

      if (user.AccountType != "Customer") {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Please use Staff Log In Portal" }));
        return;
      }

      if (!passwordIsValid) {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Incorrect User ID or Password" }));
        return;
      }

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
        })
      );
    });
  });
}

module.exports = handleSignIn;
