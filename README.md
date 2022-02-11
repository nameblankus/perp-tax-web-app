# perp-tax-web-app

A web application for calculating the tax for a set of trading positions on the [Perpetual Protocol](https://perp.com/). The app uses the [subgraph for the Perpetual Protocol](https://thegraph.com/hosted-service/subgraph/perpetual-protocol/perpetual-v2-optimism) to access the blockchain data for a trader.

**[Demo](https://perpetualtax.com/)**

_The demo will be updated with bug fixes mentioned in the "3. Known Issues" section and other feature ideas (such as changing the UI)._

## 1. How to Run
The current repository contains a React application that uses Apollo for the GraphQL queries and fetches the Bootstrap framework from a CDN.

First install the dependecies: `npm install`

Then you can run in dev mode with: `npm start`

To create a production ready use: `npm run build`

To read more [click here](https://create-react-app.dev/docs/production-build/).

**Useful for testing various wallet addresses**: The `traderId` in `src/constants.js` can be set to a specific wallet address then. Changing the queries to use the exported `traderId` in the `src/components/Trader.js` and `src/components/PositionHistoryList.js` use the specific account and not the one provided by Metamask.

## 2. Design Decisions
The following design decisions helped to focus on the correctnes of the app:

1. Use Bootstrap for minimal styles that can be easily altered. Easy to search for `className` and remove all the Bootstrap styles classes and then use a different framework.
2. No deep-nested component hierarchy. The components can be easily moved around as there are minimal dependencies (due to using the context for storing data).
3. All data are stored in the same context `TaxContext`. The data are related enough to justify not using more contexes that would add more complexity. The `TaxContext` can be easily split (by moving the relevant functions) to multiple contexes.
4. Some values are stored in localStorage.
5. No use of a backend to minimise dependencies and increase decentralisation. The app uses only React and fetches data with GraphQL from the [subgraph of the Perpetual Protocol](https://thegraph.com/hosted-service/subgraph/perpetual-protocol/perpetual-v2-optimism). However, the app can be easily extended with a backend to prodive additional functionality or if more computationally heavy computations are needed.
6. In most cases the data is displayed with many decimals. This can be easily changed to provide the same data with rounding (as is the case of the).
7. Most of the data retried are presented. An improved version will include only the necessary information in the UI and can reduce the number of requested data to avoid overhead.
8.

## 3. Known Issues
At the moment the app has the following issues that should be solved (higher priority first):
1. [Usability] Queries are limited to 1000 data points. Pagination of requests can be used to access more data. However, there might be a potential need to have a backend server that receives all the data points and calculate the tax for the provided date-range and then sending that data to the client (ie. the application presented here). This might be necessary for accounts with too many entries.
2. [Correctness] The tax for the last entry displayed is not correctly calculated. Should pull the next entry after that to calculate the tax in that case or remove the last entry from being displayed.
3. [UI] The sticky footer covers the last position when scrolling at the bottom. _This issue is fixed in the latest version which is after the hackathon deadline_
4. [UI] Clicking the arrow button on each position too fast makes the arrow to lose it's proper alignment.
5. [Usability] To select the endpoint to use (ie. to choose between Mainnet or Kovan), you need to change the `MAINNET` variable in `src/constants.js`. _This issue is fixed in the latest version which is after the hackathon deadline_

## 4. Future Improvements
Apart from points 1 and 2 from the Known Issues:

1. [Usability] Tax computation works on a per token/asset basis. Update the total tax estimate to use all asset data.

