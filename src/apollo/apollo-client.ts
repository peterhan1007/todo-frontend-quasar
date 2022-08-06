import { ApolloError } from '@apollo/client';
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from '@apollo/client/core';
import { ErrorResponse } from '@apollo/client/link/error';
import { onError } from '@apollo/client/link/error';
import { logErrorMessages } from '@vue/apollo-util';

function getHeaders() {
  const headers = {
    'content-type': 'application/json',
  };

  const token = window.localStorage.getItem('apollo-token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

// Create an http link:
const httpLink = new HttpLink({
  uri: 'http://localhost:3000/graphql',
  fetch: (uri: RequestInfo, options: RequestInit) => {
    options.headers = getHeaders();
    return fetch(uri, options);
  },
});

const errorLink = onError((error: ErrorResponse | ApolloError) => {
  if (process.env.NODE_ENV !== 'production') {
    logErrorMessages(error);
  }
});

const omitTypename = (key: any, value: any) => {
  return key === '__typename' ? undefined : value;
};

const omitTypenameLink = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    operation.variables = JSON.parse(
      JSON.stringify(operation.variables),
      omitTypename
    );
  }
  return forward(operation);
});

const link = ApolloLink.from([omitTypenameLink, httpLink]);
// Create the apollo client
export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: true,
  link: errorLink.concat(link),
});
