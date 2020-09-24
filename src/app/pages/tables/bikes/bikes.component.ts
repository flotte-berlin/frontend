import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BikesService, CargoBikeResult } from 'src/app/services/bikes.service';
import { deepCopy } from 'src/app/helperFunctions/deepCopy';
import { filter } from 'graphql-anywhere';
import {CargoBikeFieldsMutableFragmentDoc, CargoBikeUpdateInput} from 'src/generated/graphql';

type CargoBikeDataRow = CargoBikeResult & {
  waitingForEditPermissions: boolean;
  saving: boolean;
  isGettingEdited: boolean;
  locked: boolean;
};

@Component({
  selector: 'app-bikes',
  templateUrl: './bikes.component.html',
  styleUrls: ['./bikes.component.scss'],
})
export class BikesComponent {
  displayedColumns: string[] = [
    'select',
    'name',
    'id',
    'frameNumber',
    'numberOfChildren',
    'numberOfWheels',
    'buttons',
  ];

  bikes = <Array<any>>[];
  selection = new SelectionModel<CargoBikeDataRow>(true, []);

  constructor(private bikesService: BikesService) {
    bikesService.bikes.subscribe((bikes) => {
      this.bikes = bikes.map((bike) => {
        return <any>Object.assign({}, deepCopy(bike), {
          waitingForEditPermissions: false,
          isGettingEdited: false,
          locked: false,
          saving: false
        });
      });
      if (this.bikes.length > 6) {
        this.bikes[5].locked = true;
        this.bikes[2].locked = true;
      }
    });
    bikesService.loadBikes();
  }

  edit(row: CargoBikeDataRow) {
    row.waitingForEditPermissions = true;
    setTimeout(() => {
      row.waitingForEditPermissions = false;
      row.isGettingEdited = true;
    }, Math.random()*1000);
  }

  save(row: CargoBikeDataRow) {
    //TODO: remove lock
    row.saving = true;
    row.isGettingEdited = false;
    const bike: CargoBikeUpdateInput = filter(CargoBikeFieldsMutableFragmentDoc, row)
    this.bikesService.updateBike({bike})
  }

  cancel(row: CargoBikeDataRow) {
    //fetch it again
    //TODO: remove lock
    this.bikesService.reloadBike({ id: row.id });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.displayedColumns,
      event.previousIndex + 2,
      event.currentIndex + 2
    ); // +2 because the first 2 (selection + name) columns are not dragable
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.bikes.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.bikes.forEach((row) => this.selection.select(row));
  }
}
