import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import {
  GetTimeFramesGQL,
  CreateTimeFrameGQL,
  CreateTimeFrameMutationVariables,
  UpdateTimeFrameGQL,
  UpdateTimeFrameMutationVariables,
  LockTimeFrameGQL,
  LockTimeFrameMutationVariables,
  UnlockTimeFrameGQL,
  UnlockTimeFrameMutationVariables,
  DeleteTimeFrameGQL,
  DeleteTimeFrameMutationVariables,
} from '../../generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class TimeFrameService {
  /** TimeFrames Array */
  tableData: BehaviorSubject<any[]> = new BehaviorSubject(null);
  loadingRowIds: BehaviorSubject<string[]> = new BehaviorSubject([]);
  successfullyCreatedRowWithId: Subject<string> = new Subject();
  //pageData: BehaviorSubject<any> = new BehaviorSubject([]);
  //isLoadingPageData: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private getTimeFramesGQL: GetTimeFramesGQL,
    private createTimeFrameGQL: CreateTimeFrameGQL,
    private updateTimeFrameGQL: UpdateTimeFrameGQL,
    private lockTimeFrameGQL: LockTimeFrameGQL,
    private unlockTimeFrameGQL: UnlockTimeFrameGQL,
    private deleteTimeFrameGQL: DeleteTimeFrameGQL
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
    this.getTimeFramesGQL.fetch().subscribe((result) => {
      this.tableData.next(result?.data?.timeFrames);
    });
  }

  create(currentId: string, variables: CreateTimeFrameMutationVariables) {
    this.createTimeFrameGQL.mutate(variables).subscribe((result) => {
      const newRow = result?.data?.createTimeFrame;
      this.tableData.next([newRow, ...this.tableData.value]);
      this.successfullyCreatedRowWithId.next(currentId);
    });
  }

  update(variables: UpdateTimeFrameMutationVariables) {
    this.addLoadingRowId(variables.timeFrame.id);
    this.updateTimeFrameGQL
      .mutate(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result?.data?.updateTimeFrame);
      })
      .add(() => {
        this.removeLoadingRowId(variables.timeFrame.id);
      });
  }

  lock(variables: LockTimeFrameMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.lockTimeFrameGQL
      .mutate(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result?.data?.lockTimeFrame);
      })
      .add(() => {
        this.removeLoadingRowId(variables.id);
      });
  }

  unlock(variables: UnlockTimeFrameMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.unlockTimeFrameGQL
      .mutate(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result?.data?.unlockTimeFrame);
      })
      .add(() => {
        this.removeLoadingRowId(variables.id);
      });
  }

  delete(variables: DeleteTimeFrameMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.deleteTimeFrameGQL
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
