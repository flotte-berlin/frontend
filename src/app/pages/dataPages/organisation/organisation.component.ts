import { Component, OnInit } from '@angular/core';
import { ContactInformationService } from 'src/app/services/contactInformation.service';
import { OrganisationsService } from 'src/app/services/organisation.service';

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.scss'],
})
export class OrganisationComponent implements OnInit {
  propertiesInfo = [
    {
      type: 'Group',
      title: 'Allgemein',
      properties: [
        { dataPath: 'name', translation: 'Name' },
        { dataPath: 'address.number', translation: 'Hausnummer' },
        { dataPath: 'address.street', translation: 'Straße' },
        { dataPath: 'address.zip', translation: 'Postleitzahl' },

        { dataPath: 'associationNo', translation: 'Vereinsnummer' },
        { dataPath: 'registeredAt', translation: 'Eingetragen seit' },
      ],
    },
    {
      type: 'Group',
      title: 'Kontaktinformationen',
      possibleObjects: [],
      nameToShowInSelection: (contact) => {
        return (
          contact.person.firstName +
          ' ' +
          contact.person.name +
          ' ' +
          contact.email +
          ' ' +
          contact.phone +
          ' ' +
          contact.note
        );
      },
      propertyPrefixToOverwrite: 'contactInformation',
      currentlySelectedObjectId: (station) => {
        return station['contactInformation.id'];
      },
      propertyNameOfReferenceId: 'contactInformationId',
      properties: [
        {
          dataPath: 'contactInformation.person.firstName',
          translation: 'Vorname Ansprechpartner',
        },
        {
          dataPath: 'contactInformation.person.name',
          translation: 'Nachname Ansprechpartner',
        },
        {
          dataPath: 'contactInformation.phone',
          translation: 'Telefonnummer',
        },
        {
          dataPath: 'contactInformation.phone2',
          translation: 'Telefonnummer 2',
        },
        { dataPath: 'contactInformation.email', translation: 'Email' },
        { dataPath: 'contactInformation.email2', translation: 'Email 2' },
        { dataPath: 'contactInformation.note', translation: 'Anmerkung' },
      ],
    },
    {
      type: 'ReferenceTable',
      title: 'Bereitgestellte Lastenräder',
      dataPath: 'provider.cargoBikes',
      dataService: null,
      columnInfo: [
        {
          dataPath: 'name',
          translation: 'Lastenrad',
          link: (row) => '/bike/' + row['cargoBike.id'],
        },
      ],
      editableReferences: false,
      linkToTable: () => '/table/provider',
    },
    /*{
      type: 'ReferenceTable',
      title: 'Fahrräder',
      dataPath: 'contactInformation',
      dataService: null,
      columnInfo: [
        { dataPath: 'email', translation: 'Email' },
        { dataPath: 'email2', translation: 'Email 2' },
        { dataPath: 'phone', translation: 'Telefonnummer' },
        { dataPath: 'phone2', translation: 'Telefonnummer 2' },
        { dataPath: 'note', translation: 'Anmerkung' },
      ],
      editableReferences: false,
      linkToTable: () => '/table/contactInformation',
    },*/
  ];

  headlineDataPath = 'name';
  headlineIconName = 'organisation';
  pageDataGQLType: string = 'Organisation';
  pageDataGQLUpdateInputType: string = 'OrganisationUpdateInput';

  dataService: any;

  constructor(
    private organisationsService: OrganisationsService,
    private contactInformationService: ContactInformationService
  ) {
    this.contactInformationService.loadTableData();
    this.contactInformationService.tableData.subscribe((data) => {
      this.propertiesInfo.find(
        (prop) => prop.propertyPrefixToOverwrite === 'contactInformation'
      ).possibleObjects = data;
    });
  }

  ngOnInit(): void {
    this.dataService = this.organisationsService;
  }

  lock(row: any) {
    this.organisationsService.lockOrganisation({ id: row.id });
  }

  save(row: any) {
    this.organisationsService.updateOrganisation({ organisation: row });
  }

  cancel(row: any) {
    this.organisationsService.unlockOrganisation({ id: row.id });
  }
}
