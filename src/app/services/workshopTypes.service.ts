import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import {
  GetWorkshopTypesGQL,
  CreateWorkshopTypeGQL,
  CreateWorkshopTypeMutationVariables,
  UpdateWorkshopTypeGQL,
  UpdateWorkshopTypeMutationVariables,
  LockWorkshopTypeGQL,
  LockWorkshopTypeMutationVariables,
  UnlockWorkshopTypeGQL,
  UnlockWorkshopTypeMutationVariables,
  DeleteWorkshopTypeGQL,
  DeleteWorkshopTypeMutationVariables,
} from '../../generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class WorkshopTypesService {
  /** WorkshopTypes Array */
  tableData: BehaviorSubject<any[]> = new BehaviorSubject(null);
  loadingRowIds: BehaviorSubject<string[]> = new BehaviorSubject([]);
  successfullyCreatedRowWithId: Subject<string> = new Subject();
  //pageData: BehaviorSubject<any> = new BehaviorSubject([]);
  //isLoadingPageData: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private getWorkshopTypesGQL: GetWorkshopTypesGQL,
    private createWorkshopTypeGQL: CreateWorkshopTypeGQL,
    private updateWorkshopTypeGQL: UpdateWorkshopTypeGQL,
    private lockWorkshopTypeGQL: LockWorkshopTypeGQL,
    private unlockWorkshopTypeGQL: UnlockWorkshopTypeGQL,
    private deleteWorkshopTypeGQL: DeleteWorkshopTypeGQL
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
    this.getWorkshopTypesGQL.fetch().subscribe((result) => {
      this.tableData.next(result?.data?.workshopTypes);
    });
  }

  create(currentId: string, variables: CreateWorkshopTypeMutationVariables) {
    this.createWorkshopTypeGQL.mutate(variables).subscribe((result) => {
      const newRow = result?.data?.createWorkshopType;
      this.tableData.next([newRow, ...this.tableData.value]);
      this.successfullyCreatedRowWithId.next(currentId);
    });
  }

  update(variables: UpdateWorkshopTypeMutationVariables) {
    this.addLoadingRowId(variables.workshopType.id);
    this.updateWorkshopTypeGQL
      .mutate(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result?.data?.updateWorkshopType);
      })
      .add(() => {
        this.removeLoadingRowId(variables.workshopType.id);
      });
  }

  lock(variables: LockWorkshopTypeMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.lockWorkshopTypeGQL
      .mutate(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result?.data?.lockWorkshopType);
      })
      .add(() => {
        this.removeLoadingRowId(variables.id);
      });
  }

  unlock(variables: UnlockWorkshopTypeMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.unlockWorkshopTypeGQL
      .mutate(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result?.data?.unlockWorkshopType);
      })
      .add(() => {
        this.removeLoadingRowId(variables.id);
      });
  }

  delete(variables: DeleteWorkshopTypeMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.deleteWorkshopTypeGQL
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
