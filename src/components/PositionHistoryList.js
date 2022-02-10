import { useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";

import Position from "./Position";
import Wallet from './wallet/Wallet';
import TaxContext from "../store/tax-context";

import { POSITION_HISTORY_QUERY } from '../query';
import { tokenToContract } from '../constants';

function PositionHistoryList() {

  const taxCtx = useContext(TaxContext);

  const startDateReq = taxCtx.startDateTimestamp / 1000;
  const endDateReq = taxCtx.endDateTimestamp / 1000;

  const { loading, error, data } = useQuery(POSITION_HISTORY_QUERY, {
    variables: {
      traderId: taxCtx.selectedWallet || "0x0000000000000000000000000000000000000000",
      tokenContract: tokenToContract(taxCtx.selectedChainId)[taxCtx.selectedAsset],
      startDateTimestamp: startDateReq,
      endDateTimestamp: endDateReq,
    }
  });

  useEffect(() => {
    if (data) {
      taxCtx.setProfitData(profitData);
    }
  }, [data])

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

  let positionHistories = [];
  let profitData = [];

  for (let i = 0; i < data.positionHistories.length; i++) {
    const position = data.positionHistories[i];
    let prevPosition;
    if (data.positionHistories[i + 1]) {
      prevPosition = data.positionHistories[i + 1];
    } else {
      prevPosition = data.positionHistories[i];
    }
    const delta = position.realizedPnl - prevPosition.realizedPnl;
    positionHistories.push({
      ...position,
      delta: delta
    });

    if (delta > 0) {
      profitData.push({
        date: new Date(position.timestamp * 1000),
        tx: position.id.split('-')[1],
        profit: delta,
      });
    }
  }

  return (
    <div>
      <h4 className="border border-bottom-0 border-2 rounded-top p-3">Position History</h4>
      {positionHistories &&
        positionHistories.map((position, index) => (
          <Position
            key={position.id}
            position={position}
            index={index}
            taxRate={taxCtx.taxRate} />
        ))
      }
      {(positionHistories.length == 0) && <Wallet />}
    </div>
  )
}

export default PositionHistoryList;
