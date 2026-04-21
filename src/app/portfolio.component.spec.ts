import { TestBed } from '@angular/core/testing';
import { PortfolioComponent } from './portfolio.component';

describe('PortfolioComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(PortfolioComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the portfolio title', () => {
    const fixture = TestBed.createComponent(PortfolioComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Javier Lopez');
  }); 
});
