import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GetCargoBikesGQL, GetCargoBikesQuery } from 'src/generated/graphql';
import { DeepExtractTypeSkipArrays } from 'ts-deep-extract-types';

export type CargoBikeResult = DeepExtractTypeSkipArrays<GetCargoBikesQuery, ["cargoBikes"]>;

@Injectable({
  providedIn: 'root'
})
export class BikesService {
  bikes: BehaviorSubject<CargoBikeResult[]> = new BehaviorSubject([]);

  constructor(private bikesGQL: GetCargoBikesGQL) { }

  loadBikes() {
    this.bikesGQL.watch().valueChanges.subscribe((result) => {
      this.bikes.next(result.data.cargoBikes);
    });
  }
}
