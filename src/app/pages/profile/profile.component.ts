import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { BikesService } from '../../services/bikes.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  minPw: number = 8;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(this.minPw)]);
  passwordNew = new FormControl('', [Validators.required,Validators.minLength(this.minPw)]);
  passwordNew2 = new FormControl('', [Validators.required]);
  pwGroup: FormGroup;
  hide = true;
  loading = false;
  errorOccurred = false;
  errorMessage = '';

  returnUrl : string;

  constructor(private authService: AuthService, private snackBar: SnackBarService, 
              private userService: UserService, private router: Router, 
              private route: ActivatedRoute, private formBuilder : FormBuilder) {}

  ngOnInit(): void {
    this.pwGroup = this.formBuilder.group({
      passwordNew: this.passwordNew,
      passwordNew2: this.passwordNew2
    }, {validator: passwordMatchValidator});
  }

  onPasswordInput() {
    if (this.pwGroup.hasError('passwordMismatch'))
      this.passwordNew2.setErrors([{'passwordMismatch': true}]);
    else
      this.passwordNew2.setErrors(null);
  }

  show() : boolean {
    return !this.password.hasError('required') && !this.password.hasError('minlength');
  }

  updatePassword() {
    this.errorMessage = '';
    this.errorOccurred = false;
    if (this.password.invalid || this.pwGroup.invalid) {
      return;
    }

    let user : User = this.authService.getCurrentUserValue.user;
    user.own_password = this.password.value;
    user.password = this.passwordNew.value;

    this.loading = true;
    this.userService.updateUser(user).subscribe(
        data => {
          this.snackBar.openSnackBar("Das Passwort wurde erfolgreich aktualisiert", "Ok");
          this.password.reset();
          this.pwGroup.reset();
        }
      )
      .add(() => {
        this.loading = false;
      });
    
  }
}


export const passwordMatchValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
  if (formGroup.get('passwordNew').value === formGroup.get('passwordNew2').value)
    return null;
  else
    return {passwordMismatch: true};
};
