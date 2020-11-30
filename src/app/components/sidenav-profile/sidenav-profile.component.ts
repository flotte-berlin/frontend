import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SnackBarService } from '../../services/snackbar.service';

@Component({
  selector: 'sidenav-profile',
  templateUrl: './sidenav-profile.component.html',
  styleUrls: ['./sidenav-profile.component.scss']
})
export class SidenavProfileComponent implements OnInit {
  name: String;
  email: String;
  profileURL: String = '/assets/flotte_logo.png';

  constructor( private auth: AuthService, private snackBar: SnackBarService) { }

  ngOnInit() {
    this.auth.currentUser.subscribe(user => {
      if (user !== null){
        this.name = user.user.name;
        this.email = user.user.email;
        if (user.user.attributes === null) return;
        this.profileURL = user.user.attributes.profile_url;
      }      
    });
  }

  testSnackBar(){
    this.snackBar.openSnackBar("A user administration will be found here", "Ok");
  }
}