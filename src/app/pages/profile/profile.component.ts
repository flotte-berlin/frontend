import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BikesService } from '../../services/bikes.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  minPw: number = 8;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  passwordNew = new FormControl('', [Validators.required,Validators.minLength(this.minPw)]);
  passwordNew2 = new FormControl('', [Validators.required]);
  pwGroup: FormGroup;
  hide = true;
  loading = false;
  errorOccurred = false;
  errorMessage = '';

  returnUrl : string;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private formBuilder : FormBuilder) {}

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

  login() {
    this.errorMessage = '';
    this.errorOccurred = false;
    if (this.email.invalid || this.password.invalid) {
      return;
    }
    this.loading = true;
    this.authService
      .login(this.email.value, this.password.value)
      .subscribe(
        () => this.router.navigateByUrl(this.returnUrl),
        (error) => {
          this.errorOccurred = true;
          this.errorMessage =
            error.error.message ||
            'Ein Fehler bei Einloggen ist aufgetreten. Überprüfen Sie Ihre Internetverbindung oder versuchen Sie es später erneut.';
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
