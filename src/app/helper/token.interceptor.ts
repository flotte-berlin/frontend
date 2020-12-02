import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { SnackBarService } from '../services/snackbar.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private requestTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService, private snackBar : SnackBarService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authService.getRequestToken()) {
      request = this.addToken(request, this.authService.getRequestToken());
    }

    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
      let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          //client error;
          errorMessage = `Error: ${error.error.message}`;
        } else {
          //server error;
          if (error.status === 401) {
            
            return this.handle401Error(request, next);
          } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
        }
      this.snackBar.openSnackBar(errorMessage, "Ok", true);
      //return throwError(errorMessage);
    }));
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