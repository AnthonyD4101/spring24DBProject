import React, { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";

export default function RevenueDataReports() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [revenueSource, setRevenueSource] = useState("All");
  const [ticketType, setTicketType] = useState("NA");
  const [foodBundleType, setFoodBundleType] = useState("NA"); // New state for Food bundle type
  const [merchBundleType, setMerchBundleType] = useState("NA"); // New state for Merchandise bundle type
  const [revenueData, setRevenueData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const handleGenerateReport = () => {
    // Data fetching logic
    const fetchedData = [
      { date: "2024-03-10", source: "Tickets", type: "GA", revenue: 55 },
      { date: "2024-03-10", source: "Food", type: "AB", revenue: 15 },
      { date: "2024-03-10", source: "Food", type: "DF", revenue: 25 },
      { date: "2024-03-10", source: "Merchandise", type: "FF", revenue: 15 },
      { date: "2024-03-11", source: "Merchandise", type: "MM", revenue: 20 },
      { date: "2024-03-12", source: "Tickets", type: "KI", revenue: 35 },
      { date: "2024-03-12", source: "Food", type: "GG", revenue: 20 },
      { date: "2024-03-12", source: "Merchandise", type: "EE", revenue: 25 },
    ];

    // Filter fetched data based on date range and revenue source
    let filteredData = [...fetchedData];
    if (revenueSource !== "All") {
      filteredData = filteredData.filter(
        (entry) => entry.source === revenueSource
      );
    }

    if (revenueSource === "Tickets" && ticketType !== "NA") {
      filteredData = filteredData.filter((entry) => entry.type === ticketType);
    } else if (revenueSource === "Food" && foodBundleType !== "NA") {
      filteredData = filteredData.filter(
        (entry) => entry.type === foodBundleType
      );
    } else if (revenueSource === "Merchandise" && merchBundleType !== "NA") {
      filteredData = filteredData.filter(
        (entry) => entry.type === merchBundleType
      );
    }

    // Calculate total revenue
    const total = filteredData.reduce((acc, curr) => acc + curr.revenue, 0);
    setTotalRevenue(total);

    // Set revenue data
    setRevenueData(filteredData);
  };

  return (
    <div className="revenue-report-container">
      <h1>Revenue Data Report Page</h1>
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
        <Form.Group controlId="revenueSource" className="mb-3">
          <Form.Label>Revenue Source</Form.Label>
          <Form.Select
            value={revenueSource}
            onChange={(e) => setRevenueSource(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Tickets">Tickets</option>
            <option value="Food">Food</option>
            <option value="Merchandise">Merchandise</option>
          </Form.Select>
        </Form.Group>
        {revenueSource === "Tickets" && (
          <Form.Group controlId="ticketType" className="mb-3">
            <Form.Label>Ticket Type</Form.Label>
            <Form.Select
              value={ticketType}
              onChange={(e) => setTicketType(e.target.value)}
            >
              <option value="NA">All</option>
              <option value="GA">General Admission</option>
              <option value="KI">Kid Tickets</option>
            </Form.Select>
          </Form.Group>
        )}
        {revenueSource === "Food" && (
          <Form.Group controlId="foodBundleType" className="mb-3">
            <Form.Label>Food Bundle Type</Form.Label>
            <Form.Select
              value={foodBundleType}
              onChange={(e) => setFoodBundleType(e.target.value)}
            >
              <option value="NA">All</option>
              <option value="AB">Adventure Bites Eatery Bundle</option>
              <option value="DF">Dragon's Flame Tavern Bundle</option>
              <option value="GG">Galactic Grub Hub Bundle</option>
            </Form.Select>
          </Form.Group>
        )}
        {revenueSource === "Merchandise" && (
          <Form.Group controlId="merchBundleType" className="mb-3">
            <Form.Label>Merchandise Bundle Type</Form.Label>
            <Form.Select
              value={merchBundleType}
              onChange={(e) => setMerchBundleType(e.target.value)}
            >
              <option value="NA">All</option>
              <option value="FF">Fantasy Finds Boutique Bundle</option>
              <option value="EE">Enchanted Emporium Bundle</option>
              <option value="MM">Mystic Marvels Marketplace Bundle</option>
            </Form.Select>
          </Form.Group>
        )}
        <Button
          variant="primary"
          onClick={handleGenerateReport}
          className="mb-3"
        >
          Generate Report
        </Button>
      </Form>
      <hr />
      <h2>Report</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Revenue Source</th>
            <th>Revenue Type</th>
            <th>Revenue Amount</th>
          </tr>
        </thead>
        <tbody>
          {revenueData.map((entry, index) => (
            <tr key={index}>
              <td>{entry.date}</td>
              <td>{entry.source}</td>
              <td>{entry.type}</td>
              <td>${entry.revenue}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="3">
              <b>Total</b>
            </td>
            <td>
              <b>${totalRevenue}</b>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
