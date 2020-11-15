import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SchemaService } from './schema.service';
import { deepCopy } from 'src/app/helperFunctions/deepCopy';
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
  UnlockCargoBikeMutationVariables,
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
  loadingRowIds: BehaviorSubject<string[]> = new BehaviorSubject([]);
  groupEnum: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(
    private schemaService: SchemaService,
    private getCargoBikesGQL: GetCargoBikesGQL,
    private getCargoBikeByIdGQL: GetCargoBikeByIdGQL,
    private updateCargoBikeGQL: UpdateCargoBikeGQL,
    private lockCargoBikeGQL: LockCargoBikeGQL,
    private unlockCargoBikeGQL: UnlockCargoBikeGQL
  ) {}

  addLoadingRowId(id: string) {
    this.loadingRowIds.next([...this.loadingRowIds.value, id]);
  }

  removeLoadingRowId(id: string) {
    this.loadingRowIds.value.forEach((item, index) => {
      if (item === id) {
        this.loadingRowIds.value.splice(index, 1);
      }
    });
  }

  loadBikes() {
    this.getCargoBikesGQL.fetch().subscribe((result) => {
      // comment in for performance testing
      /*for (let i = 1; i <= 500; i++) {
        const newBike = deepCopy(result.data.cargoBikes[0]);
        newBike.id = (i + 100).toString();
        result.data.cargoBikes.push(newBike);
      }*/
      this.bikes.next(result.data.cargoBikes);

    });
  }

  reloadBike(variables: GetCargoBikeByIdQueryVariables) {
    this.addLoadingRowId(variables.id);
    this.getCargoBikeByIdGQL
      .fetch(variables)
      .subscribe((result) => {
        const newBike = result.data.cargoBikeById;
        this.bikes.next(
          this.bikes.value.map((bike) =>
            newBike.id === bike.id ? newBike : bike
          )
        );
      })
      .add(() => {
        this.removeLoadingRowId(variables.id);
      });
  }

  updateBike(variables: UpdateCargoBikeMutationVariables) {
    this.addLoadingRowId(variables.bike.id);
    this.updateCargoBikeGQL
      .mutate(variables)
      .subscribe((result) => {
        const newBike = result.data.updateCargoBike;
        this.bikes.next(
          this.bikes.value.map((bike) =>
            newBike.id === bike.id ? newBike : bike
          )
        );
      })
      .add(() => {
        this.removeLoadingRowId(variables.bike.id);
      });
  }

  lockBike(variables: LockCargoBikeMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.lockCargoBikeGQL
      .mutate(variables)
      .subscribe((result) => {
        const lockedBike = result.data.lockCargoBike;
        this.bikes.next(
          this.bikes.value.map((bike) =>
            lockedBike.id === bike.id ? lockedBike : bike
          )
        );
      })
      .add(() => {
        this.removeLoadingRowId(variables.id);
      });
  }

  unlockBike(variables: UnlockCargoBikeMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.unlockCargoBikeGQL
      .mutate(variables)
      .subscribe((result) => {
        const unlockedBike = result.data.unlockCargoBike;
        this.bikes.next(
          this.bikes.value.map((bike) =>
            unlockedBike.id === bike.id ? unlockedBike : bike
          )
        );
      })
      .add(() => {
        this.removeLoadingRowId(variables.id);
      });
  }

  relockBike(variables: LockCargoBikeMutationVariables) {
    this.lockCargoBikeGQL.mutate(variables).subscribe();
  }
}
