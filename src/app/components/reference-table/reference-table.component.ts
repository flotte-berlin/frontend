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

  displayedColumns: string[] = [];

  /** data source of the table */
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  possibleValues: Array<any> = [];
  idsOfObjectsToHide = [];

  reloadingTable = false;

  tableFilterString = '';
  filterStringChanged: Subject<string> = new Subject<string>();

  constructor(private schemaService: SchemaService) {}

  ngOnInit() {
    this.addColumnPropertiesFromGQLSchemaToColumnInfo();
    this.columnInfo.forEach((column) => {
      this.displayedColumns.push(column.dataPath);
    });
    if (this.editableReferences) {
      this.displayedColumns.push('buttons');
    }

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
    this.tableFilterString = '';
    this.applyTableFilter();
    this.onReferenceChange();
  }

  getRowById(id: string) {
    return this.dataSource.data.find((row) => row.id === id);
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
