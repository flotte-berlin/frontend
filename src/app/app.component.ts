import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ColorThemeService } from './services/colorTheme.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavService } from './components/menu-list-item/nav.service';
import { tableLinks } from 'src/app/tableLinks';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

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

  tableLinks = tableLinks
        

  constructor(
    private renderer: Renderer2,
    private themeService: ColorThemeService,
    private authService: AuthService,
    private router: Router,
    private navService: NavService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.renderer.addClass(document.body, 'mat-app-background'); //so the background color changes dependent on current theme
    this.themeService.load();
    this.darkThemeIsActive = this.themeService.currentActive() === 'dark-theme';
    this.authService.loggedIn.subscribe((value) => (this.loggedIn = value));
    this.matIconRegistry.addSvgIcon(
      "cargobike",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/cargobike.svg")
    );
  }

  changeTheme(event) {
    this.themeService.update(event.checked ? 'dark-theme' : 'light-theme');
  }

  logout() {
    this.navService.closeNav();
    this.authService.logout().subscribe().add(() => this.router.navigate(['login']));
  }

  ngAfterViewInit() {
    //Change 
    this.navService.appDrawer = this.appDrawer;
  }
}
