import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { User } from "../models/user";
import { AuthService} from "./auth.service";
import { ObserveOnSubscriber } from 'rxjs/internal/operators/observeOn';


@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthService) {

    


  }


  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.authUrl}/users`);
  }

  public getUser(email: string): Observable<User> {
    return this.http.get<User>(`${environment.authUrl}/users/${email}`);
  }

  public getUserPermissions(email: string): Observable<any> {
    return this.http.get<any>(`${environment.authUrl}/users/${email}/permissions`)
  }

  public updateUser(user: User): Observable<User> {
    return this.http.post<User>(`${environment.authUrl}/users/${user.email}/update`, user);
  }

  public deleteUser(email: string): Observable<any> {
    return this.http.delete<any>(`${environment.authUrl}/users/` + email + "/delete");
  }

}
