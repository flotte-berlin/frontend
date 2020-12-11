import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { deepen } from 'src/app/helperFunctions/deepenObject';
import { flatten } from 'src/app/helperFunctions/flattenObject';
import { SchemaService } from 'src/app/services/schema.service';
import { SelectObjectDialogComponent } from '../select-object-dialog/select-object-dialog.component';

interface PropertyTypeInfo {
  dataPath: string;
  translation: string;
  acceptedForUpdating?: boolean;
  requiredForUpdating?: boolean;
  required?: boolean;
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

  /** specifies which property should be shown in the headline */
  @Input()
  headlineDataPath: string;
  /** specifies which string should be shown in the headline. If this is provided headlineDataPath is ignored*/
  @Input()
  getHeadline: (any) => string;
  @Input()
  headlineIconName: string = 'help_outline';
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
  data: any = null;
  isLoading: boolean = false;
  isSavingOrLocking: boolean = false;

  propertyValidity = {};

  constructor(
    private route: ActivatedRoute,
    private schemaService: SchemaService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.addPropertiesFromGQLSchemaToObject(this.propertiesInfo);
    console.log(this.propertiesInfo);
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
      if (prop.type === 'Link') {
        continue;
      }
      if (prop.type === 'Group') {
        this.addPropertiesFromGQLSchemaToObject(prop.properties);
      } else if (prop.type === 'ReferenceTable') {
        prop.tableDataGQLType =
          prop.tableDataGQLType ||
          this.schemaService.getTypeInformation(
            this.pageDataGQLType,
            prop.dataPath
          ).type;
        if (!prop.type) {
          console.error(
            "Didn't found type for: " +
              prop.dataPath +
              ' on ' +
              this.pageDataGQLType
          );
        }
        prop.referenceIds = [];
      } else {
        const typeInformation = this.schemaService.getTypeInformation(
          this.pageDataGQLType,
          prop.dataPath
        );
        prop.type = prop.type || typeInformation.type;
        if (!prop.type) {
          console.error(
            "Didn't found type for: " +
              prop.dataPath +
              ' on ' +
              this.pageDataGQLType
          );}
        prop.required =
          prop.required != null ? prop.required : typeInformation.isRequired;

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
            : prop.required || typeInformation.isRequired;
      }
    }
  }

  lock() {
    this.lockEvent.emit(deepen(this.data));
  }

  validityChange(propName: string, isValid: Event) {
    this.propertyValidity[propName] = isValid;
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

  openSelectObjectDialog(object: any) {
    const dialogRef = this.dialog.open(SelectObjectDialogComponent, {
      width: 'auto',
      autoFocus: false,
      data: {
        nameToShowInSelection: object.nameToShowInSelection,
        currentlySelectedObjectId: object.currentlySelectedObjectId(this.data),
        possibleObjects: object.possibleObjects,
      },
    });
    dialogRef.afterClosed().subscribe((selectedObject) => {
      if (selectedObject) {
        this.data[object.propertyNameOfReferenceId] = selectedObject.id;
        const newObjectFlattened = flatten(selectedObject);
        for (const newProperty in newObjectFlattened) {
          this.data[object.propertyPrefixToOverwrite + '.' + newProperty] =
            newObjectFlattened[newProperty];
        }
      } else if (selectedObject === null) {
        this.data[object.propertyNameOfReferenceId] = null;
        for (const prop in this.data) {
          if (prop.startsWith(object.propertyPrefixToOverwrite)) {
            this.data[prop] = null;
          }
        }
      }
    });
  }

  addReferenceIdsToObject(ids: string[], object) {
    this.data[object.propertyNameOfUpdateInput] = ids;
  }

  reloadPageData() {
    this.dataService.loadPageData({ id: this.id });
  }
}
