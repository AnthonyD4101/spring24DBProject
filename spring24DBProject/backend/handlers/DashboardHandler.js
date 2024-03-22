const poolConnection = require("../server/database");
const url = require("url");

function handleGetEmployeeSupervisor(req, res) {
  const pathname = url.parse(req.url).pathname;
  const id = decodeURIComponent(pathname.substring("/getDashboard/".length));

  const query = "SELECT * FROM Employee WHERE UserID=?";
  poolConnection.query(query, [id], (error, results) => {
    if (error) {
      console.log("Database error:", error);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Server error" }));
      return;
    }

    const supUserID = results[0].SupUserID;

    poolConnection.query(query, [supUserID], (error, results) => {
      if (error) {
        console.log("Database error:", error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Server error" }));
        return;
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(results));
    });
  });
}

module.exports = {
  handleGetEmployeeSupervisor,
};
