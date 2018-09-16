import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
});

export default props => (
    <ApolloProvider client={client}>
        {props.children}
    </ApolloProvider>
)