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
  GetCargoBikesDocument
} from 'src/generated/graphql';
import { SchemaService } from 'src/app/services/schema.service';

@Component({
  selector: 'app-bikes',
  templateUrl: './bikes.component.html',
  styleUrls: ['./bikes.component.scss'],
})
export class BikesComponent {
  columnInfo = [
    { name: 'name', header: 'Name', sticky: true },
    { name: 'id', header: 'ID', readonly: true },
    { name: 'group', header: 'Gruppe'},
  ];

  // properties that wont be shown in the table
  blacklistedColumns = [
    '__typename',
    'isLocked',
    'isLockedByMe',
    'lockedBy',
    'lockedUntil',
  ];

  dataColumns: string[] = [];
  additionalColumnsFront: string[] = ['select'];
  additionalColumnsBack: string[] = ['buttons'];
  displayedColumns: string[] = [];

  loadingRowIds: string[] = [];

  data =  [] as Array<any>;
  selection = new SelectionModel<CargoBikeResult>(true, []);

  reloadingTable = false;

  relockingInterval = null;
  relockingDuration = 1000 * 60 * 1;

  constructor(
    private bikesService: BikesService,
    private schemaService: SchemaService
  ) {
    this.displayedColumns.unshift(this.additionalColumnsFront[0]);
    this.displayedColumns.push(this.additionalColumnsBack[0]);

    bikesService.loadingRowIds.subscribe((rowIds) => {
      this.loadingRowIds = rowIds;
    });

    bikesService.bikes.subscribe((bikes) => {
      this.reloadingTable = false;

      this.data = bikes;

      if (this.data[0]) {
        this.displayedColumns = [];
        this.dataColumns = [];

        for (const index in this.data) {
          this.data[index] = flatten(this.data[index]);
        }

        for (const prop in this.data[0]) {
          if (!this.blacklistedColumns.includes(prop) && !prop.includes('__')) {
            this.dataColumns.push(prop);
          }
        }

        // sort, so the displayedColumns array is in the same order as the columnInfo
        this.dataColumns.sort((columnA, columnB) => {
          const indexA = this.columnInfo.findIndex((c) => c.name === columnA);
          const indexB = this.columnInfo.findIndex((c) => c.name === columnB);
          if (indexA === -1) {
            return 1;
          } else if (indexB === -1) {
            return -1;
          } else {
            return indexA - indexB;
          }
        });
        this.displayedColumns.push(...this.dataColumns);
        this.displayedColumns.unshift(...this.additionalColumnsFront);
        this.displayedColumns.push(...this.additionalColumnsBack);
      }
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

    console.log(GetCargoBikesDocument);
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

  getType(propertyName: string, row) {
    // console.log(propertyName, this.schemaService.getPropertyTypeFromSchema("CargoBike", propertyName))
    return (
      this.schemaService.getPropertyTypeFromSchema('CargoBike', propertyName)
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
