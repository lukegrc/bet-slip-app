export interface Actor {
  id: number;
  label: string;
}

export interface Choice {
  id: number;
  odd: number;
  actor: Actor;
}

export interface BetQuestion {
  label: string;
}

export interface BetChoice {
  question: BetQuestion;
  choices: Choice[];
}

export interface Bet {
  [key: string]: BetChoice;
}

export interface Sport {
  label: string;
  icon: string;
}

export interface Category {
  label: string;
}

export interface Competition {
  label: string;
}

export interface Event {
  id: number;
  label: string;
  start: string;
  competition: Competition;
  category: Category;
  sport: Sport;
  bet: Bet;
}

export interface EventsData {
  events: Event[];
}

export interface BettingCardProps {
  event: Event;
  onBetSubmit?: (bet: {
    eventId: number;
    choice: Choice;
    amount: number;
    potentialGain: number;
  }) => void;
}
