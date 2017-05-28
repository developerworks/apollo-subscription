import React from 'react'
import ReactDOM from 'react-dom'

import { AppContainer } from 'react-hot-loader'

import {
  ApolloProvider,
  ApolloClient,
  createNetworkInterface,
  createBatchingNetworkInterface

} from 'react-apollo'

import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';

import App from './App'

// const networkInterface = createBatchingNetworkInterface({
//   uri: 'http://localhost:7001/api',
//   batchInterval: 10
// });

const networkInterface = createNetworkInterface({
  uri: '/api'
});

const wsClient = new SubscriptionClient('ws://localhost:7003/feedback', {
  reconnect: true,
  connectionParams: {
    token: localStorage.getItem('token') ? localStorage.getItem('token') : null
  }
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
);

const client = new ApolloClient({
  networkInterfaceWithSubscriptions,
  connectToDevTools: true,
  dataIdFromObject: o => {
    if (o.__typename != null && o.id != null) {
      return `${o.__typename}-${o.id}`;
    } else {
      return `${o.id}`;
    }
  }
});

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <ApolloProvider client={client}>
        <Component />
      </ApolloProvider>
    </AppContainer>,
    document.getElementById('App')
  );
}

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    render(App)
  });
}

