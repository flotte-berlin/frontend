import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public loggedIn: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    this.loggedIn = new BehaviorSubject<boolean>(false);
    this.checkIfUserIsLoggedIn();
  }

  private checkIfUserIsLoggedIn(): void {
    this.loggedIn.next(!!this.requestToken);
  }

  public get requestToken(): string {
    return localStorage.getItem('requestToken');
  }

  public get refreshToken(): string {
    return localStorage.getItem('refreshToken');
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(`${environment.authUrl}/login`, { email, password })
      .pipe(
        map((response) => {
          // store request and refresh token in local storage to keep user logged in between page refreshes
          localStorage.setItem('requestToken', response.request_token);
          localStorage.setItem('refreshToken', response.refresh_token);
          this.checkIfUserIsLoggedIn();
        })
      );
  }

  logout() {
    // remove token from local storage to log user out
    return this.http
      .post<any>(`${environment.authUrl}/logout`, { request_token: this.requestToken }).pipe(tap(() => {
        localStorage.removeItem('requestToken');
        localStorage.removeItem('refreshToken');
        this.checkIfUserIsLoggedIn();
      }
      ));
  }
}
