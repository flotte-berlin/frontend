import { Component, OnInit } from '@angular/core';
import { LendingStationsService } from 'src/app/services/lending-stations.service';

@Component({
  selector: 'app-lending-stations',
  templateUrl: './lending-stations.component.html',
  styleUrls: ['./lending-stations.component.scss'],
})
export class LendingStationsComponent implements OnInit {
  columnInfo = [
    {
      dataPath: 'name',
      translation: 'Name',
      sticky: true,
      link: (row: any) => {
        return '/lendingStation/' + row.id;
      },
    },
    { dataPath: 'address.number', translation: 'Hausnummer' },
    { dataPath: 'address.street', translation: 'Straße' },
    { dataPath: 'address.zip', translation: 'Postleitzahl' },

    { dataPath: 'organisation.name', translation: 'Organisation' },

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
  ];

  dataService: any;

  tableDataGQLType: string = 'LendingStation';
  tableDataGQLCreateInputType: string = 'LendingStationCreateInput';
  tableDataGQLUpdateInputType: string = 'LendingStationUpdateInput';

  headline = 'Standorte';

  loadingRowIds: string[] = [];
  constructor(private lendingStationsService: LendingStationsService) {}

  ngOnInit() {
    this.dataService = this.lendingStationsService;
  }

  create(object: { currentId: string; row: any }) {
    this.lendingStationsService.createLendingStation(object.currentId, {
      lendingStation: object.row,
    });
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

  delete(row: any) {
    this.lendingStationsService.deleteLendingStation({ id: row.id });
  }
}
