/**
 * Deck Utility Functions
 *
 * Helper functions for creating and managing a deck of cards
 */

// Card suits - Unicode symbols
export const SUITS = ['♥', '♦', '♣', '♠'];

// Card values
export const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

/**
 * Generate a unique ID for a card based on its suit and value
 */
export const getCardId = (suit, value) => {
  return `${suit}-${value}`; // uniq id, ex: '♥-A'
};

/**
 * Create a full deck of 52 cards (4 suits × 13 values)
 * @returns {Array} An array of 52 card objects with unique IDs
 */
export const createDeck = () => {
  const deck = [];

  // Iterate through each suit
  SUITS.forEach(suit => {
    // For each suit, create all 13 cards
    VALUES.forEach(value => {
      deck.push({
        suit: suit,
        value: value,
        id: getCardId(suit, value)
      });
    });
  });

  return deck;
};
