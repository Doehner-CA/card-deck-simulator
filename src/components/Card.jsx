/*//StAuth10244: I Xiaodong Cao, 000911762 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else */
import './Card.css';

/**
 * Card Component
 *
 * A stateless component that displays a playing card.
 * Receives suit and value via props (no internal state).
 *
 * Props:
 * - suit: The card suit (♥, ♦, ♣, ♠)
 * - value: The card value (A, 2-10, J, Q, K)
 * - isPicked: Boolean indicating if this card is currently picked/highlighted
 * - onClick: Function to call when card is clicked
 */

function Card({ suit, value, isPicked, onClick }) {
  // Determine if the suit is red (hearts or diamonds)
  const isRed = suit === '♥' || suit === '♦';

  // Apply color class based on suit
  const suitColor = isRed ? 'text-danger' : 'text-dark';

  // Add picked class if card is highlighted
  const cardClass = isPicked ? 'card-picked' : '';

  return (
    <div
      className={`playing-card ${cardClass}`}
      onClick={onClick}
    >
      <div className="card-content">
        <div className={`card-value ${suitColor}`}>{value}</div>
        <div className={`card-suit ${suitColor}`}>{suit}</div>
      </div>
    </div>
  );
}

export default Card;
