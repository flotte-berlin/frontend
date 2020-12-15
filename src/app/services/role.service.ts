import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Role } from "../models/user";
import { AuthService} from "./auth.service";
import { ObserveOnSubscriber } from 'rxjs/internal/operators/observeOn';


@Injectable({
  providedIn: 'root',
})
export class RoleService {

  constructor(private http: HttpClient, private authService: AuthService) {

  }


  public getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${environment.authUrl}/roles`);
  }

  public addRole(user : Role){
    return this.http.post<Role>(
      `${environment.authUrl}/roles/create`,
      user
    );
  }

  public getRole(name: string): Observable<Role> {
    return this.http.get<Role>(`${environment.authUrl}/roles/${name}`);
  }

  public updateRole(role: Role): Observable<Role> {
    return this.http.post<Role>(`${environment.authUrl}/roles/${role.name}/update`, role);
  }

  public deleteRole(name: string): Observable<any> {
    return this.http.delete<any>(`${environment.authUrl}/roles/` + name + "/delete");
  }

}
