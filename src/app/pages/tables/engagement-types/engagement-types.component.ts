import { Component, OnInit } from '@angular/core';
import { EngagementTypesService } from 'src/app/services/engagementTypes.service';

@Component({
  selector: 'app-engagement-types',
  templateUrl: './engagement-types.component.html',
  styleUrls: ['./engagement-types.component.scss'],
})
export class EngagementTypesComponent implements OnInit {
  columnInfo = [
    {
      dataPath: 'name',
      translation: 'Name',
    },
    { dataPath: 'description', translation: 'Beschreibung' },
  ];

  dataService: any;

  tableDataGQLType: string = 'EngagementType';
  tableDataGQLCreateInputType: string = 'EngagementTypeCreateInput';
  tableDataGQLUpdateInputType: string = 'EngagementTypeUpdateInput';

  headline = 'Engagementtypen';
  headlineIconName = 'track_changes';

  loadingRowIds: string[] = [];
  constructor(private engagementTypesService: EngagementTypesService) {}

  ngOnInit() {
    this.dataService = this.engagementTypesService;
  }

  create(object: { currentId: string; row: any }) {
    this.engagementTypesService.create(object.currentId, {
      engagementType: object.row,
    });
  }

  lock(row: any) {
    this.engagementTypesService.lock({ id: row.id });
  }

  save(row: any) {
    this.engagementTypesService.update({ engagementType: row });
  }

  cancel(row: any) {
    this.engagementTypesService.unlock({ id: row.id });
  }

  delete(row: any) {
    this.engagementTypesService.delete({ id: row.id });
  }
}
