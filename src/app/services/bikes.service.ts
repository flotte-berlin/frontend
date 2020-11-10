import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  GetCargoBikesGQL,
  GetCargoBikesQuery,
  GetCargoBikeByIdGQL,
  GetCargoBikeByIdQueryVariables,
  UpdateCargoBikeGQL,
  UpdateCargoBikeMutationVariables,
  LockCargoBikeGQL,
  LockCargoBikeMutationVariables,
  UnlockCargoBikeGQL,
  UnlockCargoBikeMutationVariables
} from 'src/generated/graphql';
import { DeepExtractTypeSkipArrays } from 'ts-deep-extract-types';

export type CargoBikeResult = DeepExtractTypeSkipArrays<
  GetCargoBikesQuery,
  ['cargoBikes']
>;

@Injectable({
  providedIn: 'root',
})
export class BikesService {
  bikes: BehaviorSubject<CargoBikeResult[]> = new BehaviorSubject([]);

  constructor(
    private getCargoBikesGQL: GetCargoBikesGQL,
    private getCargoBikeByIdGQL: GetCargoBikeByIdGQL,
    private updateCargoBikeGQL: UpdateCargoBikeGQL,
    private lockCargoBikeGQL: LockCargoBikeGQL,
    private unlockCargoBikeGQL: UnlockCargoBikeGQL
  ) { }

  loadBikes() {
    this.getCargoBikesGQL.fetch().subscribe((result) => {
      this.bikes.next(result.data.cargoBikes);
    });
  }

  reloadBike(variables: GetCargoBikeByIdQueryVariables) {
    this.getCargoBikeByIdGQL.fetch(variables).subscribe((result) => {
      const newBike = result.data.cargoBikeById;
      this.bikes.next(
        this.bikes.value.map((bike) =>
          newBike.id === bike.id ? newBike : bike
        )
      );
    });
  }

  updateBike(variableValues: UpdateCargoBikeMutationVariables) {
    this.updateCargoBikeGQL.mutate(variableValues).subscribe((result) => {
      const newBike = result.data.updateCargoBike;
      this.bikes.next(
        this.bikes.value.map((bike) =>
          newBike.id === bike.id ? newBike : bike
        )
      );
    });
  }

  lockBike(variables: LockCargoBikeMutationVariables) {
    this.lockCargoBikeGQL.mutate(variables).subscribe((result) => {
      const lockedBike = result.data.lockCargoBike;
      this.bikes.next(
        this.bikes.value.map((bike) =>
        lockedBike.id === bike.id ? lockedBike : bike
        )
      );
    })
  }

  unlockBike(variables: LockCargoBikeMutationVariables) {
    this.unlockCargoBikeGQL.mutate(variables).subscribe((result) => {
      const unlockedBike = result.data.unlockCargoBike;
      this.bikes.next(
        this.bikes.value.map((bike) =>
        unlockedBike.id === bike.id ? unlockedBike : bike
        )
      );
    })
  }

  relockBike(variables: LockCargoBikeMutationVariables) {
    this.lockCargoBikeGQL.mutate(variables).subscribe();
  }
}
