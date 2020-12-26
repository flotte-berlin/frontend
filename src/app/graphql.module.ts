import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { environment } from '../environments/environment';
import { DefaultOptions } from '@apollo/client/core/ApolloClient';

import { onError } from '@apollo/link-error';

import { HttpLink } from 'apollo-angular/http';
import { SnackBarService } from './services/snackbar.service';
import { getErrorMessage } from './helper/getErrorMessage';

const uri = environment.apiUrl + '/graphql'; // <-- add the URL of the GraphQL server here

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

export function createApollo(
  httpLink: HttpLink,
  snackBar: SnackBarService
): ApolloClientOptions<any> {
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      snackBar.openSnackBar(getErrorMessage(graphQLErrors[0] || null), 'Ok', true);
    }

    if (networkError) {
      //console.log(`[Network error]: ${networkError}`);
      // THE FOLLOWING CODE IS UNTESTED
      //snackBar.openSnackBar("Ein NetzwerkFehler ist aufgetreten", "Ok", true, [{"message": networkError}] );
      snackBar.openSnackBar(JSON.stringify(networkError), '', true);
    }
  });

  return {
    link: errorLink.concat(httpLink.create({ uri })),
    cache: new InMemoryCache({}),
    defaultOptions: defaultOptions,
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, SnackBarService],
    },
  ],
})
export class GraphQLModule {}
