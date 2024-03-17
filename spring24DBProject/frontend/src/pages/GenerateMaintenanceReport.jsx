import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";

export default function MaintenanceDataReports() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [FilterBy, setFilterBy] = useState("all");
  const [maintenanceFilter, setMaintenanceFilter] = useState("");
  const [EmployeeFilter, setEmployeeFilter] = useState("");
  const [AttractionFilter, setAttractionFilter] = useState("");
  const [StatusFilter, setStatusFilter] = useState("");
  const [CostFilter, setCostFilter] = useState("");
  /*const [maintenanceIds, setMaintenanceIds] = useState([]);
  const [employeeIds, setEmployeeIds] = useState([]);
  const [attractionNames, setAttractionNames] = useState([]);
  const [reason, setReason] = useState(0);*/
  const [Status, setStatus] = useState();
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [maintenanceOptions, setMaintenanceOptions] = useState([]);
  const [attractionOptions, setAttractionOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);

  const costOptions = [
    "$0-$500",
    "$501-$1000",
    "$1001-$1500",
    "$1501-$2000",
    "$2001+",
  ];

  const handleClearForm = () => {
    setStartDate("");
    setEndDate("");
    setFilterBy("all");
    setMaintenanceFilter("");
    setEmployeeFilter("");
    setAttractionFilter("");
    setStatusFilter("");
    setMaintenanceData([]);
    setTotalCost(0);
  };

  const handleGenerateReport = () => {
    let filteredData = fetchedData.filter((item) => {
      // Filter by Start and End Date if selected
      const isStartDateMatch = startDate
        ? new Date(item.startDate) >= new Date(startDate)
        : true;
      const isEndDateMatch = endDate
        ? new Date(item.endDate) <= new Date(endDate)
        : true;

      // Additional filters based on form selection
      const isMaintenanceIdMatch = maintenanceFilter
        ? item.maintenanceIds.toString() === maintenanceFilter
        : true;
      const isEmployeeIdMatch = EmployeeFilter
        ? item.employeeIds.toString() === EmployeeFilter
        : true;
      const isAttractionNameMatch = AttractionFilter
        ? item.attractionNames === AttractionFilter
        : true;
      const isStatusMatch = StatusFilter ? item.Status === StatusFilter : true;
      const isCostMatch = CostFilter
        ? (([min, max]) => {
            const cost = parseFloat(item.totalCost);
            return cost >= min && (max === null || cost <= max);
          })(
            CostFilter.split("-").map((value, index, array) =>
              index === array.length - 1 && value.includes("+")
                ? [parseFloat(value), null]
                : parseFloat(value.replace(/\D/g, ""))
            )
          )
        : true;

      return (
        isStartDateMatch &&
        isEndDateMatch &&
        isMaintenanceIdMatch &&
        isEmployeeIdMatch &&
        isAttractionNameMatch &&
        isStatusMatch &&
        isCostMatch
      );
    });

    // Update state with the filtered data
    setMaintenanceData(filteredData);

    const total = filteredData.reduce((acc, curr) => acc + curr.totalCost, 0);
    setTotalCost(total);
  };

  const fetchedData = [
    {
      maintenanceIds: 123,
      employeeIds: 987,
      attractionNames: "Twister",
      startDate: "2024-03-10",
      endDate: "2024-03-16",
      Status: "Pending",
      totalCost: 1500,
      reason: "The ride was shaking too much",
    },
    {
      maintenanceIds: 814,
      employeeIds: 904,
      attractionNames: "Smile",
      startDate: "2023-11-07",
      endDate: "2023-11-12",
      Status: "Completed",
      totalCost: 1042.81,
      reason: "Mission behind to difficult leg.",
    },
    {
      maintenanceIds: 815,
      employeeIds: 905,
      attractionNames: "Joyride",
      startDate: "2023-11-10",
      endDate: "2023-11-14",
      Status: "Cancelled",
      totalCost: 1300.8,
      reason: "Unexpected repair needed.",
    },

    {
      maintenanceIds: 816,
      employeeIds: 906,
      attractionNames: "Thunderbolt",
      startDate: "2023-11-11",
      endDate: "2023-11-13",
      Status: "In Progress",
      totalCost: 1361.09,
      reason: "Enhancement for visitor experience.",
    },

    {
      maintenanceIds: 817,
      employeeIds: 907,
      attractionNames: "Merry-Go-Round",
      startDate: "2023-11-08",
      endDate: "2023-11-12",
      Status: "Completed",
      totalCost: 884.0,
      reason: "Unexpected repair needed.",
    },

    {
      maintenanceIds: 818,
      employeeIds: 908,
      attractionNames: "Sky High",
      startDate: "2023-11-10",
      endDate: "2023-11-15",
      Status: "Scheduled",
      totalCost: 1451.2,
      reason: "Safety inspection.",
    },

    {
      maintenanceIds: 819,
      employeeIds: 909,
      attractionNames: "Dreamland",
      startDate: "2023-11-08",
      endDate: "2023-11-10",
      Status: "Scheduled",
      totalCost: 1027.56,
      reason: "Damage repair due to weather.",
    },

    {
      maintenanceIds: 820,
      employeeIds: 910,
      attractionNames: "Adventure Falls",
      startDate: "2023-11-11",
      endDate: "2023-11-14",
      Status: "Cancelled",
      totalCost: 658.06,
      reason: "Damage repair due to weather.",
    },

    {
      maintenanceIds: 821,
      employeeIds: 911,
      attractionNames: "Splash Zone",
      startDate: "2023-11-08",
      endDate: "2023-11-14",
      Status: "In Progress",
      totalCost: 809.93,
      reason: "Operational efficiency improvement.",
    },

    {
      maintenanceIds: 822,
      employeeIds: 912,
      attractionNames: "Echo Cave",
      startDate: "2023-11-07",
      endDate: "2023-11-11",
      Status: "Cancelled",
      totalCost: 887.91,
      reason: "Enhancement for visitor experience.",
    },
  ];

  useEffect(() => {
    // Create a unique set of employeeIds to avoid duplicate options
    const uniqueEmployeeIds = Array.from(
      new Set(fetchedData.map((item) => item.employeeIds))
    );
    // Update employeeOptions state
    setEmployeeOptions(uniqueEmployeeIds);

    // Create a unique set of maintenanceIds to avoid duplicate options
    const uniqueMaintenanceIds = Array.from(
      new Set(fetchedData.map((item) => item.maintenanceIds))
    );
    // Update maintenanenceOptions state
    setMaintenanceOptions(uniqueMaintenanceIds);

    // Create a unique set of attractionNames to avoid duplicate options
    const uniqueAttractionNames = Array.from(
      new Set(fetchedData.map((item) => item.attractionNames))
    );
    // Update maintenanenceOptions state
    setAttractionOptions(uniqueAttractionNames);

    // Create a unique set of Status to avoid duplicate options
    const uniqueStatus = Array.from(
      new Set(fetchedData.map((item) => item.Status))
    );
    // Update maintenanenceOptions state
    setStatusOptions(uniqueStatus);
  }, [fetchedData]);

  return (
    <div className="maintenance-report-container">
      <h1>Maintenance Data Report Page</h1>
      <Form className="mt-3">
        <Form.Group controlId="startDate" className="mb-3">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="endDate" className="mb-3">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="FilterBy" className="mb-3">
          <Form.Label>Filter By</Form.Label>
          <Form.Select
            value={FilterBy}
            onChange={(e) => setFilterBy(e.target.value)}
          >
            <option value="all">All</option>
            <option value="Maintenance ID">Maintenance ID</option>
            <option value="Employee ID">Employee ID</option>
            <option value="Attraction Name">Attraction Name</option>
            <option value="Status">Status</option>
            <option value="Cost of Maintenance">Cost of Maintenance</option>
          </Form.Select>
        </Form.Group>

        {FilterBy === "Maintenance ID" && (
          <Form.Group controlId="MaintenanceFilter" className="mb-3">
            <Form.Label>Maintenance ID</Form.Label>
            <Form.Select
              value={maintenanceFilter}
              onChange={(e) => {
                setMaintenanceFilter(e.target.value);
                setEmployeeFilter(""); // Clear Employee Filter
                setAttractionFilter(""); // Clear Attraction Filter
                setStatusFilter(""); // Clear Status Filter
              }}
            >
              <option value="">Select Maintenance ID</option>
              {maintenanceOptions.length > 0 ? (
                maintenanceOptions.map((id) => (
                  <option key={id} value={id}>
                    {id}
                  </option>
                ))
              ) : (
                <option disabled>Loading options...</option>
              )}
            </Form.Select>
          </Form.Group>
        )}

        {FilterBy === "Employee ID" && (
          <Form.Group controlId="EmployeeFilter" className="mb-3">
            <Form.Label>Employee ID</Form.Label>
            <Form.Select
              value={EmployeeFilter}
              onChange={(e) => {
                setEmployeeFilter(e.target.value);
                setMaintenanceFilter(""); // Clear Maintenance Filter
                setAttractionFilter(""); // Clear Attraction Filter
                setStatusFilter(""); // Clear Status Filter
              }}
            >
              <option value="">Select Employee ID</option>
              {employeeOptions.length > 0 ? (
                employeeOptions.map((id) => (
                  <option key={id} value={id}>
                    {id}
                  </option>
                ))
              ) : (
                <option disabled>Loading options...</option>
              )}
            </Form.Select>
          </Form.Group>
        )}

        {FilterBy === "Attraction Name" && (
          <Form.Group controlId="AttractionFilter" className="mb-3">
            <Form.Label>Attraction ID</Form.Label>
            <Form.Select
              value={AttractionFilter}
              onChange={(e) => {
                setAttractionFilter(e.target.value);
                setMaintenanceFilter(""); // Clear Maintenance Filter
                setEmployeeFilter(""); // Clear Employee Filter
                setStatusFilter(""); // Clear Status Filter
              }}
            >
              <option value="">Select Attraction ID</option>
              {attractionOptions.length > 0 ? (
                attractionOptions.map((id) => (
                  <option key={id} value={id}>
                    {id}
                  </option>
                ))
              ) : (
                <option disabled>Loading options...</option>
              )}
            </Form.Select>
          </Form.Group>
        )}

        {FilterBy === "Status" && (
          <Form.Group controlId="StatusFilter" className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={StatusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setMaintenanceFilter(""); // Clear Maintenance Filter
                setEmployeeFilter(""); // Clear Employee Filter
                setAttractionFilter(""); // Clear Attraction Filter
              }}
            >
              <option value="">Select Status</option>
              {statusOptions.length > 0 ? (
                statusOptions.map((status, index) => (
                  <option key={index} value={status}>
                    {status}
                  </option>
                ))
              ) : (
                <option disabled>Loading options...</option>
              )}
            </Form.Select>
          </Form.Group>
        )}

        {FilterBy === "Cost of Maintenance" && (
          <Form.Group controlId="CostFilter" className="mb-3">
            <Form.Label>Cost Range</Form.Label>
            <Form.Select
              value={CostFilter}
              onChange={(e) => {
                setCostFilter(e.target.value);
                setMaintenanceFilter(""); // Clear Maintenance Filter
                setEmployeeFilter(""); // Clear Employee Filter
                setAttractionFilter(""); // Clear Attraction Filter
                setStatusFilter(""); // Clear Status Filter
              }}
            >
              <option value="">Select Cost Range</option>
              {costOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        )}

        <div className="d-flex justify-content-between">
          <Button
            variant="primary"
            onClick={handleGenerateReport}
            className="mb-3"
          >
            Generate Report
          </Button>
          <Button
            variant="link"
            onClick={handleClearForm}
            className="mb-3"
            style={{ textDecoration: "underline", color: "blue" }}
          >
            Clear Form
          </Button>
        </div>
      </Form>
      <hr />
      <h2>Report</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Maintenance ID</th>
            <th>Employee ID</th>
            <th>Attraction Name</th>
            <th>Start Date</th>
            <th>Completion Date</th>
            <th>Status</th>
            <th>Cost</th>
            <th>Reason for Request</th>
          </tr>
        </thead>
        <tbody>
          {maintenanceData.map((entry, index) => (
            <tr key={index}>
              <td>{entry.maintenanceIds}</td>
              <td>{entry.employeeIds}</td>
              <td>{entry.attractionNames}</td>
              <td>{entry.startDate}</td>
              <td>{entry.endDate}</td>
              <td>{entry.Status}</td>
              <td>${entry.totalCost.toFixed(2)}</td>
              <td>{entry.reason}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="6">
              <b>Total</b>
            </td>
            <td>
              <b>${totalCost.toFixed(2)}</b>
            </td>
            <td></td> {/* Assuming there's no total for reason */}
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
