import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';

import App from './App';
import { perp_graph_endpoint } from './constants';
import { TaxContextProvider } from './store/tax-context';

// Set up Apollo Provider
const client = new ApolloClient({
  uri: perp_graph_endpoint,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <TaxContextProvider>
      <App />
    </TaxContextProvider>
  </ApolloProvider>,
  document.getElementById('root')
);
