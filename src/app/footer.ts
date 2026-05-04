import { Component, signal, inject, PLATFORM_ID, computed } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { WebsiteDataService } from './website-data';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, MatIconModule, RouterLink],
  template: `
    <footer class="bg-secondary text-white pt-16 pb-8" [style.background-color]="websiteData().system.colors.footerBackground">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div class="col-span-1 md:col-span-1 text-left font-normal">
            <div class="flex flex-col mb-6" style="line-height: 0px;">
              @if (footerData().bannerImage) {
                <img [src]="footerData().bannerImage" alt="Blucid Enterprise Inc. Logo" class="h-12 w-auto mb-4 object-contain self-start" referrerpolicy="no-referrer">
              } @else {
                <img src="./img/nlogo.png" alt="Blucid Enterprise Inc. Logo" class="h-12 w-[108px] mb-4 object-contain" referrerpolicy="no-referrer">
              }
              <span class="text-sm font-display font-black tracking-tighter uppercase text-white">Blucid Enterprise Inc.</span>
            </div>
            <p class="text-white text-sm leading-relaxed mb-6">
              {{footerData().description}}
            </p>
            <div class="flex gap-4">
              <a href="https://www.facebook.com/search/top/?q=blucid%20enterprise%20inc." target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors">
                <mat-icon class="text-sm">facebook</mat-icon>
              </a>
              <a href="#" class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors">
                <mat-icon class="text-sm">alternate_email</mat-icon>
              </a>
            </div>
          </div>

         <div class="col-span-1">
        <h4 class="text-white font-display font-bold mb-8 relative after:content-[''] after:absolute after:-bottom-3 after:left-0 after:w-8 after:h-1 after:bg-primary">Quick Links</h4>
        <ul class="space-y-4">
          <li><a routerLink="/" class="text-slate-400 hover:text-white transition-colors text-sm font-medium">Home Page</a></li>
          <li><a routerLink="/about" class="text-slate-400 hover:text-white transition-colors text-sm font-medium">Company Profile</a></li>
          <li><a routerLink="/services" class="text-slate-400 hover:text-white transition-colors text-sm font-medium">Our Expertise</a></li>
          <li><a routerLink="/projects" class="text-slate-400 hover:text-white transition-colors text-sm font-medium">View Projects</a></li>
          <li><a routerLink="/contact" class="text-slate-400 hover:text-white transition-colors text-sm font-medium">Get in Touch</a></li>
        </ul>
      </div>

      <div class="col-span-1">
        <h4 class="text-white font-display font-bold mb-8 relative after:content-[''] after:absolute after:-bottom-3 after:left-0 after:w-8 after:h-1 after:bg-primary">Services</h4>
        <ul class="space-y-4">
          <li><a routerLink="/services" fragment="electrical-works" class="text-slate-400 hover:text-white transition-colors text-sm font-medium">Electrical Contracting</a></li>
          <li><a routerLink="/services" fragment="air-conditioning" class="text-slate-400 hover:text-white transition-colors text-sm font-medium">Air Conditioning Systems</a></li>
          <li><a routerLink="/services" fragment="ups-systems" class="text-slate-400 hover:text-white transition-colors text-sm font-medium">Solar PV Systems</a></li>
          <li><a routerLink="/services" fragment="ups-systems" class="text-slate-400 hover:text-white transition-colors text-sm font-medium">UPS Systems</a></li>
          <li><a routerLink="/services" fragment="construction-renovation" class="text-slate-400 hover:text-white transition-colors text-sm font-medium">Construction & Renovation</a></li>
        </ul>
      </div>

      <div class="col-span-1">
        <h4 class="text-white font-display font-bold mb-8 relative after:content-[''] after:absolute after:-bottom-3 after:left-0 after:w-8 after:h-1 after:bg-primary">Contact Info</h4>
        <ul class="space-y-4 text-left">
          <li class="flex gap-4">
            <mat-icon class="text-primary text-lg">place</mat-icon>
            <span class="text-slate-400 text-sm leading-relaxed">{{footerData().address}}</span>
          </li>
          <li class="flex items-center gap-4">
            <mat-icon class="text-primary text-lg">phone</mat-icon>
            <span class="text-slate-400 text-sm font-medium">{{footerData().phone}}</span>
          </li>
          <li class="flex items-center gap-4">
            <mat-icon class="text-primary text-lg">email</mat-icon>
            <span class="text-slate-400 text-sm font-medium">{{footerData().email}}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="pt-8 border-t border-white/5 flex flex-col items-center gap-4 text-center">
      <p class="text-white text-xs font-medium">
        {{footerData().copyright}}
      </p>
      <div class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        <button (click)="openModal('privacy')" class="text-slate-500 hover:text-white transition-colors text-[11px] font-bold uppercase tracking-wider outline-none cursor-pointer">Privacy Policy</button>
        <button (click)="openModal('terms')" class="text-slate-500 hover:text-white transition-colors text-[11px] font-bold uppercase tracking-wider outline-none cursor-pointer">Terms of Service</button>
        <button (click)="openModal('disclaimer')" class="text-slate-500 hover:text-white transition-colors text-[11px] font-bold uppercase tracking-wider outline-none cursor-pointer">Disclaimers</button>
        <button (click)="openModal('cookie')" class="text-slate-500 hover:text-white transition-colors text-[11px] font-bold uppercase tracking-wider outline-none cursor-pointer">Cookie Policy</button>
      </div>
    </div>
  </div>

  <!-- Modal -->
  @if (activeModal()) {
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div class="bg-white text-secondary w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
          <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-slate-100">
          <h3 class="text-xl font-display font-black uppercase tracking-tight">
            {{ 
              activeModal() === 'privacy' ? 'Privacy Policy' : 
              activeModal() === 'terms' ? 'Terms of Service' :
              activeModal() === 'disclaimer' ? 'Disclaimers' : 'Cookie Policy'
            }}
          </h3>
        </div>

        <div class="p-10 overflow-y-auto max-h-[60vh] text-slate-600">
          <div class="space-y-8">
            <div>
              <p class="font-black text-secondary mb-8">Last Updated: {{ activePolicy().lastUpdated }}</p>
              
              <div class="space-y-6 leading-relaxed" [style.font-family]="activePolicy().fontFamily" [style.font-size]="activePolicy().fontSize">
                @for (paragraph of activePolicy().paragraphs; track paragraph) {
                  @if (isHeader(paragraph)) {
                    <h4 class="font-black text-secondary uppercase tracking-tight text-sm mt-8 mb-2">
                      {{ paragraph }}
                    </h4>
                  } @else {
                    <p class="text-slate-500">{{ paragraph }}</p>
                  }
                }
              </div>
            </div>
          </div>
        </div>

        <div class="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button (click)="closeModal()" class="px-6 py-2 bg-secondary text-white rounded-xl font-bold hover:bg-primary transition-all">Close</button>
        </div>
      </div>
    </div>
  }
</footer>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class Footer {
  private platformId = inject(PLATFORM_ID);
  private websiteService = inject(WebsiteDataService);
  websiteData = this.websiteService.data;
  
  footerData = computed(() => this.websiteService.data().footer);
  activeModal = signal<'privacy' | 'terms' | 'disclaimer' | 'cookie' | null>(null);

  activePolicy = computed(() => {
    const modal = this.activeModal();
    const data = this.footerData();
    if (!modal) return { lastUpdated: '', paragraphs: [], fontSize: '14px', fontFamily: 'Arial' };

    let text = '';
    let lastUpdated = '';
    let fontSize = '14px';
    let fontFamily = 'Arial';

    switch (modal) {
      case 'privacy':
        text = data.privacyPolicy;
        lastUpdated = data.privacyLastUpdated;
        fontSize = data.privacyFontSize;
        fontFamily = data.privacyFontFamily;
        break;
      case 'terms':
        text = data.termsOfService;
        lastUpdated = data.termsLastUpdated;
        fontSize = data.termsFontSize;
        fontFamily = data.termsFontFamily;
        break;
      case 'disclaimer':
        text = data.disclaimer;
        lastUpdated = data.disclaimerLastUpdated;
        fontSize = data.disclaimerFontSize;
        fontFamily = data.disclaimerFontFamily;
        break;
      case 'cookie':
        text = data.cookiePolicy;
        lastUpdated = data.cookieLastUpdated;
        fontSize = data.cookieFontSize;
        fontFamily = data.cookieFontFamily;
        break;
    }

    return {
      lastUpdated,
      fontSize,
      fontFamily,
      paragraphs: text.split('\n').filter(p => p.trim().length > 0)
    };
  });

  isHeader(text: string): boolean {
    // Check if starts with a number followed by a dot (e.g. "1. ")
    return /^\d+\.\s/.test(text.trim());
  }

  openModal(type: 'privacy' | 'terms' | 'disclaimer' | 'cookie') {
    this.activeModal.set(type);
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal() {
    this.activeModal.set(null);
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }
  }
}
