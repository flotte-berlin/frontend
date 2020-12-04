import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import {
  GetOrganisationsGQL,
  ReloadOrganisationByIdGQL,
  ReloadOrganisationByIdQueryVariables,
  UpdateOrganisationGQL,
  UpdateOrganisationMutationVariables,
  LockOrganisationGQL,
  LockOrganisationMutationVariables,
  UnlockOrganisationGQL,
  UnlockOrganisationMutationVariables,
  CreateOrganisationGQL,
  CreateOrganisationMutationVariables,
  DeleteOrganisationGQL,
  DeleteOrganisationMutationVariables,
  GetOrganisationByIdGQL,
  GetOrganisationByIdQueryVariables,
} from '../../generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class OrganisationsService {
  /** Organisations Array */
  tableData: BehaviorSubject<any[]> = new BehaviorSubject(null);
  loadingRowIds: BehaviorSubject<string[]> = new BehaviorSubject([]);
  successfullyCreatedRowWithId: Subject<string> = new Subject();
  pageData: BehaviorSubject<any> = new BehaviorSubject(null);
  isLoadingPageData: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private getOrganisationsGQL: GetOrganisationsGQL,
    private getOrganisationByIdGQL: GetOrganisationByIdGQL,
    private reloadOrganisationByIdGQL: ReloadOrganisationByIdGQL,
    private updateOrganisationGQL: UpdateOrganisationGQL,
    private lockOrganisationGQL: LockOrganisationGQL,
    private unlockOrganisationGQL: UnlockOrganisationGQL,
    private createOrganisationGQL: CreateOrganisationGQL,
    private deleteOrganisationGQL: DeleteOrganisationGQL
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
    this.getOrganisationsGQL.fetch().subscribe((result) => {
      this.tableData.next(result.data?.organisations);
    });
  }

  loadPageData(variables: GetOrganisationByIdQueryVariables) {
    this.pageData.next(null);
    this.isLoadingPageData.next(true);
    this.getOrganisationByIdGQL
      .fetch(variables)
      .subscribe((result) => {
        this.pageData.next(result.data.organisationById);
      })
      .add(() => {
        this.isLoadingPageData.next(false);
      });
  }

  reloadOrganisation(variables: ReloadOrganisationByIdQueryVariables) {
    this.addLoadingRowId(variables.id);
    this.reloadOrganisationByIdGQL
      .fetch(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result.data.organisationById);
      })
      .add(() => {
        this.removeLoadingRowId(variables.id);
      });
  }

  createOrganisation(currentId: string, variables: CreateOrganisationMutationVariables) {
    this.createOrganisationGQL.mutate(variables).subscribe((result) => {
      const newOrganisation = result.data.createOrganisation;
      this.tableData.next([newOrganisation, ...this.tableData.value]);
      this.successfullyCreatedRowWithId.next(currentId);
    });
  }

  updateOrganisation(variables: UpdateOrganisationMutationVariables) {
    this.addLoadingRowId(variables.organisation.id);
    this.updateOrganisationGQL
      .mutate(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result.data.updateOrganisation);
      })
      .add(() => {
        this.removeLoadingRowId(variables.organisation.id);
      });
  }

  lockOrganisation(variables: LockOrganisationMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.lockOrganisationGQL
      .mutate(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result.data.lockOrganisation);
      })
      .add(() => {
        this.removeLoadingRowId(variables.id);
      });
  }

  unlockOrganisation(variables: UnlockOrganisationMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.unlockOrganisationGQL
      .mutate(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result.data.unlockOrganisation);
      })
      .add(() => {
        this.removeLoadingRowId(variables.id);
      });
  }

  deleteOrganisation(variables: DeleteOrganisationMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.deleteOrganisationGQL
      .mutate(variables)
      .subscribe((result) => {
        if (result.data) {
          this.tableData.next(
            [...this.tableData.value].filter((organisation) => organisation.id !== variables.id)
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

