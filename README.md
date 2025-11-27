# Card Deck Simulator

A React-based card deck manipulation application demonstrating fundamental React concepts including components, props, state management, and event handling.

## Features

- Draw cards individually from a 52-card deck
- Deal 5 or 7 cards at once
- Pick and swap cards in hand
- Toss cards to remove them permanently
- Regroup (shuffle) current cards
- Add wildcard (duplicate) cards
- Reset deck to start over

## Tech Stack

- React 19.1.1
- Vite 7.1.7
- CSS for styling

## Running the Application

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

- `App.jsx` - Main component managing state and logic
- `components/Card.jsx` - Stateless card display component
- `components/Deck.jsx` - Deck display and click handler
- `components/Controls.jsx` - Button controls
- `utils/deckUtils.js` - Helper functions for deck operations
