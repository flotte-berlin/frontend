import { Component, OnInit } from '@angular/core';
import { ParticipantsService } from 'src/app/services/participants.service';
import { WorkshopTypesService } from 'src/app/services/workshopTypes.service';
import { WorkshopsService } from 'src/app/services/workshop.service';

@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.component.html',
  styleUrls: ['./workshops.component.scss'],
})
export class WorkshopsComponent implements OnInit {
  columnInfo = [
    {
      dataPath: 'title',
      translation: 'Workshopname',
      link: (row: any) => {
        return '/workshop/' + row['id'];
      },
    },
    {
      dataPath: 'description',
      translation: 'Details',
    },
    {
      dataPath: 'workshopType.name',
      translation: 'Workshoptyp',
      possibleObjects: [],
      nameToShowInSelection: (workshopType) => {
        return workshopType.name;
      },
      propertyPrefixToOverwrite: 'workshopType',
      currentlySelectedObjectId: (provider) => {
        return provider['workshopType.id'];
      },
      propertyNameOfReferenceId: 'workshopTypeId',
    },
    {
      dataPath: 'date',
      translation: 'Datum',
    },

    {
      dataPath: 'trainer1.contactInformation.person.firstName',
      translation: 'Trainer 1 Vorname',
      link: (row: any) => {
        return '/participant/' + row['trainer1.id'];
      },
    },
    {
      dataPath: 'trainer1.contactInformation.person.name',
      translation: 'Trainer 1 Nachname',
      link: (row: any) => {
        return '/participant/' + row['trainer1.id'];
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
      propertyPrefixToOverwrite: 'trainer1',
      currentlySelectedObjectId: (provider) => {
        return provider['trainer1.id'];
      },
      propertyNameOfReferenceId: 'trainer1Id',
    },

    {
      dataPath: 'trainer2.contactInformation.person.firstName',
      translation: 'Trainer 2 Vorname',
      link: (row: any) => {
        return '/participant/' + row['trainer2.id'];
      },
    },
    {
      dataPath: 'trainer2.contactInformation.person.name',
      translation: 'Trainer 2 Nachname',
      link: (row: any) => {
        return '/participant/' + row['trainer2.id'];
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
      propertyPrefixToOverwrite: 'trainer2',
      currentlySelectedObjectId: (provider) => {
        return provider['trainer2.id'];
      },
      propertyNameOfReferenceId: 'trainer2Id',
    },
  ];

  dataService: any;

  tableDataGQLType: string = 'Workshop';
  tableDataGQLCreateInputType: string = 'WorkshopCreateInput';
  tableDataGQLUpdateInputType: string = 'WorkshopUpdateInput';

  headline = 'Workshops';
  headlineIconName = 'school';

  loadingRowIds: string[] = [];
  constructor(
    private participantsService: ParticipantsService,
    private workshopTypesService: WorkshopTypesService,
    private workshopsService: WorkshopsService,
  ) {
    this.participantsService.loadTableData();
    this.participantsService.tableData.subscribe((data) => {
      this.columnInfo.find(
        (column) => column.propertyPrefixToOverwrite === 'trainer1'
      ).possibleObjects = data;

      this.columnInfo.find(
        (column) => column.propertyPrefixToOverwrite === 'trainer2'
      ).possibleObjects = data;
    });


    this.workshopTypesService.loadTableData();
    this.workshopTypesService.tableData.subscribe((data) => {
      this.columnInfo.find(
        (column) => column.propertyPrefixToOverwrite === 'workshopType'
      ).possibleObjects = data;
    });
  }

  ngOnInit() {
    this.dataService = this.workshopsService;
  }

  create(object: { currentId: string; row: any }) {
    this.workshopsService.createWorkshop(object.currentId, {
      workshop: object.row,
    });
  }

  lock(row: any) {
    this.workshopsService.lockWorkshop({ id: row.id });
  }

  save(row: any) {
    this.workshopsService.updateWorkshop({ workshop: row });
  }

  cancel(row: any) {
    this.workshopsService.unlockWorkshop({ id: row.id });
  }

  delete(row: any) {
    this.workshopsService.deleteWorkshop({ id: row.id });
  }
}
