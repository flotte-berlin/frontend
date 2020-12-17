import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import {
  GetBikeEventTypesGQL,
  CreateBikeEventTypeGQL,
  CreateBikeEventTypeMutationVariables,
  UpdateBikeEventTypeGQL,
  UpdateBikeEventTypeMutationVariables,
  LockBikeEventTypeGQL,
  LockBikeEventTypeMutationVariables,
  UnlockBikeEventTypeGQL,
  UnlockBikeEventTypeMutationVariables,
  DeleteBikeEventTypeGQL,
  DeleteBikeEventTypeMutationVariables,
} from '../../generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class BikeEventTypesService {
  /** BikeEventTypes Array */
  tableData: BehaviorSubject<any[]> = new BehaviorSubject(null);
  loadingRowIds: BehaviorSubject<string[]> = new BehaviorSubject([]);
  successfullyCreatedRowWithId: Subject<string> = new Subject();
  //pageData: BehaviorSubject<any> = new BehaviorSubject([]);
  //isLoadingPageData: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private getBikeEventTypesGQL: GetBikeEventTypesGQL,
    private createBikeEventTypeGQL: CreateBikeEventTypeGQL,
    private updateBikeEventTypeGQL: UpdateBikeEventTypeGQL,
    private lockBikeEventTypeGQL: LockBikeEventTypeGQL,
    private unlockBikeEventTypeGQL: UnlockBikeEventTypeGQL,
    private deleteBikeEventTypeGQL: DeleteBikeEventTypeGQL
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
    this.loadingRowIds.next(this.loadingRowIds.value);
  }

  loadTableData() {
    this.tableData.next(null);
    this.getBikeEventTypesGQL.fetch().subscribe((result) => {
      this.tableData.next(result?.data?.bikeEventTypes);
    });
  }

  create(currentId: string, variables: CreateBikeEventTypeMutationVariables) {
    this.createBikeEventTypeGQL.mutate(variables).subscribe((result) => {
      const newRow = result?.data?.createBikeEventType;
      this.tableData.next([newRow, ...this.tableData.value]);
      this.successfullyCreatedRowWithId.next(currentId);
    });
  }

  update(variables: UpdateBikeEventTypeMutationVariables) {
    this.addLoadingRowId(variables.bikeEventType.id);
    this.updateBikeEventTypeGQL
      .mutate(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result?.data?.updateBikeEventType);
      })
      .add(() => {
        this.removeLoadingRowId(variables.bikeEventType.id);
      });
  }

  lock(variables: LockBikeEventTypeMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.lockBikeEventTypeGQL
      .mutate(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result?.data?.lockBikeEventType);
      })
      .add(() => {
        this.removeLoadingRowId(variables.id);
      });
  }

  unlock(variables: UnlockBikeEventTypeMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.unlockBikeEventTypeGQL
      .mutate(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result?.data?.unlockBikeEventType);
      })
      .add(() => {
        this.removeLoadingRowId(variables.id);
      });
  }

  delete(variables: DeleteBikeEventTypeMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.deleteBikeEventTypeGQL
      .mutate(variables)
      .subscribe((result) => {
        if (result?.data) {
          this.tableData.next(
            [...this.tableData.value].filter((bike) => bike.id !== variables.id)
          );
        }
      })
      .add(() => {
        this.removeLoadingRowId(variables.id);
      });
  }

  private updateDataRowFromResponse(rowFromResponse: any) {
    if (this.tableData.value) {
      const newTableData = this.tableData.value.map((row) =>
        rowFromResponse.id === row.id ? rowFromResponse : row
      );
      this.tableData.next(newTableData);
    }
  }
}
