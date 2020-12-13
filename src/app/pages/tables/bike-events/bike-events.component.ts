import { Component, OnInit } from '@angular/core';
import { BikeEventTypesService } from 'src/app/services/bikeEventType.service';
import { BikeEventsService } from 'src/app/services/bikeEvent.service';
import { ParticipantsService } from 'src/app/services/participants.service';
import { BikesService } from 'src/app/services/bikes.service';

@Component({
  selector: 'app-bike-events',
  templateUrl: './bike-events.component.html',
  styleUrls: ['./bike-events.component.scss'],
})
export class BikeEventsComponent implements OnInit {
  columnInfo = [
    {
      dataPath: 'bikeEventType.name',
      translation: 'Eventtyp',
      possibleObjects: [],
      nameToShowInSelection: (bikeEventType) => {
        return bikeEventType.name || '';
      },
      propertyPrefixToOverwrite: 'bikeEventType',
      currentlySelectedObjectId: (provider) => {
        return provider['bikeEventType.id'];
      },
      propertyNameOfReferenceId: 'bikeEventTypeId',
    },
    { dataPath: 'date', translation: 'Datum' },
    {
      dataPath: 'responsible.contactInformation.person.firstName',
      translation: 'Verantwortlicher Vorname',
      link: (row: any) => {
        return '/participant/' + row['responsible.id'];
      },
    },
    {
      dataPath: 'responsible.contactInformation.person.name',
      translation: 'Verantwortlicher Nachname',
      link: (row: any) => {
        return '/participant/' + row['responsible.id'];
      },
      possibleObjects: [],
      nameToShowInSelection: (participant) => {
        return (
          (participant.contactInformation.person.firstName || '') +
          ' ' +
          (participant.contactInformation.person.name || '') +
          ' ' +
          (participant.contactInformation.email || '') +
          ' ' +
          (participant.contactInformation.phone || '') +
          ' ' +
          (participant.contactInformation.note || '')
        );
      },
      propertyPrefixToOverwrite: 'responsible',
      currentlySelectedObjectId: (provider) => {
        return provider['responsible.id'];
      },
      propertyNameOfReferenceId: 'responsibleId',
    },

    {
      dataPath: 'related.contactInformation.person.firstName',
      translation: 'Mitarbeiter Vorname',
      link: (row: any) => {
        return '/participant/' + row['related.id'];
      },
    },
    {
      dataPath: 'related.contactInformation.person.name',
      translation: 'Mitarbeiter Nachname',
      link: (row: any) => {
        return '/participant/' + row['related.id'];
      },
      possibleObjects: [],
      nameToShowInSelection: (participant) => {
        return (
          (participant.contactInformation.person.firstName || '') +
          ' ' +
          (participant.contactInformation.person.name || '') +
          ' ' +
          (participant.contactInformation.email || '') +
          ' ' +
          (participant.contactInformation.phone || '') +
          ' ' +
          (participant.contactInformation.note || '')
        );
      },
      propertyPrefixToOverwrite: 'related',
      currentlySelectedObjectId: (provider) => {
        return provider['related.id'];
      },
      propertyNameOfReferenceId: 'relatedId',
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
      propertyNameOfReferenceId: 'cargoBikeId',
    },
    { dataPath: 'description', translation: 'Beschreibung' },
    { dataPath: 'remark', translation: 'Anmerkung' },
    { dataPath: 'documents', translation: 'Dokumente' },
  ];

  dataService: any;

  tableDataGQLType: string = 'BikeEvent';
  tableDataGQLCreateInputType: string = 'BikeEventCreateInput';
  tableDataGQLUpdateInputType: string = 'BikeEventUpdateInput';

  headline = 'Lastenradevents';
  headlineIconName = 'event';

  loadingRowIds: string[] = [];
  constructor(
    private participantsService: ParticipantsService,
    private bikeEventsService: BikeEventsService,
    private bikeEventTypessService: BikeEventTypesService,
    private bikesService: BikesService,
  ) {
    this.participantsService.loadTableData();
    this.participantsService.tableData.subscribe((data) => {
      this.columnInfo.find(
        (column) => column.propertyPrefixToOverwrite === 'responsible'
      ).possibleObjects = data;
      this.columnInfo.find(
        (column) => column.propertyPrefixToOverwrite === 'related'
      ).possibleObjects = data;
    });

    this.bikesService.loadTableData();
    this.bikesService.tableData.subscribe((data) => {
      this.columnInfo.find(
        (column) => column.propertyPrefixToOverwrite === 'cargoBike'
      ).possibleObjects = data;
    });

    this.bikeEventTypessService.loadTableData();
    this.bikeEventTypessService.tableData.subscribe((data) => {
      this.columnInfo.find(
        (column) => column.propertyPrefixToOverwrite === 'bikeEventType'
      ).possibleObjects = data;
    });
  }

  ngOnInit() {
    this.dataService = this.bikeEventsService;
  }

  create(object: { currentId: string; row: any }) {
    this.bikeEventsService.createBikeEvent(object.currentId, {
      bikeEvent: object.row,
    });
  }

  lock(row: any) {
    this.bikeEventsService.lockBikeEvent({ id: row.id });
  }

  save(row: any) {
    this.bikeEventsService.updateBikeEvent({ bikeEvent: row });
  }

  cancel(row: any) {
    this.bikeEventsService.unlockBikeEvent({ id: row.id });
  }

  delete(row: any) {
    this.bikeEventsService.deleteBikeEvent({ id: row.id });
  }
}
