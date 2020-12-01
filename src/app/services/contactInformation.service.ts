import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import {
  GetContactInformationGQL,
  UpdateContactInformationGQL,
  UpdateContactInformationMutationVariables,
  LockContactInformationGQL,
  LockContactInformationMutationVariables,
  UnlockContactInformationGQL,
  UnlockContactInformationMutationVariables,
  CreateContactInformationGQL,
  CreateContactInformationMutationVariables,
  DeleteContactInformationGQL,
  DeleteContactInformationMutationVariables,
} from '../../generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class ContactInformationService {
  /** ContactInformation Array */
  tableData: BehaviorSubject<any[]> = new BehaviorSubject(null);
  loadingRowIds: BehaviorSubject<string[]> = new BehaviorSubject([]);
  successfullyCreatedRowWithId: Subject<string> = new Subject();
  pageData: BehaviorSubject<any> = new BehaviorSubject(null);
  isLoadingPageData: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private getContactInformationGQL: GetContactInformationGQL,
    private updateContactInformationGQL: UpdateContactInformationGQL,
    private lockContactInformationGQL: LockContactInformationGQL,
    private unlockContactInformationGQL: UnlockContactInformationGQL,
    private createContactInformationGQL: CreateContactInformationGQL,
    private deleteContactInformationGQL: DeleteContactInformationGQL
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
    this.getContactInformationGQL.fetch().subscribe((result) => {
      this.tableData.next(result.data?.contactInformation);
    });
  }

  createContactInformation(currentId: string, variables: CreateContactInformationMutationVariables) {
    this.createContactInformationGQL.mutate(variables).subscribe((result) => {
      const newContactInformation = result.data.createContactInformation;
      this.tableData.next([newContactInformation, ...this.tableData.value]);
      this.successfullyCreatedRowWithId.next(currentId);
    });
  }

  updateContactInformation(variables: UpdateContactInformationMutationVariables) {
    this.addLoadingRowId(variables.contactInformation.id);
    this.updateContactInformationGQL
      .mutate(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result.data.updateContactInformation);
      })
      .add(() => {
        this.removeLoadingRowId(variables.contactInformation.id);
      });
  }

  lockContactInformation(variables: LockContactInformationMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.lockContactInformationGQL
      .mutate(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result.data.lockContactInformation);
      })
      .add(() => {
        this.removeLoadingRowId(variables.id);
      });
  }

  unlockContactInformation(variables: UnlockContactInformationMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.unlockContactInformationGQL
      .mutate(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result.data.unlockContactInformation);
      })
      .add(() => {
        this.removeLoadingRowId(variables.id);
      });
  }

  deleteContactInformation(variables: DeleteContactInformationMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.deleteContactInformationGQL
      .mutate(variables)
      .subscribe((result) => {
        if (result.data) {
          this.tableData.next(
            [...this.tableData.value].filter((contactInformation) => contactInformation.id !== variables.id)
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
