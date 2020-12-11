import { Component, OnInit } from '@angular/core';
import { BikesService } from 'src/app/services/bikes.service';
import { EngagementsService } from 'src/app/services/engagement.service';
import { EngagementTypesService } from 'src/app/services/engagementTypes.service';
import { ParticipantsService } from 'src/app/services/participants.service';

@Component({
  selector: 'app-engagements',
  templateUrl: './engagements.component.html',
  styleUrls: ['./engagements.component.scss'],
})
export class EngagementsComponent implements OnInit {
  columnInfo = [
    {
      dataPath: 'engagementType.name',
      translation: 'Engagementtyp',
    },
    {
      dataPath: 'engagementType.description',
      translation: 'Engagementtyp Erklärung',
      possibleObjects: [],
      nameToShowInSelection: (engagementType) => {
        return (
          (engagementType.name || '') +
          ' (' +
          (engagementType.description || 'keine Erklärung') + ')'
        );
      },
      propertyPrefixToOverwrite: 'engagementType',
      currentlySelectedObjectId: (provider) => {
        return provider['engagementType.id'];
      },
      propertyNameOfReferenceId: 'engagementTypeId',
    },
    { dataPath: 'dateRange', translation: 'Zeitraum' },
    {
      dataPath: 'participant.contactInformation.person.firstName',
      translation: 'Aktiver Vorname',
      link: (row: any) => {
        return '/participant/' + row['participant.id'];
      },
    },
    {
      dataPath: 'participant.contactInformation.person.name',
      translation: 'Aktiver Nachname',
      link: (row: any) => {
        return '/participant/' + row['participant.id'];
      },
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
      propertyPrefixToOverwrite: 'participant',
      currentlySelectedObjectId: (provider) => {
        return provider['participant.id'];
      },
      propertyNameOfReferenceId: 'participantId',
    },
    {
      dataPath: 'cargoBike.name',
      translation: 'Lastenrad',
      link: (element) => {
        return '/bike/' + element['cargoBike.id'];
      },
      possibleObjects: [],
      nameToShowInSelection: (bike) => bike.name,
      propertyPrefixToOverwrite: 'cargoBike',
      currentlySelectedObjectId: (timeFrame) => {
        return timeFrame['cargoBike.id'];
      },
      propertyNameOfReferenceId: 'cargoBikeId'
    },
  ];

  dataService: any;

  tableDataGQLType: string = 'Engagement';
  tableDataGQLCreateInputType: string = 'EngagementCreateInput';
  tableDataGQLUpdateInputType: string = 'EngagementUpdateInput';

  headline = 'Engagements';
  headlineIconName = 'update';

  loadingRowIds: string[] = [];
  constructor(
    private engagementsService: EngagementsService,
    private participantsService: ParticipantsService,
    private bikesService: BikesService,
    private engagementTypesService: EngagementTypesService,
  ) {
    this.participantsService.loadTableData();
    this.participantsService.tableData.subscribe((data) => {
      this.columnInfo.find(
        (column) => column.propertyPrefixToOverwrite === 'participant'
      ).possibleObjects = data;
    });

    this.bikesService.loadTableData();
    this.bikesService.tableData.subscribe((data) => {
      this.columnInfo.find(
        (column) => column.propertyPrefixToOverwrite === 'cargoBike'
      ).possibleObjects = data;
    });

    this.engagementTypesService.loadTableData();
    this.engagementTypesService.tableData.subscribe((data) => {
      this.columnInfo.find(
        (column) => column.propertyPrefixToOverwrite === 'engagementType'
      ).possibleObjects = data;
    });
  }

  ngOnInit() {
    this.dataService = this.engagementsService;
  }

  create(object: { currentId: string; row: any }) {
    this.engagementsService.create(object.currentId, {
      engagement: object.row,
    });
  }

  lock(row: any) {
    this.engagementsService.lock({ id: row.id });
  }

  save(row: any) {
    this.engagementsService.update({ engagement: row });
  }

  cancel(row: any) {
    this.engagementsService.unlock({ id: row.id });
  }

  delete(row: any) {
    this.engagementsService.delete({ id: row.id });
  }
}
