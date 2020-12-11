import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import {
  GetEngagementsGQL,
  CreateEngagementGQL,
  CreateEngagementMutationVariables,
  UpdateEngagementGQL,
  UpdateEngagementMutationVariables,
  LockEngagementGQL,
  LockEngagementMutationVariables,
  UnlockEngagementGQL,
  UnlockEngagementMutationVariables,
  DeleteEngagementGQL,
  DeleteEngagementMutationVariables,
} from '../../generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class EngagementsService {
  /** Engagements Array */
  tableData: BehaviorSubject<any[]> = new BehaviorSubject(null);
  loadingRowIds: BehaviorSubject<string[]> = new BehaviorSubject([]);
  successfullyCreatedRowWithId: Subject<string> = new Subject();
  //pageData: BehaviorSubject<any> = new BehaviorSubject([]);
  //isLoadingPageData: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private getEngagementsGQL: GetEngagementsGQL,
    private createEngagementGQL: CreateEngagementGQL,
    private updateEngagementGQL: UpdateEngagementGQL,
    private lockEngagementGQL: LockEngagementGQL,
    private unlockEngagementGQL: UnlockEngagementGQL,
    private deleteEngagementGQL: DeleteEngagementGQL
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
    this.getEngagementsGQL.fetch().subscribe((result) => {
      this.tableData.next(result.data.engagements);
    });
  }

  create(currentId: string, variables: CreateEngagementMutationVariables) {
    this.createEngagementGQL.mutate(variables).subscribe((result) => {
      const newRow = result.data.createEngagement;
      this.tableData.next([newRow, ...this.tableData.value]);
      this.successfullyCreatedRowWithId.next(currentId);
    });
  }

  update(variables: UpdateEngagementMutationVariables) {
    this.addLoadingRowId(variables.engagement.id);
    this.updateEngagementGQL
      .mutate(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result.data.updateEngagement);
      })
      .add(() => {
        this.removeLoadingRowId(variables.engagement.id);
      });
  }

  lock(variables: LockEngagementMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.lockEngagementGQL
      .mutate(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result.data.lockEngagement);
      })
      .add(() => {
        this.removeLoadingRowId(variables.id);
      });
  }

  unlock(variables: UnlockEngagementMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.unlockEngagementGQL
      .mutate(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result.data.unlockEngagement);
      })
      .add(() => {
        this.removeLoadingRowId(variables.id);
      });
  }

  delete(variables: DeleteEngagementMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.deleteEngagementGQL
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
