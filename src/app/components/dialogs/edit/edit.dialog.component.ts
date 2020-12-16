import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {FormControl, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';
import { SnackBarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-baza.dialog',
  templateUrl: '../../dialogs/edit/edit.dialog.html',
  styleUrls: ['../../dialogs/edit/edit.dialog.css']
})
export class EditDialogComponent {

  hide = true;
  hidePW = true;

  selectedRoles: FormControl = new FormControl();

  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public userService: UserService, public snackbarService : SnackBarService) { }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    console.log("Selected Role " + JSON.stringify(this.selectedRoles.value));
    this.data.roles = [];
    for (let role of this.selectedRoles.value){
      this.data.roles.push(role.name);
    }
    this.userService.updateUser(this.data).pipe(first())
    .subscribe(
      data => {
        this.snackbarService.openSnackBar("Der Nutzer wurde erfolgreich verändert!");
        //this.loadAllObjects();
      },
      error => {
        this.snackbarService.openSnackBar(error, "Ok", true);
      }
    );
  }
}
