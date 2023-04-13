import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import '../styles/globals.css';

const client = new ApolloClient({
  uri: 'https://graphql-pokemon2.vercel.app/', // your GraphQL server endpoint
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
