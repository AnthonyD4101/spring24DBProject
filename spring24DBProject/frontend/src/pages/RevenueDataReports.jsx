import React, { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";

export default function RevenueDataReports() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [revenueSource, setRevenueSource] = useState("All");
  const [ticketType, setTicketType] = useState("NA");
  const [revenueData, setRevenueData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const handleGenerateReport = () => {
    // Perform data fetching based on startDate and endDate
    // Replace this with your actual data fetching logic
    const fetchedData = [
      { date: "2024-03-10", source: "Tickets", type: "GA", revenue: 500 },
      { date: "2024-03-10", source: "Food", type: "Beverages", revenue: 200 },
      {
        date: "2024-03-11",
        source: "Merchandise",
        type: "Souvenirs",
        revenue: 300,
      },
      { date: "2024-03-12", source: "Tickets", type: "KI", revenue: 700 },
      { date: "2024-03-12", source: "Food", type: "Snacks", revenue: 250 },
    ];

    // Filter fetched data based on date range and revenue source
    let filteredData = [...fetchedData]; // Create a copy of fetchedData

    if (revenueSource !== "All") {
      filteredData = filteredData.filter(
        (entry) => entry.source === revenueSource
      );
    }

    if (ticketType !== "NA") {
      filteredData = filteredData.filter((entry) => entry.type === ticketType);
    }

    // Sum up total revenue
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
