import {Component, signal, OnInit, inject, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

import {RouterLink} from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-services',
  imports: [MatIconModule, RouterLink],
  template: `
    <section class="pt-20 pb-12 bg-slate-50 relative overflow-hidden">
      <!-- Banner Image -->
      <div class="absolute inset-0 z-0 opacity-20">
        <img [src]="pageData().bannerImage" alt="" class="w-full h-full object-cover">
      </div>
      <div class="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50 z-0"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 class="text-4xl lg:text-6xl font-display font-black text-secondary mb-6">{{pageData().headerTitle}}</h1>
        <p class="text-slate-600 max-w-2xl mx-auto">{{pageData().headerSubtitle}}</p>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (service of services(); track service.id) {
            <div class="group relative p-8 rounded-3xl border border-slate-100 bg-white hover:border-primary/20 hover:shadow-2xl hover:shadow-blue-100 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500 flex flex-col overflow-hidden">
              <!-- Subtle Color Overlay -->
              <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              
              <div class="relative z-10 w-16 h-16 rounded-2xl bg-blue-50 text-primary flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white group-hover:rotate-6 transition-all duration-500">
                <mat-icon class="text-3xl">{{service.icon}}</mat-icon>
              </div>
              <h3 class="relative z-10 text-2xl font-bold text-secondary mb-4 group-hover:text-primary transition-colors duration-300">{{service.title}}</h3>
              <p class="relative z-10 text-slate-600 leading-relaxed mb-6 flex-grow">{{service.description}}</p>
              <ul class="relative z-10 space-y-3 mb-8">
                @for (item of service.features; track item) {
                  <li class="flex items-center gap-3 text-sm text-slate-500">
                    <mat-icon class="text-primary text-sm group-hover:scale-110 transition-transform">check_circle</mat-icon>
                    {{item}}
                  </li>
                }
              </ul>
              <a [routerLink]="['/services', service.id]" class="relative z-10 inline-flex items-center text-primary font-bold hover:gap-2 transition-all">
                Learn More
                <mat-icon class="ml-1 text-sm">arrow_forward</mat-icon>
              </a>
            </div>
          }
        </div>
      </div>
    </section>

    <section class="py-24 bg-secondary text-white overflow-hidden relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="lg:grid lg:grid-cols-2 lg:gap-20 items-center">
          <div>
            <h2 class="text-3xl lg:text-5xl font-display font-black mb-8">{{ pageData().secondaryTitle || 'Custom Wiring & Installation' }}</h2>
            <p class="text-slate-400 text-lg mb-10 leading-relaxed">
              {{ pageData().secondaryDescription || "Beyond solar panels, we specialize in complete wiring installation setups. Whether it's a new building or a retrofit, our team ensures your electrical infrastructure is robust, safe, and ready for high-efficiency energy." }}
            </p>
            <div class="space-y-6">
              <div class="flex gap-6">
                <div class="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <mat-icon>settings_input_component</mat-icon>
                </div>
                <div>
                  <h4 class="text-xl font-bold mb-2">Volt Switch Panels</h4>
                  <p class="text-slate-400 text-sm">Advanced control panels for precise energy management and distribution.</p>
                </div>
              </div>
              <div class="flex gap-6">
                <div class="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <mat-icon>battery_charging_full</mat-icon>
                </div>
                <div>
                  <h4 class="text-xl font-bold mb-2">Battery Storage Solutions</h4>
                  <p class="text-slate-400 text-sm">High-capacity battery banks to store your solar energy for night use or backup.</p>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-16 lg:mt-0 relative">
            <div class="absolute -inset-4 bg-primary/20 blur-3xl rounded-full"></div>
            <img src="https://cdn.shopify.com/s/files/1/0011/4102/files/photovoltaics-systems-failures_1_large.jpg?v=1532130633" alt="Electrical Wiring Setup" class="relative rounded-3xl shadow-2xl" referrerpolicy="no-referrer">
          </div>
        </div>
      </div>
    </section>
  `
})
export class Services implements OnInit {
  private platformId = inject(PLATFORM_ID);

  pageData = signal({
    headerTitle: 'Our Services',
    headerSubtitle: 'Comprehensive solutions for every need',
    bannerImage: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=2070&auto=format&fit=crop',
    secondaryTitle: 'Custom Wiring & Installation',
    secondaryDescription: 'Beyond solar panels, we specialize in complete wiring installation setups. Whether it\'s a new building or a retrofit, our team ensures your electrical infrastructure is robust, safe, and ready for high-efficiency energy.'
  });

  services = signal([
    {
      id: 'electrical-works',
      title: 'Electrical Contracting',
      icon: 'electrical_services',
      description: 'Expert contracting and sub-contracting for all types of electrical installations and wiring.',
      features: ['High-voltage wiring', 'Commercial electrical setups', 'Residential wiring', 'Safety audits']
    },
    {
      id: 'telecom-projects',
      title: 'Telecom Projects',
      icon: 'cell_tower',
      description: 'Comprehensive telecommunication installations including fiber optics and cell structures.',
      features: ['Pole erection', 'Fiber optic cable laying & fixing', 'Cable splicing', 'Batteries & Rectifier installation']
    },
    {
      id: 'solar-installation',
      title: 'Solar PV Systems',
      icon: 'solar_power',
      description: 'Design, supply, and installation of Solar PV Systems for residential, commercial, and industrial.',
      features: ['Site assessment', 'Custom system design', 'Professional mounting', 'Grid integration']
    },
    {
      id: 'ups-systems',
      title: 'UPS Systems',
      icon: 'battery_saver',
      description: 'Reliable Uninterruptible Power Supply (UPS) supply, installation, and maintenance.',
      features: ['UPS sizing & supply', 'Professional installation', 'Battery replacement', 'Preventive maintenance']
    },
    {
      id: 'air-conditioning',
      title: 'Air Conditioning Systems',
      icon: 'ac_unit',
      description: 'Supply, installation, and maintenance of advanced Air Conditioning systems.',
      features: ['System sizing', 'Commercial & residential units', 'Regular maintenance', 'Emergency repair']
    },
    {
      id: 'construction-renovation',
      title: 'Construction & Renovation',
      icon: 'architecture',
      description: 'Small and medium-sized construction projects and professional renovation services.',
      features: ['Project management', 'Building renovations', 'Medium-scale construction', 'Turnkey solutions']
    }
  ]);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const websiteDraft = localStorage.getItem('blucid_website_draft');
      if (websiteDraft) {
        try {
          const parsed = JSON.parse(websiteDraft);
          if (parsed && parsed.services) {
            this.pageData.set(parsed.services);
          }
        } catch { /* ignore */ }
      } else {
        const websiteContent = localStorage.getItem('blucid_website_content');
        if (websiteContent) {
          try {
            const parsed = JSON.parse(websiteContent);
            if (parsed && parsed.services) {
              this.pageData.set(parsed.services);
            }
          } catch { /* ignore */ }
        }
      }

      const servicesStr = localStorage.getItem('blucid_services');
      if (servicesStr) {
        try {
          const s = JSON.parse(servicesStr);
          if (Array.isArray(s) && s.length > 0) {
            this.services.set(s);
          }
        } catch { /* ignore */ }
      }
    }
  }
}
