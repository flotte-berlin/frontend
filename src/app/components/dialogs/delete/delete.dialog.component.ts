import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {UserService} from '../../../services/user.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { first } from 'rxjs/operators';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-delete.dialog',
  templateUrl: '../../dialogs/delete/delete.dialog.html',
  styleUrls: ['../../dialogs/delete/delete.dialog.css']
})
export class DeleteDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public userService: UserService,
              public snackbarService: SnackBarService) { }

  hide = true;
  selectedRoles: FormControl = new FormControl();

  
  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.userService.deleteUser(this.data).pipe(first())
    .subscribe(
      data => {
        this.snackbarService.openSnackBar("Erfolgreich: " + data.success);
        //this.loadAllObjects();
      },
      error => {
        this.snackbarService.openSnackBar(error, "Ok", true);
      }
    );
    //this.dataService.deleteIssue(this.data.id);
  }
}
