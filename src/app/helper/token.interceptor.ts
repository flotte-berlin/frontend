import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { SnackBarService } from '../services/snackbar.service';
import { Router, RouterStateSnapshot } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private requestTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService, private snackBar : SnackBarService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authService.getRequestToken()) {
      request = this.addToken(request, this.authService.getRequestToken());
    }

    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
      let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          //client error

          errorMessage = `Error: ${error.error.message}`;
        } else {
          //server error
          console.log("Error: " + JSON.stringify(error));
          if (error.status === 400){
            switch (error.error.message) {
              case "Invalid refresh token!":
                this.authService.logout();
                errorMessage = "Die aktuelle Sitzung ist abgelaufen. Bitte loggen sie sich erneut ein."
                this.router.navigate(["/login"], { queryParams: { returnUrl: this.router.routerState.snapshot.url } });
                break;
            
              default:
                errorMessage = this.serverErrorMessageGenerator(error);
                break;
            }
            
          } else if (error.status === 401) {
            var urlSplit : string[] = error.url.split("/");  
            if (urlSplit[3] === "users" && urlSplit[5] === "update"){ // Allow user pw updates to be processed correctly
              errorMessage = "Das aktuelle Passwort ist inkorrekt.";
            } else {
              return this.handle401Error(request, next);
            }
          } else {
            errorMessage = this.serverErrorMessageGenerator(error);
          }
        }
      if (errorMessage === "Viele Fehler sind aufgetreten.") {
        this.snackBar.openSnackBar(errorMessage, "Erweitert", true, error.error.errors);
      } else {
        this.snackBar.openSnackBar(errorMessage, "Ok", true);
      }
      
      return throwError(errorMessage);
    }));
  }

  private serverErrorMessageGenerator (error: HttpErrorResponse): string  {
    if (error.error.message === undefined){
      return "Viele Fehler sind aufgetreten."  // If you change this you have to change it over this aswell
    } else {
      `${error.error.message}. Fehlercode: ${error.status}.`;
    }

  }


  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.requestTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.requestTokenSubject.next(token.request_token);
          return next.handle(this.addToken(request, token.request_token));
        }));

    } else {
      return this.requestTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        }));
    }
  }
}