import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import {
  GetEngagementTypesGQL,
  CreateEngagementTypeGQL,
  CreateEngagementTypeMutationVariables,
  UpdateEngagementTypeGQL,
  UpdateEngagementTypeMutationVariables,
  LockEngagementTypeGQL,
  LockEngagementTypeMutationVariables,
  UnlockEngagementTypeGQL,
  UnlockEngagementTypeMutationVariables,
  DeleteEngagementTypeGQL,
  DeleteEngagementTypeMutationVariables,
} from '../../generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class EngagementTypesService {
  /** EngagementTypes Array */
  tableData: BehaviorSubject<any[]> = new BehaviorSubject(null);
  loadingRowIds: BehaviorSubject<string[]> = new BehaviorSubject([]);
  successfullyCreatedRowWithId: Subject<string> = new Subject();
  //pageData: BehaviorSubject<any> = new BehaviorSubject([]);
  //isLoadingPageData: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private getEngagementTypesGQL: GetEngagementTypesGQL,
    private createEngagementTypeGQL: CreateEngagementTypeGQL,
    private updateEngagementTypeGQL: UpdateEngagementTypeGQL,
    private lockEngagementTypeGQL: LockEngagementTypeGQL,
    private unlockEngagementTypeGQL: UnlockEngagementTypeGQL,
    private deleteEngagementTypeGQL: DeleteEngagementTypeGQL
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
    this.getEngagementTypesGQL.fetch().subscribe((result) => {
      this.tableData.next(result.data.engagementTypes);
    });
  }

  create(currentId: string, variables: CreateEngagementTypeMutationVariables) {
    this.createEngagementTypeGQL.mutate(variables).subscribe((result) => {
      const newRow = result.data.createEngagementType;
      this.tableData.next([newRow, ...this.tableData.value]);
      this.successfullyCreatedRowWithId.next(currentId);
    });
  }

  update(variables: UpdateEngagementTypeMutationVariables) {
    this.addLoadingRowId(variables.engagementType.id);
    this.updateEngagementTypeGQL
      .mutate(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result.data.updateEngagementType);
      })
      .add(() => {
        this.removeLoadingRowId(variables.engagementType.id);
      });
  }

  lock(variables: LockEngagementTypeMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.lockEngagementTypeGQL
      .mutate(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result.data.lockEngagementType);
      })
      .add(() => {
        this.removeLoadingRowId(variables.id);
      });
  }

  unlock(variables: UnlockEngagementTypeMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.unlockEngagementTypeGQL
      .mutate(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result.data.unlockEngagementType);
      })
      .add(() => {
        this.removeLoadingRowId(variables.id);
      });
  }

  delete(variables: DeleteEngagementTypeMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.deleteEngagementTypeGQL
      .mutate(variables)
      .subscribe((result) => {
        if (result.data) {
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
