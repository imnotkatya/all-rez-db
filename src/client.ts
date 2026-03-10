import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const link = new HttpLink({ uri: "/graphql" });

export const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});
