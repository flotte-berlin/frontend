import { Component, OnInit } from '@angular/core';
import { WorkshopsService } from 'src/app/services/workshop.service';
import { WorkshopTypesService } from 'src/app/services/workshopTypes.service';
import { ParticipantsService } from 'src/app/services/participants.service';

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.scss'],
})
export class WorkshopComponent implements OnInit {
  propertiesInfo = [
    {
      type: 'Group',
      title: 'Allgemein',
      properties: [
        { dataPath: 'title', translation: 'Workshopname' },
        { dataPath: 'description', translation: 'Details' },
        {
          dataPath: 'date',
          translation: 'Datum',
        },
      ],
    },
    {
      type: 'Group',
      title: 'Workshoptyp',
      possibleObjects: [],
      nameToShowInSelection: (workshopType) => {
        return workshopType.name;
      },
      propertyPrefixToOverwrite: 'workshopType',
      currentlySelectedObjectId: (provider) => {
        return provider['workshopType.id'];
      },
      propertyNameOfReferenceId: 'workshopTypeId',
      properties: [
        {
          dataPath: 'workshopType.name',
          translation: 'Workshoptyp',
        },
      ],
    },
    {
      type: 'Group',
      title: 'Trainer 1',
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
      properties: [
        {
          dataPath: 'trainer1.contactInformation.person.firstName',
          translation: 'Vorname',
        },
        {
          dataPath: 'trainer1.contactInformation.person.name',
          translation: 'Nachname',
        },
        {
          dataPath: 'trainer1.contactInformation.phone',
          translation: 'Telefonnummer',
        },
        {
          dataPath: 'trainer1.contactInformation.phone2',
          translation: 'Telefonnummer 2',
        },
        { dataPath: 'trainer1.contactInformation.email', translation: 'Email' },
        {
          dataPath: 'trainer1.contactInformation.email2',
          translation: 'Email 2',
        },
        {
          dataPath: 'trainer1.contactInformation.note',
          translation: 'Anmerkung',
        },
      ],
    },
    {
      type: 'Group',
      title: 'Trainer 2',
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
      properties: [
        {
          dataPath: 'trainer2.contactInformation.person.firstName',
          translation: 'Vorname',
        },
        {
          dataPath: 'trainer2.contactInformation.person.name',
          translation: 'Nachname',
        },
        {
          dataPath: 'trainer2.contactInformation.phone',
          translation: 'Telefonnummer',
        },
        {
          dataPath: 'trainer2.contactInformation.phone2',
          translation: 'Telefonnummer 2',
        },
        { dataPath: 'trainer2.contactInformation.email', translation: 'Email' },
        {
          dataPath: 'trainer2.contactInformation.email2',
          translation: 'Email 2',
        },
        {
          dataPath: 'trainer2.contactInformation.note',
          translation: 'Anmerkung',
        },
      ],
    },
    {
      type: 'ReferenceTable',
      title: 'Teilnehmer (Aktive)',
      dataPath: 'participants',
      dataService: null,
      columnInfo:  [
        { dataPath: 'contactInformation.person.firstName', translation: 'Vorname' },
        { dataPath: 'contactInformation.person.name', translation: 'Nachname',
        link: (row) => '/person/' + row['contactInformation.person.id'], },
        { dataPath: 'contactInformation.email', translation: 'Email' },
        { dataPath: 'contactInformation.phone', translation: 'Telefonnummer' },
      ],
      editableReferences: false,
      linkToTable: () => '/table/participants',
    },
  ];

  headlineDataPath = 'title';
  headlineIconName = 'school';
  pageDataGQLType: string = 'Workshop';
  pageDataGQLUpdateInputType: string = 'WorkshopUpdateInput';

  dataService: any;

  constructor(
    private workshopsService: WorkshopsService,
    private participantsService: ParticipantsService,
    private workshopTypesService: WorkshopTypesService
  ) {
    this.participantsService.loadTableData();
    this.participantsService.tableData.subscribe((data) => {
      this.propertiesInfo.find(
        (prop) => prop.propertyPrefixToOverwrite === 'trainer1'
      ).possibleObjects = data;

      this.propertiesInfo.find(
        (prop) => prop.propertyPrefixToOverwrite === 'trainer2'
      ).possibleObjects = data;

      //add posible tabledata??
    });

    this.workshopTypesService.loadTableData();
    this.workshopTypesService.tableData.subscribe((data) => {
      this.propertiesInfo.find(
        (prop) => prop.propertyPrefixToOverwrite === 'workshopType'
      ).possibleObjects = data;
    });
  }

  ngOnInit(): void {
    this.dataService = this.workshopsService;
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
}
