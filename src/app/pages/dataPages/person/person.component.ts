import { Component, OnInit } from '@angular/core';
import { PersonsService } from 'src/app/services/person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  propertiesInfo = [
    {
      type: 'Group',
      title: 'Allgemein',
      properties: [
        { dataPath: 'firstName', translation: 'Vorname' },
        { dataPath: 'name', translation: 'Nachname' },
      ],
    },
    {
      type: 'ReferenceTable',
      title: 'KontaktInformationen',
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
      linkToTableParams: (person) => {
        return { "person.name": person.name, "person.firstName": person.firstName,};
      },
    },
  ];

  headlineDataPath = 'name';
  getHeadline = (pageData) => {
    return (
      pageData['firstName'] +
      ' ' +
      pageData['name'] +
      ' (Person)'
    );
  };
  headlineIconName = 'person';
  pageDataGQLType: string = 'Person';
  pageDataGQLUpdateInputType: string = 'PersonUpdateInput';

  dataService: any;

  constructor(
    private personsService: PersonsService,
  ) {}

  ngOnInit(): void {
    this.dataService = this.personsService;
  }

  lock(row: any) {
    this.personsService.lockPerson({ id: row.id });
  }

  save(row: any) {
    this.personsService.updatePerson({ person: row });
  }

  cancel(row: any) {
    this.personsService.unlockPerson({ id: row.id });
  }
}
