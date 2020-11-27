import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import {
  GetEquipmentsGQL,
  CreateEquipmentGQL,
  CreateEquipmentMutationVariables,
  UpdateEquipmentGQL,
  UpdateEquipmentMutationVariables,
  LockEquipmentGQL,
  LockEquipmentMutationVariables,
  UnlockEquipmentGQL,
  UnlockEquipmentMutationVariables,
  DeleteEquipmentGQL,
  DeleteEquipmentMutationVariables,
} from '../../generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  /** Equipments Array */
  tableData: BehaviorSubject<any[]> = new BehaviorSubject(null);
  loadingRowIds: BehaviorSubject<string[]> = new BehaviorSubject([]);
  successfullyCreatedRowWithId: Subject<string> = new Subject();
  //pageData: BehaviorSubject<any> = new BehaviorSubject([]);
  //isLoadingPageData: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private getEquipmentsGQL: GetEquipmentsGQL,
    private createEquipmentGQL: CreateEquipmentGQL,
    private updateEquipmentGQL: UpdateEquipmentGQL,
    private lockEquipmentGQL: LockEquipmentGQL,
    private unlockEquipmentGQL: UnlockEquipmentGQL,
    private deleteEquipmentGQL: DeleteEquipmentGQL
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
    this.getEquipmentsGQL.fetch().subscribe((result) => {
      this.tableData.next(result.data.equipment);
    });
  }

  create(currentId: string, variables: CreateEquipmentMutationVariables) {
    this.createEquipmentGQL.mutate(variables).subscribe((result) => {
      const newRow = result.data.createEquipment;
      this.tableData.next([newRow, ...this.tableData.value]);
      this.successfullyCreatedRowWithId.next(currentId);
    });
  }

  update(variables: UpdateEquipmentMutationVariables) {
    this.addLoadingRowId(variables.equipmentType.id);
    this.updateEquipmentGQL
      .mutate(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result.data.updateEquipment);
      })
      .add(() => {
        this.removeLoadingRowId(variables.equipmentType.id);
      });
  }

  lock(variables: LockEquipmentMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.lockEquipmentGQL
      .mutate(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result.data.lockEquipment);
      })
      .add(() => {
        this.removeLoadingRowId(variables.id);
      });
  }

  unlock(variables: UnlockEquipmentMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.unlockEquipmentGQL
      .mutate(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result.data.unlockEquipment);
      })
      .add(() => {
        this.removeLoadingRowId(variables.id);
      });
  }

  delete(variables: DeleteEquipmentMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.deleteEquipmentGQL
      .mutate(variables)
      .subscribe((result) => {
        if (result.data.deleteEquipment) {
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
