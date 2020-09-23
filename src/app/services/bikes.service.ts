import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GetCargoBikesGQL, GetCargoBikesQuery, GetCargoBikeByIdGQL, GetCargoBikeByIdQuery, GetCargoBikeByIdQueryVariables } from 'src/generated/graphql';
import { DeepExtractTypeSkipArrays } from 'ts-deep-extract-types';

export type CargoBikeResult = DeepExtractTypeSkipArrays<GetCargoBikesQuery, ["cargoBikes"]>;

@Injectable({
  providedIn: 'root'
})
export class BikesService {
  bikes: BehaviorSubject<CargoBikeResult[]> = new BehaviorSubject([]);

  constructor(private getCargoBikesGQL: GetCargoBikesGQL, private getCargoBikeByIdGQL: GetCargoBikeByIdGQL) { }

  loadBikes() {
    this.getCargoBikesGQL.watch().valueChanges.subscribe((result) => {
      this.bikes.next(result.data.cargoBikes);
    });
  }

  reloadBike(parameter: GetCargoBikeByIdQueryVariables) {
    this.getCargoBikeByIdGQL.watch().valueChanges.subscribe((result) => {
      const newBike = result.data.cargoBikeById;
      this.bikes.next(this.bikes.value.map(bike => (newBike.id === bike.id) ? newBike : bike));
    });
  }
}
