const poolConnection = require('../server/database');
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

      if (!passwordIsValid) {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Incorrect User ID or Password" }));
        return;
      }

      // Modify or add token generation here if necessary for your authentication logic
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Authentication successful",
          firstName: user.FirstName,
          lastName: user.LastName
        })
      );
    });
  });
}

module.exports = handleSignIn;
