import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import {
  GetEquipmentTypesGQL,
  GetEquipmentTypesQueryVariables,
  CreateEquipmentTypeGQL,
  CreateEquipmentTypeMutationVariables,
  UpdateEquipmentTypeGQL,
  UpdateEquipmentTypeMutationVariables,
  LockEquipmentTypeGQL,
  LockEquipmentTypeMutationVariables,
  UnlockEquipmentTypeGQL,
  UnlockEquipmentTypeMutationVariables,
  DeleteEquipmentTypeGQL,
  DeleteEquipmentTypeMutationVariables,
} from '../../generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class EquipmentTypeService {
  /** EquipmentTypes Array */
  tableData: BehaviorSubject<any[]> = new BehaviorSubject(null);
  loadingRowIds: BehaviorSubject<string[]> = new BehaviorSubject([]);
  successfullyCreatedRowWithId: Subject<string> = new Subject();
  //pageData: BehaviorSubject<any> = new BehaviorSubject([]);
  //isLoadingPageData: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private getEquipmentTypesGQL: GetEquipmentTypesGQL,
    private createEquipmentTypeGQL: CreateEquipmentTypeGQL,
    private updateEquipmentTypeGQL: UpdateEquipmentTypeGQL,
    private lockEquipmentTypeGQL: LockEquipmentTypeGQL,
    private unlockEquipmentTypeGQL: UnlockEquipmentTypeGQL,
    private deleteEquipmentTypeGQL: DeleteEquipmentTypeGQL,
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
    this.getEquipmentTypesGQL.fetch().subscribe((result) => {
      this.tableData.next(result.data.equipmentTypes);
    });
  }

  create(currentId: string, variables: CreateEquipmentTypeMutationVariables) {
    this.createEquipmentTypeGQL.mutate(variables).subscribe((result) => {
      const newRow = result.data.createEquipmentType;
      this.tableData.next([newRow, ...this.tableData.value]);
      this.successfullyCreatedRowWithId.next(currentId);
    });
  }

  update(variables: UpdateEquipmentTypeMutationVariables) {
    this.addLoadingRowId(variables.equipmentType.id);
    this.updateEquipmentTypeGQL
      .mutate(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result.data.updateEquipmentType);
      })
      .add(() => {
        this.removeLoadingRowId(variables.equipmentType.id);
      });
  }

  lock(variables: LockEquipmentTypeMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.lockEquipmentTypeGQL
      .mutate(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result.data.lockEquipmentType);
      })
      .add(() => {
        this.removeLoadingRowId(variables.id);
      });
  }

  unlock(variables: UnlockEquipmentTypeMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.unlockEquipmentTypeGQL
      .mutate(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result.data.unlockEquipmentType);
      })
      .add(() => {
        this.removeLoadingRowId(variables.id);
      });
  }

  delete(variables: DeleteEquipmentTypeMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.deleteEquipmentTypeGQL
      .mutate(variables)
      .subscribe((result) => {
        if (result.data.deleteEquipmentType) {
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
    const newTableData = this.tableData.value.map((row) =>
      rowFromResponse.id === row.id ? rowFromResponse : row
    );
    this.tableData.next(newTableData);
  }
}
