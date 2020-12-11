import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import {
  GetWorkshopsGQL,
  ReloadWorkshopByIdGQL,
  ReloadWorkshopByIdQueryVariables,
  UpdateWorkshopGQL,
  UpdateWorkshopMutationVariables,
  LockWorkshopGQL,
  LockWorkshopMutationVariables,
  UnlockWorkshopGQL,
  UnlockWorkshopMutationVariables,
  CreateWorkshopGQL,
  CreateWorkshopMutationVariables,
  DeleteWorkshopGQL,
  DeleteWorkshopMutationVariables,
  GetWorkshopByIdGQL,
  GetWorkshopByIdQueryVariables,
} from '../../generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class WorkshopsService {
  /** Workshops Array */
  tableData: BehaviorSubject<any[]> = new BehaviorSubject(null);
  loadingRowIds: BehaviorSubject<string[]> = new BehaviorSubject([]);
  successfullyCreatedRowWithId: Subject<string> = new Subject();
  pageData: BehaviorSubject<any> = new BehaviorSubject(null);
  isLoadingPageData: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private getWorkshopsGQL: GetWorkshopsGQL,
    private getWorkshopByIdGQL: GetWorkshopByIdGQL,
    private reloadWorkshopByIdGQL: ReloadWorkshopByIdGQL,
    private updateWorkshopGQL: UpdateWorkshopGQL,
    private lockWorkshopGQL: LockWorkshopGQL,
    private unlockWorkshopGQL: UnlockWorkshopGQL,
    private createWorkshopGQL: CreateWorkshopGQL,
    private deleteWorkshopGQL: DeleteWorkshopGQL
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
    this.getWorkshopsGQL.fetch().subscribe((result) => {
      this.tableData.next(result.data?.workshops);
    });
  }

  loadPageData(variables: GetWorkshopByIdQueryVariables) {
    this.pageData.next(null);
    this.isLoadingPageData.next(true);
    this.getWorkshopByIdGQL
      .fetch(variables)
      .subscribe((result) => {
        this.pageData.next(result.data.workshopById);
      })
      .add(() => {
        this.isLoadingPageData.next(false);
      });
  }

  reloadWorkshop(variables: ReloadWorkshopByIdQueryVariables) {
    this.addLoadingRowId(variables.id);
    this.reloadWorkshopByIdGQL
      .fetch(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result.data.workshopById);
      })
      .add(() => {
        this.removeLoadingRowId(variables.id);
      });
  }

  createWorkshop(currentId: string, variables: CreateWorkshopMutationVariables) {
    this.createWorkshopGQL.mutate(variables).subscribe((result) => {
      const newWorkshop = result.data.createWorkshop;
      this.tableData.next([newWorkshop, ...this.tableData.value]);
      this.successfullyCreatedRowWithId.next(currentId);
    });
  }

  updateWorkshop(variables: UpdateWorkshopMutationVariables) {
    this.addLoadingRowId(variables.workshop.id);
    this.updateWorkshopGQL
      .mutate(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result.data.updateWorkshop);
      })
      .add(() => {
        this.removeLoadingRowId(variables.workshop.id);
      });
  }

  lockWorkshop(variables: LockWorkshopMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.lockWorkshopGQL
      .mutate(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result.data.lockWorkshop);
      })
      .add(() => {
        this.removeLoadingRowId(variables.id);
      });
  }

  unlockWorkshop(variables: UnlockWorkshopMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.unlockWorkshopGQL
      .mutate(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result.data.unlockWorkshop);
      })
      .add(() => {
        this.removeLoadingRowId(variables.id);
      });
  }

  deleteWorkshop(variables: DeleteWorkshopMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.deleteWorkshopGQL
      .mutate(variables)
      .subscribe((result) => {
        if (result.data) {
          this.tableData.next(
            [...this.tableData.value].filter((workshop) => workshop.id !== variables.id)
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

