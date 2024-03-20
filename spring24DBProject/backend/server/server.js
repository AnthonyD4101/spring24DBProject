const http = require('http');
const url = require('url');
const handleSignUp = require('../handlers/SignUpHandler');
const handleSignIn = require('../handlers/SignInHandler');
const handleEmployeeAccountSignUp = require("../handlers/CreateEmployeeAccountHandler");
const handleAddEmployee = require("../handlers/AddEmployeeHandler");
const handleStaffSignIn = require("../handlers/StaffSignInHandler");
const { handleAddAttraction, handleGetAllAttractions, handleGetAttraction, handleUpdateAttraction, handleDeleteAttraction } = require('../handlers/AttractionHandler');

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  if(req.method === "GET" && url.parse(req.url).pathname === "/getAttractions") {
    handleGetAllAttractions(req, res);
  } else if(req.method === "GET" && url.parse(req.url).pathname.match("^\/getAttraction\/.+")) {
    handleGetAttraction(req, res);
  } else if (req.method === "POST" && url.parse(req.url).pathname === "/signup") {
    handleSignUp(req, res);
  } else if(req.method === "POST" && url.parse(req.url).pathname === "/signin") {
    handleSignIn(req, res)
  } else if (req.method === "POST" && url.parse(req.url).pathname === "/addEmployee") {
    handleAddEmployee(req, res);
  } else if (req.method === "POST" && url.parse(req.url).pathname === "/staffsignin") {
    handleStaffSignIn(req, res);
  } else if (req.method === "POST" && url.parse(req.url).pathname === "/EmployeeAccountSignUp") {
    handleEmployeeAccountSignUp(req, res);
  } else if(req.method === "POST" && url.parse(req.url).pathname === "/addAttraction") {
    handleAddAttraction(req, res);
  } else if(req.method === "PUT" && url.parse(req.url).pathname.match("^\/updateAttraction\/.+")) {
    handleUpdateAttraction(req, res);
  } else if(req.method === "PUT" && url.parse(req.url).pathname.match("^\/deleteAttraction\/.+")) {
    handleDeleteAttraction(req, res);
  } else if (req.method === "POST" && url.parse(req.url).pathname === "/addEmployee") {
    handleAddEmployee(req, res);
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

const PORT = process.env.DB_PORT;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
