import React from 'react';
import './MilkingHistory.css';
import { Link } from 'react-router-dom';

const MilkingHistory = () => {
  // Retrieve milking history data from local storage
  const milkingHistory = JSON.parse(localStorage.getItem('milkingHistory')) || [];

  return (
    <div className="history-page">
      <h1>Milking Session History</h1>
      <table className="history-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Time (seconds)</th>
            <th>Milk (liters)</th>
          </tr>
        </thead>
        <tbody>
          {milkingHistory.map((session, index) => (
            <tr key={index}>
              <td>{session.date}</td>
              <td>{session.startTime}</td>
              <td>{session.totalTime}</td>
              <td>{session.totalMilk}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>
        <Link to="/" className="history-link">
            Start Milking
          </Link>
      </h2>
    </div>
  );
};

export default MilkingHistory;
