import {Component, signal, OnInit, inject, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {NgClass} from '@angular/common';
import {SeoService} from './seo';

@Component({
  selector: 'app-faq',
  imports: [MatIconModule, NgClass],
  template: `
    <section class="pt-20 pb-12 bg-slate-50 relative overflow-hidden">
      <!-- Banner Image -->
      <div class="absolute inset-0 z-0 opacity-20">
        <img [src]="pageData().bannerImage" alt="" class="w-full h-full object-cover">
      </div>
      <div class="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50 z-0"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 class="text-primary mb-6" style="font-family: Arial; font-size: 40px; font-weight: bold;">{{pageData().headerTitle}}</h1>
        <p class="text-slate-800 max-w-2xl mx-auto" style="font-size: 18px;">{{pageData().headerSubtitle}}</p>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="space-y-4">
          @for (item of pageData().questions; track item.q; let i = $index) {
            <div class="border border-slate-100 rounded-2xl overflow-hidden transition-all" [ngClass]="{'shadow-lg shadow-slate-100 border-primary/20': openIndex === i}">
              <button 
                (click)="toggle(i)"
                class="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
              >
                <span class="font-bold text-secondary">{{item.q}}</span>
                <mat-icon class="text-primary transition-transform duration-300" [style.transform]="openIndex === i ? 'rotate(180deg)' : 'rotate(0)'">
                  expand_more
                </mat-icon>
              </button>
              
              <div 
                class="px-6 overflow-hidden transition-all duration-300"
                [style.max-height]="openIndex === i ? '500px' : '0'"
                [style.padding-bottom]="openIndex === i ? '1.25rem' : '0'"
              >
                <p class="text-sm leading-relaxed" style="font-size: 16px; color: #000000;">
                  {{item.a}}
                </p>
              </div>
            </div>
          }
        </div>
        
        <div class="mt-16 p-8 rounded-3xl bg-blue-50 border border-blue-100 text-center">
          <h3 class="text-xl font-bold mb-2" style="color: #224064;">{{ pageData().ctaTitle || 'Still have questions?' }}</h3>
          <p class="mb-6" style="color: #000000; font-size: 18px;">{{ pageData().ctaDescription || "Can't find the answer you're looking for? Please chat to our friendly team." }}</p>
          <a [href]="'tel:' + pageData().ctaPhone" class="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-white font-bold hover:bg-primary-dark transition-all">
            Call Us Now
          </a>
        </div>
      </div>
    </section>
  `
})
export class FAQ implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private seo = inject(SeoService);

  pageData = signal({
    headerTitle: 'Frequently Asked Questions',
    headerSubtitle: 'Find answers to common questions',
    bannerImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop',
    questions: [
      { q: 'How much does a solar system cost?', a: 'The cost varies depending on your energy needs and the system size. We offer free assessments to provide an accurate quote.' },
      { q: 'Do you offer warranties?', a: 'Yes, all our solar panels come with a 25-year performance warranty and our workmanship is guaranteed for 5 years.' },
      { q: 'How long does installation take?', a: 'Most residential installations take 2-4 days, while commercial projects depend on the scale.' }
    ],
    ctaTitle: 'Still have questions?',
    ctaDescription: 'Can\'t find the answer you\'re looking for? Please chat to our friendly team.',
    ctaPhone: '0495205780'
  });

  ngOnInit() {
    this.seo.updateTags({
      title: 'Common Questions About Solar & Energy',
      description: 'Get answers to frequently asked questions about solar panel installation, costs, warranties, and electrical services in the Philippines.',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop',
      url: 'https://blucidenterprise.com/faq'
    });

    if (isPlatformBrowser(this.platformId)) {
      const websiteDraft = localStorage.getItem('blucid_website_draft');
      if (websiteDraft) {
        try {
          const parsed = JSON.parse(websiteDraft);
          if (parsed && parsed.faq) {
            this.pageData.set(parsed.faq);
          }
        } catch { /* ignore */ }
      } else {
        const websiteContent = localStorage.getItem('blucid_website_content');
        if (websiteContent) {
          try {
            const parsed = JSON.parse(websiteContent);
            if (parsed && parsed.faq) {
              this.pageData.set(parsed.faq);
            }
          } catch { /* ignore */ }
        }
      }
    }
  }
  openIndex: number | null = 0;

  faqs = [
    {
      q: 'How much can I save with a solar system?',
      a: 'Savings vary based on your energy consumption and system size, but most of our clients see a 50% to 85% reduction in their monthly electricity bills. In many cases, the system pays for itself within 3 to 5 years.'
    },
    {
      q: 'Do solar panels work on cloudy days?',
      a: 'Yes, solar panels still generate electricity on cloudy days, though at a lower efficiency than on bright sunny days. Our systems are designed to maximize energy capture even in less-than-ideal weather conditions.'
    },
    {
      q: 'What maintenance is required for solar panels?',
      a: 'Solar panels require very little maintenance. We recommend a professional cleaning twice a year and a routine inspection of the wiring and mounting every 1-2 years to ensure everything is operating at peak efficiency.'
    },
    {
      q: 'How long do solar panels last?',
      a: 'Most high-quality solar panels come with a 25-year performance warranty and can continue to generate electricity for 30 years or more.'
    },
    {
      q: 'What is a Volt Switch Panel?',
      a: 'A Volt Switch Panel is a specialized electrical control panel we design and install to manage the distribution of power between your solar system, the grid, and your building\'s electrical loads safely and efficiently.'
    },
    {
      q: 'Do you provide battery backup systems?',
      a: 'Yes, we provide high-capacity battery storage solutions that allow you to store excess solar energy generated during the day for use at night or during power outages.'
    }
  ];

  toggle(index: number) {
    this.openIndex = this.openIndex === index ? null : index;
  }
}
