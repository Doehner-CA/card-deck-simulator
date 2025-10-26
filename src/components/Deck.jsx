import './Deck.css';

/**
 * Deck Component
 *
 * Displays the deck of cards as a clickable element.
 * Shows card back when cards remain, or "no cards remaining" when empty.
 *
 * Props:
 * - remainingCards: Number of cards left in deck
 * - onDeckClick: Function to call when deck is clicked
 */
function Deck({ remainingCards, onDeckClick }) {
  // If no cards remaining, show empty message
  if (remainingCards === 0) {
    return (
      <div className="deck-container empty">
        <p>No cards remaining</p>
      </div>
    );
  }

  // otherwise, render/show clickable deck back, onDeckClick pass to onClick event handler which calls handleDeckClick
  return (
    <div
      className="deck-container clickable"
      onClick={onDeckClick}
    >
      <div className="deck-back">
        <div className="deck-pattern"></div>
        <p className="card-count">{remainingCards} cards</p>
      </div>
    </div>
  );
}

export default Deck;
