import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import {
  GetLendingStationsGQL,
  ReloadLendingStationByIdGQL,
  ReloadLendingStationByIdQueryVariables,
  UpdateLendingStationGQL,
  UpdateLendingStationMutationVariables,
  LockLendingStationGQL,
  LockLendingStationMutationVariables,
  UnlockLendingStationGQL,
  UnlockLendingStationMutationVariables,
  CreateLendingStationGQL,
  CreateLendingStationMutationVariables,
  DeleteLendingStationGQL,
  DeleteLendingStationMutationVariables,
  GetLendingStationByIdGQL,
  GetLendingStationByIdQueryVariables,
} from '../../generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class LendingStationsService {
  /** LendingStations Array */
  tableData: BehaviorSubject<any[]> = new BehaviorSubject(null);
  loadingRowIds: BehaviorSubject<string[]> = new BehaviorSubject([]);
  successfullyCreatedRowWithId: Subject<string> = new Subject();
  pageData: BehaviorSubject<any> = new BehaviorSubject(null);
  isLoadingPageData: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private getLendingStationsGQL: GetLendingStationsGQL,
    private getLendingStationByIdGQL: GetLendingStationByIdGQL,
    private reloadLendingStationByIdGQL: ReloadLendingStationByIdGQL,
    private updateLendingStationGQL: UpdateLendingStationGQL,
    private lockLendingStationGQL: LockLendingStationGQL,
    private unlockLendingStationGQL: UnlockLendingStationGQL,
    private createLendingStationGQL: CreateLendingStationGQL,
    private deleteLendingStationGQL: DeleteLendingStationGQL
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
    this.getLendingStationsGQL.fetch().subscribe((result) => {
      this.tableData.next(result.data?.lendingStations);
    });
  }

  loadPageData(variables: GetLendingStationByIdQueryVariables) {
    this.pageData.next(null);
    this.isLoadingPageData.next(true);
    this.getLendingStationByIdGQL
      .fetch(variables)
      .subscribe((result) => {
        this.pageData.next(result.data.lendingStationById);
      })
      .add(() => {
        this.isLoadingPageData.next(false);
      });
  }

  reloadLendingStation(variables: ReloadLendingStationByIdQueryVariables) {
    this.addLoadingRowId(variables.id);
    this.reloadLendingStationByIdGQL
      .fetch(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result.data.lendingStationById);
      })
      .add(() => {
        this.removeLoadingRowId(variables.id);
      });
  }

  createLendingStation(currentId: string, variables: CreateLendingStationMutationVariables) {
    this.createLendingStationGQL.mutate(variables).subscribe((result) => {
      const newLendingStation = result.data.createLendingStation;
      this.tableData.next([newLendingStation, ...this.tableData.value]);
      this.successfullyCreatedRowWithId.next(currentId);
    });
  }

  updateLendingStation(variables: UpdateLendingStationMutationVariables) {
    this.addLoadingRowId(variables.lendingStation.id);
    this.updateLendingStationGQL
      .mutate(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result.data.updateLendingStation);
      })
      .add(() => {
        this.removeLoadingRowId(variables.lendingStation.id);
      });
  }

  lockLendingStation(variables: LockLendingStationMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.lockLendingStationGQL
      .mutate(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result.data.lockLendingStation);
      })
      .add(() => {
        this.removeLoadingRowId(variables.id);
      });
  }

  unlockLendingStation(variables: UnlockLendingStationMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.unlockLendingStationGQL
      .mutate(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result.data.unlockLendingStation);
      })
      .add(() => {
        this.removeLoadingRowId(variables.id);
      });
  }

  deleteLendingStation(variables: DeleteLendingStationMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.deleteLendingStationGQL
      .mutate(variables)
      .subscribe((result) => {
        if (result.data) {
          this.tableData.next(
            [...this.tableData.value].filter((lendingStation) => lendingStation.id !== variables.id)
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

