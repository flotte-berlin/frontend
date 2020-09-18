import { Component, OnInit } from '@angular/core';
import { CargoBikesGQL, CargoBikesQuery, CargoBike } from '../../../generated/graphql';

@Component({
  selector: 'app-bikes',
  templateUrl: './bikes.component.html',
  styleUrls: ['./bikes.component.scss'],
})
export class BikesComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  bikes: CargoBikesQuery;

  constructor(private bikesGQL: CargoBikesGQL) {
    this.bikesGQL.watch().valueChanges.subscribe((result) => {
      console.log(result);
      this.bikes = result.data;
    });
  }

  onTableInput(element) {
    //element.weight += 1;
    console.log(element);
  }

  onFocus(event) {
    console.log(event);
  }

  ngOnInit(): void {}
}

const ELEMENT_DATA = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
