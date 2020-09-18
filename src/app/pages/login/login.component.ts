import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  hide = true;
  loading = false;
  errorOccurred = false;
  errorMessage = '';
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

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
        () => this.router.navigate(['bikes']),
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
