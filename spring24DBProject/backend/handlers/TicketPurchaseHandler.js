const poolConnection = require("../server/database");

function handleTicketPurchase(req, res) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const {
      userID,
      totalPrice,
      ticketPrices,
      ticketDetails,
      purchaseDate
    } = JSON.parse(body);

    // Fetch products from the database
    const productQuery = "SELECT ItemID, NameOfItem FROM Product";
    poolConnection.query(productQuery, (productError, productResults) => {
      if (productError) {
        console.error("Error fetching products from the database:", productError);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Error processing ticket purchase" }));
        return;
      }
      
      const products = productResults; // Assign products array

      const saleQuery = "INSERT INTO Sale (UserID, DateTimeSold, TotalPrice) VALUES (?, ?, ?)";
      poolConnection.query(saleQuery, [userID, purchaseDate, totalPrice], (error, saleResults) => {
        if (error) {
          console.error("Error inserting sale into the database:", error);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Error processing ticket purchase" }));
        } else {
          const saleId = saleResults.insertId;

          const ticketQuery = "INSERT INTO Ticket (SaleID, TicketType, FoodItemID, MerchItemID, TicketPrice) VALUES (?, ?, ?, ?, ?)";
          ticketDetails.forEach((ticket, index) => {
            const { ticketType, foodBundle, merchBundle } = ticket;
            let foodItemID = null;
            let merchItemID = null;
            if (foodBundle !== "None") {
              const selectedFood = products.find((product) => product.NameOfItem === foodBundle);
              if (selectedFood) {
                foodItemID = selectedFood.ItemID;
              }
            }
            if (merchBundle !== "None") {
              const selectedMerch = products.find((product) => product.NameOfItem === merchBundle);
              if (selectedMerch) {
                merchItemID = selectedMerch.ItemID;
              }
            }
            const ticketPrice = ticketPrices[index];
            poolConnection.query(ticketQuery, [saleId, ticketType, foodItemID, merchItemID, ticketPrice], (error, ticketResults) => {
              if (error) {
                console.error("Error inserting ticket into the database:", error);
              }
            });
          });

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Ticket purchase processed successfully", saleId }));
        }
      });
    });
  });
}

module.exports = handleTicketPurchase;
