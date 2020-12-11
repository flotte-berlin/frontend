import { Component, OnInit } from '@angular/core';
import { BikeEventTypesService } from 'src/app/services/bikeEventType.service';

@Component({
  selector: 'app-bike-event-types',
  templateUrl: './bike-event-types.component.html',
  styleUrls: ['./bike-event-types.component.scss'],
})
export class BikeEventTypesComponent implements OnInit {
  columnInfo = [
    {
      dataPath: 'name',
      translation: 'Name',
    },
  ];

  dataService: any;

  tableDataGQLType: string = 'BikeEventType';
  tableDataGQLCreateInputType: string = 'BikeEventTypeCreateInput';
  tableDataGQLUpdateInputType: string = 'BikeEventTypeUpdateInput';

  headline = 'Lastenradeventtypen';
  headlineIconName = 'build';

  loadingRowIds: string[] = [];
  constructor(private BikeEventTypeTypesService: BikeEventTypesService) {}

  ngOnInit() {
    this.dataService = this.BikeEventTypeTypesService;
  }

  create(object: { currentId: string; row: any }) {
    this.BikeEventTypeTypesService.create(object.currentId, {
      bikeEventType: object.row,
    });
  }

  lock(row: any) {
    this.BikeEventTypeTypesService.lock({ id: row.id });
  }

  save(row: any) {
    this.BikeEventTypeTypesService.update({ bikeEventType: row });
  }

  cancel(row: any) {
    this.BikeEventTypeTypesService.unlock({ id: row.id });
  }

  delete(row: any) {
    this.BikeEventTypeTypesService.delete({ id: row.id });
  }
}
