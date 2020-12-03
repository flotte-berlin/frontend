import { Component, OnInit } from '@angular/core';
import { LendingStationsService } from 'src/app/services/lending-stations.service';
import { ContactInformationService } from 'src/app/services/contactInformation.service';

@Component({
  selector: 'app-lending-station',
  templateUrl: './lending-station.component.html',
  styleUrls: ['./lending-station.component.scss'],
})
export class LendingStationComponent implements OnInit {
  propertiesInfo = [
    {
      type: 'Group',
      title: 'Allgemein',
      properties: [
        { dataPath: 'name', translation: 'Name' },
        { dataPath: 'organisation.name', translation: 'Organisation' },
      ],
    },
    {
      type: 'Group',
      title: 'Adresse',
      properties: [
        { dataPath: 'address.number', translation: 'Hausnummer' },
        { dataPath: 'address.street', translation: 'Straße' },
        { dataPath: 'address.zip', translation: 'Postleitzahl' },
      ],
    },
    {
      type: 'Group',
      title: 'Öffnungszeiten',
      properties: [],
    },
    {
      type: 'Group',
      title: 'Kontaktinformationen intern',
      possibleObjects: [],
      nameToShowInSelection: (contact) => {
        return (
          contact.person.firstName +
          ' ' +
          contact.person.name +
          ' ' +
          contact.email +
          ' ' +
          contact.phone
        );
      },
      propertyPrefixToOverwrite: 'contactInformationIntern',
      currentlySelectedObjectId: (station) => {
        return station['contactInformationIntern.id'];
      },
      propertyNameOfReferenceId: 'contactInformationInternId',
      properties: [
        {
          dataPath: 'contactInformationIntern.person.firstName',
          translation: 'Vorname Ansprechpartner intern',
        },
        {
          dataPath: 'contactInformationIntern.person.name',
          translation: 'Nachname Ansprechpartner intern',
        },
        {
          dataPath: 'contactInformationIntern.phone',
          translation: 'Telefonnummer',
        },
        {
          dataPath: 'contactInformationIntern.phone2',
          translation: 'Telefonnummer 2',
        },
        { dataPath: 'contactInformationIntern.email', translation: 'Email' },
        { dataPath: 'contactInformationIntern.email2', translation: 'Email 2' },
        { dataPath: 'contactInformationIntern.note', translation: 'Anmerkung' },
      ],
    },
    {
      type: 'Group',
      title: 'Kontaktinformationen extern',
      possibleObjects: [],
      nameToShowInSelection: (contact) => {
        return (
          contact.person.firstName +
          ' ' +
          contact.person.name +
          ' ' +
          contact.email +
          ' ' +
          contact.phone
        );
      },
      propertyPrefixToOverwrite: 'contactInformationExtern',
      currentlySelectedObjectId: (station) => {
        return station['contactInformationExtern.id'];
      },
      propertyNameOfReferenceId: 'contactInformationExternId',
      properties: [
        {
          dataPath: 'contactInformationExtern.person.firstName',
          translation: 'Vorname Ansprechpartner extern',
        },
        {
          dataPath: 'contactInformationExtern.person.name',
          translation: 'Nachname Ansprechpartner extern',
        },
        {
          dataPath: 'contactInformationExtern.phone',
          translation: 'Telefonnummer',
        },
        {
          dataPath: 'contactInformationExtern.phone2',
          translation: 'Telefonnummer 2',
        },
        { dataPath: 'contactInformationExtern.email', translation: 'Email' },
        { dataPath: 'contactInformationExtern.email2', translation: 'Email 2' },
        { dataPath: 'contactInformationExtern.note', translation: 'Anmerkung' },
      ],
    },
    {
      type: 'ReferenceTable',
      title: 'Zeitscheiben',
      dataPath: 'timeFrames',
      dataService: null,
      columnInfo: [
        { dataPath: 'dateRange', translation: 'Zeitraum' },
        { dataPath: 'cargoBike.name', translation: 'Lastenrad',
        link: (row) => '/bike/' + row["cargoBike.id"], },
      ],
      editableReferences: false,
      linkToTable: () => '/table/timeFrames',
      linkToTableParams: (lendingStation) => {
        return { filter: lendingStation.name };
      },
    },
  ];

  headlineDataPath = 'name';
  headlineIconName = 'location_on';
  pageDataGQLType: string = 'LendingStation';
  pageDataGQLUpdateInputType: string = 'LendingStationUpdateInput';

  dataService: any;

  constructor(
    private lendingStationsService: LendingStationsService,
    private contactInformationService: ContactInformationService,
  ) {
    this.contactInformationService.loadTableData();
    this.contactInformationService.tableData.subscribe((data) => {
      this.propertiesInfo.find(
        (prop) => prop.propertyPrefixToOverwrite === 'contactInformationIntern'
      ).possibleObjects = data;

      this.propertiesInfo.find(
        (prop) => prop.propertyPrefixToOverwrite === 'contactInformationExtern'
      ).possibleObjects = data;
    });
  }

  ngOnInit(): void {
    this.dataService = this.lendingStationsService;
  }

  lock(row: any) {
    this.lendingStationsService.lockLendingStation({ id: row.id });
  }

  save(row: any) {
    this.lendingStationsService.updateLendingStation({ lendingStation: row });
  }

  cancel(row: any) {
    this.lendingStationsService.unlockLendingStation({ id: row.id });
  }
}
