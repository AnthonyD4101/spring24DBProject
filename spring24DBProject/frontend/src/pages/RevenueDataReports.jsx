import React, { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";

export default function RevenueDataReports() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [revenueSource, setRevenueSource] = useState("all");
  const [revenueData, setRevenueData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const handleGenerateReport = () => {
    // Perform data fetching based on startDate, endDate, and revenueSource
    // Replace this with your actual data fetching logic
    const fetchedData = [
      { date: "2024-03-10", source: "Tickets", revenue: 500 },
      { date: "2024-03-10", source: "Food", revenue: 200 },
      { date: "2024-03-11", source: "Merchandise", revenue: 300 },
      { date: "2024-03-12", source: "Tickets", revenue: 700 },
      { date: "2024-03-12", source: "Food", revenue: 250 },
    ];

    // Filter fetched data based on date range and revenue source
    let filteredData = [...fetchedData];
    if (revenueSource !== "all") {
      filteredData = fetchedData.filter(
        (entry) => entry.source === revenueSource
      );
    }
    filteredData = filteredData.filter(
      (entry) => entry.date >= startDate && entry.date <= endDate
    );

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
            <option value="all">All</option>
            <option value="Tickets">Tickets</option>
            <option value="Food">Food</option>
            <option value="Merchandise">Merchandise</option>
          </Form.Select>
        </Form.Group>
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
            <th>Revenue Amount</th>
          </tr>
        </thead>
        <tbody>
          {revenueData.map((entry, index) => (
            <tr key={index}>
              <td>{entry.date}</td>
              <td>{entry.source}</td>
              <td>${entry.revenue}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="2">
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
