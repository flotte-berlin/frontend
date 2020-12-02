import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
   } from '@angular/common/http';
import { Injectable } from '@angular/core';
   import { Observable, throwError } from 'rxjs';
   import { retry, catchError } from 'rxjs/operators';
   import {SnackBarService} from '../services/snackbar.service';
   
   @Injectable()
   export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private snackBar: SnackBarService){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            

            let errorMessage = '';
            if (error.error instanceof ErrorEvent) {

              // client error
              errorMessage = `Error: ${error.error.message}`;
            } else {
                // server error
                if (error.status === 401){
                    errorMessage = `Das eingegeben Passwort ist falsch`;
                } else {
                    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                }
              
            }
            
            this.snackBar.openSnackBar(errorMessage, "Ok", true);
            return throwError(errorMessage);
          })
        )
    }
   }