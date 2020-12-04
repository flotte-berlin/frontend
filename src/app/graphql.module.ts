/*import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import {
  ApolloClientOptions,
  HttpLink,
  InMemoryCache,
} from '@apollo/client/core';
//import { HttpLink } from 'apollo-angular/http';
import { environment } from '../environments/environment';
import { DefaultOptions } from '@apollo/client/core/ApolloClient';

//import { HttpLink } from 'apollo-link-http';
import { onError } from '@apollo/link-error';


const uri = environment.apiUrl + '/graphql'; // <-- add the URL of the GraphQL server here

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
    if (networkError) console.log(`[Network error]: ${networkError}`);
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
    //link: errorLink.concat(new HttpLink({ uri })),
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
    }
  ],
})
export class GraphQLModule {}

*/
import { Apollo } from 'apollo-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './helper/token.interceptor';
import { NgModule } from '@angular/core';

import {
  ApolloClientOptions,
  HttpLink,
  InMemoryCache,
} from '@apollo/client/core';

import { environment } from '../environments/environment';
import { onError } from '@apollo/link-error';
//import { HttpLink } from 'apollo-angular-link-http';

//import { HttpLink } from 'apollo-link-http';
//import { onError } from 'apollo-link-error';


@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ]
})
export class GraphQLModule2 {
  constructor(
    apollo: Apollo,
  ) {
    const link = new HttpLink({
      uri: environment.apiUrl + '/graphql',
    });
    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
        if (networkError) console.log(`[Network error]: ${networkError}`);
      });

      apollo.create({
        link: errorLink.concat(link),
        cache: new InMemoryCache()
      });

  }

  
  
  

}