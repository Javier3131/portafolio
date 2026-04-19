import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

type Lang = 'en' | 'fr';

interface LocalizedItem {
  title: string;
  description: string;
}

@Component({
  selector: 'app-root',
  imports: [NgFor, TranslateModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css',
  host: {
    '[class.light-theme]': '!isDarkTheme',
    '[class.dark-theme]': 'isDarkTheme'
  }
})
export class PortfolioComponent {
  isDarkTheme = true;
  language: Lang = 'en';

  skills: string[] = [];
  workHistory: LocalizedItem[] = [];
  projects: LocalizedItem[] = [];

  constructor(private readonly translate: TranslateService) {
    if (typeof window !== 'undefined') {
      const storedTheme = window.localStorage.getItem('theme');
      if (storedTheme === 'light') {
        this.isDarkTheme = false;
      }

      const storedLanguage = window.localStorage.getItem('language');
      if (storedLanguage === 'fr' || storedLanguage === 'en') {
        this.language = storedLanguage;
      }
    }

    this.translate.setDefaultLang('en');
    this.translate.use(this.language);
    this.loadCollections();

    this.translate.onLangChange.subscribe(() => {
      this.loadCollections();
    });
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;

    if (typeof window !== 'undefined') {
      window.localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
    }
  }

  setLanguage(lang: Lang): void {
    this.language = lang;
    this.translate.use(lang);

    if (typeof window !== 'undefined') {
      window.localStorage.setItem('language', lang);
    }
  }

  private loadCollections(): void {
    this.translate.get(['skills', 'workHistory', 'projects']).subscribe((result) => {
      this.skills = Array.isArray(result['skills']) ? result['skills'] : [];
      this.workHistory = Array.isArray(result['workHistory']) ? result['workHistory'] : [];
      this.projects = Array.isArray(result['projects']) ? result['projects'] : [];
    });
  }
}
