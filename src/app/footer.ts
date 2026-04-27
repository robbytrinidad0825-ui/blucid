import {Component, signal, OnInit, inject, PLATFORM_ID} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [MatIconModule, RouterLink],
  template: `
    <footer class="bg-secondary text-white pt-16 pb-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div class="col-span-1 md:col-span-1">
            <div class="flex items-center gap-2 mb-6">
              <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
                <mat-icon class="text-sm">solar_power</mat-icon>
              </div>
              <span class="text-lg font-display font-bold tracking-tight">Blucid<span class="text-primary">Enterprise</span></span>
            </div>
            <p class="text-slate-400 text-sm leading-relaxed mb-6">
              {{footerData().description}}
            </p>
            <div class="flex gap-4">
              <a href="#" class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors">
                <mat-icon class="text-sm">facebook</mat-icon>
              </a>
              <a href="#" class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors">
                <mat-icon class="text-sm">alternate_email</mat-icon>
              </a>
            </div>
          </div>

          <div>
            <h4 class="text-sm font-bold uppercase tracking-widest text-primary mb-6">Quick Links</h4>
            <ul class="space-y-4 text-sm text-slate-400">
              <li><a routerLink="/" class="hover:text-white transition-colors">Home</a></li>
              <li><a routerLink="/services" class="hover:text-white transition-colors">Services</a></li>
              <li><a routerLink="/products" class="hover:text-white transition-colors">Products</a></li>
              <li><a routerLink="/about" class="hover:text-white transition-colors">About Us</a></li>
              <li><a routerLink="/faq" class="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-sm font-bold uppercase tracking-widest text-primary mb-6">Services</h4>
            <ul class="space-y-4 text-sm text-slate-400">
              <li>Solar Installation</li>
              <li>Wiring Setup</li>
              <li>Battery Supplies</li>
              <li>Volt Switch Panels</li>
              <li>Maintenance</li>
            </ul>
          </div>

          <div>
            <h4 class="text-sm font-bold uppercase tracking-widest text-primary mb-6">Contact Info</h4>
            <ul class="space-y-4 text-sm text-slate-400">
              <li class="flex items-start gap-3">
                <mat-icon class="text-primary mt-0.5">location_on</mat-icon>
                <span>{{footerData().address}}</span>
              </li>
              <li class="flex items-center gap-3">
                <mat-icon class="text-primary">phone</mat-icon>
                <span>{{footerData().phone}}</span>
              </li>
              <li class="flex items-center gap-3">
                <mat-icon class="text-primary">schedule</mat-icon>
                <span>{{footerData().schedule}}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div class="pt-8 border-t border-slate-800 text-center text-slate-500 text-xs">
          <p>{{footerData().copyright}}</p>
        </div>
      </div>
    </footer>
  `
})
export class Footer implements OnInit {
  private platformId = inject(PLATFORM_ID);
  footerData = signal({
    description: 'Leading the way in sustainable energy solutions. We provide high-quality solar installations and electrical services for a brighter, greener future.',
    address: 'B1 L12, Cuervo II Rd, Real, Calamba, 4027 Laguna',
    phone: '(049) 520 5780',
    schedule: 'Mon - Fri: 8:00 AM - 5:00 PM',
    copyright: '© 2026 Blucid Enterprise Inc. All rights reserved.'
  });

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const websiteData = localStorage.getItem('blucid_website_content');
      if (websiteData) {
        try {
          const parsed = JSON.parse(websiteData);
          if (parsed && parsed.footer) {
            this.footerData.set(parsed.footer);
          }
        } catch { /* ignore */ }
      }
    }
  }
}
