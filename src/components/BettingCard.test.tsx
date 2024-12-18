import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import BettingCard from "./BettingCard";
import { Event } from "../types";

// Mock event data for testing
const mockEvent: Event = {
  id: 1,
  label: "Test Match",
  start: "2021-03-24T20:45:00.000+01:00",
  competition: { label: "Test League" },
  category: { label: "Test Category" },
  sport: { label: "Football", icon: "soccer" },
  bet: {
    "123": {
      question: { label: "Who will win?" },
      choices: [
        {
          id: 1,
          odd: 2.0,
          actor: { id: 1, label: "Team A" },
        },
        {
          id: 2,
          odd: 3.0,
          actor: { id: 2, label: "Team B" },
        },
      ],
    },
  },
};

describe("BettingCard", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("renders the betting card with event information", () => {
    render(<BettingCard event={mockEvent} />);

    expect(screen.getByTestId("betting-card")).toBeInTheDocument();
    expect(screen.getByTestId("match-title")).toHaveTextContent("Test Match");
    expect(screen.getByTestId("meta")).toHaveTextContent(
      "Football / Test Category / Test League"
    );
  });

  it("displays all betting choices", () => {
    render(<BettingCard event={mockEvent} />);

    expect(screen.getByTestId("choice-1")).toBeInTheDocument();
    expect(screen.getByTestId("choice-2")).toBeInTheDocument();
    expect(screen.getByText("Team A")).toBeInTheDocument();
    expect(screen.getByText("Team B")).toBeInTheDocument();
  });

  it("allows selecting a choice", () => {
    render(<BettingCard event={mockEvent} />);

    const choiceButton = screen.getByTestId("choice-1");
    fireEvent.click(choiceButton);

    expect(choiceButton).toHaveClass("selected");
  });

  it("shows bet slip when choice is selected", () => {
    render(<BettingCard event={mockEvent} />);

    const choiceButton = screen.getByTestId("choice-1");
    fireEvent.click(choiceButton);

    expect(screen.getByTestId("match-label")).toHaveTextContent("Test Match");
    expect(screen.getByTestId("selected-choice")).toHaveTextContent("Team A");
    expect(screen.getByTestId("selected-odd")).toHaveTextContent("2");
  });

  it("allows entering bet amount", () => {
    render(<BettingCard event={mockEvent} />);

    const choiceButton = screen.getByTestId("choice-1");
    fireEvent.click(choiceButton);

    const amountInput = screen.getByTestId("amount-input");
    fireEvent.change(amountInput, { target: { value: "10" } });

    expect(amountInput).toHaveValue(10);
  });

  it("calculates potential gain correctly", () => {
    render(<BettingCard event={mockEvent} />);

    const choiceButton = screen.getByTestId("choice-1");
    fireEvent.click(choiceButton);

    const amountInput = screen.getByTestId("amount-input");
    fireEvent.change(amountInput, { target: { value: "10" } });

    // With odd 2.0 and amount 10, potential gain should be 20.00
    expect(screen.getByTestId("potential-gain")).toHaveTextContent("20.00 €");
  });

  it("increases and decreases amount with buttons", () => {
    render(<BettingCard event={mockEvent} />);

    const choiceButton = screen.getByTestId("choice-1");
    fireEvent.click(choiceButton);

    const increaseBtn = screen.getByTestId("increase-btn");
    const decreaseBtn = screen.getByTestId("decrease-btn");

    fireEvent.click(increaseBtn);
    expect(screen.getByTestId("amount-input")).toHaveValue(1);

    fireEvent.click(increaseBtn);
    expect(screen.getByTestId("amount-input")).toHaveValue(2);

    fireEvent.click(decreaseBtn);
    expect(screen.getByTestId("amount-input")).toHaveValue(1);
  });

  it("enables submit button when choice and amount are selected", () => {
    render(<BettingCard event={mockEvent} />);

    // First select a choice
    const choiceButton = screen.getByTestId("choice-1");
    fireEvent.click(choiceButton);

    // Now the submit button should be visible but disabled
    const submitBtn = screen.getByTestId("submit-btn");
    expect(submitBtn).toBeDisabled();

    // Add amount to enable the button
    const amountInput = screen.getByTestId("amount-input");
    fireEvent.change(amountInput, { target: { value: "10" } });

    expect(submitBtn).not.toBeDisabled();
  });

  it("removes choice when remove button is clicked", () => {
    render(<BettingCard event={mockEvent} />);

    const choiceButton = screen.getByTestId("choice-1");
    fireEvent.click(choiceButton);

    expect(screen.getByTestId("remove-btn")).toBeInTheDocument();

    const removeBtn = screen.getByTestId("remove-btn");
    fireEvent.click(removeBtn);

    expect(screen.getByTestId("no-choice")).toBeInTheDocument();
  });

  it("calls onBetSubmit when bet is submitted", async () => {
    const mockOnBetSubmit = jest.fn();
    render(<BettingCard event={mockEvent} onBetSubmit={mockOnBetSubmit} />);

    const choiceButton = screen.getByTestId("choice-1");
    fireEvent.click(choiceButton);

    const amountInput = screen.getByTestId("amount-input");
    fireEvent.change(amountInput, { target: { value: "10" } });

    const submitBtn = screen.getByTestId("submit-btn");
    fireEvent.click(submitBtn);

    // Fast-forward timers to complete the async operation
    jest.runAllTimers();

    await waitFor(() => {
      expect(mockOnBetSubmit).toHaveBeenCalledWith({
        eventId: 1,
        choice: mockEvent.bet["123"].choices[0],
        amount: 10,
        potentialGain: 20,
      });
    });
  });

  it("shows loading state during submission and resets form after", async () => {
    const mockOnBetSubmit = jest.fn();
    render(<BettingCard event={mockEvent} onBetSubmit={mockOnBetSubmit} />);

    const choiceButton = screen.getByTestId("choice-1");
    fireEvent.click(choiceButton);

    const amountInput = screen.getByTestId("amount-input");
    fireEvent.change(amountInput, { target: { value: "10" } });

    const submitBtn = screen.getByTestId("submit-btn");
    fireEvent.click(submitBtn);

    // Check loading state
    expect(screen.getByText("Submitting...")).toBeInTheDocument();

    // Fast-forward timers to complete the async operation
    jest.runAllTimers();

    // After submission, the form should be reset and show "no choice" message
    await waitFor(() => {
      expect(screen.getByTestId("no-choice")).toBeInTheDocument();
    });
  });
});
