import { Component, OnInit } from '@angular/core';
import { OrganisationsService } from 'src/app/services/organisation.service';

@Component({
  selector: 'app-organisations',
  templateUrl: './organisations.component.html',
  styleUrls: ['./organisations.component.scss'],
})
export class OrganisationsComponent implements OnInit {
  columnInfo = [
    {
      dataPath: 'name',
      translation: 'Name',
      sticky: true,
      link: (row: any) => {
        return '/organisation/' + row.id;
      },
    },
    { dataPath: 'address.number', translation: 'Hausnummer' },
    { dataPath: 'address.street', translation: 'Straße' },
    { dataPath: 'address.zip', translation: 'Postleitzahl' },

    { dataPath: 'associationNo', translation: 'Vereinsnummer' },
    { dataPath: 'registeredAt', translation: 'Registergericht' },

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
  ];

  dataService: any;

  tableDataGQLType: string = 'Organisation';
  tableDataGQLCreateInputType: string = 'OrganisationCreateInput';
  tableDataGQLUpdateInputType: string = 'OrganisationUpdateInput';

  headline = 'Organisation';
  headlineIconName = 'business';

  loadingRowIds: string[] = [];
  constructor(private organisationsService: OrganisationsService) {}

  ngOnInit() {
    this.dataService = this.organisationsService;
  }

  create(object: { currentId: string; row: any }) {
    this.organisationsService.createOrganisation(object.currentId, {
      organisation: object.row,
    });
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

  delete(row: any) {
    this.organisationsService.deleteOrganisation({ id: row.id });
  }
}
