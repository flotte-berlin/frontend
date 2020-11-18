import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ColorThemeService } from './services/colorTheme.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavService } from './components/menu-list-item/nav.service';
import { NavItem } from './components/menu-list-item/nav-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'fLotte-fRontend';
  darkThemeIsActive: boolean = false;
  loggedIn = false;

  @ViewChild('sidenav') public sideNav:MatSidenav;
  @ViewChild('appDrawer') appDrawer: ElementRef;


  navItems: NavItem[] = [
    {
      displayName: 'Tabellenübersicht  ',
      iconName: 'recent_actors',
      route: 'tableOverview'
    },
    {
      displayName: 'Tabellen',
      iconName: 'recent_actors',
      children: [
        {
          displayName: 'Lastenräder',
          iconName: 'group',
          route: 'table/bikes'
        },
        {
          displayName: 'Beteiligte',
          iconName: 'group',
          route: 'table/participants'
        },
        {
          displayName: 'Ausleihstationen',
          iconName: 'group',
          route: 'table/lendingStations'
        }]
      }];
        

  constructor(
    private renderer: Renderer2,
    private themeService: ColorThemeService,
    private authService: AuthService,
    private router: Router,
    private navService: NavService
  ) {
    this.renderer.addClass(document.body, 'mat-app-background'); //so the background color changes dependent on current theme
    this.themeService.load();
    this.darkThemeIsActive = this.themeService.currentActive() === 'dark-theme';
    this.authService.loggedIn.subscribe((value) => (this.loggedIn = value));
  }

  changeTheme(event) {
    this.themeService.update(event.checked ? 'dark-theme' : 'light-theme');
  }

  logout() {
    this.authService.logout().subscribe().add(() => this.router.navigate(['login']));
    this.sideNav.close();
  }

  ngAfterViewInit() {
    //Change 
    this.navService.appDrawer = this.appDrawer;
  }
}
