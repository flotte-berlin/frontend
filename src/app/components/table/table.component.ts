import { SelectionModel } from '@angular/cdk/collections';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
  ElementRef,
} from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { flatten } from 'src/app/helperFunctions/flattenObject';
import { deepen } from 'src/app/helperFunctions/deepenObject';
import { customTableFilterFunction } from 'src/app/helperFunctions/customTableFilterFunction';
import { SchemaService } from 'src/app/services/schema.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { SelectObjectDialogComponent } from '../select-object-dialog/select-object-dialog.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit {
  /** specifies the headline */
  @Input()
  headline: string = null;
  @Input()
  headlineIconName: string = 'help_outline';

  /** this array defines the columns and translations of the table and the order they are displayed  */
  @Input()
  columnInfo: {
    dataPath: string;
    translation: string;
    acceptedForCreation?: boolean;
    requiredForCreation?: boolean;
    sticky?: boolean;
    acceptedForUpdating?: boolean;
    requiredForUpdating?: boolean;
    required?: boolean;
    type?: string;
    list?: boolean; //whether the type is a list
    link?: (row: any) => string;
    highlighted: boolean; // whether this column is a bit darker
  }[] = [];

  @Input()
  dataService: any;

  @Input()
  tableDataGQLType: string;
  @Input()
  tableDataGQLCreateInputType: string;
  @Input()
  tableDataGQLUpdateInputType: string;

  @Input()
  copyableRows = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('filterRow', { read: ElementRef }) filterRow: ElementRef;
  @ViewChild('headerRow', { read: ElementRef }) headerRow: ElementRef;

  additionalColumnsFront: string[] = [];
  additionalColumnsBack: string[] = ['buttons'];
  displayedColumns: string[] = [];

  displayedFilterColumns = [];
  filters: any = {};

  loadingRowIds: string[] = [];

  /** data source of the table */
  data: MatTableDataSource<any> = new MatTableDataSource();
  selection = new SelectionModel<any>(true, []);

  reloadingTable = false;

  relockingInterval = null;

  @Input()
  relockingIntervalDuration = 1000 * 60 * 1;

  filterChanged: Subject<any> = new Subject<any>();

  isLoaded = false;
  isProcessing = false;

  @Output() createEvent = new EventEmitter();
  @Output() lockEvent = new EventEmitter();
  @Output() saveEvent = new EventEmitter();
  @Output() copyEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();

  constructor(
    private schemaService: SchemaService,
    public dialog: MatDialog,
    private activatedroute: ActivatedRoute,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.addColumnPropertiesFromGQLSchemaToColumnInfo();
    this.columnInfo.forEach((column) =>
      this.displayedColumns.push(column.dataPath)
    );
    this.displayedColumns.unshift(...this.additionalColumnsFront);
    this.displayedColumns.push(...this.additionalColumnsBack);
    this.displayedFilterColumns = this.displayedColumns.map(
      (columnName) => columnName + '.filter'
    );

    this.resetFilters();

    const routeFilter = this.activatedroute.snapshot.queryParams;
    for (const filterName of Object.keys(routeFilter)) {
      if (this.filters.columnFilters[filterName]) {
        this.filters.columnFilters[filterName].value = routeFilter[filterName];
        this.filters.columnFilters[filterName].isSet = true;
        this.filters.columnFilters[filterName].options.exact = true;
      }
    }
  }

  ngAfterViewInit(): void {
    this.setTableFilterRowHeight();
    this.data.paginator = this.paginator;
    this.data.sortingDataAccessor = (item, columnName) => {
      if (typeof item[columnName] === 'string') {
        return item[columnName].toLocaleLowerCase();
      }
      return item[columnName];
    };
    this.data.sort = this.sort;

    this.data.filter = (this.filters as unknown) as string;
    this.data.filterPredicate = customTableFilterFunction;

    this.filterChanged.pipe(debounceTime(400)).subscribe(() => {
      this.applyFilters();
    });

    this.dataService.loadingRowIds.subscribe((rowIds) => {
      this.loadingRowIds = rowIds;
    });

    this.dataService.successfullyCreatedRowWithId.subscribe((id) => {
      this.data.data = this.data.data.filter((row) => row.id !== id);
    });

    this.dataService.tableData.subscribe((newTableDataSource) => {
      const tempDataSource = [];
      if (newTableDataSource === null) {
        return;
      }
      this.reloadingTable = false;
      this.isLoaded = true;
      for (const row of newTableDataSource) {
        if (row.newObject) {
          // its a copied object
          row.id = this.getNewId();
          tempDataSource.push(flatten(row));
          continue;
        }
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
    this.cdRef.detectChanges();
  }

  ngOnDestroy() {
    clearInterval(this.relockingInterval);
  }

  addColumnPropertiesFromGQLSchemaToColumnInfo() {
    let previousColumnDataPathPrefix = null;
    let previousColumnIsHighlighted = false;
    for (const column of this.columnInfo) {
      const columnnDataPathPrefix = column.dataPath.split('.')[0];
      if (columnnDataPathPrefix === previousColumnDataPathPrefix) {
        column.highlighted = previousColumnIsHighlighted;
      } else {
        column.highlighted = !previousColumnIsHighlighted;
        previousColumnIsHighlighted = !previousColumnIsHighlighted;
        previousColumnDataPathPrefix = columnnDataPathPrefix;
      }

      let typeInformation = this.schemaService.getTypeInformation(
        this.tableDataGQLType,
        column.dataPath
      );
      column.type = column.type || typeInformation.type;
      column.list = typeInformation.isList;
      column.required =
        column.required != null ? column.required : typeInformation.isRequired;

      typeInformation = this.schemaService.getTypeInformation(
        this.tableDataGQLUpdateInputType,
        column.dataPath
      );
      column.acceptedForUpdating =
        column.acceptedForUpdating != null
          ? column.acceptedForUpdating
          : typeInformation.isPartOfType;

      column.requiredForUpdating =
        column.requiredForUpdating != null
          ? column.requiredForUpdating
          : column.required || typeInformation.isRequired;
      typeInformation = this.schemaService.getTypeInformation(
        this.tableDataGQLCreateInputType,
        column.dataPath
      );
      column.acceptedForCreation =
        column.acceptedForCreation != null
          ? column.acceptedForCreation
          : typeInformation.isPartOfType;

      column.requiredForCreation =
        column.requiredForCreation != null
          ? column.requiredForCreation
          : column.required || typeInformation.isRequired;
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
      return 0;
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
    this.createEvent.emit({ currentId: row.id, row: newRow });
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

  copy(row: any) {
    const deepenRow = this.schemaService.filterObject(
      this.tableDataGQLUpdateInputType,
      deepen(row)
    );
    this.copyEvent.emit(deepenRow);
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

  openSelectObjectDialog(row: any, column: any) {
    const dialogRef = this.dialog.open(SelectObjectDialogComponent, {
      width: 'auto',
      autoFocus: false,
      data: {
        nameToShowInSelection: column.nameToShowInSelection,
        currentlySelectedObjectId: column.currentlySelectedObjectId(row),
        possibleObjects: column.possibleObjects,
      },
    });
    dialogRef.afterClosed().subscribe((selectedObject) => {
      if (selectedObject) {
        row[column.propertyNameOfReferenceId] = selectedObject.id;
        const newObjectFlattened = flatten(selectedObject);
        for (const newProperty in newObjectFlattened) {
          row[column.propertyPrefixToOverwrite + '.' + newProperty] =
            newObjectFlattened[newProperty];
        }
      } else if (selectedObject === null) {
        row[column.propertyNameOfReferenceId] = null;
        for (const prop in row) {
          if (prop.startsWith(column.propertyPrefixToOverwrite)) {
            row[prop] = null;
          }
        }
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
    if (value) {
      this.resetFilters();
    }
    this.filters['onlyUnsaved'] = value;
    this.applyFilters();
  }

  newFilterValue(): void {
    this.filterChanged.next(this.filters);
  }

  applyFilters(): void {
    this.isProcessing = true;
    setTimeout(() => {
      this.data.filter = (this.filters as unknown) as string;
      this.isProcessing = false;
    });
  }

  columnFiltersAreSet(): boolean {
    for (const filterObject of Object.keys(this.filters.columnFilters)) {
      if (this.filters.columnFilters[filterObject].isSet) {
        return true;
      }
    }
    return false;
  }

  resetColumnFilters() {
    this.filters['columnFilters'] = [];
    for (const column of this.columnInfo) {
      this.filters.columnFilters[column.dataPath] = {
        isSet: false,
        value: null,
        minValue: {},
        maxValue: {},
        fromValue: {},
        toValue: {},
        type: column.type,
        list: column.list,
        options: {},
      };
    }
    this.setTableFilterRowHeight();
    this.applyFilters();
  }

  resetFilters() {
    this.filters = [];
    this.resetColumnFilters();
  }

  setTableFilterRowHeight() {
    setTimeout(() => {
      const filterRowHeight = this.filterRow.nativeElement.clientHeight;
      const headerRowCells = Array.from(
        this.headerRow.nativeElement.children as HTMLCollectionOf<HTMLElement>
      );
      for (let i = 0; i < headerRowCells.length; i++) {
        headerRowCells[i].style.top = filterRowHeight + 'px';
      }
    });
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
