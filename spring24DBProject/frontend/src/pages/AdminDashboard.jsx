import React from "react";
import { useAuth } from "../context/AuthContext";

export default function AdminDashboard() {
  const { currentUser, signOut } = useAuth();
  console.log("Current user:", currentUser);

  const personalInfo = {
    name: `${currentUser.FirstName} ${currentUser.LastName}`,
    position: `${currentUser.Position}`,
    employeeID: `${currentUser.UserID}`,
    contactInformation: `${currentUser.Email} | ${currentUser.PhoneNumber}`,
  };

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
  const workHours = "9:00 AM - 5:00 PM";

  // Get current date, month, year, and day of the week
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();
  const currentDay = currentDate.getDate();
  const currentDayOfWeek = currentDate.getDay();
  console.log(currentDayOfWeek);

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
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="personal-info">
        <h3>Personal Information</h3>
        <p>Name: {personalInfo.name}</p>
        <p>Position: {personalInfo.position}</p>
        <p>Employee ID: {personalInfo.employeeID}</p>
        <p>Contact Information: {personalInfo.contactInformation}</p>
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
              {index >= 1 && index <= 5 ? (
                <p>{workHours}</p>
              ) : (
                <p>Not Scheduled</p>
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
  );
}
