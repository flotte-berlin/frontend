import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { AuthUser } from "../models/user";


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<AuthUser>;
  public currentUser: Observable<AuthUser>;
  public loggedIn: BehaviorSubject<boolean>;
  private readonly CURRENT_USER = 'currentUser';

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<AuthUser>(
      JSON.parse(localStorage.getItem(this.CURRENT_USER))
    );
    this.currentUser = this.currentUserSubject.asObservable();

    this.loggedIn = new BehaviorSubject<boolean>(false);
    this.checkIfUserIsLoggedIn();

    
  }

  public get getCurrentUserValue(): AuthUser {
    var value = this.currentUserSubject.value;
    if (value === null){
      value = new AuthUser();
    }
    return value;
  }

  private checkIfUserIsLoggedIn(): void {
    this.loggedIn.next(!!localStorage.getItem(this.CURRENT_USER));
  }

  public getRequestToken(): string {
    return this.getCurrentUserValue.request_token;
  }

  public getRefreshToken(): string {
    return this.getCurrentUserValue.refresh_token;
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(`${environment.authUrl}/login`, { email, password })
      .pipe(
        map((response) => {
          // store request and refresh token in local storage to keep user logged in between page refreshes
          if (response && response.request_token){
            this.storeUser(response);
          }
          this.checkIfUserIsLoggedIn();
          //this.storeTokens(response);
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
    this.storeUser({...this.getCurrentUserValue, ...tokens}); //Merging objects. Properties in obj2 will overwrite those in obj1
    //localStorage.setItem(this.REQUEST_TOKEN, tokens.request_token);
    //localStorage.setItem(this.REFRESH_TOKEN, tokens.refresh_token);
  }

  private storeUser(usr: AuthUser){
    localStorage.setItem(this.CURRENT_USER, JSON.stringify(usr));
    this.currentUserSubject.next(usr);
  }

  public removeTokens() {
    //localStorage.removeItem(this.REQUEST_TOKEN);
    //localStorage.removeItem(this.REFRESH_TOKEN);
    localStorage.removeItem(this.CURRENT_USER);
  }
}
