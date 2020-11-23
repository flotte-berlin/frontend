import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  GetCargoBikesGQL,
  GetCargoBikesQuery,
  ReloadCargoBikeByIdGQL,
  ReloadCargoBikeByIdQueryVariables,
  UpdateCargoBikeGQL,
  UpdateCargoBikeMutationVariables,
  LockCargoBikeGQL,
  LockCargoBikeMutationVariables,
  UnlockCargoBikeGQL,
  UnlockCargoBikeMutationVariables,
  CreateCargoBikeGQL,
  CreateCargoBikeMutationVariables,
  DeleteCargoBikeGQL,
  DeleteCargoBikeMutationVariables,
  GetCargoBikeByIdGQL,
  GetCargoBikeByIdQueryVariables,
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
  /** CargoBikes Array */
  tableData: BehaviorSubject<CargoBikeResult[]> = new BehaviorSubject([]);
  loadingRowIds: BehaviorSubject<string[]> = new BehaviorSubject([]);
  pageData: BehaviorSubject<any> = new BehaviorSubject([]);
  loadingBike: BehaviorSubject<boolean> = new BehaviorSubject(false);
  

  constructor(
    private getCargoBikesGQL: GetCargoBikesGQL,
    private getCargoBikeByIdGQL: GetCargoBikeByIdGQL,
    private reloadCargoBikeByIdGQL: ReloadCargoBikeByIdGQL,
    private updateCargoBikeGQL: UpdateCargoBikeGQL,
    private lockCargoBikeGQL: LockCargoBikeGQL,
    private unlockCargoBikeGQL: UnlockCargoBikeGQL,
    private createCargoBikeGQL: CreateCargoBikeGQL,
    private deleteCargoBikeGQL: DeleteCargoBikeGQL,
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

  loadTableData() {
    this.getCargoBikesGQL.fetch().subscribe((result) => {
      this.tableData.next(result.data.cargoBikes);

    });
  }

  loadPageData(variables: GetCargoBikeByIdQueryVariables) {
    this.pageData.next(null);
    this.loadingBike.next(true);
    this.getCargoBikeByIdGQL
      .fetch(variables)
      .subscribe((result) => {
        this.pageData.next(result.data.cargoBikeById);
      })
      .add(() => {
        this.loadingBike.next(false);
      });
  }

  reloadBike(variables: ReloadCargoBikeByIdQueryVariables) {
    this.addLoadingRowId(variables.id);
    this.reloadCargoBikeByIdGQL
      .fetch(variables)
      .subscribe((result) => {
        const newBike = result.data.cargoBikeById;
        this.tableData.next(
          this.tableData.value.map((bike) =>
            newBike.id === bike.id ? newBike : bike
          )
        );
      })
      .add(() => {
        this.removeLoadingRowId(variables.id);
      });
  }

  createBike(variables: CreateCargoBikeMutationVariables) {
    this.createCargoBikeGQL
      .mutate(variables)
      .subscribe((result) => {
        const newBike = result.data.createCargoBike;
        this.tableData.next(
          [newBike, ...this.tableData.value]
        );
      })
  }

  updateBike(variables: UpdateCargoBikeMutationVariables) {
    this.addLoadingRowId(variables.bike.id);
    this.updateCargoBikeGQL
      .mutate(variables)
      .subscribe((result) => {
        const newBike = result.data.updateCargoBike;
        this.tableData.next(
          this.tableData.value.map((bike) =>
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
        this.tableData.next(
          this.tableData.value.map((bike) =>
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
        this.tableData.next(
          this.tableData.value.map((bike) =>
            unlockedBike.id === bike.id ? unlockedBike : bike
          )
        );
      })
      .add(() => {
        this.removeLoadingRowId(variables.id);
      });
  }

  deleteBike(variables: DeleteCargoBikeMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.deleteCargoBikeGQL
      .mutate(variables)
      .subscribe((result) => {
        if(result.data.deleteCargoBike) {
          this.tableData.next([...this.tableData.value].filter(bike => bike.id !== variables.id));
        }
      })
      .add(() => {
        this.removeLoadingRowId(variables.id);
      });
  }

  relockBike(variables: LockCargoBikeMutationVariables) {
    this.lockCargoBikeGQL.mutate(variables).subscribe();
  }
}
