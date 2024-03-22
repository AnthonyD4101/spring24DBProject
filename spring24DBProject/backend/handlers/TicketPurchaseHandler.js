const poolConnection = require('../server/database');

function handleTicketPurchase(req, res, connection) {
    let body = "";

    req.on("data", (chunk) => {
        body += chunk.toString();
    });

    req.on("end", () => {
        const ticketData = JSON.parse(body);
        const { tickets } = ticketData;

        // Loop through each ticket and insert sale data into the database
        tickets.forEach(ticket => {
            const { type, dateTimeSold } = ticket;
            const saleQuery = "INSERT INTO Sale (Type, DateTimeSold) VALUES (?, ?)";
            
            // Execute the sale query
            poolConnection.query(saleQuery, [type, dateTimeSold], (error, results) => {
                if (error) {
                    console.error("Error executing sale query:", error);
                    res.writeHead(500);
                    res.end("Internal Server Error");
                } else {
                    console.log("Sale data inserted successfully");
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ message: "Sale data inserted successfully" }));
                }
            });
        });
    });
}

module.exports = handleTicketPurchase;
