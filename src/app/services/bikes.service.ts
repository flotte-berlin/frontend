import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import {
  GetCargoBikesGQL,
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
  CopyCargoBikeByIdGQL,
  CopyCargoBikeByIdQueryVariables
} from 'src/generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class BikesService {
  /** CargoBikes Array */
  tableData: BehaviorSubject<any[]> = new BehaviorSubject(null);
  loadingRowIds: BehaviorSubject<string[]> = new BehaviorSubject([]);
  successfullyCreatedRowWithId: Subject<string> = new Subject();
  pageData: BehaviorSubject<any> = new BehaviorSubject(null);
  isLoadingPageData: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private getCargoBikesGQL: GetCargoBikesGQL,
    private getCargoBikeByIdGQL: GetCargoBikeByIdGQL,
    private reloadCargoBikeByIdGQL: ReloadCargoBikeByIdGQL,
    private updateCargoBikeGQL: UpdateCargoBikeGQL,
    private copyCargoBikeByIdGQL: CopyCargoBikeByIdGQL,
    private lockCargoBikeGQL: LockCargoBikeGQL,
    private unlockCargoBikeGQL: UnlockCargoBikeGQL,
    private createCargoBikeGQL: CreateCargoBikeGQL,
    private deleteCargoBikeGQL: DeleteCargoBikeGQL
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
    this.getCargoBikesGQL.fetch().subscribe((result) => {
      this.tableData.next(result?.data?.cargoBikes);
    });
  }

  loadPageData(variables: GetCargoBikeByIdQueryVariables) {
    this.pageData.next(null);
    this.isLoadingPageData.next(true);
    this.getCargoBikeByIdGQL
      .fetch(variables)
      .subscribe((result) => {
        this.pageData.next(result?.data?.cargoBikeById);
      })
      .add(() => {
        this.isLoadingPageData.next(false);
      });
  }

  copyBikeById(variables: CopyCargoBikeByIdQueryVariables) {

    this.copyCargoBikeByIdGQL
      .fetch(variables)
      .subscribe((result) => {
        const newBike = result?.data?.copyCargoBikeById;
        newBike["newObject"] = true;
        const currentTableData = this.tableData.getValue();
        this.tableData.next([newBike, ...this.tableData.getValue()]);
        this.tableData.next(currentTableData);
      })
  }

  reloadBike(variables: ReloadCargoBikeByIdQueryVariables) {
    this.addLoadingRowId(variables.id);
    this.reloadCargoBikeByIdGQL
      .fetch(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result?.data?.cargoBikeById);
      })
      .add(() => {
        this.removeLoadingRowId(variables.id);
      });
  }

  createBike(currentId: string, variables: CreateCargoBikeMutationVariables) {
    this.createCargoBikeGQL.mutate(variables).subscribe((result) => {
      const newBike = result?.data?.createCargoBike;
      this.tableData.next([newBike, ...this.tableData.value]);
      this.successfullyCreatedRowWithId.next(currentId);
    });
  }

  updateBike(variables: UpdateCargoBikeMutationVariables) {
    this.addLoadingRowId(variables.bike.id);
    this.updateCargoBikeGQL
      .mutate(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result?.data?.updateCargoBike);
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
        this.updateDataRowFromResponse(result?.data?.lockCargoBike);
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
        this.updateDataRowFromResponse(result?.data?.unlockCargoBike);
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
    if (rowFromResponse.id === this.pageData?.value?.id) {
      this.pageData.next(rowFromResponse);
    }
  }
}
