import { Component, OnInit } from '@angular/core';
import { BikesService, CargoBikeResult } from 'src/app/services/bikes.service';

@Component({
  selector: 'app-bikes',
  templateUrl: './bikes.component.html',
  styleUrls: ['./bikes.component.scss'],
})
export class BikesComponent {
  displayedColumns: string[] = ['id', 'name', 'weight', 'symbol'];
  
  bikes: CargoBikeResult[];

  constructor(private bikesService: BikesService) {
    bikesService.bikes.subscribe(bikes => this.bikes = bikes);

    bikesService.loadBikes();
  }
}
