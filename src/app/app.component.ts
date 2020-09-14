import { Component, Renderer2 } from '@angular/core';
import { ColorThemeService } from './services/colorTheme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'flotte-frontend';
  darkThemeIsActive: boolean = false;

  constructor(
    private renderer: Renderer2,
    private themeService: ColorThemeService
  ) {
    this.renderer.addClass(document.body, 'mat-app-background'); //so the background color changes dependent on current theme
    this.themeService.load();
    this.darkThemeIsActive = this.themeService.currentActive() === 'dark-theme';
  }

  changeTheme(event) {
    this.themeService.update(event.checked ? 'dark-theme' : 'light-theme');
  }
}
