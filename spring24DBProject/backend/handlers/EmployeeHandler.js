const poolConnection = require("../server/database");
const bcrypt = require("bcryptjs");
const url = require("url");

//Add an account and employee
function handleAddEmployee(req, res) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const {
      firstName,
      middleName,
      lastName,
      dateOfBirth,
      phoneNumber,
      email,
      tempPassword,
      position,
      supervisorUserId,
      salary,
      department,
      scheduleType,
      street,
      city,
      state,
      zipcode,
      status,
    } = JSON.parse(body);

    let errors = [];
    let errorFields = [];

    const dob = new Date(dateOfBirth);
    const curDate = new Date();
    const age = Math.floor((curDate - dob) / (365.25 * 24 * 60 * 60 * 1000));
    if (age < 16) {
      errors.push(
        "Employee must be atleast 16 years old to work at Wonderland"
      );
      errorFields.push("dateOfBirth");
    }

    if (phoneNumber.length !== 10) {
      errors.push(
        "Please input a valid phone number, phone number must be 10 digits long"
      );
      errorFields.push("phoneNumber");
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(email)) {
      errors.push("Please input a valid email");
      errorFields.push("email");
    }

    if (
      position !== "Employee" &&
      position !== "Maintenance" &&
      position !== "Department Manager" &&
      position !== "Admin"
    ) {
      errors.push(
        "Please select a valid position: Employee, Maintenance, Department Manager, or Admin"
      );
      errorFields.push("position");
    }

    if (salary < 0) {
      errors.push("Salary must be a non-negative number");
      errorFields.push("salary");
    }

    if (scheduleType !== "First Shift" && scheduleType !== "Second Shift") {
      errors.push("Please select a valid Shift: First Shift or Second Shift");
      errorFields.push("shift");
    }

    const states = [
      "AL",
      "AK",
      "AZ",
      "AR",
      "CA",
      "CO",
      "CT",
      "DE",
      "DC",
      "FL",
      "GA",
      "HI",
      "ID",
      "IL",
      "IN",
      "IA",
      "KS",
      "KY",
      "LA",
      "ME",
      "MD",
      "MA",
      "MI",
      "MN",
      "MS",
      "MO",
      "MT",
      "NE",
      "NV",
      "NH",
      "NJ",
      "NM",
      "NY",
      "NC",
      "ND",
      "OH",
      "OK",
      "OR",
      "PA",
      "RI",
      "SC",
      "SD",
      "TN",
      "TX",
      "UT",
      "VT",
      "VA",
      "WA",
      "WV",
      "WI",
      "WY",
    ];
    if (!states.includes(state)) {
      errors.push("Please enter a valid state abbreviation");
      errorFields.push("state");
    }

    if (zipcode.length !== 5) {
      errors.push("Please enter a valid zip code, must be 5 digits long");
      errorFields.push("zipcode");
    }

    if (errors.length > 0) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ errors, errorFields }));
      return;
    }

    const hashedPassword = bcrypt.hashSync(tempPassword, 10);
    const accountQuery =
      "INSERT INTO Account (accountType, firstName, middleName, lastName, phoneNumber, dateOfBirth, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const employeeQuery =
      "INSERT INTO Employee (UserID, FirstName, LastName, PhoneNumber, Email, Position, SupUserID, Salary, Street, City, State, ZipCode, Status, DepName, ScheduleType) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    poolConnection.query(
      accountQuery,
      [
        position,
        firstName,
        middleName,
        lastName,
        phoneNumber,
        dateOfBirth,
        email,
        hashedPassword,
      ],
      (error, results) => {
        if (error) {
          console.error("Error inserting user into the database:", error);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Error creating user" }));
          return;
        }

        const userId = results.insertId;

        poolConnection.query(
          employeeQuery,
          [
            userId,
            firstName,
            lastName,
            phoneNumber,
            email,
            position,
            supervisorUserId,
            salary,
            street,
            city,
            state,
            zipcode,
            status,
            department,
            scheduleType,
          ],
          (error, results) => {
            if (error) {
              console.error(
                "Error inserting customer into the database:",
                error
              );
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ message: "Error creating user" }));
              return;
            }

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({
                message: "User created successfully",
                userId: userId,
              })
            );
          }
        );
      }
    );
  });
}

//Retrieves a specific employee
function handleGetEmployee(req, res) {
  const pathname = url.parse(req.url).pathname;
  const id = decodeURIComponent(pathname.substring("/getEmployee/".length));

  const query = "SELECT * FROM Employee WHERE UserID=?";
  poolConnection.query(query, [id], (error, results) => {
    if (error) {
      console.log("Database error:", error);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Server error" }));
      return;
    }

    // Employee retrieved successfully
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(results));
  });
}

//Retrieves a specific account
function handleGetAccount(req, res) {
  const pathname = url.parse(req.url).pathname;
  const id = decodeURIComponent(pathname.substring("/getAccount/".length));

  const query = "SELECT * FROM Account WHERE UserID=?";
  poolConnection.query(query, [id], (error, results) => {
    if (error) {
      console.log("Database error:", error);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Server error" }));
      return;
    }

    // Employee retrieved successfully
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(results));
  });
}

//Updates a specific account and employee
function handleUpdateEmployee(req, res) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString(); // Convert the chunk to string and append it to the body variable
  });

  req.on("end", () => {
    // Parse the body string to JSON
    const {
      UserID: userId,
      FirstName: firstName,
      MiddleName: middleName,
      LastName: lastName,
      DateOfBirth: dateOfBirth,
      PhoneNumber: phoneNumber,
      Email: email,
      position: position,
      SupUserID: supervisorUserId,
      Salary: salary,
      DepName: department,
      ScheduleType: scheduleType,
      Street: street,
      City: city,
      State: state,
      ZipCode: zipcode,
      Status: status,
    } = JSON.parse(body);

    let errors = [];
    let errorFields = [];

    const dob = new Date(dateOfBirth);
    const curDate = new Date();
    const age = Math.floor((curDate - dob) / (365.25 * 24 * 60 * 60 * 1000));
    if (age < 16) {
      errors.push(
        "Employee must be atleast 16 years old to work at Wonderland"
      );
      errorFields.push("dateOfBirth");
    }

    if (phoneNumber.length !== 10) {
      errors.push(
        "Please input a valid phone number, phone number must be 10 digits long"
      );
      errorFields.push("phoneNumber");
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(email)) {
      errors.push("Please input a valid email");
      errorFields.push("email");
    }

    if (
      position !== "Employee" &&
      position !== "Maintenance" &&
      position !== "Department Manager" &&
      position !== "Admin" &&
      position !== "Park Manager"
    ) {
      errors.push(
        "Please select a valid position: Employee, Maintenance, Department Manager, or Admin"
      );
      errorFields.push("position");
    }

    if (salary < 0) {
      errors.push("Salary must be a non-negative number");
      errorFields.push("salary");
    }

    if (scheduleType !== "First Shift" && scheduleType !== "Second Shift") {
      errors.push("Please select a valid Shift: First Shift or Second Shift");
      errorFields.push("shift");
    }

    const states = [
      "AL",
      "AK",
      "AZ",
      "AR",
      "CA",
      "CO",
      "CT",
      "DE",
      "DC",
      "FL",
      "GA",
      "HI",
      "ID",
      "IL",
      "IN",
      "IA",
      "KS",
      "KY",
      "LA",
      "ME",
      "MD",
      "MA",
      "MI",
      "MN",
      "MS",
      "MO",
      "MT",
      "NE",
      "NV",
      "NH",
      "NJ",
      "NM",
      "NY",
      "NC",
      "ND",
      "OH",
      "OK",
      "OR",
      "PA",
      "RI",
      "SC",
      "SD",
      "TN",
      "TX",
      "UT",
      "VT",
      "VA",
      "WA",
      "WV",
      "WI",
      "WY",
    ];
    if (!states.includes(state)) {
      errors.push("Please enter a valid state abbreviation");
      errorFields.push("state");
    }

    if (zipcode.length !== 5) {
      errors.push("Please enter a valid zip code, must be 5 digits long");
      errorFields.push("zipcode");
    }

    if (errors.length > 0) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ errors, errorFields }));
      return;
    }

    const accountQuery =
      "UPDATE Account SET AccountType=?, FirstName=?, MiddleName=?, LastName=?, PhoneNumber=?, DateOfBirth=?, Email=? WHERE UserID=?";
    const employeeQuery =
      "UPDATE Employee Set FirstName=?, LastName=?, PhoneNumber=?, Email=?, Position=?, SupUserID=?, Salary=?, Street=?, City=?, State=?, ZipCode=?, Status=?, DepName=?, ScheduleType=? WHERE UserID=?";
    poolConnection.query(
      accountQuery,
      [
        position,
        firstName,
        middleName,
        lastName,
        phoneNumber,
        dateOfBirth,
        email,
        userId,
      ],
      (error, results) => {
        if (error) {
          console.log("Database error:", error);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Server error" }));
          return;
        }

        poolConnection.query(
          employeeQuery,
          [
            firstName,
            lastName,
            phoneNumber,
            email,
            position,
            supervisorUserId,
            salary,
            street,
            city,
            state,
            zipcode,
            status,
            department,
            scheduleType,
            userId,
          ],
          (error, results) => {
            if (error) {
              console.error(
                "Error inserting customer into the database:",
                error
              );
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ message: "Error creating user" }));
              return;
            }

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({
                message: "Employee updated successfully",
                userId: userId,
              })
            );
          }
        );
      }
    );
  });
}

//Updates the status of a specific employee to 'Inactive'
function handleDeleteEmployee(req, res) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString(); // Convert the chunk to string and append it to the body variable
  });

  req.on("end", () => {
    // Parse the body string to JSON
    const { employeeID, status } = JSON.parse(body);

    const query = "UPDATE Employee SET Status=? WHERE UserID=?";
    poolConnection.query(query, [status, employeeID], (error, results) => {
      if (error) {
        console.log("Database error:", error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Server error" }));
        return;
      }

      // Attraction added successfully
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Employee deleted successfuly" }));
    });
  });
}

module.exports = {
  handleGetEmployee,
  handleGetAccount,
  handleUpdateEmployee,
  handleDeleteEmployee,
};
