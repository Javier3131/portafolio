import { NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

type Lang = 'en' | 'fr';

interface LocalizedItem {
  title: string;
  description: string;
}

interface TimelineItem {
  role: string;
  company: string;
  dates: string;
  description: string;
}

@Component({
  selector: 'app-root',
  imports: [NgFor, NgIf, TranslateModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css',
  host: {
    '[class.light-theme]': '!isDarkTheme',
    '[class.dark-theme]': 'isDarkTheme'
  }
})
export class PortfolioComponent implements AfterViewInit {
  isDarkTheme = true;
  language: Lang = 'en';

  skills: string[] = [];
  workHistory: LocalizedItem[] = [];
  projects: LocalizedItem[] = [];

  displayedRole = '';
  avatarMissing = false;

  private typingTimer: ReturnType<typeof setInterval> | null = null;

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
    this.translate.get('hero.role').subscribe(role => this.startTypingAnimation(role));

    this.translate.onLangChange.subscribe(() => {
      this.loadCollections();
      this.translate.get('hero.role').subscribe(role => this.startTypingAnimation(role));
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

  get workTimeline(): TimelineItem[] {
    return this.workHistory.map(item => this.parseTimelineItem(item));
  }

  get projectTimeline(): TimelineItem[] {
    return this.projects.map(item => this.parseTimelineItem(item));
  }

  private parseTimelineItem(item: LocalizedItem): TimelineItem {
    const match = item.title.match(/^(.+?)\s+[—–]\s+(.+?)\s*\((.+?)\)$/);
    if (match) {
      return { role: match[1].trim(), company: match[2].trim(), dates: match[3].trim(), description: item.description };
    }
    return { role: item.title, company: '', dates: '', description: item.description };
  }

  get skillChips(): string[] {
    return this.skills.flatMap(s => this.splitByComma(s));
  }

  private splitByComma(text: string): string[] {
    const result: string[] = [];
    let current = '';
    let depth = 0;
    for (const char of text) {
      if (char === '(') depth++;
      else if (char === ')') depth--;
      if (char === ',' && depth === 0) {
        if (current.trim()) result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    if (current.trim()) result.push(current.trim());
    return result;
  }

  private loadCollections(): void {
    this.translate.get(['skills', 'workHistory', 'projects']).subscribe((result) => {
      this.skills = Array.isArray(result['skills']) ? result['skills'] : [];
      this.workHistory = Array.isArray(result['workHistory']) ? result['workHistory'] : [];
      this.projects = Array.isArray(result['projects']) ? result['projects'] : [];
    });
  }

  ngAfterViewInit(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    document.querySelectorAll('.section-anchor').forEach(el => {
      el.classList.add('reveal');
      observer.observe(el);
    });
  }

  private startTypingAnimation(text: string): void {
    if (this.typingTimer) clearInterval(this.typingTimer);
    this.displayedRole = '';
    let i = 0;
    this.typingTimer = setInterval(() => {
      if (i < text.length) {
        this.displayedRole += text[i++];
      } else {
        clearInterval(this.typingTimer!);
        this.typingTimer = null;
      }
    }, 80);
  }
}
