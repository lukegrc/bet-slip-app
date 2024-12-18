import React, { useState, useCallback } from "react";
import BettingCard from "./components/BettingCard";
import { EventsData, Event } from "./types";
import eventsData from "./data/events.json";
import "./App.css";

const App: React.FC = () => {
  const [events] = useState<Event[]>(
    (eventsData as unknown as EventsData).events
  );
  const [submittedBets, setSubmittedBets] = useState<
    Array<{
      eventId: number;
      choice: any;
      amount: number;
      potentialGain: number;
      timestamp: Date;
    }>
  >([]);

  const handleBetSubmit = useCallback(
    (bet: {
      eventId: number;
      choice: any;
      amount: number;
      potentialGain: number;
    }) => {
      setSubmittedBets((prev) => [...prev, { ...bet, timestamp: new Date() }]);
    },
    []
  );

  const totalBets = submittedBets.length;
  const totalAmount = submittedBets.reduce((sum, bet) => sum + bet.amount, 0);
  const totalPotentialGain = submittedBets.reduce(
    (sum, bet) => sum + bet.potentialGain,
    0
  );

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>Betting App</h1>
          <p className="subtitle">Place your bets on exciting sports events</p>
        </div>
        {totalBets > 0 && (
          <div className="stats-banner">
            <div className="stat-item">
              <span className="stat-label">Total Bets:</span>
              <span className="stat-value">{totalBets}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Total Amount:</span>
              <span className="stat-value">€{totalAmount.toFixed(2)}</span>
            </div>
            <div className="stat-item highlight">
              <span className="stat-label">Potential Gain:</span>
              <span className="stat-value">
                €{totalPotentialGain.toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </header>

      <main className="app-main">
        <div className="events-container">
          {events.map((event) => (
            <BettingCard
              key={event.id}
              event={event}
              onBetSubmit={handleBetSubmit}
            />
          ))}
        </div>
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <p>&copy; 2024 Betting App. All rights reserved.</p>
          <div className="footer-links">
            <button className="footer-link">Terms & Conditions</button>
            <button className="footer-link">Privacy Policy</button>
            <button className="footer-link">Support</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
