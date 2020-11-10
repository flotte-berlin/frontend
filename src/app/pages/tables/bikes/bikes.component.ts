import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BikesService, CargoBikeResult } from 'src/app/services/bikes.service';
import { deepCopy } from 'src/app/helperFunctions/deepCopy';
import { filter } from 'graphql-anywhere';
import {
  CargoBikeFieldsMutableFragmentDoc,
  CargoBikeUpdateInput,
} from 'src/generated/graphql';

type CargoBikeDataRow = CargoBikeResult & {
  waitingForEditPermissions: boolean;
  saving: boolean;
  unlocking: boolean;
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
    'group',
    'frameNumber',
    'forChildren',
    'numberOfChildren',
    'numberOfWheels',
    'forCargo',
    'buttons',
  ];

  bikes = <Array<any>>[];
  groupEnum: string[] = [];
  selection = new SelectionModel<CargoBikeDataRow>(true, []);

  reloadingTable = false;

  relockingInterval = null;
  relockingDuration = 1000 * 60 * 1;

  constructor(private bikesService: BikesService) {
    bikesService.groupEnum.subscribe(groupEnum => {
      this.groupEnum = groupEnum;
    })

    bikesService.bikes.subscribe((bikes) => {
      this.reloadingTable = false;
      this.bikes = bikes.map((bike) => {
        return <any>Object.assign({}, deepCopy(bike), {
          waitingForEditPermissions: false,
          saving: false,
          unlocking: false,
        });
      });
    });
    bikesService.loadBikes();
  }

  ngOnInit() {
    this.relockingInterval = setInterval(() => {
      for (const bike of this.bikes) {
        if (bike.isLockedByMe) {
          this.bikesService.relockBike({ id: bike.id });
        }
      }
    }, this.relockingDuration);
  }

  ngOnDestroy() {
    clearInterval(this.relockingInterval);
  }

  reloadTable() {
    this.reloadingTable = true;
    this.bikesService.loadBikes();
  }

  edit(row: CargoBikeDataRow) {
    row.waitingForEditPermissions = true;
    this.bikesService.lockBike({ id: row.id });
  }

  save(row: CargoBikeDataRow) {
    row.saving = true;
    const bike: CargoBikeUpdateInput = filter(
      CargoBikeFieldsMutableFragmentDoc,
      row
    );
    this.bikesService.updateBike({ bike });
  }

  cancel(row: CargoBikeDataRow) {
    row.unlocking = true;
    this.bikesService.unlockBike({ id: row.id });
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
