const http = require("http");
const url = require("url");
const handleSignUp = require("../handlers/SignUpHandler");
const handleSignIn = require("../handlers/SignInHandler");
const handleEmployeeAccountSignUp = require("../handlers/CreateEmployeeAccountHandler");
const handleAddEmployee = require("../handlers/AddEmployeeHandler");
const handleStaffSignIn = require("../handlers/StaffSignInHandler");
const {
  handleAddAttraction,
  handleGetAllAttractions,
  handleGetAttraction,
  handleUpdateAttraction,
  handleDeleteAttraction,
} = require("../handlers/AttractionHandler");
const {
  handleGetEmployee,
  handleGetAccount,
  handleUpdateEmployee,
  handleDeleteEmployee,
} = require("../handlers/EmployeeHandler");
const {
  handleGetAllDepartments,
  handleAddDepartment,
  handleGetDepartment,
  handleUpdateDepartment,
} = require("../handlers/DepartmentHandler");
const {
  handleAddVendor,
  handleGetAllVendors,
  handleGetVendor,
  handleUpdateVendor,
  handleDeleteVendor,
} = require("../handlers/VendorHandler");
const { handleGetAllProducts } = require("../handlers/ProductsHandler");
const { handleAddWeatherLog } = require("../handlers/WeatherLogHandler");
const { handleGetEmployeeSupervisor } = require("../handlers/DashboardHandler");
const handleTicketPurchase = require("../handlers/TicketPurchaseHandler");
const handleMaintenanceRequest = require("../handlers/MaintenanceRequestFormHandler");
const fetchMaintenanceInfo = require("../handlers/FetchMaintenanceInfo");
const handleMaintenanceUpdateRequest = require("../handlers/MaintenanceUpdateRequestHandler");
const { handleGetRevenueReport } = require("../handlers/RevenueReportHandler");

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  if (
    req.method === "GET" &&
    url.parse(req.url).pathname === "/maintenanceInfo"
  ) {
    fetchMaintenanceInfo(req, res);
  } else if (
    req.method === "POST" &&
    url.parse(req.url).pathname === "/maintenanceUpdateRequest"
  ) {
    handleMaintenanceUpdateRequest(req, res);
  } else if (
    req.method === "POST" &&
    url.parse(req.url).pathname === "/maintenanceRequest"
  ) {
    handleMaintenanceRequest(req, res);
  } else if (
    req.method === "GET" &&
    url.parse(req.url).pathname === "/getAttractions"
  ) {
    handleGetAllAttractions(req, res);
  } else if (
    req.method === "GET" &&
    url.parse(req.url).pathname.match("^/getAttraction/.+")
  ) {
    handleGetAttraction(req, res);
  } else if (
    req.method === "GET" &&
    url.parse(req.url).pathname === "/getDepartments"
  ) {
    handleGetAllDepartments(req, res);
  } else if (
    req.method === "GET" &&
    url.parse(req.url).pathname === "/getRevenueReport"
  ) {
    handleGetRevenueReport(req, res);
  } else if (
    req.method === "GET" &&
    url.parse(req.url).pathname.match("^/getDepartment/.+")
  ) {
    handleGetDepartment(req, res);
  } else if (
    req.method === "GET" &&
    url.parse(req.url).pathname.match("^/getEmployee/.+")
  ) {
    handleGetEmployee(req, res);
  } else if (
    req.method === "GET" &&
    url.parse(req.url).pathname.match("^/getAccount/.+")
  ) {
    handleGetAccount(req, res);
  } else if (
    req.method === "GET" &&
    url.parse(req.url).pathname.match("^/getDashboard/.+")
  ) {
    handleGetEmployeeSupervisor(req, res);
  } else if (
    req.method === "POST" &&
    url.parse(req.url).pathname === "/signup"
  ) {
    handleSignUp(req, res);
  } else if (
    req.method === "POST" &&
    url.parse(req.url).pathname === "/signin"
  ) {
    handleSignIn(req, res);
  } else if (
    req.method === "POST" &&
    url.parse(req.url).pathname === "/addEmployee"
  ) {
    handleAddEmployee(req, res);
  } else if (
    req.method === "POST" &&
    url.parse(req.url).pathname === "/staffsignin"
  ) {
    handleStaffSignIn(req, res);
  } else if (
    req.method === "POST" &&
    url.parse(req.url).pathname === "/EmployeeAccountSignUp"
  ) {
    handleEmployeeAccountSignUp(req, res);
  } else if (
    req.method === "POST" &&
    url.parse(req.url).pathname === "/addAttraction"
  ) {
    handleAddAttraction(req, res);
  } else if (
    req.method === "POST" &&
    url.parse(req.url).pathname === "/addDepartment"
  ) {
    handleAddDepartment(req, res);
  } else if (
    req.method === "POST" &&
    url.parse(req.url).pathname === "/addWeatherLog"
  ) {
    handleAddWeatherLog(req, res);
  } else if (
    req.method === "PUT" &&
    url.parse(req.url).pathname.match("^/updateAttraction/.+")
  ) {
    handleUpdateAttraction(req, res);
  } else if (
    req.method === "PUT" &&
    url.parse(req.url).pathname.match("^/updateEmployee/.+")
  ) {
    handleUpdateEmployee(req, res);
  } else if (
    req.method === "PUT" &&
    url.parse(req.url).pathname.match("^/updateDepartment/.+")
  ) {
    handleUpdateDepartment(req, res);
  } else if (
    req.method === "PUT" &&
    url.parse(req.url).pathname.match("^/deleteAttraction/.+")
  ) {
    handleDeleteAttraction(req, res);
  } else if (
    req.method === "PUT" &&
    url.parse(req.url).pathname.match("^/deleteEmployee/.+")
  ) {
    handleDeleteEmployee(req, res);
  } else if (
    req.method === "POST" &&
    url.parse(req.url).pathname === "/addVendor"
  ) {
    handleAddVendor(req, res);
  } else if (
    req.method === "GET" &&
    url.parse(req.url).pathname === "/getVendors"
  ) {
    handleGetAllVendors(req, res);
  } else if (
    req.method === "GET" &&
    url.parse(req.url).pathname.match("^/getVendor/.+")
  ) {
    handleGetVendor(req, res);
  } else if (
    req.method === "PUT" &&
    url.parse(req.url).pathname.match("^/updateVendor/.+")
  ) {
    handleUpdateVendor(req, res);
  } else if (
    req.method === "PUT" &&
    url.parse(req.url).pathname.match("^/deleteVendor/.+")
  ) {
    handleDeleteVendor(req, res);
  } else if (
    req.method === "POST" &&
    url.parse(req.url).pathname === "/ticketPurchase"
  ) {
    handleTicketPurchase(req, res);
  } else if (
    req.method === "GET" &&
    url.parse(req.url).pathname === "/ticketPurchase"
  ) {
    handleGetAllProducts(req, res);
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

const PORT = process.env.DB_PORT;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
