import { Component, OnInit } from '@angular/core';
import { ContactInformationService } from 'src/app/services/contactInformation.service';
import { PersonsService } from 'src/app/services/person.service';

@Component({
  selector: 'app-contact-information',
  templateUrl: './contact-information.component.html',
  styleUrls: ['./contact-information.component.scss'],
})
export class ContactInformationComponent implements OnInit {
  columnInfo = [
    {
      dataPath: 'person.firstName',
      translation: 'Vorname',
      sticky: true,
      link: (row: any) => {
        return '/person/' + row['person.id'];
      },
    },
    {
      dataPath: 'person.name',
      translation: 'Nachname',
      link: (row: any) => {
        return '/person/' + row['person.id'];
      },
      possibleObjects: [],
      nameToShowInSelection: (person) => person.firstName + ' ' + person.name,
      propertyPrefixToOverwrite: 'person',
      currentlySelectedObjectId: (contactInformation) => {
        return contactInformation['person.id'];
      },
      propertyNameOfReferenceId: 'personId',
    },
    { dataPath: 'email', translation: 'Email' },
    { dataPath: 'email2', translation: 'Email 2' },
    { dataPath: 'phone', translation: 'Telefonnummer' },
    { dataPath: 'phone2', translation: 'Telefonnummer 2' },
    { dataPath: 'note', translation: 'Anmerkung' },
    { dataPath: 'address.number', translation: 'Hausnummer' },
    { dataPath: 'address.street', translation: 'Straße' },
    { dataPath: 'address.zip', translation: 'Postleitzahl' },
    { dataPath: 'address.city', translation: 'Ort' },
  ];
  dataService: any;

  tableDataGQLType: string = 'ContactInformation';
  tableDataGQLCreateInputType: string = 'ContactInformationCreateInput';
  tableDataGQLUpdateInputType: string = 'ContactInformationUpdateInput';

  headline = 'Kontaktinformationen';
  headlineIconName = 'contact_page';

  loadingRowIds: string[] = [];
  constructor(
    private contactInformationService: ContactInformationService,
    private personsService: PersonsService
  ) {
    this.personsService.loadTableData();
    this.personsService.tableData.subscribe((data) => {
      this.columnInfo.find(
        (column) => column.dataPath === 'person.name'
      ).possibleObjects = data;
    });
  }

  ngOnInit() {
    this.dataService = this.contactInformationService;
  }

  create(object: { currentId: string; row: any }) {
    this.contactInformationService.createContactInformation(object.currentId, {
      contactInformation: object.row,
    });
  }

  lock(row: any) {
    this.contactInformationService.lockContactInformation({ id: row.id });
  }

  save(row: any) {
    this.contactInformationService.updateContactInformation({
      contactInformation: row,
    });
  }

  cancel(row: any) {
    this.contactInformationService.unlockContactInformation({ id: row.id });
  }

  delete(row: any) {
    this.contactInformationService.deleteContactInformation({ id: row.id });
  }
}
