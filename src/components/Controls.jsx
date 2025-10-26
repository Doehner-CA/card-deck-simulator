import './Controls.css';

/**
 * Controls Component
 *
 * Displays all action buttons for the card deck app.
 * Receives handler functions via props.
 *
 * Props:
 * - onDeal5: Function to deal 5 cards
 * - onDeal7: Function to deal 7 cards
 * - onReset: Function to reset/return all cards
 * - onToss: Function to toss/delete picked card
 * - onRegroup: Function to shuffle dealt cards
 * - onWildcard: Function to add a wildcard
 */
function Controls({ onDeal5, onDeal7, onReset, onToss, onRegroup, onWildcard }) {
  return (
    <div className="controls-container d-flex flex-wrap gap-2 justify-content-center mb-4">
      {/* Deal buttons */}
      <button className="btn btn-primary" onClick={onDeal5}>
        Deal 5
      </button>
      <button className="btn btn-primary" onClick={onDeal7}>
        Deal 7
      </button>

      {/* Reset button */}
      <button className="btn btn-secondary" onClick={onReset}>
        Reset
      </button>

      {/* Toss button */}
      <button className="btn btn-danger" onClick={onToss}>
        Toss
      </button>

      {/* Regroup button */}
      <button className="btn btn-warning" onClick={onRegroup}>
        Regroup
      </button>

      {/* Wildcard button */}
      <button className="btn btn-success" onClick={onWildcard}>
        Wildcard
      </button>
    </div>
  );
}

export default Controls;
