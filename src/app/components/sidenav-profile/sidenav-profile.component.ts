import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'sidenav-profile',
  templateUrl: './sidenav-profile.component.html',
  styleUrls: ['./sidenav-profile.component.scss']
})
export class SidenavProfileComponent implements OnInit {
  name: String;
  email: String;
  profileURL: String;

  constructor( private auth: AuthService) { }

  ngOnInit() {
    this.auth.currentUser.subscribe(user => {
      console.log("change " + JSON.stringify(user));
      if (user !== null){
        this.name = user.user.name;
        this.email = user.user.email;
        if (user.user.attributes === null) return;
        this.profileURL = user.user.attributes.profile_url;
      }      
    });
  }
}