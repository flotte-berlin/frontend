import { SelectionModel } from '@angular/cdk/collections';
import { Component, ChangeDetectorRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BikesService, CargoBikeResult } from 'src/app/services/bikes.service';
import { MatTableDataSource } from '@angular/material/table';

type CargoBikeDataRow = CargoBikeResult & {
  waitingForEditPermissions: boolean;
  isGettingEdited: boolean;
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
    'buttons',
  ];

  bikes = new MatTableDataSource(<Array<CargoBikeDataRow>>[]);
  selection = new SelectionModel<CargoBikeDataRow>(true, []);

  constructor(
    private bikesService: BikesService,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
    bikesService.bikes.subscribe((bikes) => {
      this.bikes = new MatTableDataSource(
        bikes.map((bike) => {
          return Object.assign({}, bike, {
            waitingForEditPermissions: false,
            isGettingEdited: false,
          });
        })
      );
    });
    bikesService.loadBikes();
  }

  edit(row: CargoBikeDataRow) {
    console.log('isGettingEdited: ' + row.isGettingEdited);
    row.waitingForEditPermissions = true;
    console.log('edit');
    console.log(row.waitingForEditPermissions);
    setTimeout(() => {
      row.waitingForEditPermissions = false;
      row.isGettingEdited = true;
      console.log('gets edited');
    }, 100);
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
    const numRows = this.bikes.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.bikes.data.forEach((row) => this.selection.select(row));
  }
}
