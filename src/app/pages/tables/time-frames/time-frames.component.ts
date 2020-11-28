import { Component, OnInit } from '@angular/core';
import { TimeFrameService } from 'src/app/services/timeFrame.service';
@Component({
  selector: 'app-time-frames',
  templateUrl: './time-frames.component.html',
  styleUrls: ['./time-frames.component.scss'],
})
export class TimeFramesComponent implements OnInit {
  headline = 'Zeitscheiben';

  columnInfo = [
    { dataPath: 'dataRange', translation: 'Zeitraum', type: 'DateRange', readonly: false },
    {
      dataPath: 'cargoBike.name',
      translation: 'Lastenrad',
      link: (element) => {
        return '/bike/' + element['cargoBike.id'];
      },
    },
    {
      dataPath: 'lendingStation.name',
      translation: 'Ausleihstation',
      link: (element) => {
        return '/lendingStation/' + element['lendingStation.id'];
      },
    },
  ];

  dataService: TimeFrameService;

  tableDataGQLType: string = 'TimeFrame';
  tableDataGQLCreateInputType: string = 'TimeFrameCreateInput';
  tableDataGQLUpdateInputType: string = 'TimeFrameUpdateInput';

  loadingRowIds: string[] = [];
  constructor(private service: TimeFrameService) {}

  ngOnInit() {
    this.dataService = this.service;
  }

  create(value: { currentId: string; row: any }) {
    this.dataService.create(value.currentId, { timeFrame: value.row });
  }

  lock(row: any) {
    this.dataService.lock({ id: row.id });
  }

  save(row: any) {
    this.dataService.update({ timeFrame: row });
  }

  cancel(row: any) {
    this.dataService.unlock({ id: row.id });
  }

  delete(row: any) {
    this.dataService.delete({ id: row.id });
  }
}
