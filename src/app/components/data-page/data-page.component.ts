import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { deepen } from 'src/app/helperFunctions/deepenObject';
import { flatten } from 'src/app/helperFunctions/flattenObject';
import { BikesService } from 'src/app/services/bikes.service';
import { SchemaService } from 'src/app/services/schema.service';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-data-page',
  templateUrl: './data-page.component.html',
  styleUrls: ['./data-page.component.scss'],
})
export class DataPageComponent implements OnInit {
  @Input()
  propertiesInfo: {
    name: string;
    translation: string;
    readonly?: boolean;
    type?: string;
  }[] = [];

  @Input()
  dataService: any;

  @Input()
  headlineDataPath: string;
  @Input()
  pageDataGQLType: string = 'CargoBike';
  @Input()
  pageDataGQLUpdateInputType: string = 'CargoBikeUpdateInput';

  @Output() lockEvent = new EventEmitter();
  @Output() saveEvent = new EventEmitter();

  id: string;
  data: any;
  isLoading: boolean = false;
  isSavingOrLocking: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private schemaService: SchemaService
  ) {}

  ngOnInit(): void {
    this.addPropertiesFromGQLSchemaToPropertiesInfo();
    this.id = this.route.snapshot.paramMap.get('id');
    this.reloadPageData();
    this.dataService.pageData.subscribe((data) => {
      this.data = flatten(data);
    });
    this.dataService.isLoadingPageData.subscribe(
      (isLoading) => (this.isLoading = isLoading)
    );
    this.dataService.loadingRowIds.subscribe(loadingRowIds => {
      console.log(loadingRowIds);
      this.isSavingOrLocking = loadingRowIds.includes(this.id);
    })
  }

  addPropertiesFromGQLSchemaToPropertiesInfo() {
    for (const column of this.propertiesInfo) {
      const typeInformation = this.schemaService.getTypeInformation(
        this.pageDataGQLType,
        column.name
      );
      column.type = column.type || typeInformation.type;
    }
    for (const column of this.propertiesInfo) {
      const typeInformation = this.schemaService.getTypeInformation(
        this.pageDataGQLUpdateInputType,
        column.name
      );
      column.readonly = column.readonly || !typeInformation.isPartOfType;
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

  reloadPageData() {
    this.dataService.loadPageData({ id: this.id });
  }
}
