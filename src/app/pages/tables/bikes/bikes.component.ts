import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BikesService, CargoBikeResult } from 'src/app/services/bikes.service';
import { deepCopy } from 'src/app/helperFunctions/deepCopy';
import { filter } from 'graphql-anywhere';
import {
  CargoBikeFieldsMutableFragmentDoc,
  CargoBikeUpdateInput,
} from 'src/generated/graphql';

@Component({
  selector: 'app-bikes',
  templateUrl: './bikes.component.html',
  styleUrls: ['./bikes.component.scss'],
})
export class BikesComponent {
  columnInfo = [
    { name: 'name', header: 'Name', type: 'string', sticky: true },
    { name: 'id', header: 'ID', type: 'number', readonly: true },
    { name: 'group', header: 'Gruppe', type: 'enum', enumValues: [] },
  ];

  //properties that wont be shown in the table
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

  data = <Array<any>>[];
  selection = new SelectionModel<CargoBikeResult>(true, []);

  reloadingTable = false;

  relockingInterval = null;
  relockingDuration = 1000 * 60 * 1;

  constructor(private bikesService: BikesService) {
    this.displayedColumns.unshift(this.additionalColumnsFront[0]);
    this.displayedColumns.push(this.additionalColumnsBack[0]);

    bikesService.groupEnum.subscribe((groupEnum) => {
      this.columnInfo.find(
        (column) => column.name === 'group'
      ).enumValues = groupEnum;
    });

    bikesService.loadingRowIds.subscribe((rowIds) => {
      this.loadingRowIds = rowIds;
    });

    bikesService.bikes.subscribe((bikes) => {
      this.reloadingTable = false;

      this.data = bikes;

      if (this.data[0]) {
        this.displayedColumns = [];
        this.dataColumns = [];

        this.addColumnsFromObject('', this.data[0]);

        for (let row of this.data) {
          row = this.flatten(row);
        }

        //sort, so the displayedColumns array is in the same order as the columnInfo
        this.dataColumns.sort((columnA, columnB) => {
          const indexA = this.columnInfo.findIndex((c) => c.name == columnA);
          const indexB = this.columnInfo.findIndex((c) => c.name == columnB);
          if (indexA == -1) {
            return 1;
          } else if (indexB == -1) {
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
  }

  ngOnDestroy() {
    clearInterval(this.relockingInterval);
  }

  addColumnsFromObject(prefix: string, object: Object) {
    for (const prop in object) {
      let propName = prefix + prop;
      if (typeof object[prop] === 'object') {
        this.addColumnsFromObject(prefix + prop + '.', object[prop]);
      } else if (!this.blacklistedColumns.includes(propName)) {
        this.dataColumns.push(propName);
      }
    }
  }

  flatten(object: Object, prefix: string = '') {
    let newObject = new Object();
    for (const prop in object) {
      let propName = prefix + prop;
      if (typeof object[prop] === 'object' && object[prop] !== null) {
        const flattenedObject = this.flatten(object[prop], propName + '.');
        console.log(flattenedObject);
        for (const flattenedProperty in flattenedObject) {
          console.log(flattenedProperty);
          Object.defineProperty(newObject, flattenedProperty, {
            value: object[flattenedProperty],
          });
        }
      } else {
        Object.defineProperty(newObject, propName, { value: object[prop] });
      }
    }
    return newObject;
  }

  getHeader(propertyName: string) {
    return (
      this.columnInfo.find((column) => column.name === propertyName)?.header ||
      propertyName
    );
  }

  getType(propertyName: string) {
    return (
      this.columnInfo.find((column) => column.name === propertyName)?.type ||
      'string'
    );
  }

  isReadonly(propertyName: string) {
    return (
      this.columnInfo.find((column) => column.name === propertyName)
        ?.readonly || false
    );
  }

  isStickyColumn(propertyName: string) {
    return (
      this.columnInfo.find((column) => column.name === propertyName)?.sticky ||
      false
    );
  }

  getEnumValues(propertyName: string) {
    return (
      this.columnInfo.find((column) => column.name === propertyName)
        ?.enumValues || []
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
    const bike: CargoBikeUpdateInput = filter(
      CargoBikeFieldsMutableFragmentDoc,
      row
    );
    this.bikesService.updateBike({ bike });
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
