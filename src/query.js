import { gql } from '@apollo/client';

export const TRADER_QUERY = gql`
  query traderQuery($traderId: String!) {
    trader(
      id: $traderId) {
      id
      collateral
      tradingVolume
      positions {
        id
        baseToken
        positionSize
        openNotional
        entryPrice
        realizedPnl
        fundingPayment
        tradingFee
        liquidationFee
        blockNumber
        timestamp
      }
    }
  }
`

export const POSITION_HISTORY_QUERY = gql`
  query positionHistoriesQuery(
    $traderId: String!,
    $tokenContract: String!,
    $startDateTimestamp: BigInt!,
    $endDateTimestamp: BigInt!) {
    positionHistories(
      offset: 0,
      limit: 1000,
      orderBy: timestamp,
      orderDirection: desc,
      where: {
        trader: $traderId,
        baseToken: $tokenContract,
        timestamp_gt: $startDateTimestamp,
        timestamp_lt: $endDateTimestamp,
      }) {
      id
      trader
      baseToken
      positionSize
      openNotional
      entryPrice
      realizedPnl
      fundingPayment
      tradingFee
      liquidationFee
      blockNumber
      timestamp
    }
  }
`
