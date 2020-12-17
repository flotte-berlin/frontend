import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import {
  GetBikeEventsGQL,
  ReloadBikeEventByIdGQL,
  ReloadBikeEventByIdQueryVariables,
  UpdateBikeEventGQL,
  UpdateBikeEventMutationVariables,
  LockBikeEventGQL,
  LockBikeEventMutationVariables,
  UnlockBikeEventGQL,
  UnlockBikeEventMutationVariables,
  CreateBikeEventGQL,
  CreateBikeEventMutationVariables,
  DeleteBikeEventGQL,
  DeleteBikeEventMutationVariables,
  GetBikeEventByIdGQL,
  GetBikeEventByIdQueryVariables,
} from '../../generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class BikeEventsService {
  /** BikeEvents Array */
  tableData: BehaviorSubject<any[]> = new BehaviorSubject(null);
  loadingRowIds: BehaviorSubject<string[]> = new BehaviorSubject([]);
  successfullyCreatedRowWithId: Subject<string> = new Subject();
  pageData: BehaviorSubject<any> = new BehaviorSubject(null);
  isLoadingPageData: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private getBikeEventsGQL: GetBikeEventsGQL,
    private getBikeEventByIdGQL: GetBikeEventByIdGQL,
    private reloadBikeEventByIdGQL: ReloadBikeEventByIdGQL,
    private updateBikeEventGQL: UpdateBikeEventGQL,
    private lockBikeEventGQL: LockBikeEventGQL,
    private unlockBikeEventGQL: UnlockBikeEventGQL,
    private createBikeEventGQL: CreateBikeEventGQL,
    private deleteBikeEventGQL: DeleteBikeEventGQL
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
    this.getBikeEventsGQL.fetch().subscribe((result) => {
      this.tableData.next(result?.data?.bikeEvents);
    });
  }

  loadPageData(variables: GetBikeEventByIdQueryVariables) {
    this.pageData.next(null);
    this.isLoadingPageData.next(true);
    this.getBikeEventByIdGQL
      .fetch(variables)
      .subscribe((result) => {
        this.pageData.next(result?.data?.bikeEventById);
      })
      .add(() => {
        this.isLoadingPageData.next(false);
      });
  }

  reloadBikeEvent(variables: ReloadBikeEventByIdQueryVariables) {
    this.addLoadingRowId(variables.id);
    this.reloadBikeEventByIdGQL
      .fetch(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result?.data?.bikeEventById);
      })
      .add(() => {
        this.removeLoadingRowId(variables.id);
      });
  }

  createBikeEvent(currentId: string, variables: CreateBikeEventMutationVariables) {
    this.createBikeEventGQL.mutate(variables).subscribe((result) => {
      const newBikeEvent = result?.data?.createBikeEvent;
      this.tableData.next([newBikeEvent, ...this.tableData.value]);
      this.successfullyCreatedRowWithId.next(currentId);
    });
  }

  updateBikeEvent(variables: UpdateBikeEventMutationVariables) {
    this.addLoadingRowId(variables.bikeEvent.id);
    this.updateBikeEventGQL
      .mutate(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result?.data?.updateBikeEvent);
      })
      .add(() => {
        this.removeLoadingRowId(variables.bikeEvent.id);
      });
  }

  lockBikeEvent(variables: LockBikeEventMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.lockBikeEventGQL
      .mutate(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result?.data?.lockBikeEvent);
      })
      .add(() => {
        this.removeLoadingRowId(variables.id);
      });
  }

  unlockBikeEvent(variables: UnlockBikeEventMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.unlockBikeEventGQL
      .mutate(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result?.data?.unlockBikeEvent);
      })
      .add(() => {
        this.removeLoadingRowId(variables.id);
      });
  }

  deleteBikeEvent(variables: DeleteBikeEventMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.deleteBikeEventGQL
      .mutate(variables)
      .subscribe((result) => {
        if (result?.data) {
          this.tableData.next(
            [...this.tableData.value].filter((bikeEvent) => bikeEvent.id !== variables.id)
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
    if (rowFromResponse.id === this.pageData?.value?.id) {
      this.pageData.next(rowFromResponse);
    }
  }
}

