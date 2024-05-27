import React from 'react';
import ReactDom from 'react-dom/client';
import App from './App';
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';
//import { cache } from './graphql/cache';

const client = new ApolloClient({
  link: createHttpLink({ 
    uri: 'https://countries.trevorblades.com/' 
  }),
  cache: new InMemoryCache(),
});

const root = ReactDom.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);