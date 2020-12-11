import { Component, OnInit } from '@angular/core';
import { WorkshopTypesService } from 'src/app/services/workshopTypes.service';

@Component({
  selector: 'app-workshop-types',
  templateUrl: './workshop-types.component.html',
  styleUrls: ['./workshop-types.component.scss']
})
export class WorkshopTypesComponent implements OnInit {
  columnInfo = [
    {
      dataPath: 'name',
      translation: 'Name',
    },
  ];

  dataService: any;

  tableDataGQLType: string = 'WorkshopType';
  tableDataGQLCreateInputType: string = 'WorkshopTypeCreateInput';
  tableDataGQLUpdateInputType: string = 'WorkshopTypeUpdateInput';

  headline = 'Workshoptypen';
  headlineIconName = 'multiline_chart';

  loadingRowIds: string[] = [];
  constructor(private workshopTypesService: WorkshopTypesService) {}

  ngOnInit() {
    this.dataService = this.workshopTypesService;
  }

  create(object: { currentId: string; row: any }) {
    this.workshopTypesService.create(object.currentId, {
      workshopType: object.row,
    });
  }

  lock(row: any) {
    this.workshopTypesService.lock({ id: row.id });
  }

  save(row: any) {
    this.workshopTypesService.update({ workshopType: row });
  }

  cancel(row: any) {
    this.workshopTypesService.unlock({ id: row.id });
  }

  delete(row: any) {
    this.workshopTypesService.delete({ id: row.id });
  }
}
