import { Component, OnInit } from '@angular/core';
import { ColorThemeService } from '../../services/colorTheme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  darkThemeIsActive: boolean = false;
  constructor(private themeService: ColorThemeService) {
    this.darkThemeIsActive = this.themeService.currentActive() === "dark-theme";
  }
  

  ngOnInit(): void {}

  changeTheme(event) {
    this.themeService.update((event.checked) ? "dark-theme" : "light-theme");
  }
}
