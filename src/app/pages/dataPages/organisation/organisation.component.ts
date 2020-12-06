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
        { dataPath: 'address.street', translation: 'Straße' },
        { dataPath: 'address.number', translation: 'Hausnummer' },
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
      type: 'Group',
      title: 'Anbieterinformationen',
      hideCondition: (data) => data.provider === null,
      properties: [
        { dataPath: 'provider.formName', translation: 'Formularname' },
        {
          type: 'Link',
          linkText: "Zur Anbieterseite",
          link: (data) => {
            return '/provider/' + data['provider.id'];
          },
        },
      ],
    },
    {
      type: 'ReferenceTable',
      hideCondition: (data) => data.provider === null,
      title: 'Bereitgestellte Lastenräder',
      dataPath: 'provider.cargoBikes',
      dataService: null,
      columnInfo: [
        {
          dataPath: 'name',
          translation: 'Lastenrad',
          link: (row) => '/bike/' + row['id'],
        },
      ],
      editableReferences: false,
      linkToTable: () => '/table/provider',
    },
  ];

  headlineDataPath = 'name';
  headlineIconName = 'business';
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
