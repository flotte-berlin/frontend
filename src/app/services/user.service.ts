import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { User } from '../models/user';
import { AuthService } from './auth.service';
import { ObserveOnSubscriber } from 'rxjs/internal/operators/observeOn';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  // Temporarily stores data from dialogs, kinda shit solution I guess
  dialogData: any;

  getDialogData() {
    return this.dialogData;
  }

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.authUrl}/users`);
  }

  public getUser(email: string): Observable<User> {
    return this.http.get<User>(`${environment.authUrl}/users/${email}`);
  }

  public getUserPermissions(email: string): Observable<any> {
    return this.http.get<any>(
      `${environment.authUrl}/users/${email}/permissions`
    );
  }

  public updateUser(user: User, own_password?: string): Observable<User> {
    this.dialogData = user;
    if (own_password !== undefined){
        user.own_password = own_password;
    }

    //console.log("Users update: " + JSON.stringify(user));
    return this.http.post<User>(
      `${environment.authUrl}/users/${user.email_old}/update`,
      user
    );
  }

  public deleteUser(user: User, own_password? : string): Observable<any> {
    if (own_password !== undefined){
      user.own_password = own_password;
    }
    this.dialogData = user;
    return this.http.post<any>(
      `${environment.authUrl}/users/${user.email}/delete`, {"own_password" : user.own_password}
    );
  }

  public addUser(user : User){
    if (user.attributes === undefined){
      user.attributes = {};
    }
    this.dialogData = user;
    return this.http.post<User>(
      `${environment.authUrl}/users/create`,
      user
    );
  }
}
