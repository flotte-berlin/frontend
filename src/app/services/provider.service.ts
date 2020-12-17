import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import {
  GetProvidersGQL,
  ReloadProviderByIdGQL,
  ReloadProviderByIdQueryVariables,
  UpdateProviderGQL,
  UpdateProviderMutationVariables,
  LockProviderGQL,
  LockProviderMutationVariables,
  UnlockProviderGQL,
  UnlockProviderMutationVariables,
  CreateProviderGQL,
  CreateProviderMutationVariables,
  DeleteProviderGQL,
  DeleteProviderMutationVariables,
  GetProviderByIdGQL,
  GetProviderByIdQueryVariables,
} from '../../generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class ProvidersService {
  /** Providers Array */
  tableData: BehaviorSubject<any[]> = new BehaviorSubject(null);
  loadingRowIds: BehaviorSubject<string[]> = new BehaviorSubject([]);
  successfullyCreatedRowWithId: Subject<string> = new Subject();
  pageData: BehaviorSubject<any> = new BehaviorSubject(null);
  isLoadingPageData: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private getProvidersGQL: GetProvidersGQL,
    private getProviderByIdGQL: GetProviderByIdGQL,
    private reloadProviderByIdGQL: ReloadProviderByIdGQL,
    private updateProviderGQL: UpdateProviderGQL,
    private lockProviderGQL: LockProviderGQL,
    private unlockProviderGQL: UnlockProviderGQL,
    private createProviderGQL: CreateProviderGQL,
    private deleteProviderGQL: DeleteProviderGQL
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
    this.getProvidersGQL.fetch().subscribe((result) => {
      this.tableData.next(result?.data?.providers);
    });
  }

  loadPageData(variables: GetProviderByIdQueryVariables) {
    this.pageData.next(null);
    this.isLoadingPageData.next(true);
    this.getProviderByIdGQL
      .fetch(variables)
      .subscribe((result) => {
        this.pageData.next(result?.data?.providerById);
      })
      .add(() => {
        this.isLoadingPageData.next(false);
      });
  }

  reloadProvider(variables: ReloadProviderByIdQueryVariables) {
    this.addLoadingRowId(variables.id);
    this.reloadProviderByIdGQL
      .fetch(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result?.data?.providerById);
      })
      .add(() => {
        this.removeLoadingRowId(variables.id);
      });
  }

  createProvider(currentId: string, variables: CreateProviderMutationVariables) {
    this.createProviderGQL.mutate(variables).subscribe((result) => {
      const newProvider = result?.data?.createProvider;
      this.tableData.next([newProvider, ...this.tableData.value]);
      this.successfullyCreatedRowWithId.next(currentId);
    });
  }

  updateProvider(variables: UpdateProviderMutationVariables) {
    this.addLoadingRowId(variables.provider.id);
    this.updateProviderGQL
      .mutate(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result?.data?.updateProvider);
      })
      .add(() => {
        this.removeLoadingRowId(variables.provider.id);
      });
  }

  lockProvider(variables: LockProviderMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.lockProviderGQL
      .mutate(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result?.data?.lockProvider);
      })
      .add(() => {
        this.removeLoadingRowId(variables.id);
      });
  }

  unlockProvider(variables: UnlockProviderMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.unlockProviderGQL
      .mutate(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result?.data?.unlockProvider);
      })
      .add(() => {
        this.removeLoadingRowId(variables.id);
      });
  }

  deleteProvider(variables: DeleteProviderMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.deleteProviderGQL
      .mutate(variables)
      .subscribe((result) => {
        if (result?.data) {
          this.tableData.next(
            [...this.tableData.value].filter((provider) => provider.id !== variables.id)
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

