import React, { useState, useCallback, useMemo } from "react";
import { BettingCardProps, Choice } from "../types";
import "./BettingCard.css";

const BettingCard: React.FC<BettingCardProps> = ({ event, onBetSubmit }) => {
  const betId = Object.keys(event.bet)[0];
  const bet = event.bet[betId];
  const choices = bet.choices;

  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const startDate = useMemo(() => {
    return new Date(event.start).toLocaleString("fr-FR", {
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "short",
    });
  }, [event.start]);

  const potentialGain = useMemo(() => {
    if (!selectedChoice || !amount) return 0;
    return Number((selectedChoice.odd * amount).toFixed(2));
  }, [selectedChoice, amount]);

  const total = useMemo(() => {
    return amount ? Number(amount.toFixed(2)) : 0;
  }, [amount]);

  const handleAmountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (val === "") {
        setAmount(0);
        return;
      }
      const numberVal = parseFloat(val);
      if (!isNaN(numberVal) && numberVal >= 0) {
        setAmount(numberVal);
      }
    },
    []
  );

  const decreaseAmount = useCallback(() => {
    setAmount((prev) => (prev > 1 ? prev - 1 : 0));
  }, []);

  const increaseAmount = useCallback(() => {
    setAmount((prev) => prev + 1);
  }, []);

  const removeChoice = useCallback(() => {
    setSelectedChoice(null);
    setAmount(0);
  }, []);

  const handleBetSubmit = useCallback(async () => {
    if (!selectedChoice || !amount || amount <= 0) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (onBetSubmit) {
        onBetSubmit({
          eventId: event.id,
          choice: selectedChoice,
          amount,
          potentialGain,
        });
      }

      // Reset form after successful submission
      setSelectedChoice(null);
      setAmount(0);
    } catch (error) {
      console.error("Failed to submit bet:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [selectedChoice, amount, potentialGain, event.id, onBetSubmit]);

  const isSubmitDisabled = !selectedChoice || amount <= 0 || isSubmitting;

  return (
    <div className="betting-card" data-testid="betting-card">
      <div className="event-section">
        <div className="event-header">
          <div className="sport-icon">
            <span className="icon">FB</span>
          </div>
          <div className="event-info">
            <h2 data-testid="match-title">{event.label}</h2>
            <p className="meta" data-testid="meta">
              {event.sport.label} / {event.category.label} /{" "}
              {event.competition.label}
            </p>
            <p className="date">{startDate}</p>
          </div>
        </div>

        <div className="odds-row">
          {choices.map((choice) => (
            <button
              key={choice.id}
              className={`odd-button ${
                selectedChoice?.id === choice.id ? "selected" : ""
              }`}
              onClick={() => setSelectedChoice(choice)}
              data-testid={`choice-${choice.id}`}
            >
              <span className="choice-label">{choice.actor.label}</span>
              <span className="odd-value">{choice.odd}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bet-slip">
        <div className="bet-slip-header">
          <h3>My Choice</h3>
          {selectedChoice && (
            <button
              data-testid="remove-btn"
              onClick={removeChoice}
              className="remove-btn"
              aria-label="Remove selection"
            >
              ×
            </button>
          )}
        </div>

        {selectedChoice ? (
          <>
            <div className="bet-summary">
              <div className="summary-item">
                <span className="label">Match:</span>
                <span className="value" data-testid="match-label">
                  {event.label}
                </span>
              </div>
              <div className="summary-item">
                <span className="label">Choice:</span>
                <span className="value" data-testid="selected-choice">
                  {selectedChoice.actor.label}
                </span>
              </div>
              <div className="summary-item">
                <span className="label">Odd:</span>
                <span className="value" data-testid="selected-odd">
                  {selectedChoice.odd}
                </span>
              </div>
            </div>

            <div className="amount-controls">
              <button
                onClick={decreaseAmount}
                data-testid="decrease-btn"
                className="amount-btn"
                disabled={amount <= 0}
              >
                −
              </button>
              <div className="amount-input-wrapper">
                <input
                  type="number"
                  value={amount || ""}
                  onChange={handleAmountChange}
                  data-testid="amount-input"
                  min="0"
                  step="0.01"
                  className="amount-input"
                  placeholder="0.00"
                />
                <span className="currency">€</span>
              </div>
              <button
                onClick={increaseAmount}
                data-testid="increase-btn"
                className="amount-btn"
              >
                +
              </button>
            </div>

            <div className="totals">
              <div className="total-item">
                <span className="label">Total:</span>
                <span className="value" data-testid="total">
                  {total.toFixed(2)} €
                </span>
              </div>
              <div className="total-item highlight">
                <span className="label">Potential Gain:</span>
                <span className="value" data-testid="potential-gain">
                  {potentialGain.toFixed(2)} €
                </span>
              </div>
            </div>

            <button
              className="submit-btn"
              data-testid="submit-btn"
              disabled={isSubmitDisabled}
              onClick={handleBetSubmit}
            >
              {isSubmitting ? "Submitting..." : "Submit Bet"}
            </button>
          </>
        ) : (
          <div className="no-choice" data-testid="no-choice">
            <p>Select a choice above to place your bet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BettingCard;
