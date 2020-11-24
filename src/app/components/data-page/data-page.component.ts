import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { deepen } from 'src/app/helperFunctions/deepenObject';
import { flatten } from 'src/app/helperFunctions/flattenObject';
import { SchemaService } from 'src/app/services/schema.service';

interface PropertyTypeInfo {
  name: string;
  translation: string;
  readonly?: boolean;
  type?: string;
}

interface PropertyGroupInfo {
  type: string;
  title: string;
  properties: PropertyTypeInfo[];
}
interface ReferenceTableInfo {
  type: string;
  title: string;
  name: string;
  dataService: any;
  columnInfo: PropertyTypeInfo[];
  nameToShowInSelection: any;
  propertyNameOfUpdateInput: string;
  referenceIds: Array<string>;
}

@Component({
  selector: 'app-data-page',
  templateUrl: './data-page.component.html',
  styleUrls: ['./data-page.component.scss'],
})
export class DataPageComponent implements OnInit {
  @Input()
  propertiesInfo: Array<any> = [];

  @Input()
  dataService: any;

  @Input()
  headlineDataPath: string;
  @Input()
  pageDataGQLType: string;
  @Input()
  pageDataGQLUpdateInputType: string;
  @Input()
  propertyNameOfUpdateInput: string;

  @Output() lockEvent = new EventEmitter();
  @Output() saveEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();

  id: string;
  data: any;
  isLoading: boolean = false;
  isSavingOrLocking: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private schemaService: SchemaService
  ) {}

  ngOnInit(): void {
    this.addPropertiesFromGQLSchemaToObject(this.propertiesInfo);
    this.id = this.route.snapshot.paramMap.get('id');
    this.reloadPageData();
    this.dataService.pageData.subscribe((data) => {
      this.data = flatten(data);
    });
    this.dataService.isLoadingPageData.subscribe(
      (isLoading) => (this.isLoading = isLoading)
    );
    this.dataService.loadingRowIds.subscribe((loadingRowIds) => {
      this.isSavingOrLocking = loadingRowIds.includes(this.id);
    });
  }

  addPropertiesFromGQLSchemaToObject(infoObject: any) {
    for (const prop of infoObject) {
      if (prop.type === 'Group') {
        this.addPropertiesFromGQLSchemaToObject(prop.properties);
      } else if (prop.type === 'ReferenceTable') {
        prop.tableDataGQLType =
          prop.tableDataGQLType ||
          this.schemaService.getTypeInformation(this.pageDataGQLType, prop.name)
            .type;
        prop.referenceIds = [];
      } else {
        const typeInformation = this.schemaService.getTypeInformation(
          this.pageDataGQLType,
          prop.name
        );
        prop.type = prop.type || typeInformation.type;
        const updateTypeInformation = this.schemaService.getTypeInformation(
          this.pageDataGQLUpdateInputType,
          prop.name
        );
        prop.readonly = prop.readonly || !updateTypeInformation.isPartOfType;
      }
    }
  }

  lock() {
    this.lockEvent.emit(deepen(this.data));
  }

  save() {
    this.saveEvent.emit(
      this.schemaService.filterObject(
        this.pageDataGQLUpdateInputType,
        deepen(this.data)
      )
    );
  }

  cancel() {
    this.cancelEvent.emit(deepen(this.data));
  }

  addReferenceIdsToObject(ids: string[], object) {
    this.data[object.propertyNameOfUpdateInput] = ids;
  }

  reloadPageData() {
    this.dataService.loadPageData({ id: this.id });
  }
}
