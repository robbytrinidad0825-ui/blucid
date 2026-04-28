import { Component, signal, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, MatIconModule, RouterLink],
  template: `
    <footer class="bg-secondary text-white pt-16 pb-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div class="col-span-1 md:col-span-1">
            <div class="flex items-center gap-2 mb-6">
              <span class="text-lg font-display font-bold tracking-tight">Blucid Enterprise Inc.</span>
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
          <li><a href="services/electrical-works" class="text-slate-400 hover:text-white transition-colors text-sm font-medium">Electrical Contracting</a></li>
          <li><a href="services/air-conditioning" class="text-slate-400 hover:text-white transition-colors text-sm font-medium">Air Conditioning Systems</a></li>
          <li><a href="/services/ups-systems" class="text-slate-400 hover:text-white transition-colors text-sm font-medium">Solar PV Systems</a></li>
          <li><a href="services/ups-systems" class="text-slate-400 hover:text-white transition-colors text-sm font-medium">UPS Systemst</a></li>
          <li><a href="services/construction-renovation" class="text-slate-400 hover:text-white transition-colors text-sm font-medium">Construction & Renovation</a></li>
        </ul>
      </div>

      <div class="col-span-1">
        <h4 class="text-white font-display font-bold mb-8 relative after:content-[''] after:absolute after:-bottom-3 after:left-0 after:w-8 after:h-1 after:bg-primary">Contact Info</h4>
        <ul class="space-y-4">
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
      <div class="flex items-center gap-6">
        <button (click)="openModal('privacy')" class="text-slate-500 hover:text-white transition-colors text-[11px] font-bold uppercase tracking-wider outline-none cursor-pointer">Privacy Policy</button>
        <button (click)="openModal('terms')" class="text-slate-500 hover:text-white transition-colors text-[11px] font-bold uppercase tracking-wider outline-none cursor-pointer">Terms of Service</button>
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
            {{ activeModal() === 'privacy' ? 'Privacy Policy' : 'Terms of Service' }}
          </h3>
        </div>
        <div class="p-8 overflow-y-auto max-h-[60vh] text-slate-600 space-y-6">
          @if (activeModal() === 'privacy') {
            <div class="space-y-4">
              <p class="font-bold">Last Updated: January 2024</p>
              <p>Welcome to Blucid Enterprise Inc. We are committed to protecting your privacy and ensuring your technical and commercial data is handled securely.</p>
              <h4 class="font-black text-secondary uppercase text-sm">1. Information Collection</h4>
              <p>We collect information necessary for trading and engineering services, including contact details, company information, and technical specifications provided for project sourcing.</p>
              <h4 class="font-black text-secondary uppercase text-sm">2. Data Usage</h4>
              <p>Your information is used solely to facilitate procurement, engineering support, and customer service. We do not sell or share your data for marketing purposes.</p>
              <h4 class="font-black text-secondary uppercase text-sm">3. Security</h4>
              <p>We implement robust security measures to protect your design plans and business communications from unauthorized access.</p>
            </div>
          } @else {
            <div class="space-y-4">
              <p class="font-bold">Last Updated: January 2024</p>
              <h4 class="font-black text-secondary uppercase text-sm">1. Service Scope</h4>
              <p>Blucid Enterprise Inc. provides trading and engineering services for manufacturing, industrial, and automotive sectors. Quotations are valid for 15 days unless specified.</p>
              <h4 class="font-black text-secondary uppercase text-sm">2. Technical Responsibility</h4>
              <p>While we provide engineering advice and solar system designs, local site verification and implementation safety are the responsibility of the client's registered engineers.</p>
              <h4 class="font-black text-secondary uppercase text-sm">3. Trading & Supply</h4>
              <p>All supplied components carry original manufacturer warranties. Blucid Enterprise Inc. facilitates warranty claims but is not liable for manufacturer-related defects.</p>
              <h4 class="font-black text-secondary uppercase text-sm">4. Intellectual Property</h4>
              <p>Engineering designs prepared by Blucid Enterprise Inc. remain our property until full payment is received and the project is formally handed over.</p>
            </div>
          }
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
export class Footer implements OnInit {
  private platformId = inject(PLATFORM_ID);
  currentYear = new Date().getFullYear();
  
  footerData = signal({
    description: 'Leading the way in sustainable energy solutions. We provide high-quality solar installations and electrical services for a brighter, greener future.',
    address: 'B1 L12, Cuervo II Rd, Real, Calamba, 4027 Laguna',
    phone: '(049) 520 5780',
    email: 'info@blucidinc.com',
    schedule: 'Mon - Fri: 8:00 AM - 5:00 PM',
    copyright: '© 2018 - 2026 Blucid Enterprise Inc. All rights reserved.'
  });

  activeModal = signal<'privacy' | 'terms' | null>(null);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const websiteData = localStorage.getItem('blucid_website_content');
      if (websiteData) {
        try {
          const parsed = JSON.parse(websiteData);
          if (parsed && parsed.footer) {
            this.footerData.set({
              ...this.footerData(),
              ...parsed.footer
            });
          }
        } catch { /* ignore */ }
      }
    }
  }

  openModal(type: 'privacy' | 'terms') {
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
