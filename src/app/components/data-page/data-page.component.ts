import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { deepen } from 'src/app/helperFunctions/deepenObject';
import { flatten } from 'src/app/helperFunctions/flattenObject';
import { SchemaService } from 'src/app/services/schema.service';

interface PropertyTypeInfo {
  dataPath: string;
  translation: string;
  acceptedForUpdating?: boolean;
  requiredForUpdating?: boolean;
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
  dataPath: string;
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
export class DataPageComponent implements OnInit, OnDestroy {
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

  relockingInterval = null;
  @Input()
  relockingIntervalDuration = 1000 * 60 * 1;

  @Output() lockEvent = new EventEmitter();
  @Output() saveEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();

  id: string;
  data: any;
  isLoading: boolean = false;
  isSavingOrLocking: boolean = false;

  propertyValidity = {};

  constructor(
    private route: ActivatedRoute,
    private schemaService: SchemaService
  ) {}

  ngOnInit(): void {
    this.addPropertiesFromGQLSchemaToObject(this.propertiesInfo);
    this.id = this.route.snapshot.paramMap.get('id');
    this.reloadPageData();
    this.dataService.pageData.subscribe((data) => {
      // dont overwrite data when in edit mode and relock is performed
      if (this.data?.isLockedByMe && data?.isLockedByMe) return;
      this.data = flatten(data);
    });
    this.dataService.isLoadingPageData.subscribe(
      (isLoading) => (this.isLoading = isLoading)
    );
    this.dataService.loadingRowIds.subscribe((loadingRowIds) => {
      this.isSavingOrLocking = loadingRowIds.includes(this.id);
    });

    this.relockingInterval = setInterval(() => {
      if (this.data.isLockedByMe) {
        this.lock();
      }
    }, this.relockingIntervalDuration);
  }

  ngOnDestroy() {
    clearInterval(this.relockingInterval);
  }

  addPropertiesFromGQLSchemaToObject(infoObject: any) {
    for (const prop of infoObject) {
      if (prop.type === 'Group') {
        this.addPropertiesFromGQLSchemaToObject(prop.properties);
      } else if (prop.type === 'ReferenceTable') {
        prop.tableDataGQLType =
          prop.tableDataGQLType ||
          this.schemaService.getTypeInformation(
            this.pageDataGQLType,
            prop.dataPath
          ).type;
        prop.referenceIds = [];
      } else {
        const typeInformation = this.schemaService.getTypeInformation(
          this.pageDataGQLType,
          prop.dataPath
        );
        prop.type = prop.type || typeInformation.type;
        const updateTypeInformation = this.schemaService.getTypeInformation(
          this.pageDataGQLUpdateInputType,
          prop.dataPath
        );
        prop.acceptedForUpdating =
          prop.acceptedForUpdating != null
            ? prop.acceptedForUpdating
            : updateTypeInformation.isPartOfType;
        prop.requiredForUpdating =
          prop.requiredForUpdating != null
            ? prop.requiredForUpdating
            : updateTypeInformation.isRequired;
      }
    }
  }

  lock() {
    this.lockEvent.emit(deepen(this.data));
  }

  validityChange(columnName: string, isValid: Event) {
    this.propertyValidity[columnName] = isValid;
  }

  countUnvalidProperties() {
    let unvalidFieldsCount = 0;
    for (const prop in this.propertyValidity) {
      if (!this.propertyValidity[prop]) {
        unvalidFieldsCount++;
      }
    }
    return unvalidFieldsCount;
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
