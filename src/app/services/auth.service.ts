import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public loggedIn: BehaviorSubject<boolean>;
  private readonly REQUEST_TOKEN = 'requestToken';
  private readonly REFRESH_TOKEN = 'refreshToken';

  constructor(private http: HttpClient) {
    this.loggedIn = new BehaviorSubject<boolean>(false);
    this.checkIfUserIsLoggedIn();
  }

  private checkIfUserIsLoggedIn(): void {
    this.loggedIn.next(!!this.getRequestToken());
  }

  public getRequestToken(): string {
    return localStorage.getItem(this.REQUEST_TOKEN);
  }

  public getRefreshToken(): string {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(`${environment.authUrl}/login`, { email, password })
      .pipe(
        map((response) => {
          // store request and refresh token in local storage to keep user logged in between page refreshes
          this.storeTokens(response);
          this.checkIfUserIsLoggedIn();
        })
      );
  }

  logout() {
    // remove token from local storage to log user out
    return this.http
      .post<any>(`${environment.authUrl}/logout`, {
        request_token: this.getRequestToken(),
      })
      .pipe(
        finalize(() => {
          this.removeTokens();
          this.checkIfUserIsLoggedIn();
        })
      );
  }

  refreshToken() {
    return this.http
      .post<any>(`${environment.authUrl}/new-token`, {
        refresh_token: this.getRefreshToken(),
      })
      .pipe(
        tap((tokens: any) => {
          this.storeTokens(tokens);
        })
      )
      .pipe(
        catchError((error: any) => {
          console.log(error);
          if (error.status === 400) {
            this.removeTokens();
            this.checkIfUserIsLoggedIn();
            location.replace('/login');

          }
          return of();
        })
      );
  }

  private storeTokens(tokens: any) {
    localStorage.setItem(this.REQUEST_TOKEN, tokens.request_token);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refresh_token);
  }

  private removeTokens() {
    localStorage.removeItem(this.REQUEST_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}
