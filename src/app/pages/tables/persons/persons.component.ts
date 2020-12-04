import { Component, OnInit } from '@angular/core';
import { PersonsService } from 'src/app/services/person.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss'],
})
export class PersonsComponent implements OnInit {
  columnInfo = [
    {
      dataPath: 'firstName',
      translation: 'Vorname',
      sticky: true,
      link: (row: any) => {
        return '/person/' + row.id;
      },
    },
    {
      dataPath: 'name',
      translation: 'Nachname',
      link: (row: any) => {
        return '/person/' + row.id;
      },
    },
  ];

  dataService: any;

  tableDataGQLType: string = 'Person';
  tableDataGQLCreateInputType: string = 'PersonCreateInput';
  tableDataGQLUpdateInputType: string = 'PersonUpdateInput';

  headline = 'Personen';
  headlineIconName = 'person';

  loadingRowIds: string[] = [];
  constructor(private personsService: PersonsService) {}

  ngOnInit() {
    this.dataService = this.personsService;
  }

  create(object: { currentId: string; row: any }) {
    this.personsService.createPerson(object.currentId, {
      person: object.row,
    });
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

  delete(row: any) {
    this.personsService.deletePerson({ id: row.id });
  }
}
