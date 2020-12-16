import {Injectable, Renderer2, RendererFactory2} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ColorThemeService {

    private renderer: Renderer2;
    private colorTheme: string;
    // Define prefix for more clear and readable styling classes in scss files

    constructor(rendererFactory: RendererFactory2) {
        // Create new renderer from renderFactory, to make it possible to use renderer2 in a service
        this.renderer = rendererFactory.createRenderer(null, null);
    }

    _detectPrefersColorTheme() {
        // Detect if prefers-color-theme is supported
         if (window.matchMedia('(prefers-color-theme)').media !== 'not all') {
             // Set colorTheme to Dark if prefers-color-theme is dark. Otherwise set to light.
             this.colorTheme = window.matchMedia('(prefers-color-theme: dark)').matches ? 'dark-theme' : 'light-theme';
        } else {
             // If browser dont support prefers-color-theme, set it as default to dark
            this.colorTheme = 'dark-theme';
        }
    }

    _setColorTheme(theme) {
        this.colorTheme = theme;
        // Save prefers-color-theme to localStorage
        localStorage.setItem('prefers-color', theme);
    }

    _getColorTheme() {
        // Check if any prefers-color-theme is stored in localStorage
        if (localStorage.getItem('prefers-color')) {
            // Save prefers-color-theme from localStorage
            this.colorTheme = localStorage.getItem('prefers-color');
        } else {
            // If no prefers-color-theme is stored in localStorage, Try to detect OS default prefers-color-theme
            this._detectPrefersColorTheme();
        }
    }

    load() {
        this._getColorTheme();
        this.renderer.addClass(document.body, this.colorTheme);
    }

    update(theme) {
        this._setColorTheme(theme);
        // Remove the old color-theme class
        this.renderer.removeClass( document.body, (this.colorTheme === 'dark-theme' ? 'light-theme' : 'dark-theme') );
        // Add the new / current color-theme class
        this.renderer.addClass(document.body, theme);
    }

    currentActive() {
        return this.colorTheme;
    }

}