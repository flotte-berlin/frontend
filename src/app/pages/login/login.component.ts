import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  hide = true;
  loading = false;
  errorOccurred = false;
  errorMessage = '';

  returnUrl: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'] || '/tableOverview';
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
