import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar'; 
import { ErrorSnackbarComponent } from '../helper/snackbar-ref.component';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {

    constructor(private snackBar : MatSnackBar) { } 
  
  
    openSnackBar(message: string, action: string = "", error: boolean = false, errorMessages: Object[] = undefined) { 
        if (error){
            if (errorMessages === undefined){
                this.snackBar.open(message, action, { 
                    duration: 5000, 
                    panelClass: ['mat-toolbar', 'mat-warn', 'simple-snack-bar']
                });
            } else {
                this.snackBar.openFromComponent(ErrorSnackbarComponent, {
                    data: {
                            "message" : message,
                            "action" : action,
                            "errorMessages" : errorMessages
                          },
                    panelClass: ['mat-toolbar', 'mat-warn', 'simple-snack-bar'],
                    duration: 5000
                  });
            }
        } else {
            this.snackBar.open(message, action, { 
                duration: 2000, 
                panelClass: ['mat-toolbar', 'mat-primary', 'simple-snack-bar']
            });
        }
        
    } 
}
