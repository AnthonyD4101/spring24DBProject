import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function AdminDashboard() {
  const { currentUser, signOut } = useAuth();
  const [isComplete, setIsComplete] = useState(false);
  const [isSet, setIsSet] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    position: "",
    employeeID: "",
    contactInformation: "",
    Supervisor: "",
    Salary: "",
    Address: "",
    Department: "",
    Schedule: "",
    DateOfBirth: "",
  });

  useEffect(() => {
    if (currentUser) {
      setPersonalInfo({
        name: `${currentUser.FirstName} ${currentUser.LastName}`,
        position: `${currentUser.Position}`,
        employeeID: `${currentUser.UserID}`,
        contactInformation: `${currentUser.Email} | ${currentUser.PhoneNumber}`,
        Supervisor: "",
        Salary: "",
        Address: "",
        Department: "",
        Schedule: "",
        DateOfBirth: "",
      });
      setIsSet(true);
    }
  }, [currentUser]);

  useEffect(() => {
    if (
      currentUser &&
      personalInfo.employeeID &&
      personalInfo.name &&
      personalInfo.position &&
      personalInfo.contactInformation
    ) {
      const fetchEmployeeInfo = async () => {
        const results = await fetch(
          `http://localhost:3001/getEmployee/${encodeURIComponent(
            currentUser.UserID
          )}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const json = await results.json();

        if (!results.ok) {
          console.log("Failed to fetch employee data");
        }
        if (results.ok) {
          setPersonalInfo((prevInfo) => ({
            ...prevInfo,
            Salary: `$${json[0].Salary}`,
            Address: `${json[0].Street} ${json[0].City}, ${json[0].State} ${json[0].ZipCode}`,
            Department: `${json[0].DepName}`,
            Schedule: json[0].ScheduleType,
          }));
        }
      };

      fetchEmployeeInfo();
    }
  }, [
    currentUser,
    personalInfo.employeeID,
    personalInfo.name,
    personalInfo.position,
    personalInfo.contactInformation,
  ]);

  useEffect(() => {
    if (
      currentUser &&
      personalInfo.employeeID &&
      personalInfo.name &&
      personalInfo.position &&
      personalInfo.contactInformation
    ) {
      const fetchAccountInfo = async () => {
        const results = await fetch(
          `http://localhost:3001/getAccount/${encodeURIComponent(
            currentUser.UserID
          )}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const json = await results.json();

        if (!results.ok) {
          console.log("Failed to fetch employee data");
        }
        if (results.ok) {
          setPersonalInfo((prevInfo) => ({
            ...prevInfo,
            DateOfBirth: `${json[0].DateOfBirth.substring(0, 10)}`,
          }));
        }
      };

      fetchAccountInfo();
    }
  }, [
    currentUser,
    personalInfo.employeeID,
    personalInfo.name,
    personalInfo.position,
    personalInfo.contactInformation,
  ]);

  useEffect(() => {
    if (
      currentUser &&
      personalInfo.employeeID &&
      personalInfo.name &&
      personalInfo.position &&
      personalInfo.contactInformation
    ) {
      const fetchSupervisorInfo = async () => {
        const results = await fetch(
          `http://localhost:3001/getDashboard/${encodeURIComponent(
            currentUser.UserID
          )}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const json = await results.json();

        if (!results.ok) {
          console.log("Failed to fetch employee data");
        }
        if (results.ok) {
          setPersonalInfo((prevInfo) => ({
            ...prevInfo,
            Supervisor: (json[0] ? `${json[0].FirstName} ${json[0].LastName}`: "None"),
          }));
          setIsComplete(true);
        }
      };

      fetchSupervisorInfo();
    }
  }, [
    currentUser,
    personalInfo.employeeID,
    personalInfo.name,
    personalInfo.position,
    personalInfo.contactInformation,
  ]);

  const feedback = "Remember to greet park visitors with a smile on your face.";

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const workHours = "9:00 AM - 7:00 PM";
  const wedWorkHoursFirstShift = "9:00 AM - 2:00 PM";
  const wedWorkHoursSecondShift = "2:00 PM - 7:00 PM";

  // Get current date, month, year, and day of the week
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();
  const currentDay = currentDate.getDate();
  const currentDayOfWeek = currentDate.getDay();

  // Find the starting day of the current week
  const startingDayOfWeek = currentDayOfWeek === 0 ? 0 : currentDayOfWeek;

  // Generate an array representing the current week
  const currentWeek = [];
  let day = currentDay - startingDayOfWeek;
  for (let i = 0; i < 7; i++) {
    currentWeek.push(day);
    day++;
  }

  return (
    isComplete &&
    isSet && (
      <div className="dashboard">
        <h1>Dashboard</h1>
        <div className="personal-info">
          <h3>Personal Information</h3>
          <div className="row">
            <div className="col">
              <p>Name: {personalInfo.name}</p>
            </div>
            <div className="col">
              <p>Employee ID: {personalInfo.employeeID}</p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p>Position: {personalInfo.position}</p>
            </div>
            <div className="col">
              <p>Department: {personalInfo.Department}</p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p>Supervisor: {personalInfo.Supervisor}</p>
            </div>
            <div className="col">
              <p>Address: {personalInfo.Address}</p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p>Date of Birth: {personalInfo.DateOfBirth}</p>
            </div>
            <div className="col">
              <p>Salary: {personalInfo.Salary}</p>
            </div>
          </div>
          <div className="row">
            <p>Contact Information: {personalInfo.contactInformation}</p>
          </div>
        </div>
        <div className="schedule-calendar">
          <h3>
            Work Schedule: {currentMonth} {currentYear}
          </h3>
          <div className="schedule-header">
            {daysOfWeek.map((day, index) => (
              <div key={index}>{day}</div>
            ))}
          </div>
          <div className="schedule-week">
            {currentWeek.map((day, index) => (
              <div
                key={index}
                className={`schedule-day ${
                  day === currentDay ? "highlight" : ""
                }`}
              >
                <p>{day}</p>
                {personalInfo.Schedule === "First Shift" ? (
                  <p>
                    {index >= 0 && index <= 3
                      ? index !== 3
                        ? workHours
                        : wedWorkHoursFirstShift
                      : "Not Scheduled"}
                  </p>
                ) : (
                  <p>
                    {index >= 3 && index <= 6
                      ? index !== 3
                        ? workHours
                        : wedWorkHoursSecondShift
                      : "Not Scheduled"}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="feedback">
          <h3>Feedback & Suggestions</h3>
          <p>{feedback}</p>
        </div>
      </div>
    )
  );
}
