const poolConnection = require("../server/database");
const url = require("url");

//Adds to Weather Log
function handleAddWeatherLog(req, res) {
  let requestBody = "";
  req.on("data", (chunk) => {
    requestBody += chunk.toString(); // Convert the chunk to string and append it to the body variable
  });

  req.on("end", () => {
    // Parse the body string to JSON
    const formData = JSON.parse(requestBody);
    const { userID, dateOfClosure, weatherType, reason } = formData;

    let errors = [];
    let errorFields = [];

    // Check if endOperatingHour is before startOperatingHour
    const curDate = new Date();
    const dateOfC = new Date(dateOfClosure);

    const closureYear = dateOfC.getFullYear();
    const closureMonth = dateOfC.getMonth();
    const closureDay = dateOfC.getDate()+1;

    const currentYear = curDate.getFullYear();
    const currentMonth = curDate.getMonth();
    const currentDay = curDate.getDate();

    if (
      closureYear < currentYear ||
      (closureYear === currentYear && closureMonth < currentMonth) ||
      (closureYear === currentYear &&
        closureMonth === currentMonth &&
        closureDay < currentDay)
    ) {
      errors.push("Cannot select a future date for field Date of Closure");
      errorFields.push("dateOfClosure");
    }

    if (
      weatherType !== "Rainy" &&
      weatherType !== "Tornado Alert" &&
      weatherType !== "Hurricane Alert" &&
      weatherType !== "Excessive Heat Watch" &&
      weatherType !== "Winter Storm" &&
      weatherType !== "Flooding" &&
      weatherType !== "Other"
    ) {
      errors.push(
        "Please select a valid weather type: Rainy, Tornado Alert, Hurricane Alert, Excessive Heat Watch, Winter Storm, Flooding, or Other"
      );
      errorFields.push("weatherType");
    }

    if (errors.length > 0) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ errors, errorFields }));
      return;
    }

    //Query the database to add the new attraction
    poolConnection.query(
      "INSERT INTO Weatherlog (UserID, DateOfClosure, WeatherType, Description) VALUES (?, ?, ?, ?)",
      [userID, dateOfClosure, weatherType, reason],
      (error, results) => {
        if (error) {
          console.log("Database error:", error);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Server error" }));
          return;
        }

        // Attraction added successfully
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Weather log added successfuly" }));
      }
    );
  });
}

module.exports = {
  handleAddWeatherLog,
};
