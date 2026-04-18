import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css',
  host: {
    '[class.light-theme]': '!isDarkTheme',
    '[class.dark-theme]': 'isDarkTheme'
  }
})
export class PortfolioComponent {
  isDarkTheme = true;

  constructor() {
    if (typeof window === 'undefined') {
      return;
    }

    const storedTheme = window.localStorage.getItem('theme');
    if (storedTheme === 'light') {
      this.isDarkTheme = false;
    }
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;

    if (typeof window !== 'undefined') {
      window.localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
    }
  }
}
