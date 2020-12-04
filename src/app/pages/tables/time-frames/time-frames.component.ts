import { Component, OnInit } from '@angular/core';
import { BikesService } from 'src/app/services/bikes.service';
import { LendingStationsService } from 'src/app/services/lending-stations.service';
import { TimeFrameService } from 'src/app/services/timeFrame.service';
@Component({
  selector: 'app-time-frames',
  templateUrl: './time-frames.component.html',
  styleUrls: ['./time-frames.component.scss'],
})
export class TimeFramesComponent implements OnInit {
  headline = 'Zeitscheiben';
  headlineIconName = 'access_time';

  columnInfo = [
    {
      dataPath: 'dateRange',
      translation: 'Zeitraum',
      type: 'DateRange',
      readonly: false,
    },
    {
      dataPath: 'cargoBike.name',
      translation: 'Lastenrad',
      link: (element) => {
        return '/bike/' + element['cargoBike.id'];
      },
      possibleObjects: [],
      nameToShowInSelection: (bike) => bike.name,
      propertyPrefixToOverwrite: 'cargoBike',
      currentlySelectedObjectId: (timeFrame) => {
        return timeFrame['cargoBike.id'];
      },
      propertyNameOfReferenceId: 'cargoBikeId'
    },
    {
      dataPath: 'lendingStation.name',
      translation: 'Standort',
      link: (element) => {
        return '/lendingStation/' + element['lendingStation.id'];
      },
      possibleObjects: [],
      nameToShowInSelection: (station) => station.name,
      propertyPrefixToOverwrite: 'lendingStation',
      currentlySelectedObjectId: (timeFrame) => {
        return timeFrame['lendingStation.id'];
      },
      propertyNameOfReferenceId: 'lendingStationId'
    },
  ];

  dataService: TimeFrameService;

  tableDataGQLType: string = 'TimeFrame';
  tableDataGQLCreateInputType: string = 'TimeFrameCreateInput';
  tableDataGQLUpdateInputType: string = 'TimeFrameUpdateInput';

  loadingRowIds: string[] = [];
  constructor(
    private service: TimeFrameService,
    private bikesService: BikesService,
    private lendingStationsService: LendingStationsService
  ) {
    this.bikesService.loadTableData();
    this.bikesService.tableData.subscribe((data) => {
      this.columnInfo.find(
        (column) => column.dataPath === 'cargoBike.name'
      ).possibleObjects = data;
    });

    this.lendingStationsService.loadTableData();
    this.lendingStationsService.tableData.subscribe((data) => {
      this.columnInfo.find(
        (column) => column.dataPath === 'lendingStation.name'
      ).possibleObjects = data;
    });
  }

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
