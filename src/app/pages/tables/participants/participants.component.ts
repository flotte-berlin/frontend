import { Component, OnInit } from '@angular/core';
import { ContactInformationService } from 'src/app/services/contactInformation.service';
import { ParticipantsService } from 'src/app/services/participants.service';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss'],
})
export class ParticipantsComponent implements OnInit {
  columnInfo = [
    {
      dataPath: 'contactInformation.person.firstName',
      translation: 'Vorname',
      sticky: true,
      link: (row: any) => {
        return '/participant/' + row['id'];
      },
    },
    {
      dataPath: 'contactInformation.person.name',
      translation: 'Nachname',
      link: (row: any) => {
        return '/participant/' + row['id'];
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
      propertyPrefixToOverwrite: 'contactInformation',
      currentlySelectedObjectId: (participant) => {
        return participant['contactInformation.id'];
      },
      propertyNameOfReferenceId: 'contactInformationId',
    },
    { dataPath: 'dateRange', translation: 'Zeitraum' },

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

    { dataPath: 'usernamefLotte', translation: 'User fLotte' },
    { dataPath: 'usernameSlack', translation: 'User Slack' },

    { dataPath: 'memberADFC', translation: 'Mitglied ADFC' },

    {
      dataPath: 'locationZIPs',
      translation: 'Einsatz in PLZ',
    },
    {
      dataPath: 'memberCoreTeam',
      translation: 'Teil des Kernteams',
    },
    {
      dataPath: 'distributedActiveBikeParte',
      translation: 'Verteiler aktive Radpat*innen',
    },
  ];

  dataService: any;

  tableDataGQLType: string = 'Participant';
  tableDataGQLCreateInputType: string = 'ParticipantCreateInput';
  tableDataGQLUpdateInputType: string = 'ParticipantUpdateInput';

  headline = 'Aktive';
  headlineIconName = 'directions_run';

  loadingRowIds: string[] = [];

  constructor(
    private participantsService: ParticipantsService,
    private contactInformationService: ContactInformationService
  ) {
    this.contactInformationService.loadTableData();
    this.contactInformationService.tableData.subscribe((data) => {
      this.columnInfo.find(
        (column) => column.propertyPrefixToOverwrite === 'contactInformation'
      ).possibleObjects = data;
    });
  }

  ngOnInit() {
    this.dataService = this.participantsService;
  }

  create(object: { currentId: string; row: any }) {
    this.participantsService.createParticipant(object.currentId, {
      participant: object.row,
    });
  }

  lock(row: any) {
    this.participantsService.lockParticipant({ id: row.id });
  }

  save(row: any) {
    this.participantsService.updateParticipant({ participant: row });
  }

  cancel(row: any) {
    this.participantsService.unlockParticipant({ id: row.id });
  }

  delete(row: any) {
    this.participantsService.deleteParticipant({ id: row.id });
  }
}
