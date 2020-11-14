import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BikesService, CargoBikeResult } from 'src/app/services/bikes.service';
import { flatten } from 'src/app/helperFunctions/flattenObject';
import { deepen } from 'src/app/helperFunctions/deepenObject';
import { isPartOfGraphQLDoc } from 'src/app/helperFunctions/isPartOfGraphQLFunction';
import { filter } from 'graphql-anywhere';
import {
  CargoBikeFieldsMutableFragmentDoc,
  CargoBikeUpdateInput,
} from 'src/generated/graphql';
import { SchemaService } from 'src/app/services/schema.service';

import { logArrayInColumnInfoForm } from 'src/app/helperFunctions/logArrayInColumnInfoForm';

@Component({
  selector: 'app-bikes',
  templateUrl: './bikes.component.html',
  styleUrls: ['./bikes.component.scss'],
})
export class BikesComponent {
  /** this array defines the columns and headers of the table and the order they are displayed  */
  columnInfo = [
    { name: 'name', header: 'Name', sticky: true },
    { name: 'id', header: 'ID', readonly: true },
    { name: 'group', header: 'Gruppe' },
    { name: 'modelName', header: 'Modelname' },
    { name: 'insuranceData.billing', header: '' },
    { name: 'insuranceData.hasFixedRate', header: '' },
    { name: 'insuranceData.name', header: '' },
    { name: 'insuranceData.benefactor', header: '' },
    { name: 'insuranceData.noPnP', header: '' },
    { name: 'insuranceData.maintenanceResponsible', header: '' },
    { name: 'insuranceData.maintenanceBenefactor', header: '' },
    { name: 'insuranceData.maintenanceAgreement', header: '' },
    { name: 'insuranceData.fixedRate', header: '' },
    { name: 'insuranceData.projectAllowance', header: '' },
    { name: 'insuranceData.notes', header: '' },
    { name: 'dimensionsAndLoad.bikeLength', header: '' },
    { name: 'dimensionsAndLoad.bikeWeight', header: '' },
    { name: 'dimensionsAndLoad.bikeHeight', header: '' },
    { name: 'dimensionsAndLoad.bikeWidth', header: '' },
    { name: 'dimensionsAndLoad.boxHeight', header: '' },
    { name: 'dimensionsAndLoad.boxLength', header: '' },
    { name: 'dimensionsAndLoad.boxWidth', header: '' },
    { name: 'dimensionsAndLoad.hasCoverBox', header: '' },
    { name: 'dimensionsAndLoad.lockable', header: '' },
    { name: 'dimensionsAndLoad.maxWeightBox', header: '' },
    { name: 'dimensionsAndLoad.maxWeightLuggageRack', header: '' },
    { name: 'dimensionsAndLoad.maxWeightTotal', header: '' },
    { name: 'numberOfChildren', header: '' },
    { name: 'numberOfWheels', header: '' },
    { name: 'forCargo', header: '' },
    { name: 'forChildren', header: '' },
    { name: 'security.frameNumber', header: '' },
    { name: 'security.adfcCoding', header: '' },
    { name: 'security.keyNumberAXAChain', header: '' },
    { name: 'security.keyNumberFrameLock', header: '' },
    { name: 'security.policeCoding', header: '' },
    { name: 'technicalEquipment.bicycleShift', header: '' },
    { name: 'technicalEquipment.isEBike', header: '' },
    { name: 'technicalEquipment.hasLightSystem', header: '' },
    { name: 'technicalEquipment.specialFeatures', header: '' },
    { name: 'stickerBikeNameState', header: '' },
    { name: 'note', header: '' },
    { name: 'taxes.costCenter', header: '' },
    { name: 'taxes.organisationArea', header: '' },
    { name: 'provider.id', header: '' },
    { name: 'provider.formName', header: '' },
    { name: 'provider.privatePerson.id', header: '' },
    { name: 'provider.privatePerson.person.id', header: '' },
    { name: 'provider.privatePerson.person.name', header: '' },
    { name: 'provider.privatePerson.person.firstName', header: '' },
    {
      name: 'provider.privatePerson.person.contactInformation.email',
      header: '',
    },
    { name: 'lendingStation.id', header: '' },
    { name: 'lendingStation.name', header: '' },
    { name: 'lendingStation.address.number', header: '' },
    { name: 'lendingStation.address.street', header: '' },
    { name: 'lendingStation.address.zip', header: '' },
  ];

  additionalColumnsFront: string[] = ['select'];
  additionalColumnsBack: string[] = ['buttons'];
  displayedColumns: string[] = [];

  loadingRowIds: string[] = [];

  /** data source of the table */
  data = [] as Array<any>;
  selection = new SelectionModel<CargoBikeResult>(true, []);

  reloadingTable = false;

  relockingInterval = null;
  relockingDuration = 1000 * 60 * 1;

  constructor(
    private bikesService: BikesService,
    private schemaService: SchemaService
  ) {
    this.columnInfo.forEach((column) =>
      this.displayedColumns.push(column.name)
    );
    this.displayedColumns.unshift(this.additionalColumnsFront[0]);
    this.displayedColumns.push(this.additionalColumnsBack[0]);

    bikesService.loadingRowIds.subscribe((rowIds) => {
      this.loadingRowIds = rowIds;
    });

    bikesService.bikes.subscribe((newTableDataSource) => {
      this.reloadingTable = false;
      const tempDataSource = [];
      for (const row of newTableDataSource) {
        const oldRow = this.getRowById(row.id);
        /** make sure to not overwrite a row that is being edited */
        if (!oldRow) {
          tempDataSource.push(flatten(row));
        }
        else if (!(oldRow.isLockedByMe && row.isLockedByMe)) {
          tempDataSource.push(flatten(row));
        } else if (!!oldRow) {
          tempDataSource.push(oldRow);
        }
      }
      this.data = tempDataSource;
    });
    bikesService.loadBikes();
  }

  ngOnInit() {
    this.relockingInterval = setInterval(() => {
      for (const row of this.data) {
        if (row.isLockedByMe) {
          this.bikesService.relockBike({ id: row.id });
        }
      }
    }, this.relockingDuration);
  }

  ngOnDestroy() {
    clearInterval(this.relockingInterval);
  }

  getHeader(propertyName: string) {
    return (
      this.columnInfo.find((column) => column.name === propertyName)?.header ||
      propertyName
    );
  }

  getType(propertyName: string) {
    // console.log(propertyName, this.schemaService.getPropertyTypeFromSchema("CargoBike", propertyName))
    return this.schemaService.getPropertyTypeFromSchema(
      'CargoBike',
      propertyName
    );
  }

  isReadonly(propertyName: string) {
    return (
      this.columnInfo.find((column) => column.name === propertyName)
        ?.readonly ||
      !isPartOfGraphQLDoc(propertyName, CargoBikeFieldsMutableFragmentDoc)
    );
  }

  isStickyColumn(propertyName: string) {
    return (
      this.columnInfo.find((column) => column.name === propertyName)?.sticky ||
      false
    );
  }

  isLoading(id: string) {
    return this.loadingRowIds.includes(id);
  }

  reloadTable() {
    this.reloadingTable = true;
    this.bikesService.loadBikes();
  }

  edit(row: CargoBikeResult) {
    this.bikesService.lockBike({ id: row.id });
  }

  save(row: CargoBikeResult) {
    const deepenRow: CargoBikeUpdateInput = filter(
      CargoBikeFieldsMutableFragmentDoc,
      deepen(row)
    );
    this.bikesService.updateBike({ bike: deepenRow });
  }

  cancel(row: CargoBikeResult) {
    this.bikesService.unlockBike({ id: row.id });
  }

  getRowById(id: string) {
    return this.data.find(row => row.id === id);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.displayedColumns,
      event.previousIndex + 2,
      event.currentIndex + 2
    ); // +2 because the first 2 (selection + name) columns are not dragable
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.data.forEach((row) => this.selection.select(row));
  }
}
