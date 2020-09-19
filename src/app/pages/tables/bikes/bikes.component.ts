import { Component, OnInit } from '@angular/core';
import { DeepExtractTypeSkipArrays } from 'ts-deep-extract-types';
import { GetCargoBikesGQL, GetCargoBikesQuery } from '../../../../generated/graphql';

type CargoBikeResult = DeepExtractTypeSkipArrays<GetCargoBikesQuery, ["cargoBikes"]>;

@Component({
  selector: 'app-bikes',
  templateUrl: './bikes.component.html',
  styleUrls: ['./bikes.component.scss'],
})
export class BikesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'weight', 'symbol'];
  
  bikes: CargoBikeResult[];

  constructor(private bikesGQL: GetCargoBikesGQL) {
    this.bikesGQL.watch().valueChanges.subscribe((result) => {
      this.bikes = result.data.cargoBikes;
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
