import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, MatIconModule, NgClass],
  template: `
    <nav class="bg-white border-b border-slate-100 sticky top-0 z-50" style="background-color: #ffffff;">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-20">
          <div class="flex items-center">
            <a routerLink="/" (click)="scrollToTop()" class="flex items-center gap-2 group">
              <div class="w-28 h-14 bg-primary rounded-[46%] flex items-center justify-center text-white shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform overflow-hidden">
                <img src="/img/nlogo.png" alt="Blucid Enterprise Logo" class="w-full h-full object-cover">
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
            <button (click)="isMenuOpen = !isMenuOpen" class="text-slate-600 hover:text-primary p-2">
              <mat-icon>{{ isMenuOpen ? 'close' : 'menu' }}</mat-icon>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div [ngClass]="{'block': isMenuOpen, 'hidden': !isMenuOpen}" class="md:hidden bg-white border-b border-slate-100 animate-in slide-in-from-top duration-300" style="background-color: #ffffff;">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a routerLink="/" (click)="scrollToTop(); isMenuOpen = false" class="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-primary hover:bg-slate-50 cursor-pointer">Home</a>
          <a routerLink="/services" (click)="scrollToTop(); isMenuOpen = false" class="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-primary hover:bg-slate-50 cursor-pointer">Services</a>
          <a routerLink="/products" (click)="scrollToTop(); isMenuOpen = false" class="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-primary hover:bg-slate-50 cursor-pointer">Products</a>
          <a routerLink="/about" (click)="scrollToTop(); isMenuOpen = false" class="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-primary hover:bg-slate-50 cursor-pointer">About Us</a>
          <a routerLink="/faq" (click)="scrollToTop(); isMenuOpen = false" class="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-primary hover:bg-slate-50 cursor-pointer">FAQ</a>
          <a routerLink="/contact" (click)="scrollToTop(); isMenuOpen = false" class="block px-3 py-2 rounded-md text-base font-medium text-primary font-bold cursor-pointer">Contact Us</a>
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
  isMenuOpen = false;

  scrollToTop() {
    // Adding a slight delay allows the router component to load
    // so we smoothly scroll the newly rendered "section/page" up.
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 50);
  }
}
