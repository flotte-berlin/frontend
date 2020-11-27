import { SelectionModel } from '@angular/cdk/collections';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CargoBikeResult } from 'src/app/services/bikes.service';
import { flatten } from 'src/app/helperFunctions/flattenObject';
import { deepen } from 'src/app/helperFunctions/deepenObject';
import { SchemaService } from 'src/app/services/schema.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input()
  headline: string = null;
  /** this array defines the columns and translations of the table and the order they are displayed  */
  @Input()
  columnInfo: {
    dataPath: string;
    translation: string;
    acceptedForCreation?: boolean;
    requiredForCreation?: boolean;
    sticky?: boolean;
    readonly?: boolean;
    type?: string;
    link?: (row: any) => string;
  }[] = [];

  @Input()
  dataService: any;

  @Input()
  tableDataGQLType: string;
  @Input()
  tableDataGQLCreateInputType: string;
  @Input()
  tableDataGQLUpdateInputType: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  additionalColumnsFront: string[] = [];
  additionalColumnsBack: string[] = ['buttons'];
  displayedColumns: string[] = [];

  loadingRowIds: string[] = [];

  /** data source of the table */
  data: MatTableDataSource<any> = new MatTableDataSource();
  selection = new SelectionModel<CargoBikeResult>(true, []);

  reloadingTable = false;

  relockingInterval = null;

  @Input()
  relockingIntervalDuration = 1000 * 60 * 1;
  filter = { includesString: '', onlyUnsaved: false };
  initialFilter = this.filter;
  isLoaded = false;

  @Output() createEvent = new EventEmitter();
  @Output() lockEvent = new EventEmitter();
  @Output() saveEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();

  constructor(private schemaService: SchemaService, public dialog: MatDialog, private activatedroute:ActivatedRoute) {
    this.filter.includesString = this.activatedroute.snapshot.queryParamMap.get('filter') || '';
  }

  ngAfterViewInit() {
    this.addColumnPropertiesFromGQLSchemaToColumnInfo();
    this.data.paginator = this.paginator;
    this.data.sortingDataAccessor = (item, columnName) => {
      if (typeof item[columnName] === 'string') {
        return item[columnName].toLocaleLowerCase();
      }
      return item[columnName];
    };
    this.data.sort = this.sort;

    this.data.filter = (this.filter as unknown) as string;
    this.data.filterPredicate = (data, filter: any) => {
      const a = !filter.onlyUnsaved || data.newObject || data.isLockedByMe;
      const b =
        !filter.includesString ||
        Object.keys(data).some(
          (k) =>
            data[k] != null &&
            data[k]
              .toString()
              .toLowerCase()
              .includes(filter.includesString.toLowerCase())
        );
      return a && b;
    };

    this.columnInfo.forEach((column) =>
      this.displayedColumns.push(column.dataPath)
    );
    this.displayedColumns.unshift(...this.additionalColumnsFront);
    this.displayedColumns.push(...this.additionalColumnsBack);

    this.dataService.loadingRowIds.subscribe((rowIds) => {
      this.loadingRowIds = rowIds;
    });

    this.dataService.successfullyCreatedRowWithId.subscribe(id => {
      this.data.data = this.data.data.filter(row => row.id !== id);
    })

    this.dataService.tableData.subscribe((newTableDataSource) => {
      this.reloadingTable = false;
      const tempDataSource = [];
      if (newTableDataSource === null) {
        return;  
      }
      this.isLoaded = true;
      for (const row of newTableDataSource) {
        const oldRow = this.getRowById(row.id);
        /** make sure to not overwrite a row that is being edited */
        if (!oldRow) {
          tempDataSource.push(flatten(row));
        } else if (!(oldRow.isLockedByMe && row.isLockedByMe)) {
          tempDataSource.push(flatten(row));
        } else if (!!oldRow) {
          //old row is getting edited
          tempDataSource.push(oldRow);
        }
      }
      for (const oldRow of this.data.data) {
        if (oldRow.newObject) {
          tempDataSource.unshift(oldRow);
        }
      }
      this.data.data = tempDataSource;
    });
    this.dataService.loadTableData();

    this.relockingInterval = setInterval(() => {
      for (const row of this.data.data) {
        if (row.isLockedByMe) {
          this.lock(row);
        }
      }
    }, this.relockingIntervalDuration);
  }

  ngOnDestroy() {
    clearInterval(this.relockingInterval);
  }

  addColumnPropertiesFromGQLSchemaToColumnInfo() {
    for (const column of this.columnInfo) {
      const typeInformation = this.schemaService.getTypeInformation(
        this.tableDataGQLType,
        column.dataPath
      );
      column.type = column.type || typeInformation.type;
    }
    for (const column of this.columnInfo) {
      const typeInformation = this.schemaService.getTypeInformation(
        this.tableDataGQLUpdateInputType,
        column.dataPath
      );
      column.readonly = column.readonly || !typeInformation.isPartOfType;
    }
    for (const column of this.columnInfo) {
      const typeInformation = this.schemaService.getTypeInformation(
        this.tableDataGQLCreateInputType,
        column.dataPath
      );
      column.requiredForCreation = column.requiredForCreation || typeInformation.isRequired;
      column.acceptedForCreation = column.acceptedForCreation || typeInformation.isPartOfType;
    }
  }

  getTranslation(dataPath: string) {
    return (
      this.columnInfo.find((column) => column.dataPath === dataPath)
        ?.translation || dataPath
    );
  }

  isStickyColumn(dataPath: string) {
    return (
      this.columnInfo.find((column) => column.dataPath === dataPath)?.sticky ||
      false
    );
  }

  isLoading(id: string) {
    return this.loadingRowIds.includes(id);
  }

  validityChange(row: any, columnName: string, isValid: Event) {
    if (!row.FieldsValidity) {
      row['FieldsValidity'] = {};
    }
    row['FieldsValidity'][columnName] = isValid;
  }

  countUnvalidFields(row: any) {
    let unvalidFieldsCount = 0;
    if (!row.FieldsValidity) {
      return 99;
    }
    for (const prop in row.FieldsValidity) {
      if (!row.FieldsValidity[prop]) {
        unvalidFieldsCount++;
      }
    }
    return unvalidFieldsCount;
  }

  reloadTable() {
    this.reloadingTable = true;
    this.isLoaded = false;
    this.data.data = [];
    this.dataService.loadTableData();
  }

  addNewObject() {
    this.paginator.firstPage();
    this.setFilter({ ...this.filter, includesString: '' });
    this.resetSorting();
    this.data.data = [
      { newObject: true, id: this.getNewId() },
      ...this.data.data,
    ];
  }

  getNewId(): string {
    let id = -1;
    while (this.getRowById(id.toString())) {
      id--;
    }
    return id.toString();
  }

  deleteNewObject(row: any) {
    this.data.data = this.data.data.filter((element) => row.id !== element.id);
  }

  create(row: any) {
    const newRow = this.schemaService.filterObject(
      this.tableDataGQLCreateInputType,
      deepen(row)
    );
    this.createEvent.emit({currentId: row.id, row: newRow});
  }

  lock(row: any) {
    this.lockEvent.emit(deepen(row));
  }

  countUnsavedRows(): number {
    let unsavedCount = 0;
    for (const row of this.data.data) {
      if (row.isLockedByMe || row.newObject) {
        unsavedCount++;
      }
    }
    return unsavedCount;
  }

  save(row: any) {
    const deepenRow = this.schemaService.filterObject(
      this.tableDataGQLUpdateInputType,
      deepen(row)
    );
    this.saveEvent.emit(deepenRow);
  }

  cancel(row: any) {
    this.cancelEvent.emit(row);
  }

  delete(row: any) {
    this.deleteEvent.emit(row);
  }

  openDeleteConfirmationDialog(row: any) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialog, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.delete(row);
      }
    });
  }

  getRowById(id: string) {
    return this.data.data.find((row) => row.id === id);
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
    const numRows = this.data.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.data.data.forEach((row) => this.selection.select(row));
  }

  showOnlyUnsavedElements(value: boolean) {
    this.filter.onlyUnsaved = value;
    this.filter.includesString = '';
    this.applyFilter();
  }

  applyFilter() {
    this.data.filter = ({
      ...this.filter,
      includesString: this.filter.includesString.trim().toLowerCase(),
    } as unknown) as string;
  }

  setFilter(filterObject) {
    this.filter = filterObject;
    this.applyFilter();
  }

  resetSorting() {
    this.sort.sort({ id: null, start: 'asc', disableClear: false });
  }
}

@Component({
  selector: 'delete-confirmation-dialog',
  templateUrl: 'delete-confirmation-dialog.html',
})
export class DeleteConfirmationDialog {
  constructor(public dialogRef: MatDialogRef<DeleteConfirmationDialog>) {}

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
