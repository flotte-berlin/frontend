import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar'; 

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {

    constructor(private snackBar : MatSnackBar) { } 
  
  
    openSnackBar(message: string, action: string = "") { 
        this.snackBar.open(message, action, { 
            duration: 5000, 
            panelClass: ['mat-toolbar', 'mat-primary', 'simple-snack-bar']
        });
    } 
}
