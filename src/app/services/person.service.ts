import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import {
  GetPersonsGQL,
  ReloadPersonByIdGQL,
  ReloadPersonByIdQueryVariables,
  UpdatePersonGQL,
  UpdatePersonMutationVariables,
  LockPersonGQL,
  LockPersonMutationVariables,
  UnlockPersonGQL,
  UnlockPersonMutationVariables,
  CreatePersonGQL,
  CreatePersonMutationVariables,
  DeletePersonGQL,
  DeletePersonMutationVariables,
  GetPersonByIdGQL,
  GetPersonByIdQueryVariables,
} from '../../generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class PersonsService {
  /** Persons Array */
  tableData: BehaviorSubject<any[]> = new BehaviorSubject(null);
  loadingRowIds: BehaviorSubject<string[]> = new BehaviorSubject([]);
  successfullyCreatedRowWithId: Subject<string> = new Subject();
  pageData: BehaviorSubject<any> = new BehaviorSubject(null);
  isLoadingPageData: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private getPersonsGQL: GetPersonsGQL,
    private getPersonByIdGQL: GetPersonByIdGQL,
    private reloadPersonByIdGQL: ReloadPersonByIdGQL,
    private updatePersonGQL: UpdatePersonGQL,
    private lockPersonGQL: LockPersonGQL,
    private unlockPersonGQL: UnlockPersonGQL,
    private createPersonGQL: CreatePersonGQL,
    private deletePersonGQL: DeletePersonGQL
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
    this.getPersonsGQL.fetch().subscribe((result) => {
      this.tableData.next(result?.data?.persons);
    });
  }

  loadPageData(variables: GetPersonByIdQueryVariables) {
    this.pageData.next(null);
    this.isLoadingPageData.next(true);
    this.getPersonByIdGQL
      .fetch(variables)
      .subscribe((result) => {
        this.pageData.next(result?.data?.personById);
      })
      .add(() => {
        this.isLoadingPageData.next(false);
      });
  }

  reloadPerson(variables: ReloadPersonByIdQueryVariables) {
    this.addLoadingRowId(variables.id);
    this.reloadPersonByIdGQL
      .fetch(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result?.data?.personById);
      })
      .add(() => {
        this.removeLoadingRowId(variables.id);
      });
  }

  createPerson(currentId: string, variables: CreatePersonMutationVariables) {
    this.createPersonGQL.mutate(variables).subscribe((result) => {
      const newPerson = result?.data?.createPerson;
      this.tableData.next([newPerson, ...this.tableData.value]);
      this.successfullyCreatedRowWithId.next(currentId);
    });
  }

  updatePerson(variables: UpdatePersonMutationVariables) {
    this.addLoadingRowId(variables.person.id);
    this.updatePersonGQL
      .mutate(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result?.data?.updatePerson);
      })
      .add(() => {
        this.removeLoadingRowId(variables.person.id);
      });
  }

  lockPerson(variables: LockPersonMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.lockPersonGQL
      .mutate(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result?.data?.lockPerson);
      })
      .add(() => {
        this.removeLoadingRowId(variables.id);
      });
  }

  unlockPerson(variables: UnlockPersonMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.unlockPersonGQL
      .mutate(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result?.data?.unlockPerson);
      })
      .add(() => {
        this.removeLoadingRowId(variables.id);
      });
  }

  deletePerson(variables: DeletePersonMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.deletePersonGQL
      .mutate(variables)
      .subscribe((result) => {
        if (result?.data) {
          this.tableData.next(
            [...this.tableData.value].filter((person) => person.id !== variables.id)
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

