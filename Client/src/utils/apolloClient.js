import ApolloLinkTimeout from "apollo-link-timeout";
import { createHttpLink, InMemoryCache, ApolloClient, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities"
import { setContext } from "@apollo/client/link/context";
import Constants from "expo-constants";
import { WebSocketLink } from '@apollo/client/link/ws';

const createApolloClient = (authStorage) => {
  const timeoutLink = new ApolloLinkTimeout(6000);

   const wsLink = new WebSocketLink({
    uri: `ws://${Constants.manifest.extra.apolloURI}/subscriptions`,
    options: {
      reconnect: true
    }
  });

  const _httpLink = createHttpLink({
    uri: `http://${Constants.manifest.extra.apolloURI}/graphql`,
  });

  const timeoutHttpLink = timeoutLink.concat(_httpLink);

  const authLink = setContext(async (_, { headers }) => {
    const token = await authStorage.getAccessToken();

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const httpLink = authLink.concat(timeoutHttpLink)

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );
  

  return new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
