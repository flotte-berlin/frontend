import {
  Component,
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
import { FormControl, FormGroup } from '@angular/forms';
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
    link?: (row: any) => string;
  }[] = [];

  @Input()
  dataServiceThatProvidesThePossibleData: any;
  @Input()
  nameToShowInSelection: any;
  @Input()
  set editable(value: boolean) {
    this._editable = value;
    value
      ? this.addForm.get('addGroup').enable()
      : this.addForm.get('addGroup').disable();
  }
  get editable() {
    return this._editable;
  }
  _editable: boolean = false;

  @Input()
  set data(newdata) {
    if (!newdata) { return; }
    this.dataSource.data = [];
    for (const element of newdata) {
      this.dataSource.data.push(flatten(element));
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

  displayedColumns: string[] = [];

  /** data source of the table */
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  possibleValues: Array<any> = [];
  possibleValueOptions: Array<any> = [];

  reloadingTable = false;

  addForm: FormGroup = new FormGroup({ addGroup: new FormControl() });

  tableFilterString = '';
  filterStringChanged: Subject<string> = new Subject<string>();

  constructor(private schemaService: SchemaService) {}

  ngOnInit() {
    this.addColumnPropertiesFromGQLSchemaToColumnInfo();
    this.columnInfo.forEach((column) => {
      this.displayedColumns.push(column.dataPath);
    });
    this.displayedColumns.push('buttons');

    this.addForm
      .get('addGroup')
      .valueChanges.subscribe(() => this.filterPossibleValueOptions());

    this.filterStringChanged
      .pipe(debounceTime(400))
      .subscribe(() => this.applyTableFilter());
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.sortingDataAccessor = (item, columnName) => {
      if (typeof item[columnName] === 'string') {
        return item[columnName].toLocaleLowerCase();
      }
      return item[columnName];
    };

    this.dataServiceThatProvidesThePossibleData.tableData.subscribe((data) => {
      this.possibleValues = [];
      if (data) {
        for (const row of data) {
          this.possibleValues.push(flatten(row));
        }
      }
      this.filterPossibleValueOptions();
    });
    this.dataServiceThatProvidesThePossibleData.loadTableData();
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
    const index = this.dataSource.data.findIndex(
      (element) => element.id === row.id
    );
    if (index === -1) { return; }
    this.dataSource.data.splice(index, 1);
    this.dataSource.data = this.dataSource.data; //needed to trigger update lol
    this.filterPossibleValueOptions();
    this.onReferenceChange();
  }

  addReference(row: any) {
    this.addForm.get('addGroup').reset();
    this.dataSource.data = [row, ...this.dataSource.data];

    this.tableFilterString = '';
    this.applyTableFilter();
    this.filterPossibleValueOptions();
    this.onReferenceChange();
  }

  getRowById(id: string) {
    return this.dataSource.data.find((row) => row.id === id);
  }

  filterPossibleValueOptions() {
    this.possibleValueOptions = this.possibleValues.filter(
      (element) => !this.dataSource.data.find((row) => row.id === element.id)
    );
    let searchString = this.addForm.get('addGroup').value;
    if (!searchString) {
      return;
    }
    searchString = searchString.toLocaleLowerCase();
    this.possibleValueOptions = this.possibleValueOptions.filter((element) =>
      this.nameToShowInSelection(element)
        .toLocaleLowerCase()
        .includes(searchString)
    );
  }

  newFilterStringValue(): void {
    this.filterStringChanged.next(this.tableFilterString);
  }

  applyTableFilter() {
    this.dataSource.filter = this.tableFilterString;
  }

  onReferenceChange() {
    const ids = [];
    for (const element of this.data) {
      ids.push(element.id);
    }
    this.referenceIds.emit(ids);
  }
}
