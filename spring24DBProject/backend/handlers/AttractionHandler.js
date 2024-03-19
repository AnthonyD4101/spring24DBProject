const poolConnection = require('../server/database');
const url = require('url');

//Adds an attraction
function handleAddAttraction(req, res) {
  let requestBody = "";
  req.on("data", (chunk) => {
    requestBody += chunk.toString(); // Convert the chunk to string and append it to the body variable
  });

  req.on("end", () => {
    // Parse the body string to JSON
    const formData = JSON.parse(requestBody);
    const {
      startOperatingHour,
      endOperatingHour,
      name,
      type,
      height,
      weight,
      capacity,
      status,
      department,
    } = formData;

    let errors = [];
    let errorFields = [];

    // Check if endOperatingHour is before startOperatingHour
    if (startOperatingHour >= endOperatingHour) {
      errors.push("Start Operating Hour should be before End Operating Hour");
      errorFields.push("startOperatingHour");
      errorFields.push("endOperatingHour");
    }

    let open = "09:00";
    if (startOperatingHour < open) {
      errors.push(
        "Start Operating Hour cannot be before when the park opens: 9AM"
      );
      if (!errorFields.includes("startOperatingHour")) {
        errorFields.push("startOperatingHour");
      }
    }

    let end = "19:00";
    if (endOperatingHour > end) {
      errors.push(
        "End Operating Hour cannot be after when the park closes: 7PM"
      );
      if (!errorFields.includes("endOperatingHour")) {
        errorFields.push("endOperatingHour");
      }
    }

    if (type !== "Ride" && type !== "Show") {
      errors.push("Attraction Type must be either Ride or Show");
      errorFields.push("type");
    }

    if (height < 0) {
      errors.push("Height Requirement must be non-negative");
      errorFields.push("height");
    }

    if (weight < 0) {
      errors.push("Weight Requirement must be non-negative");
      errorFields.push("weight");
    }

    if (capacity < 0) {
      errors.push("Capacity must be non-negative");
      errorFields.push("capacity");
    }

    if (errors.length > 0) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ errors, errorFields }));
      return;
    }

    //Query the database to add the new attraction
    poolConnection.query(
      "INSERT INTO Attraction (NameOfAttraction, StartOperatingHour, EndOperatingHour, AttractionType, HeightRequirementInches, WeightRequirementPounds, Capacity, AttractionStatus, DepName) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        name,
        startOperatingHour,
        endOperatingHour,
        type,
        height,
        weight,
        capacity,
        status,
        department,
      ],
      (error, results) => {
        if (error) {
          console.log("Database error:", error);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Server error" }));
          return;
        }

        // Attraction added successfully
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Attraction added successfuly" }));
      }
    );
  });
}

//Retrieves all attractions
function handleGetAllAttractions(req, res) {
  //Query the database to get all attractions
  const query = "SELECT * FROM Attraction WHERE AttractionStatus=?";
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

//Retrieves a specific attraction
function handleGetAttraction(req, res) {
  //Query the database to get all attractions
  const pathname = url.parse(req.url).pathname;
  const name = decodeURIComponent(pathname.substring("/getAttraction/".length));

  const query = "SELECT * FROM Attraction WHERE AttractionStatus=? AND NameOfAttraction=?";
  poolConnection.query(query,
  ['Active', name], 
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

//Updates a specific attraction
function handleUpdateAttraction(req, res) {
  let requestBody = "";
  req.on("data", (chunk) => {
    requestBody += chunk.toString(); // Convert the chunk to string and append it to the body variable
  });

  req.on("end", () => {
    // Parse the body string to JSON
    const formData = JSON.parse(requestBody);
    const {
      StartOperatingHour,
      EndOperatingHour,
      NameOfAttraction,
      AttractionType,
      HeightRequirementInches,
      WeightRequirementPounds,
      Capacity,
      AttractionStatus,
      DepName,
    } = formData;

    let errors = [];
    let errorFields = [];

    // Check if endOperatingHour is before startOperatingHour
    if (StartOperatingHour >= EndOperatingHour) {
      errors.push("Start Operating Hour should be before End Operating Hour");
      errorFields.push("startOperatingHour");
      errorFields.push("endOperatingHour");
    }

    let open = "09:00";
    if (StartOperatingHour < open) {
      errors.push(
        "Start Operating Hour cannot be before when the park opens: 9AM"
      );
      if (!errorFields.includes("startOperatingHour")) {
        errorFields.push("startOperatingHour");
      }
    }

    let end = "19:00";
    if (EndOperatingHour > end) {
      errors.push(
        "End Operating Hour cannot be after when the park closes: 7PM"
      );
      if (!errorFields.includes("endOperatingHour")) {
        errorFields.push("endOperatingHour");
      }
    }

    if (AttractionType !== "Ride" && AttractionType !== "Show") {
      errors.push("Attraction Type must be either Ride or Show");
      errorFields.push("type");
    }

    if (HeightRequirementInches < 0) {
      errors.push("Height Requirement must be non-negative");
      errorFields.push("height");
    }

    if (WeightRequirementPounds < 0) {
      errors.push("Weight Requirement must be non-negative");
      errorFields.push("weight");
    }

    if (Capacity < 0) {
      errors.push("Capacity must be non-negative");
      errorFields.push("capacity");
    }

    if (errors.length > 0) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ errors, errorFields }));
      return;
    }

    //Query the database to add the new attraction
    const pathname = url.parse(req.url).pathname;
    const pname = decodeURIComponent(pathname.substring("/updateAttraction/".length));

    const query = "UPDATE Attraction SET NameofAttraction=?, StartOperatingHour=?, EndOperatingHour=?, AttractionType=?, HeightRequirementInches=?, WeightRequirementPounds=?, Capacity=? WHERE AttractionStatus=? AND NameOfAttraction=?";
    poolConnection.query(query,
      [
        NameOfAttraction,
        StartOperatingHour,
        EndOperatingHour,
        AttractionType,
        HeightRequirementInches,
        WeightRequirementPounds,
        Capacity,
        'Active',
        pname
      ],
      (error, results) => {
        if (error) {
          console.log("Database error:", error);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Server error" }));
          return;
        }

        // Attraction added successfully
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Attraction updated successfuly" }));
      }
    );
  });
}

//Updates the status of a specific attraction to 'Inactive'
function handleDeleteAttraction(req, res) {
  //Query the database to get all attractions
  const pathname = url.parse(req.url).pathname;
  const name = decodeURIComponent(pathname.substring("/deleteAttraction/".length));

  const query = "UPDATE Attraction SET AttractionStatus=? WHERE NameOfAttraction=? AND AttractionStatus=?";
  poolConnection.query(query,
  ['Inactive', name, 'Active'], 
  (error, results) => {
    if (error) {
      console.log("Database error:", error);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Server error" }));
      return;
    }

    // Attraction added successfully
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Attraction deleted successfuly" }));
  });
}

module.exports = {
  handleAddAttraction,
  handleGetAllAttractions,
  handleGetAttraction,
  handleUpdateAttraction,
  handleDeleteAttraction
};
