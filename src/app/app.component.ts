import { Component, Renderer2 } from '@angular/core';
import { ColorThemeService } from './services/colorTheme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'flotte-frontend';

  constructor(private renderer: Renderer2, private themeService: ColorThemeService) {
    this.renderer.addClass(document.body, 'mat-app-background'); //so the background color changes dependent on current theme
    this.themeService.load();
  }
}
