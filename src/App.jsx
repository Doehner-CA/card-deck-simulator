import { useState } from 'react'
import './App.css'
import { createDeck } from './utils/deckUtils'
import Deck from './components/Deck'
import Card from './components/Card'
import Controls from './components/Controls'

function App() {
  //State section
  // deck contains cards not yet dealt
  const [deck, setDeck] = useState(createDeck());//useState returns a pair [currentState, setStateFunction],array destructuring, state is a list of components we wanna track/render

  // dealtCards contains cards currently displayed
  const [dealtCards, setDealtCards] = useState([]);

  // pickedCardIndex tracks which card is currently picked (-1 = none)
  const [pickedCardIndex, setPickedCardIndex] = useState(-1);

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

    // Update state
    setDeck(newDeck);
    setDealtCards(newDealtCards);
    setPickedCardIndex(-1); // Reset picked card
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

    // Update state
    setDeck(fullDeck);
    setDealtCards([]);
    setPickedCardIndex(-1);
  };

  /**
   * Toss - delete the picked card (Phase 4)
   */
  const handleToss = () => {
    // TODO: Implement in Phase 4
    console.log('Toss');
  };

  /**
   * Regroup - shuffle dealt cards (Phase 5)
   */
  const handleRegroup = () => {
    // TODO: Implement in Phase 5
    console.log('Regroup');
  };

  /**
   * Wildcard - add a random new card (Phase 5)
   */
  const handleWildcard = () => {
    // TODO: Implement in Phase 5
    console.log('Wildcard');
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Card Deck App</h1>

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
            onClick={() => {/* Will implement card click later */}}
          />
        ))}
      </div>
    </div>
  )
}

export default App
