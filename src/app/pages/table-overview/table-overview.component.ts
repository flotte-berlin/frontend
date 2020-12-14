import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { tableLinks } from 'src/app/tableLinks';

@Component({
  selector: 'app-table-overview',
  templateUrl: './table-overview.component.html',
  styleUrls: ['./table-overview.component.scss']
})
export class TableOverviewComponent implements OnInit {

  username = "fLotte Nutzer"
  tableLinks = tableLinks;

  constructor(private auth: AuthService) {
   }

  ngOnInit(): void {
    this.auth.currentUser.subscribe(user => {
      const name = user?.user?.name;
      this.username = name || this.username    
    });
  }

}
