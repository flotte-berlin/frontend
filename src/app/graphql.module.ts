import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import {
  ApolloClientOptions,
  ApolloLink,
  concat,
  InMemoryCache,
} from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { environment } from '../environments/environment';
import { DefaultOptions } from '@apollo/client/core/ApolloClient';


const uri = environment.apiUrl + '/graphql'; // <-- add the URL of the GraphQL server here

const authMiddleware = new ApolloLink((operation, forward) => {
  //Add token here TODO: use AuthService to get the Token
  operation.setContext({
    headers: {
      authorization: localStorage.getItem('requestToken') || null,
    }
  });
  return forward(operation).map((data) => {
    return data;
  });
});

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: concat(authMiddleware, httpLink.create({ uri })),
    cache: new InMemoryCache({}),
    defaultOptions: defaultOptions,
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
