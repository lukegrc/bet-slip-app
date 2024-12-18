# Betting App

A modern, responsive betting application built with React and TypeScript, featuring a beautiful UI and comprehensive betting functionality.

## Features

- **Modern UI/UX**: Beautiful, responsive design with smooth animations and transitions
- **TypeScript**: Full TypeScript support with proper type definitions
- **Responsive Design**: Mobile-first approach that works on all devices
- **Real-time Calculations**: Instant calculation of potential gains and totals
- **Interactive Betting**: Easy selection of choices with visual feedback
- **Form Validation**: Smart form validation and error handling
- **Loading States**: Smooth loading animations during bet submission
- **Statistics Dashboard**: Overview of total bets, amounts, and potential gains

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd gig-senior-test
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm start` - Start development server
- `npm test` - Run tests in watch mode
- `npm test -- --watchAll=false` - Run tests once
- `npm run build` - Build for production
- `npm run eject` - Eject from Create React App (not recommended)

## Architecture

### Tech Stack

- **React 19** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development with interfaces and types
- **CSS3** - Modern CSS with custom properties and responsive design
- **Jest & Testing Library** - Comprehensive testing suite

### Project Structure

```
src/
├── components/          # React components
│   ├── BettingCard.tsx # Main betting card component
│   └── BettingCard.css # Component styles
├── types/              # TypeScript type definitions
│   └── index.ts        # Main type interfaces
├── data/               # Static data
│   └── events.json     # Sample betting events
├── App.tsx             # Main application component
├── App.css             # Application styles
└── index.tsx           # Application entry point
```

### Type Definitions

The app uses comprehensive TypeScript interfaces for type safety:

- `Event` - Represents a betting event with sport, category, and competition
- `Choice` - Represents a betting choice with odds and actor
- `BettingCardProps` - Props interface for the BettingCard component

## Design Features

### Modern UI Elements

- **Glassmorphism**: Semi-transparent cards with backdrop blur effects
- **Gradient Backgrounds**: Beautiful color gradients throughout the interface
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Responsive Grid**: Adaptive layout that works on all screen sizes

### Color Scheme

- Primary: Blue to purple gradients (#667eea → #764ba2)
- Success: Green tones (#059669 → #10b981)
- Danger: Red tones (#c53030)
- Neutral: Gray scale (#2d3748, #718096, #a0aec0)

## Testing

The application includes comprehensive tests covering:

- Component rendering
- User interactions
- State management
- Async operations
- Form validation

Run tests with:

```bash
npm test
```

## Responsive Design

The app is designed to work seamlessly across all devices:

- **Desktop**: Full-featured interface with grid layout
- **Tablet**: Optimized for touch interactions
- **Mobile**: Stacked layout with touch-friendly buttons

## Customization

### Styling

The app uses CSS custom properties (variables) for easy theming:

```css
:root {
  --primary-color: #667eea;
  --primary-dark: #764ba2;
  --success-color: #059669;
  /* ... more variables */
}
```

### Adding New Features

1. Define TypeScript interfaces in `src/types/index.ts`
2. Create new components in `src/components/`
3. Add styles in corresponding CSS files
4. Update tests to cover new functionality

## Deployment

Build the production version:

```bash
npm run build
```

The `build` folder contains the optimized production build ready for deployment.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Built with Create React App
- Icons and design inspiration from modern UI/UX trends
- Testing patterns from React Testing Library best practices
