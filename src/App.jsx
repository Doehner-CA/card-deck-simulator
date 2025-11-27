//StAuth10244: I Xiaodong Cao, 000911762 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else
import { useState } from 'react'
import './App.css'
import { createDeck, SUITS, VALUES } from './utils/deckUtils'
import Deck from './components/Deck'
import Card from './components/Card'
import Controls from './components/Controls'
//The parent component manages all states and childs
function App() {
  //State section (hooks)
  // deck contains cards not yet dealt
  const [deck, setDeck] = useState(createDeck());//useState returns a pair [currentState, setStateFunction],array destructuring, React compares references
  // dealtCards contains cards currently displayed
  const [dealtCards, setDealtCards] = useState([]);

  // pickedCardIndex tracks which card is currently picked (-1 = none)
  const [pickedCardIndex, setPickedCardIndex] = useState(-1);

  const [dealCount, setDealCount] = useState(0);
  //const counter = useRef(0);

  //Component Logic, state management
  /**
   * Handle clicking the deck - draw a random card
   * Feature: Single card selection from deck
   */
  const handleDeckClick = () => {
    if (deck.length === 0) {
      return; // No cards left to draw
    }

    // Get random index from remaining deck
    const randomIndex = Math.floor(Math.random() * deck.length);

    // Get the card at that index
    const drawnCard = deck[randomIndex];

    // create new array without this card
    const newDeck = deck.filter((_, index) => index !== randomIndex);//_ variable unused. filter takes callback(element, index,array)-> returns true to keep items. source:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

    // Add card to dealt cards
    const newDealtCards = [...dealtCards, drawnCard];//spread syntax copies all items from dealtCards

    // Update state (re-render)
    setDeck(newDeck);
    setDealtCards(newDealtCards);
  };

  /**
   * Deal N cards from the deck
   * Returns currently dealt cards to deck, then deals N random cards
   */
  const dealCards = (numCards) => {
    // Return all dealt cards back to the deck
    const fullDeck = [...deck, ...dealtCards];

    // Check if we have enough cards
    if (fullDeck.length < numCards) {
      alert(`Not enough cards! Only ${fullDeck.length} cards available.`);
      return;
    }

    // Randomly select N cards
    const newDealtCards = [];
    const newDeck = [...fullDeck];

    for (let i = 0; i < numCards; i++) {
      const randomIndex = Math.floor(Math.random() * newDeck.length);
      newDealtCards.push(newDeck[randomIndex]);
      newDeck.splice(randomIndex, 1); // Remove selected card
    }

    //counter.current += 1;

    // Update state
    setDeck(newDeck);
    setDealtCards(newDealtCards);
    setPickedCardIndex(-1); // Reset picked card
    setDealCount((c)=> c+1);
  };

  /**
   * Deal 5 cards
   */
  const handleDeal5 = () => {
    dealCards(5);
  };

  /**
   * Deal 7 cards
   */
  const handleDeal7 = () => {
    dealCards(7);
  };

  /**
   * Reset - return all dealt cards to deck
   */
  const handleReset = () => {
    // Combine deck and dealt cards
    const fullDeck = [...deck, ...dealtCards];
    //counter.current = 0;
    // Update state
    setDeck(fullDeck);
    setDealtCards([]);
    setPickedCardIndex(-1);
    setDealCount((c) => c = 0);
  };

  /**
   * Handle clicking (highlighting) a card and swapping between picked cards in the dealt cards list
   */
  const handleCardClick = (index) => {
    // If clicking the same card that's already picked, unpick it
    if (index === pickedCardIndex) {
      setPickedCardIndex(-1);
    }
    // If a different card is already picked, swap them
    else if (pickedCardIndex !== -1) {
      // Create a copy of dealt cards array
      const newDealtCards = [...dealtCards];

      // Swap the cards at the two indices
      const temp = newDealtCards[index];
      newDealtCards[index] = newDealtCards[pickedCardIndex];
      newDealtCards[pickedCardIndex] = temp;

      // Update state with swapped cards
      setDealtCards(newDealtCards);

      // Unpick the card after swapping
      setPickedCardIndex(-1);
    }
    // No card is currently picked, so pick this one
    else {
      setPickedCardIndex(index);
    }
  };

  /**
   * Toss - delete the picked card permanently (not returned to deck)
   */
  const handleToss = () => {
    // Only toss if a card is currently picked
    if (pickedCardIndex === -1) {
      return;
    }

    // Remove the card at pickedCardIndex from dealtCards
    const newDealtCards = dealtCards.filter((_, index) => index !== pickedCardIndex);

    // Update state
    setDealtCards(newDealtCards);
    setPickedCardIndex(-1);
  };

  /**
   * Regroup - shuffle dealt cards randomly
   * Uses Fisher-Yates shuffle algorithm. Source: https://www.geeksforgeeks.org/dsa/shuffle-a-given-array-using-fisher-yates-shuffle-algorithm/
   */
  const handleRegroup = () => {
    // Only shuffle if there are cards
    if (dealtCards.length === 0) {
      return;
    }

    const shuffledCards = [...dealtCards];

    // Fisher-Yates shuffle algorithm
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      // Pick a random index from 0 to i
      const randomIndex = Math.floor(Math.random() * (i + 1));

      // Swap elements at i and randomIndex
      const temp = shuffledCards[i];
      shuffledCards[i] = shuffledCards[randomIndex];
      shuffledCards[randomIndex] = temp;
    }

    // Update state with shuffled cards
    setDealtCards(shuffledCards);
    // Reset picked card since positions have changed
    setPickedCardIndex(-1);
  };

  /**
   * Wildcard - create and add a random new card
   * Card can have same suit/value as existing cards (duplicates allowed)
   */
  const handleWildcard = () => {
    // Randomly select a suit
    const randomSuit = SUITS[Math.floor(Math.random() * SUITS.length)];
    // Randomly select a value
    const randomValue = VALUES[Math.floor(Math.random() * VALUES.length)];

    // Create new wildcard with unique ID (includes timestamp to allow duplicates). Source: https://www.geeksforgeeks.org/reactjs/how-to-create-an-unique-id-in-reactjs/
    const wildcardCard = {
      suit: randomSuit,
      value: randomValue,
      id: `${randomSuit}-${randomValue}-${Date.now()}-${Math.random()}`
    };

    // Add wildcard to dealt cards
    const newDealtCards = [...dealtCards, wildcardCard];

    // Update state and reset pickedcard
    setDealtCards(newDealtCards);
    setPickedCardIndex(-1);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Card Deck App</h1>
      <div className="text-center mb-4"><strong>Deals:</strong> {dealCount}</div>
      {/* Deck Section */}
      <div className="d-flex justify-content-center mb-4">
        <Deck
          remainingCards={deck.length}
          onDeckClick={handleDeckClick}
        />
      </div>

      {/* Controls Section */}
      <Controls
        onDeal5={handleDeal5}
        onDeal7={handleDeal7}
        onReset={handleReset}
        onToss={handleToss}
        onRegroup={handleRegroup}
        onWildcard={handleWildcard}
      />

      {/* Dealt Cards Section */}
      <div className="dealt-cards d-flex flex-wrap gap-3 justify-content-center">
        {dealtCards.map((card, index) => (
          <Card
            key={card.id} // react attribute
            suit={card.suit}
            value={card.value}
            isPicked={index === pickedCardIndex}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default App
