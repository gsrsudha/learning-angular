import { Component } from '@angular/core';
import { slideInAnimation } from './app-animation';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent {
  pageTitle = 'Acme Product Management';
  loading: boolean;

  constructor(private router: Router) {
    this.router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if( routerEvent instanceof NavigationEnd || 
        routerEvent instanceof NavigationCancel || 
        routerEvent instanceof NavigationError) {
          this.loading = false;
    }
  }
}
