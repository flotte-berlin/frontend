import { Component, OnInit } from '@angular/core';
import { ContactInformationService } from 'src/app/services/contactInformation.service';
import { OrganisationsService } from 'src/app/services/organisation.service';
import { PersonsService } from 'src/app/services/person.service';
import { ProvidersService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss'],
})
export class ProvidersComponent implements OnInit {
  columnInfo = [
    {
      dataPath: 'formName',
      translation: 'Formular Name',
      sticky: true
    },
    {
      dataPath: 'organisation.name',
      translation: 'Anbieter (Organisation)',
      link: (row: any) => {
        return '/provider/' + row['id'];
      },
      possibleObjects: [],
      nameToShowInSelection: (o) => o.name,
      propertyPrefixToOverwrite: 'organisation',
      currentlySelectedObjectId: (provider) => {
        return provider['organisation.id'];
      },
      propertyNameOfReferenceId: 'organisationId',
    },
    {
      dataPath: 'privatePerson.person.firstName',
      translation: 'Anbieter (Person) Vorname',
    },
    {
      dataPath: 'privatePerson.person.name',
      translation: 'Anbieter (Person) Nachname',
      link: (row: any) => {
        return '/provider/' + row['id'];
      },
      possibleObjects: [],
      nameToShowInSelection: (contact) => {
        return (
          (contact.person.firstName || '') +
          ' ' +
          (contact.person.name || '') +
          ' ' +
          (contact.email || '') +
          ' ' +
          (contact.phone || '') +
          ' ' +
          (contact.note || '')
        );
      },
      propertyPrefixToOverwrite: 'privatePerson',
      currentlySelectedObjectId: (provider) => {
        return provider['privatePerson.id'];
      },
      propertyNameOfReferenceId: 'privatePersonId',
    },
    {
      dataPath: 'privatePerson.email',
      translation: 'Anbieter (Person) Email',
    },
    {
      dataPath: 'privatePerson.phone',
      translation: 'Anbieter (Person) Telefonnummer',
    },
    {
      dataPath: 'privatePerson.note',
      translation: 'Anbieter (Person) Anmerkung',
    },
  ];

  dataService: any;

  tableDataGQLType: string = 'Provider';
  tableDataGQLCreateInputType: string = 'ProviderCreateInput';
  tableDataGQLUpdateInputType: string = 'ProviderUpdateInput';

  headline = 'Anbieter';
  headlineIconName = 'people';

  loadingRowIds: string[] = [];
  constructor(
    private providersService: ProvidersService,
    private contactInformationService: ContactInformationService,
    private organisationsService: OrganisationsService
  ) {
    this.organisationsService.loadTableData();
    this.organisationsService.tableData.subscribe((data) => {
      this.columnInfo.find(
        (column) => column.propertyPrefixToOverwrite === 'organisation'
      ).possibleObjects = data;
    });

    this.contactInformationService.loadTableData();
    this.contactInformationService.tableData.subscribe((data) => {
      this.columnInfo.find(
        (column) => column.propertyPrefixToOverwrite === 'privatePerson'
      ).possibleObjects = data;
    });
  }

  ngOnInit() {
    this.dataService = this.providersService;
  }

  create(object: { currentId: string; row: any }) {
    this.providersService.createProvider(object.currentId, {
      provider: object.row,
    });
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

  delete(row: any) {
    this.providersService.deleteProvider({ id: row.id });
  }
}
