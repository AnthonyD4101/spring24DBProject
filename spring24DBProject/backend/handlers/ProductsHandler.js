const poolConnection = require('../server/database');

function handleGetAllProducts(req, res) {
  const query = `SELECT p.*, v.VendorType
                 FROM Product p
                INNER JOIN Vendor v ON p.NameOfVendor = v.NameOfVendor
                WHERE p.ProductStatus = ?`;
  poolConnection.query(query,
  ['Active'], 
  (error, results) => {
    if (error) {
      console.log("Database error:", error);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Server error" }));
      return;
    }

    // Attraction added successfully
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(results));
  });
}

module.exports = {
    handleGetAllProducts
  };