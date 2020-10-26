import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  showFooter = true;
  currentRoute: string;

  constructor(private router: Router) {
    router.events.subscribe((event: RouterEvent) => {
      if (
        (event.url != undefined && event.url.startsWith('/about-me')) ||
        (event.url != undefined && event.url.startsWith('/contact'))
      ) {
        this.showFooter = false;
      }

      if (event.url != undefined && event.url.startsWith('/portfolio')) {
        this.showFooter = true;
      }
    });
  }

  ngOnInit() {}
}
