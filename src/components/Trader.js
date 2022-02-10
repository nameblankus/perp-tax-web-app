import { useContext } from 'react';
import { useQuery } from '@apollo/client';

import PositionList from './PositionList';

import { TRADER_QUERY } from '../query';
import TaxContext from '../store/tax-context';

function Trader() {

  const taxCtx = useContext(TaxContext);

  // get trader's data
  const { loading, error, data } = useQuery(TRADER_QUERY, {
    variables: {
      traderId: taxCtx.selectedWallet || "0x0000000000000000000000000000000000000000"
    },
  });

  if (loading) {
    return (
      <div>Loading Data</div>
    )
  }

  if (error) {
    return (
      <div>Error {error}</div>
    )
  }

  return (
    <div>
      <h4>Trader Info</h4>
      <div>Trader Collateral: {(data.trader && data.trader.collateral) || "?"}</div>
      <div>Total Trading Volume: {(data.trader && data.trader.tradingVolume) || "?"}</div>
      <div>Trader ID: {(data.trader && data.trader.id) || "?"}</div>
      {data.trader && <PositionList positions={data.trader.positions} />}
      {!data.trader && <div>Connect you wallet to see your positions</div>}
      <div>
      </div>
    </div>
  )
}

export default Trader;
