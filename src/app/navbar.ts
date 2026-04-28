import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive, Router} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, MatIconModule, NgClass],
  template: `
    <nav class="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-20">
          <div class="flex items-center">
            <a routerLink="/" (click)="scrollToTop()" class="flex items-center gap-2 group cursor-pointer">
              <div class="w-28 h-14 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
                <img src="/img/nlogo.png" alt="Blucid Enterprise Logo" class="w-full h-full object-contain">
              </div>
            </a>
          </div>

          <!-- Desktop Menu -->
          <div class="hidden md:flex items-center space-gap-8">
            <a routerLink="/" (click)="scrollToTop()" routerLinkActive="text-primary" [routerLinkActiveOptions]="{exact: true}" class="text-sm font-medium text-slate-600 hover:text-primary transition-colors px-3 py-2 cursor-pointer">Home</a>
            <a routerLink="/services" (click)="scrollToTop()" routerLinkActive="text-primary" class="text-sm font-medium text-slate-600 hover:text-primary transition-colors px-3 py-2 cursor-pointer">Services</a>
            <a routerLink="/products" (click)="scrollToTop()" routerLinkActive="text-primary" class="text-sm font-medium text-slate-600 hover:text-primary transition-colors px-3 py-2 cursor-pointer">Products</a>
            <a routerLink="/about" (click)="scrollToTop()" routerLinkActive="text-primary" class="text-sm font-medium text-slate-600 hover:text-primary transition-colors px-3 py-2 cursor-pointer">About Us</a>
            <a routerLink="/faq" (click)="scrollToTop()" routerLinkActive="text-primary" class="text-sm font-medium text-slate-600 hover:text-primary transition-colors px-3 py-2 cursor-pointer">FAQ</a>
            <a routerLink="/contact" (click)="scrollToTop()" class="ml-4 inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-semibold rounded-full shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all cursor-pointer">
              Contact Us
            </a>
          </div>

          <!-- Mobile menu button -->
          <div class="flex items-center md:hidden">
            <button (click)="toggleMenu()" class="text-slate-600 hover:text-primary p-2 focus:outline-none transition-colors">
              <mat-icon>{{ isMenuOpen ? 'close' : 'menu' }}</mat-icon>
            </button>
          </div>
        </div>
      </div>

      <!-- Left Slide-out Mobile Sidebar Panel -->
      <div class="md:hidden">
        <!-- Backdrop -->
        @if (isMenuOpen) {
          <div 
            class="fixed inset-0 bg-secondary/60 backdrop-blur-sm z-[998] transition-opacity duration-300 cursor-pointer"
            (click)="toggleMenu()"
            (keydown.enter)="toggleMenu()"
            tabindex="0"
            role="button"
            aria-label="Close menu"
          ></div>
        }

        <!-- Sidebar Content -->
        <div 
          class="fixed top-0 left-0 h-full w-[80%] max-w-xs bg-white shadow-2xl z-[999] transition-transform duration-300 ease-out transform"
          [ngClass]="isMenuOpen ? 'translate-x-0' : '-translate-x-full'"
        >
          <div class="h-full flex flex-col">
            <!-- Sidebar Header -->
            <div class="p-8 border-b border-slate-50 relative flex flex-col items-center bg-white">
              <button (click)="toggleMenu()" class="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary transition-colors">
                <mat-icon>close</mat-icon>
              </button>
              <a routerLink="/" (click)="closeMenu(); scrollToTop()" class="flex flex-col items-center gap-3 cursor-pointer">
                <div class="w-32 h-16 flex items-center justify-center overflow-hidden">
                  <img src="/img/nlogo.png" alt="Blucid Logo" class="w-full h-full object-contain">
                </div>
                <span class="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-center">Blucid Enterprise Inc.</span>
              </a>
            </div>

            <!-- Sidebar Links -->
            <nav class="flex-grow p-6 space-y-4 bg-white">
              <a routerLink="/" (click)="closeMenu(); scrollToTop()" routerLinkActive="text-primary bg-primary/5" [routerLinkActiveOptions]="{exact: true}" class="flex items-center gap-4 px-4 py-3 rounded-2xl text-slate-600 font-bold hover:text-primary hover:bg-primary/5 transition-all cursor-pointer">
                <mat-icon class="text-xl">home</mat-icon>
                <span>Home</span>
              </a>
              <a routerLink="/" fragment="roi-calculator" (click)="scrollToSection('roi-calculator'); closeMenu()" class="flex items-center gap-4 px-4 py-3 rounded-2xl text-slate-600 font-bold hover:text-primary hover:bg-primary/5 transition-all cursor-pointer">
                <mat-icon class="text-xl">calculate</mat-icon>
                <span>Solar Calculator</span>
              </a>
              <a routerLink="/services" (click)="closeMenu(); scrollToTop()" routerLinkActive="text-primary bg-primary/5" class="flex items-center gap-4 px-4 py-3 rounded-2xl text-slate-600 font-bold hover:text-primary hover:bg-primary/5 transition-all cursor-pointer">
                <mat-icon class="text-xl">engineering</mat-icon>
                <span>Services</span>
              </a>
              <a routerLink="/products" (click)="closeMenu(); scrollToTop()" routerLinkActive="text-primary bg-primary/5" class="flex items-center gap-4 px-4 py-3 rounded-2xl text-slate-600 font-bold hover:text-primary hover:bg-primary/5 transition-all cursor-pointer">
                <mat-icon class="text-xl">shopping_cart</mat-icon>
                <span>Products</span>
              </a>
              <a routerLink="/about" (click)="closeMenu(); scrollToTop()" routerLinkActive="text-primary bg-primary/5" class="flex items-center gap-4 px-4 py-3 rounded-2xl text-slate-600 font-bold hover:text-primary hover:bg-primary/5 transition-all cursor-pointer">
                <mat-icon class="text-xl">info</mat-icon>
                <span>About Us</span>
              </a>
              <a routerLink="/faq" (click)="closeMenu(); scrollToTop()" routerLinkActive="text-primary bg-primary/5" class="flex items-center gap-4 px-4 py-3 rounded-2xl text-slate-600 font-bold hover:text-primary hover:bg-primary/5 transition-all cursor-pointer">
                <mat-icon class="text-xl">help</mat-icon>
                <span>FAQ</span>
              </a>
            </nav>

            <!-- Sidebar Footer -->
            <div class="p-6 border-t border-slate-50 bg-white">
              <a routerLink="/contact" (click)="closeMenu(); scrollToTop()" class="w-full inline-flex items-center justify-center px-6 py-4 rounded-2xl bg-primary text-white font-black shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer">
                Get Free Quote
              </a>
              <div class="mt-6 text-center">
                <p class="text-[10px] font-black text-slate-800 uppercase tracking-widest">Connect with our team</p>
                <div class="flex justify-center gap-4 mt-3">
                  <a href="https://www.facebook.com/search/top/?q=blucid%20enterprise%20inc." target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded-full bg-white border border-slate-100 text-slate-400 flex items-center justify-center hover:bg-primary/10 hover:text-primary cursor-pointer transition-all">
                    <mat-icon class="text-sm">facebook</mat-icon>
                  </a>
                  <span class="w-8 h-8 rounded-full bg-white border border-slate-100 text-slate-400 flex items-center justify-center hover:bg-primary/10 hover:text-primary cursor-pointer transition-all"><mat-icon class="text-sm">alternate_email</mat-icon></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    :host { display: block; }
    .space-gap-8 > * + * { margin-left: 1rem; }
  `]
})
export class Navbar {
  private router = inject(Router);
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.updateBodyScroll();
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.updateBodyScroll();
  }

  private updateBodyScroll() {
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  navigateTo(path: string) {
    this.router.navigate([path]).then(() => {
      this.scrollToTop();
    });
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  scrollToSection(sectionId: string) {
    const currentUrl = this.router.url.split('#')[0];
    if (currentUrl === '/' || currentUrl === '/home') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      this.router.navigate(['/'], { fragment: sectionId }).then(() => {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 300);
      });
    }
  }
}

