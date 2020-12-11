import { Component, OnInit } from '@angular/core';
import { ParticipantsService } from 'src/app/services/participants.service';
import { WorkshopsService } from 'src/app/services/workshop.service';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.scss'],
})
export class ParticipantComponent implements OnInit {
  propertiesInfo = [
    {
      type: 'Group',
      title: 'Allgemein',
      properties: [
        { dataPath: 'dateRange', translation: 'Zeitraum' },
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
      ],
    },
    {
      type: 'Group',
      title: 'Kontaktinformation',
      properties: [
        {
          dataPath: 'contactInformation.person.firstName',
          translation: 'Vorname',
        },
        {
          dataPath: 'contactInformation.person.name',
          translation: 'Nachname',
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
      title: 'Workshops',
      dataPath: 'workshops',
      dataService: null,
      columnInfo: [
        { dataPath: 'title', translation: 'Workshopname' },
        { dataPath: 'description', translation: 'Details' },
      ],
      nameToShowInSelection: (workshop) => {
        return workshop.title + ' ' + workshop.description;
      },
      linkToTable: (element) => {
        return '/table/workshops';
      },
      propertyNameOfUpdateInput: 'workshopIds',
    },

    {
      type: 'ReferenceTable',
      title: 'Engagements',
      dataPath: 'engagement',
      dataService: null,
      columnInfo: [
        {
          dataPath: 'engagementType.name',
          translation: 'Engagementtyp',
        },
        {
          dataPath: 'engagementType.description',
          translation: 'Engagementtyp Erklärung',
        },
        { dataPath: 'dateRange', translation: 'Zeitraum' },
        {
          dataPath: 'cargoBike.name',
          translation: 'Lastenrad',
          link: (element) => {
            return '/bike/' + element['cargoBike.id'];
          },
        },
      ],
      editableReferences: false,
      linkToTable: (element) => {
        return '/table/engagements';
      },
    },
  ];

  headlineDataPath = 'contactInformation.person.name';
  headlineIconName = 'directions_run';
  pageDataGQLType: string = 'Participant';
  pageDataGQLUpdateInputType: string = 'ParticipantUpdateInput';

  dataService: any;

  constructor(private participantsService: ParticipantsService, private workshopsService: WorkshopsService) {
    this.workshopsService.loadTableData();
    this.workshopsService.tableData.subscribe((data) => {
      this.propertiesInfo.find(
        (prop) => prop.dataPath === 'workshops'
      ).dataService = this.workshopsService;
    });
  }

  ngOnInit(): void {
    this.dataService = this.participantsService;
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
}
