import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import {
  GetActionLogByUserIdGQL,
  GetActionLogByUserIdQueryVariables,
  GetActionLogGQL,
} from '../../generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class PersonsService {
  constructor(
    private getActionLogGQL: GetActionLogGQL,
    private getActionLogByUserIdGQL: GetActionLogByUserIdGQL
  ) {}

  getActionLogAll() {
    return this.getActionLogGQL.fetch();
  }

  getActionLogByUserId(variables: GetActionLogByUserIdQueryVariables) {
    return this.getActionLogByUserIdGQL.fetch(variables);
  }
}
