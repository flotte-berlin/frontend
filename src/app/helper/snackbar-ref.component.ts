import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-error-snackbar',
  template: `
    <p>{{ data.message }}</p>
    <button mat-raised-button
            color="accent"
            (click)="actionAndDismiss()">{{ data.action }}</button>
  `,
})


export class ErrorSnackbarComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<ErrorSnackbarComponent>,
    public dialog: MatDialog,
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
  ) {}


  public actionAndDismiss(){
      console.log("test");
      let dialogRef = this.dialog.open(SnackbarDialog);
      dialogRef.componentInstance.errorMessages = this.data.errorMessages;
      this.snackBarRef.dismiss()
  }
}

@Component({
    selector: 'app-snackbar-dialog',
    templateUrl: 'snackbar-dialog.html',
  })
  export class SnackbarDialog {
    errorMessages : Object[];
  }