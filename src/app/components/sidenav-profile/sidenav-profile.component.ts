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
      this.name = user.user.name;
      this.email = user.user.email;
      this.profileURL = user.user.attributes.profile_url;
    });
  }
}