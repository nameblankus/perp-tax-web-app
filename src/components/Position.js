import { useState, useContext } from 'react';
import { contractToToken } from '../constants'

import TaxContext from '../store/tax-context';

function Position({ position, index, taxRate, tokenName }) {

  const taxCtx = useContext(TaxContext);

  // Calculate tax for the profitable trades
  const time = new Date(position.timestamp * 1000);
  let displayDelta;
  if (position.delta !== undefined) {
    displayDelta = <div>
      <div>
        <strong>Profit since last block: {position.delta}</strong>
      </div>
      {position.delta > 0 && (
        <div>
          <em>Tax: {position.delta * taxRate * 0.01}</em>
        </div>
      )}
    </div>
  }

  // For the displayed date
  const dateTime = time.toISOString().split('T');

  // State for drop down button
  const [isArrowUp, setIsArrowUp] = useState(false);

  function handleButtonClick() {
    setIsArrowUp((prevButtonValue) => {
      return !prevButtonValue
    });
  }
  const arrowClass = "bi " + (isArrowUp ? "bi-arrow-up-square" : "bi-arrow-down-square");

  return (
    <div className='card mb-2'>
      {/* Main position data */}
      <div className='card-body row'>
        <div className='col-10'>
          {tokenName &&
            <h5 className='card-title'>{contractToToken(taxCtx.chainId)[position.baseToken]} Position</h5>}
          <div>Position Size: {position.positionSize}</div>
          <div>Entry Price: {position.entryPrice}</div>
          <div>Open Notional: {position.openNotional}</div>
          <div>RealizedPnl: {position.realizedPnl}</div>
          {displayDelta}
          <div className='text-muted'>Time: {dateTime[0]} {dateTime[1].substring(0, 8)}</div>
        </div>

        {/* Additional position data that are revealed when clicking the button*/}
        <div className='col-1 d-flex align-items-end'>
          <button
            className="btn"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#description-${position.id}`}
            aria-expanded="false"
            aria-controls={`description-${position.id}`}
            onClick={handleButtonClick}>
            <i className={arrowClass}></i>
          </button>
        </div>
      </div>
      <div className="collapse" id={`description-${position.id}`}>
        <div className="card-body">
          <div>Funding Payment: {position.fundingPayment}</div>
          <div>Trading Fee: {position.tradingFee}</div>
          <div>Liquidation Fee: {position.liquidationFee}</div>
          <hr></hr>
          <div>Token: {contractToToken[position.baseToken]}</div>
          <div>Block Number: {position.blockNumber}</div>
          <div>TxHash: {position.id.split('-')[1]}</div>
          <div>TxLogIndex: {position.id.split('-')[3]}</div>
          <div>Timestamp: {position.timestamp}</div>
        </div>
      </div>
    </div >
  )
}

export default Position;
