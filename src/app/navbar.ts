import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive, Router} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {WebsiteDataService} from './website-data';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  template: `
    <nav class="backdrop-blur-md border-b border-slate-100 sticky top-0 z-50 transition-colors duration-300" 
         [style.background-color]="websiteData().system.colors.navbarBackground + 'cc'">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-20">
          <div class="flex items-center">
            <a routerLink="/" (click)="scrollToTop()" class="flex items-center gap-2 group cursor-pointer">
              <div class="w-28 h-14 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
                <img src="/img/nlogo.png" alt="Blucid Enterprise Logo" class="w-full h-full object-contain" style="width: 100.992px;">
              </div>
            </a>
          </div>

          <!-- Desktop Menu -->
          <div class="hidden md:flex items-center space-gap-8">
            <!-- Products Dropdown -->
            <div class="relative group">
               <div class="text-sm font-medium text-black hover:text-primary transition-colors px-3 py-2 flex items-center gap-1 cursor-pointer">
                 Products
                 <mat-icon class="text-sm">keyboard_arrow_down</mat-icon>
               </div>
               <!-- Dropdown Panel -->
               <div class="fixed top-20 left-[3vw] w-[94vw] h-auto bg-white shadow-xl rounded-2xl p-8 grid grid-cols-3 gap-8 border border-slate-100 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                 <a routerLink="/products" (click)="closeMenu(); scrollToTop()" class="text-black hover:text-primary p-8 hover:bg-slate-50 rounded-2xl flex flex-col items-start justify-start text-left border border-slate-100 transition-all duration-200">
                   <span class="text-lg font-bold">Our Products</span>
                   <p class="text-sm text-slate-500 mt-2">Browse our high-performance solar panels, inverters, and battery storage systems designed for longevity.</p>
                 </a>
                 <a routerLink="/services" (click)="closeMenu(); scrollToTop()" class="text-black hover:text-primary p-8 hover:bg-slate-50 rounded-2xl flex flex-col items-start justify-start text-left border border-slate-100 transition-all duration-200">
                   <span class="text-lg font-bold">Kinds of Our Services</span>
                   <p class="text-sm text-slate-500 mt-2">From residential installations to large-scale commercial solar farms, explore our comprehensive service range.</p>
                 </a>
                 <a routerLink="/contact" (click)="closeMenu(); scrollToTop()" class="text-black hover:text-primary p-8 hover:bg-slate-50 rounded-2xl flex flex-col items-start justify-start text-left border border-slate-100 transition-all duration-200">
                   <span class="text-lg font-bold">Business Partnership</span>
                   <p class="text-sm text-slate-500 mt-2">Collaborate with us to accelerate the green energy transition through strategic B2B solar initiatives.</p>
                 </a>
               </div>
            </div>
            <!-- Company Dropdown -->
            <div class="relative group">
               <div class="text-sm font-medium text-black hover:text-primary transition-colors px-3 py-2 flex items-center gap-1 cursor-pointer">
                 Company
                 <mat-icon class="text-sm">keyboard_arrow_down</mat-icon>
               </div>
               <!-- Dropdown Panel -->
               <div class="fixed top-20 left-[3vw] w-[94vw] h-auto bg-white shadow-xl rounded-2xl p-8 grid grid-cols-3 gap-8 border border-slate-100 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                 <a routerLink="/about" (click)="closeMenu(); scrollToTop()" class="text-black hover:text-primary p-8 hover:bg-slate-50 rounded-2xl flex flex-col items-start justify-start text-left border border-slate-100 transition-all duration-200">
                   <span class="text-lg font-bold">About Us</span>
                   <p class="text-sm text-slate-500 mt-2">Learn about our history, mission, and the team driving our sustainable energy solutions.</p>
                 </a>
                 <a tabindex="0" (keydown.enter)="closeMenu(); navigateToWithFragment('/about', 'why-choose-us')" (click)="closeMenu(); navigateToWithFragment('/about', 'why-choose-us')" class="text-black hover:text-primary p-8 hover:bg-slate-50 rounded-2xl flex flex-col items-start justify-start text-left border border-slate-100 transition-all duration-200 cursor-pointer">
                   <span class="text-lg font-bold">Why Choose Us</span>
                   <p class="text-sm text-slate-500 mt-2">Discover what sets us apart and why thousands trust us for their solar energy needs.</p>
                 </a>
                 <a tabindex="0" (keydown.enter)="closeMenu(); navigateToWithFragment('/', 'testimonials')" (click)="closeMenu(); navigateToWithFragment('/', 'testimonials')" class="text-black hover:text-primary p-8 hover:bg-slate-50 rounded-2xl flex flex-col items-start justify-start text-left border border-slate-100 transition-all duration-200 cursor-pointer">
                   <span class="text-lg font-bold">Client Testimonial</span>
                   <p class="text-sm text-slate-500 mt-2">Read success stories and experiences from our satisfied residential and commercial clients.</p>
                 </a>
               </div>
            </div>
            
            <!-- Learning Dropdown -->
            <div class="relative group">
               <div class="text-sm font-medium text-black hover:text-primary transition-colors px-3 py-2 flex items-center gap-1 cursor-pointer">
                 Learn
                 <mat-icon class="text-sm">keyboard_arrow_down</mat-icon>
               </div>
               <!-- Dropdown Panel -->
               <div class="fixed top-20 left-[3vw] w-[94vw] h-[74vh] bg-white shadow-xl rounded-2xl p-8 grid grid-cols-2 gap-8 border border-slate-100 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                 <a routerLink="/portfolio" (click)="closeMenu(); scrollToTop()" class="text-black hover:text-primary p-8 hover:bg-slate-50 rounded-2xl flex flex-col items-start justify-start text-left border border-slate-100 transition-all duration-200">
                   <span class="text-lg font-bold">Our Portfolio</span>
                   <p class="text-sm text-slate-500 mt-2">Explore our completed projects and witness our commitment to quality and sustainability.</p>
                 </a>
                 <a routerLink="/services" (click)="closeMenu(); scrollToTop()" class="text-black hover:text-primary p-8 hover:bg-slate-50 rounded-2xl flex flex-col items-start justify-start text-left border border-slate-100 transition-all duration-200">
                   <span class="text-lg font-bold">Our Expertise</span>
                   <p class="text-sm text-slate-500 mt-2">Discover the specialized skills and solar technologies that drive our innovative energy solutions.</p>
                 </a>
                 <a routerLink="/solar-calculator" (click)="closeMenu(); scrollToTop()" class="text-black hover:text-primary p-8 hover:bg-slate-50 rounded-2xl flex flex-col items-start justify-start text-left border border-slate-100 transition-all duration-200">
                   <span class="text-lg font-bold">Solar Calculator</span>
                   <p class="text-sm text-slate-500 mt-2">Calculate uses of real-market data and switch to Solar Power.</p>
                 </a>
                 <a routerLink="/faq" (click)="closeMenu(); scrollToTop()" class="text-black hover:text-primary p-8 hover:bg-slate-50 rounded-2xl flex flex-col items-start justify-start text-left border border-slate-100 transition-all duration-200">
                   <span class="text-lg font-bold">FAQ</span>
                   <p class="text-sm text-slate-500 mt-2">Find answers to the most common questions about switching to solar energy and our services.</p>
                 </a>
               </div>
            </div>

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

      <!-- Mobile menu dropdown -->
      @if (isMenuOpen) {
        <div class="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl z-[999] animate-in slide-in-from-top-4 fade-in duration-200">
          <!-- Sidebar Links -->
          <nav class="p-4 space-y-2">
            <a routerLink="/products" (click)="closeMenu(); scrollToTop()" routerLinkActive="text-primary bg-primary/5" class="flex items-center gap-4 px-4 py-3 rounded-2xl text-black font-bold hover:text-primary hover:bg-primary/5 transition-all cursor-pointer">
              <mat-icon class="text-xl">shopping_cart</mat-icon>
              <span class="text-sm">Products</span>
            </a>
            <a routerLink="/services" (click)="closeMenu(); scrollToTop()" routerLinkActive="text-primary bg-primary/5" class="flex items-center gap-4 px-4 py-3 rounded-2xl text-black font-bold hover:text-primary hover:bg-primary/5 transition-all cursor-pointer">
              <mat-icon class="text-xl">engineering</mat-icon>
              <span class="text-sm">Services</span>
            </a>
            <a routerLink="/portfolio" (click)="closeMenu(); scrollToTop()" routerLinkActive="text-primary bg-primary/5" class="flex items-center gap-4 px-4 py-3 rounded-2xl text-black font-bold hover:text-primary hover:bg-primary/5 transition-all cursor-pointer">
              <mat-icon class="text-xl">work</mat-icon>
              <span class="text-sm">Portfolio</span>
            </a>
            <a routerLink="/solar-calculator" (click)="closeMenu(); scrollToTop()" routerLinkActive="text-primary bg-primary/5" class="flex items-center gap-4 px-4 py-3 rounded-2xl text-black font-bold hover:text-primary hover:bg-primary/5 transition-all cursor-pointer">
              <mat-icon class="text-xl">calculate</mat-icon>
              <span class="text-sm">Solar Calculator</span>
            </a>
            <a routerLink="/faq" (click)="closeMenu(); scrollToTop()" routerLinkActive="text-primary bg-primary/5" class="flex items-center gap-4 px-4 py-3 rounded-2xl text-black font-bold hover:text-primary hover:bg-primary/5 transition-all cursor-pointer">
              <mat-icon class="text-xl">help_outline</mat-icon>
              <span class="text-sm">FAQ</span>
            </a>
            <div class="border-t border-slate-100 my-2"></div>
            <a routerLink="/about" (click)="closeMenu(); scrollToTop()" routerLinkActive="text-primary bg-primary/5" class="flex items-center gap-4 px-4 py-3 rounded-2xl text-black font-bold hover:text-primary hover:bg-primary/5 transition-all cursor-pointer">
              <mat-icon class="text-xl">business</mat-icon>
              <span class="text-sm">Company</span>
            </a>
          </nav>
        </div>
      }
    </nav>
  `,
  styles: [`
    :host { display: block; }
    .space-gap-8 > * + * { margin-left: 1rem; }
  `]
})
export class Navbar {
  private router = inject(Router);
  websiteData = inject(WebsiteDataService).data;
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

  navigateToWithFragment(path: string, fragmentId: string) {
    this.router.navigate([path], { fragment: fragmentId }).then(() => {
      setTimeout(() => {
        const element = document.getElementById(fragmentId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100); // give time for route to transition and render
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
