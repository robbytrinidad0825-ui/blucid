import {Component, signal, OnInit, inject, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {SeoService} from './seo';

@Component({
  selector: 'app-about',
  imports: [MatIconModule],
  template: `
    <!-- Hero Section -->
    <section class="pt-20 pb-12 bg-slate-50 relative overflow-hidden">
      <div class="absolute inset-0 z-0 opacity-20">
        <img [src]="pageData().bannerImage" alt="" class="w-full h-full object-cover">
      </div>
      <div class="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50 z-0"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 mb-12">
        <h1 class="text-4xl lg:text-6xl font-display font-black text-primary mb-6">{{pageData().headerTitle}}</h1>
        <p class="text-slate-800 max-w-2xl mx-auto">{{pageData().headerSubtitle}}</p>
      </div>
    </section>

    <!-- Main Content Section -->
    <section class="py-24 bg-white overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="lg:grid lg:grid-cols-2 lg:gap-24 items-center">
            <div class="relative">
              <div class="absolute -top-10 -left-10 w-64 h-64 bg-blue-50 rounded-full -z-10"></div>
              <img src="https://lh3.googleusercontent.com/gps-cs-s/APNQkAFEo-Ggl3RPxZgZNK_R-rShBFJ_jXkQruAokVbSoJ4wPaYRyNGVCz6E_-QcgBVfWSm7MXh-s69PMZRX3om11PHSx8cbOCvO1znX3gMgKIt_YCrppY2wDfEMDrQWQx5DLMvRoUI=s680-w680-h510-rw" alt="Blucid Enterprise Solar Installation" class="rounded-[2.5rem] shadow-2xl hover:scale-[1.02] transition-transform duration-500" referrerpolicy="no-referrer">
              <div class="absolute -bottom-10 -right-10 bg-white p-8 rounded-3xl shadow-xl border border-slate-100 max-w-xs hidden sm:block">
                <p class="text-4xl font-display font-black text-primary mb-2">10+</p>
                <p class="text-secondary font-bold text-sm uppercase tracking-widest">Years of Excellence in Solar Energy</p>
              </div>
            </div>
            
            <div class="mt-20 lg:mt-0">
              <h4 class="text-primary font-bold uppercase tracking-[0.2em] text-sm mb-4">About Us</h4>
              <h1 class="text-4xl lg:text-6xl font-display font-black text-primary mb-8 leading-tight" [innerHTML]="highlightText(pageData().storyTitle || 'Pioneering Sustainable Energy In Laguna')"></h1>
              <div class="text-slate-600 text-lg leading-relaxed mb-8 space-y-4">
                <p>BLUCID ENTERPRISE INC. (formerly Blucid Enterprise) was established to be a trading & engineering provider for manufacturing, industrial, automotive, medical & other industries on their sourcing needs and aftermarket support.</p>
                <p>Our experience in power industry, such UPS manufacturing (uninterrupted power supply), and solar PV have been our core foundation to integrate power products and solutions.</p>
                <p>We also cater industrial and consumables supplies to satisfy our customers’ as one stop-shop business partner, expanded our offering of contract services from small to medium-sized construction and sub-contracting of electrical and telecoms projects.</p>
              </div>
              <div class="grid grid-cols-1 gap-6">
                <!-- Vision Card -->
                <div class="group p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-500">
                  <div class="flex items-start gap-5">
                    <div class="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
                      <mat-icon class="!text-3xl">visibility</mat-icon>
                    </div>
                    <div>
                      <h3 class="text-xl font-bold text-secondary mb-3">Our Vision</h3>
                      <p class="text-slate-800 text-sm leading-relaxed">{{pageData().vision}}</p>
                    </div>
                  </div>
                </div>
                
                <!-- Mission Card -->
                <div class="group p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-emerald-500/20 transition-all duration-500">
                  <div class="flex items-start gap-5">
                    <div class="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
                      <mat-icon class="!text-3xl">rocket_launch</mat-icon>
                    </div>
                    <div>
                      <h3 class="text-xl font-bold text-secondary mb-3">Our Mission</h3>
                      <p class="text-slate-800 text-sm leading-relaxed">{{pageData().mission}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    <!-- Values Section -->
    <section class="py-24 bg-slate-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl lg:text-5xl font-display font-black text-primary mb-6">Our Core Values</h2>
            <p class="text-slate-800 font-medium">Guiding principles behind our solar innovation.</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            @for (value of values; track value.title) {
              <div class="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col">
                <div class="w-14 h-14 rounded-2xl bg-primary/5 text-primary mb-6 flex items-center justify-center">
                  <mat-icon class="text-3xl">{{value.icon}}</mat-icon>
                </div>
                <h3 class="text-xl font-bold text-secondary mb-3">{{value.title}}</h3>
                <p class="text-slate-800 text-sm leading-relaxed flex-grow">{{value.desc}}</p>
              </div>
            }
          </div>
        </div>
      </section>
  `
})
export class About implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private seo = inject(SeoService);

  pageData = signal({
    headerTitle: 'About Us',
    headerSubtitle: 'Our story and mission to green energy',
    bannerImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop',
    mission: 'Recognize our customer needs and provide flexibility in sourcing, competitive prices, on-time deliveries and customized solutions for their unique needs. Ensure attentive, effective and proactive customer service and personalized attention to customers. Sustain our reputation as a reliable, professional, customer-oriented, dynamic player in the market. Continually build our skills and knowledge to meet the growing and diverse needs of customers. Continuously improve our business processes leading to prompt and efficient sales and after sales services. Achieve profitable growth, operational and organizational excellence without compromising from our values and business ethics.',
    vision: 'BLUCID aims to be the preferred partner in supplying products and services for manufacturing, industrial, automotive, medical & banking industries. Being the "preferred choice" both for customers, suppliers and employees.',
    storyTitle: 'Pioneering Sustainable Energy in Laguna',
    storyParagraph: 'Founded with a vision to make clean energy accessible to everyone, Blucid Enterprise Inc. has grown into a leading provider of solar solutions in Calamba and the surrounding regions.'
  });

  ngOnInit() {
    this.seo.updateTags({
      title: 'Our Story & Mission',
      description: 'Learn about Blucid Enterprise Inc., our mission to pioneer sustainable energy in Laguna, and our core values of customer focus and ethical practices.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop',
      url: 'https://blucidenterprise.com/about'
    });

    if (isPlatformBrowser(this.platformId)) {
      const websiteDraft = localStorage.getItem('blucid_website_draft');
      if (websiteDraft) {
        try {
          const parsed = JSON.parse(websiteDraft);
          if (parsed && parsed.about) {
            this.pageData.set(parsed.about);
          }
        } catch { /* ignore */ }
      } else {
        const websiteContent = localStorage.getItem('blucid_website_content');
        if (websiteContent) {
          try {
            const parsed = JSON.parse(websiteContent);
            if (parsed && parsed.about) {
              this.pageData.set(parsed.about);
            }
          } catch { /* ignore */ }
        }
      }
    }
  }

  highlightText(text: string) {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length > 0) {
      // Highlight middle or last word for visual flair
      const idx = words.length > 2 ? words.length - 2 : words.length - 1;
      words[idx] = `<span class="text-primary">${words[idx]}</span>`;
      return words.join(' ');
    }
    return text;
  }

  values = [
    { title: 'Customer Focused', icon: 'support_agent', desc: 'We are customer focused.' },
    { title: 'Ethical Practices', icon: 'gavel', desc: 'We uphold high standards of ethical practices.' },
    { title: 'Teamwork', icon: 'groups', desc: 'We cherish working together as a team.' },
    { title: 'Social Responsibility', icon: 'public', desc: 'We are socially responsible.' }
  ];
}
