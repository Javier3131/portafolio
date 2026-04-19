import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { PortfolioComponent } from './app/portfolio.component';

bootstrapApplication(PortfolioComponent, appConfig)
  .catch((err) => console.error(err));
