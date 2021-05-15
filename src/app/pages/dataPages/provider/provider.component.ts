import { Component, OnInit } from '@angular/core';
import { bindNodeCallback } from 'rxjs';
import { BikesService } from 'src/app/services/bikes.service';
import { OrganisationsService } from 'src/app/services/organisation.service';
import { PersonsService } from 'src/app/services/person.service';
import { ProvidersService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss'],
})
export class ProviderComponent implements OnInit {
  propertiesInfo = [
    {
      type: 'Group',
      title: 'Allgemein',
      hideCondition: (data) => data.privatePerson === null,
      properties: [
        { dataPath: 'formName', translation: 'Formular-Name' },
        {
          type: 'Link',
          linkText: "Zur Person",
          link: (data) => {
            return '/person/' + data['privatePerson.person.id'];
          },
        },
        { dataPath: 'privatePerson.person.firstName', translation: 'Vorname' },
        { dataPath: 'privatePerson.person.name', translation: 'Nachname' },
      ],
    },
    {
      type: 'Group',
      title: 'Kontaktinformationen',
      hideCondition: (data) => data.privatePerson === null,
      properties: [
        { dataPath: 'privatePerson.phone', translation: 'Telefonnummer' },
        { dataPath: 'privatePerson.phone2', translation: 'Telefonnummer 2' },
        { dataPath: 'privatePerson.email', translation: 'Email' },
        { dataPath: 'privatePerson.email2', translation: 'Email 2' },
        { dataPath: 'privatePerson.address.number', translation: 'Hausnummer' },
        { dataPath: 'privatePerson.address.street', translation: 'Straße' },
        { dataPath: 'privatePerson.address.zip', translation: 'Postleitzahl' },
        { dataPath: 'privatePerson.address.city', translation: 'Ort' },
        { dataPath: 'privatePerson.note', translation: 'Anmerkung' },
      ]
    },
    {
      type: 'Group',
      title: 'Allgemein',
      hideCondition: (data) => data.organisation === null,
      properties: [
        { dataPath: 'formName', translation: 'Formular-Name' },
        {
          type: 'Link',
          linkText: "Zur Organisation",
          link: (data) => {
            return '/organisation/' + data['organisation.id'];
          },
        },
        { dataPath: 'organisation.name', translation: 'Name Organisation' },
        { dataPath: 'organisation.address.number', translation: 'Hausnummer' },
        { dataPath: 'organisation.address.street', translation: 'Straße' },
        { dataPath: 'organisation.address.zip', translation: 'Postleitzahl' },
        { dataPath: 'organisation.address.city', translation: 'Ort' },
      ],
    },
    {
      type: 'Group',
      title: 'Ansprechpartner',
      hideCondition: (data) => data.organisation === null,
      properties: [
        { dataPath: 'organisation.contactInformation.person.firstName', translation: 'Vorname' },
        { dataPath: 'organisation.contactInformation.person.name', translation: 'Nachnname' },
        { dataPath: 'organisation.contactInformation.phone', translation: 'Telefonnummer' },
        { dataPath: 'organisation.contactInformation.phone2', translation: 'Telefonnummer 2' },
        { dataPath: 'organisation.contactInformation.email', translation: 'Email' },
        { dataPath: 'organisation.contactInformation.email2', translation: 'Email 2' },
        { dataPath: 'organisation.contactInformation.note', translation: 'Anmerkung' },
      ]
    },
    {
      type: 'ReferenceTable',
      title: 'Bereitgestellte Lastenräder',
      dataPath: 'cargoBikes',
      dataService: null,
      columnInfo: [
        {
          dataPath: 'name',
          translation: 'Name',
          link: (row) => '/bike/' + row.id,
        },
      ],
      nameToShowInSelection: (bike) => {
        return bike.name;
      },
      linkToTable: (element) => '/table/bikes',
      propertyNameOfUpdateInput: 'cargoBikeIds',
      editableReferences: true,
      deletableReferences: false,
    },
  ];

  getHeadline = (pageData) => {
    return (
      (pageData['privatePerson.person.firstName']
        ? pageData['privatePerson.person.firstName'] +
          ' ' +
          pageData['privatePerson.person.name']
        : pageData['organisation.name']) + ' (Anbieter)'
    );
  };
  headlineDataPath = '';
  headlineIconName = 'person';
  pageDataGQLType: string = 'Provider';
  pageDataGQLUpdateInputType: string = 'ProviderUpdateInput';

  dataService: any;

  constructor(
    private providersService: ProvidersService,
    private bikesService: BikesService
  ) {
    this.propertiesInfo.find(
      (prop) => prop.dataPath === 'cargoBikes'
    ).dataService = this.bikesService;
  }

  ngOnInit(): void {
    this.dataService = this.providersService;
  }

  lock(row: any) {
    this.providersService.lockProvider({ id: row.id });
  }

  save(row: any) {
    this.providersService.updateProvider({ provider: row });
  }

  cancel(row: any) {
    this.providersService.unlockProvider({ id: row.id });
  }
}
