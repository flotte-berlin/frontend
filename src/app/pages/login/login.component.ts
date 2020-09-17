import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  hide = true;
  loading = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    if (this.email.invalid || this.password.invalid) {
      return;
    }
    this.authService.login(this.email.value, this.password.value).subscribe();
  }

}
