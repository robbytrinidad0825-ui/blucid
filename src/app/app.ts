import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {RouterOutlet, Router, NavigationEnd} from '@angular/router';
import {Navbar} from './navbar';
import {Footer} from './footer';
import {BackToTop} from './back-to-top';
import {filter} from 'rxjs/operators';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, BackToTop],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private router = inject(Router);
  isAdminRoute = signal(false);

  constructor() {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects;
      this.isAdminRoute.set(url.includes('/adminlogin') || url.includes('/admindashboard'));
    });
  }
}
