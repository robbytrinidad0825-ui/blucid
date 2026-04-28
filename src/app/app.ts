import {ChangeDetectionStrategy, Component, inject, signal, HostListener, PLATFORM_ID} from '@angular/core';
import {RouterOutlet, Router, NavigationEnd} from '@angular/router';
import {isPlatformBrowser} from '@angular/common';
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
  private platformId = inject(PLATFORM_ID);
  isAdminRoute = signal(false);

  constructor() {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects;
      this.isAdminRoute.set(url.includes('/adminlogin') || url.includes('/admindashboard'));
    });

    this.applyTheme();
  }

  @HostListener('window:storage', ['$event'])
  onStorageChange(event: StorageEvent) {
    if (event.key === 'blucid_website_content' || event.key === 'blucid_website_draft') {
      this.applyTheme();
    }
  }

  private applyTheme() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('blucid_website_content') || localStorage.getItem('blucid_website_draft');
      if (saved) {
        try {
          const data = JSON.parse(saved);
          if (data.theme) {
            document.documentElement.style.setProperty('--primary-color', data.theme.primary);
            document.documentElement.style.setProperty('--secondary-color', data.theme.secondary);
          }
          if (data.typography) {
            document.documentElement.style.setProperty('--font-sans-family', `"${data.typography.fontSans}", ui-sans-serif, system-ui, sans-serif`);
            document.documentElement.style.setProperty('--font-display-family', `"${data.typography.fontDisplay}", sans-serif`);
            
            if (data.typography.h1Size) document.documentElement.style.setProperty('--h1-size', data.typography.h1Size.includes('rem') || data.typography.h1Size.includes('px') ? data.typography.h1Size : `var(--text-${data.typography.h1Size})`);
            if (data.typography.h2Size) document.documentElement.style.setProperty('--h2-size', data.typography.h2Size.includes('rem') || data.typography.h2Size.includes('px') ? data.typography.h2Size : `var(--text-${data.typography.h2Size})`);
            if (data.typography.h3Size) document.documentElement.style.setProperty('--h3-size', data.typography.h3Size.includes('rem') || data.typography.h3Size.includes('px') ? data.typography.h3Size : `var(--text-${data.typography.h3Size})`);
            if (data.typography.h4Size) document.documentElement.style.setProperty('--h4-size', data.typography.h4Size.includes('rem') || data.typography.h4Size.includes('px') ? data.typography.h4Size : `var(--text-${data.typography.h4Size})`);
            if (data.typography.baseSize) document.documentElement.style.setProperty('--base-size', data.typography.baseSize.includes('rem') || data.typography.baseSize.includes('px') ? data.typography.baseSize : `var(--text-${data.typography.baseSize})`);
          }
        } catch (e) {
          console.error('Error applying theme from storage', e);
        }
      }
    }
  }
}
