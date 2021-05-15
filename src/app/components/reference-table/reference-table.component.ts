import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { flatten } from 'src/app/helperFunctions/flattenObject';
import { SchemaService } from 'src/app/services/schema.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { customTableFilterFunction } from 'src/app/helperFunctions/customTableFilterFunction';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';

@Component({
  selector: 'app-reference-table',
  templateUrl: './reference-table.component.html',
  styleUrls: ['./reference-table.component.scss'],
})
export class ReferenceTableComponent {
  /** this array defines the columns and translations of the table and the order they are displayed  */
  @Input()
  columnInfo: {
    dataPath: string;
    translation: string;
    sticky?: boolean;
    type?: string;
    list?: boolean; //whether the type is a list
    link?: (row: any) => string;
  }[] = [];

  @Input()
  dataServiceThatProvidesThePossibleData: any;
  @Input()
  nameToShowInSelection: any;
  @Input()
  editable: boolean = false;

  @Input()
  set editableReferences(value: boolean) {
    if (value === false) {
      this._editableReferences = false;
    } else {
      this._editableReferences = true;
    }
  }
  get editableReferences(): boolean {
    return this._editableReferences;
  }
  _editableReferences: boolean = true;

  @Input()
  set deletableReferences(value: boolean) {
    if (value === false) {
      this._deletableReferences = false;
    } else {
      this._deletableReferences = true;
    }
  }
  get deletableReferences(): boolean {
    return this._deletableReferences;
  }
  _deletableReferences: boolean = true;

  @Input()
  set data(newdata) {
    if (!newdata) {
      return;
    }
    this.dataSource.data = [];
    this.idsOfObjectsToHide = [];
    for (const element of newdata) {
      this.dataSource.data.push(flatten(element));
      this.idsOfObjectsToHide.push(element.id);
    }
    this.dataSource.data = this.dataSource.data;
    this.onReferenceChange();
  }
  get data(): any {
    return this.dataSource.data;
  }

  @Input()
  tableDataGQLType: string;

  @Output() referenceIds = new EventEmitter();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('filterRow', { read: ElementRef }) filterRow: ElementRef;
  @ViewChild('headerRow', { read: ElementRef }) headerRow: ElementRef;

  displayedColumns: string[] = [];

  /** data source of the table */
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  possibleValues: Array<any> = [];
  idsOfObjectsToHide = [];

  reloadingTable = false;

  displayedFilterColumns = [];
  filters: any = {};
  filterChanged: Subject<any> = new Subject<any>();

  constructor(private schemaService: SchemaService) {}

  ngOnInit() {
    this.addColumnPropertiesFromGQLSchemaToColumnInfo();
    this.columnInfo.forEach((column) => {
      this.displayedColumns.push(column.dataPath);
    });
    if (this.editableReferences && this.deletableReferences) { //because we only have a delete button, we can hide "all" buttons
      this.displayedColumns.push('buttons');
    }
    this.displayedFilterColumns = this.displayedColumns.map(
      (columnName) => columnName + '.filter'
    );

    this.dataSource.filterPredicate = customTableFilterFunction;
    this.resetFilters();
  }

  ngAfterViewInit() {
    this.setTableFilterRowHeight();

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.filter = (this.filters as unknown) as string;

    this.filterChanged.pipe(debounceTime(400)).subscribe(() => {
      this.applyFilters();
    });

    this.dataSource.sortingDataAccessor = (item, columnName) => {
      if (typeof item[columnName] === 'string') {
        return item[columnName].toLocaleLowerCase();
      }
      return item[columnName];
    };
    if (this.dataServiceThatProvidesThePossibleData) {
      this.dataServiceThatProvidesThePossibleData.tableData.subscribe(
        (data) => {
          this.possibleValues = [];
          if (data) {
            for (const row of data) {
              this.possibleValues.push(row);
            }
          }
        }
      );
      this.dataServiceThatProvidesThePossibleData.loadTableData();
    }
  }

  addColumnPropertiesFromGQLSchemaToColumnInfo() {
    for (const column of this.columnInfo) {
      const typeInformation = this.schemaService.getTypeInformation(
        this.tableDataGQLType,
        column.dataPath
      );
      column.type = column.type || typeInformation.type;
    }
  }

  isStickyColumn(dataPath: string) {
    return (
      this.columnInfo.find((column) => column.dataPath === dataPath)?.sticky ||
      false
    );
  }

  delete(row: any) {
    let index = this.dataSource.data.findIndex(
      (element) => element.id === row.id
    );
    if (index !== -1) {
      this.dataSource.data.splice(index, 1);
      this.dataSource.data = this.dataSource.data; //needed to trigger update lol
      this.onReferenceChange();
    }

    // show it again in the selection
    this.idsOfObjectsToHide = this.idsOfObjectsToHide.filter(
      (id) => id !== row.id
    );
  }

  addReference(row: any) {
    this.dataSource.data = [flatten(row), ...this.dataSource.data];
    this.idsOfObjectsToHide = [row.id, ...this.idsOfObjectsToHide];
    this.resetFilters();
    this.onReferenceChange();
  }

  getRowById(id: string) {
    return this.dataSource.data.find((row) => row.id === id);
  }

  onReferenceChange() {
    const ids = [];
    for (const element of this.data) {
      ids.push(element.id);
    }
    this.referenceIds.emit(ids);
  }

  /** Filter functions **************************************************************/
  newFilterValue(): void {
    this.filterChanged.next(this.filters);
  }

  applyFilters(): void {
    this.dataSource.filter = (this.filters as unknown) as string;
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
}
