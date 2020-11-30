import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteConfirmationDialog } from '../../table/table.component';

@Component({
  selector: 'app-select-object-dialog',
  templateUrl: './select-object-dialog.component.html',
  styleUrls: ['./select-object-dialog.component.scss'],
})
export class SelectObjectDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(this.data);
  }

  ngOnInit(): void {}

  onObjectClicked(object: any) {
    this.data.currentlySelectedObjectId = object.id;
  }

  getSelectedObject() {
    return this.data.possibleObjects.find(
      (object) => object.id === this.data.currentlySelectedObjectId
    )
  }

  getSelectedObjectName() {
    const selectedObject = this.getSelectedObject();
    if (!selectedObject) {
      return "";
    }
    return this.data.nameToShowInSelection(selectedObject);
  }

  onConfirmClick(): void {
    this.dialogRef.close(this.getSelectedObject());
  }
  onCancelClick(): void {
    this.dialogRef.close();
  }
}
