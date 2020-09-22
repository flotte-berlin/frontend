import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { BikesService, CargoBikeResult } from 'src/app/services/bikes.service';

@Component({
  selector: 'app-bikes',
  templateUrl: './bikes.component.html',
  styleUrls: ['./bikes.component.scss'],
})
export class BikesComponent {
  displayedColumns: string[] = ['select', 'name', 'id', 'frameNumber', 'numberOfChildren', 'buttons'];
  
  bikes: CargoBikeResult[];
  selection = new SelectionModel<CargoBikeResult>(true, []);


  constructor(private bikesService: BikesService) {
    bikesService.bikes.subscribe(bikes => this.bikes = bikes);

    bikesService.loadBikes();
  }

  edit(id: string) {
    console.log(id);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex + 2, event.currentIndex + 2); // +2 because the first 2 (selection + name) columns are not dragable
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.bikes.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.bikes.forEach(row => this.selection.select(row));
  }
}
