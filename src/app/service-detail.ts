import {Component, inject, signal, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser, NgClass} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {Title, Meta} from '@angular/platform-browser';

interface ServiceFAQ {
  q: string;
  a: string;
}

interface ServiceBenefit {
  title: string;
  icon: string;
  desc: string;
}

interface ServiceStep {
  title: string;
  desc: string;
}

interface ServiceInfo {
  title: string;
  icon: string;
  image: string;
  longDescription: string;
  benefits: ServiceBenefit[];
  process: ServiceStep[];
  faqs: ServiceFAQ[];
}

@Component({
  selector: 'app-service-detail',
  imports: [MatIconModule, RouterLink, NgClass],
  template: `
    @if (service) {
      <section class="pt-20 pb-12 bg-slate-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <a routerLink="/services" class="inline-flex items-center text-sm font-bold text-primary hover:underline mb-8">
            <mat-icon class="mr-2">arrow_back</mat-icon>
            Back to Services
          </a>
          <div class="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div class="w-16 h-16 rounded-2xl bg-blue-100 text-primary flex items-center justify-center mb-6">
                <mat-icon class="text-3xl">{{service.icon}}</mat-icon>
              </div>
              <h1 class="text-4xl lg:text-6xl font-display font-black text-secondary mb-6">{{service.title}}</h1>
              <p class="text-lg text-slate-600 leading-relaxed mb-8">{{service.longDescription}}</p>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                @for (benefit of service.benefits; track benefit.title) {
                  <div class="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
                    <mat-icon class="text-primary mb-3">{{benefit.icon}}</mat-icon>
                    <h4 class="font-bold text-secondary mb-2">{{benefit.title}}</h4>
                    <p class="text-slate-500 text-sm">{{benefit.desc}}</p>
                  </div>
                }
              </div>
            </div>
            <div class="relative">
              <div class="absolute -inset-4 bg-primary/10 blur-3xl rounded-full"></div>
              <img [src]="service.image" [alt]="service.title" class="relative rounded-[3rem] shadow-2xl w-full object-cover aspect-[4/5]" referrerpolicy="no-referrer">
            </div>
          </div>
        </div>
      </section>

      <section class="py-24 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="lg:grid lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 class="text-3xl font-display font-black text-secondary mb-12">Our Step-by-Step Process</h2>
              <div class="space-y-0">
                @for (step of service.process; track step.title; let i = $index; let last = $last) {
                  <div class="flex gap-8 group">
                    <div class="flex flex-col items-center">
                      <div class="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-display font-black text-xl z-10 shadow-lg shadow-blue-100 group-hover:scale-110 transition-transform duration-300">
                        {{i + 1}}
                      </div>
                      @if (!last) {
                        <div class="w-0.5 h-full bg-slate-100 my-2 group-hover:bg-primary/30 transition-colors duration-500"></div>
                      }
                    </div>
                    <div class="pb-12">
                      <h3 class="text-xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors duration-300">{{step.title}}</h3>
                      <p class="text-slate-600 leading-relaxed">{{step.desc}}</p>
                    </div>
                  </div>
                }
              </div>
            </div>

            <div class="mt-20 lg:mt-0">
              <h2 class="text-3xl font-display font-black text-secondary mb-8">Service FAQs</h2>
              <div class="space-y-4">
                @for (faq of service.faqs; track faq.q; let i = $index) {
                  <div class="border border-slate-100 rounded-2xl overflow-hidden transition-all" [ngClass]="{'shadow-lg shadow-slate-100 border-primary/20': openFaqIndex() === i}">
                    <button 
                      (click)="toggleFaq(i)"
                      class="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                    >
                      <span class="font-bold text-secondary text-sm">{{faq.q}}</span>
                      <mat-icon class="text-primary transition-transform duration-300" [style.transform]="openFaqIndex() === i ? 'rotate(180deg)' : 'rotate(0)'">
                        expand_more
                      </mat-icon>
                    </button>
                    
                    <div 
                      class="px-6 overflow-hidden transition-all duration-300"
                      [style.max-height]="openFaqIndex() === i ? '300px' : '0'"
                      [style.padding-bottom]="openFaqIndex() === i ? '1rem' : '0'"
                    >
                      <p class="text-slate-600 text-sm leading-relaxed">
                        {{faq.a}}
                      </p>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-20 bg-secondary text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl lg:text-5xl font-display font-black mb-8">Ready to get started?</h2>
          <p class="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">Contact our experts today for a detailed consultation and customized quote for {{service.title}}.</p>
          <a [routerLink]="['/contact']" [queryParams]="{interest: service.title}" class="inline-flex items-center justify-center px-10 py-5 rounded-full bg-primary text-white font-bold hover:bg-primary-dark transition-all">
            Request a Quote
            <mat-icon class="ml-2">arrow_forward</mat-icon>
          </a>
        </div>
      </section>
    } @else {
      <div class="py-40 text-center">
        <h1 class="text-2xl font-bold text-secondary">Service not found</h1>
        <a routerLink="/services" class="text-primary font-bold hover:underline mt-4 inline-block">Return to Services</a>
      </div>
    }
  `
})
export class ServiceDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);
  
  serviceData: Record<string, ServiceInfo> = {
    'solar-installation': {
      title: 'Solar PV Systems',
      icon: 'solar_power',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyQctbPWABdXPJKsNvikAgQgGF8mU-tF2UDw&s',
      longDescription: 'Our comprehensive solar installation service is designed to provide you with a seamless transition to clean energy. We handle everything from initial site assessment to final grid connection, ensuring your system is optimized for the specific conditions of your property in Laguna.',
      benefits: [
        { title: 'Cost Savings', icon: 'payments', desc: 'Reduce your monthly electricity bills by up to 85%.' },
        { title: 'Eco-Friendly', icon: 'eco', desc: 'Significantly lower your carbon footprint.' },
        { title: 'Property Value', icon: 'trending_up', desc: 'Increase the market value of your home or business.' },
        { title: 'Energy Security', icon: 'security', desc: 'Protect yourself from rising utility costs.' }
      ],
      process: [
        { title: 'Consultation & Site Audit', desc: 'We visit your property to analyze roof orientation, shading, and energy needs.' },
        { title: 'Custom Engineering', desc: 'Our engineers design a system tailored to your specific energy profile and budget.' },
        { title: 'Professional Installation', desc: 'Our certified team installs the panels, inverters, and mounting hardware with precision.' },
        { title: 'Testing & Commissioning', desc: 'We rigorously test the system before connecting it to the grid and handing it over.' }
      ],
      faqs: [
        { q: 'How long does a typical installation take?', a: 'Most residential installations are completed within 2-3 days, while larger commercial projects can take 1-2 weeks.' },
        { q: 'Will I still have power during an outage?', a: 'Standard grid-tied systems shut down during outages for safety. To have power during an outage, you\'ll need a battery backup system.' }
      ]
    },
    'electrical-works': {
      title: 'Electrical Contracting',
      icon: 'electrical_services',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7_lL0dV4xZPt7GKHfcPdbajtWNEDqsK-VJw&s',
      longDescription: 'Expert contracting and sub-contracting for all types of electrical installations and wiring. We guarantee safety, compliance, and optimized performance for all projects.',
      benefits: [
        { title: 'Safety First', icon: 'verified_user', desc: 'All wiring is exactly to code.' },
        { title: 'Turnkey Solution', icon: 'bolt', desc: 'Everything from mapping to final approval.' }
      ],
      process: [
        { title: 'Load Analysis', desc: 'Calculate energy demands and map layout.' },
        { title: 'Installation Phase', desc: 'Secure, organized, and properly labeled deployment.' }
      ],
      faqs: [
        { q: 'Do you handle the permits?', a: 'Yes, we take care of all local permits.' }
      ]
    },
    'telecom-projects': {
      title: 'Telecom Projects',
      icon: 'cell_tower',
      image: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=2000',
      longDescription: 'Comprehensive telecommunication installations including pole erection, fiber optic cable laying & fixing, cable splicing, and battery/rectifier installation.',
      benefits: [
        { title: 'High Bandwidth', icon: 'network_check', desc: 'State of the art fiber optic splicing.' },
        { title: 'Robust Backbone', icon: 'hub', desc: 'End-to-end reliable telecom infrastructure.' }
      ],
      process: [
        { title: 'Site Survey', desc: 'Determine the best layouts for telecom poles and lines.' },
        { title: 'Execution', desc: 'Laying cable, splicing, and final load tests.' }
      ],
      faqs: [
        { q: 'Do you provide maintenance?', a: 'Yes, full maintenance is available for existing networks.' }
      ]
    },
    'ups-systems': {
      title: 'UPS Systems',
      icon: 'battery_saver',
      image: 'https://roadtrek.com.au/wp-content/uploads/2022/11/web-IMG_8873-1024x819.jpg',
      longDescription: 'Reliable Uninterruptible Power Supply (UPS) supply, installation, and maintenance to avoid any downtime for critical equipment during grid failure.',
      benefits: [
        { title: 'Zero Downtime', icon: 'timer', desc: 'Instant active backup power.' },
        { title: 'Protection', icon: 'security', desc: 'Surge and spike protection for your devices.' }
      ],
      process: [
        { title: 'Load Calculation', desc: 'Determine required standard capacity.' },
        { title: 'Hardware Setup', desc: 'Rack mounting, wiring, and synthetic load testing.' }
      ],
      faqs: [
        { q: 'What is the battery lifespan?', a: 'Depending on the model, it can last 3-6 years.' }
      ]
    },
    'air-conditioning': {
      title: 'Air Conditioning Systems',
      icon: 'ac_unit',
      image: 'https://images.unsplash.com/photo-1595166258077-8fa0663db6c1?q=80&w=2000',
      longDescription: 'Complete supply, installation, and maintenance of advanced Air Conditioning systems, ensuring optimal climate control and efficiency.',
      benefits: [
        { title: 'Energy Efficiency', icon: 'eco', desc: 'Using advanced inverter compressor systems.' },
        { title: 'Comfort', icon: 'ac_unit', desc: 'Perfectly balanced climate at your fingertips.' }
      ],
      process: [
        { title: 'Layout Design', desc: 'Determine unit placements and capacity.' },
        { title: 'Installation & Maintenance', desc: 'Quick installation and regular cleaning schedules.' }
      ],
      faqs: [
        { q: 'Do you fix existing setups?', a: 'Yes, we have full diagnostic and repair capabilities.' }
      ]
    },
    'construction-renovation': {
      title: 'Construction & Renovation',
      icon: 'architecture',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000',
      longDescription: 'Reliable execution of small and medium-sized construction projects, along with renovation services tailored space modifications.',
      benefits: [
        { title: 'Quality Craftsmanship', icon: 'handyman', desc: 'Impeccable details and durable building techniques.' },
        { title: 'Schedule Adherence', icon: 'event', desc: 'Strict timeline management for on-time delivery.' }
      ],
      process: [
        { title: 'Blueprint and Permits', desc: 'Finalize plans and acquire required docs.' },
        { title: 'Building Phase', desc: 'Manage trades, construction, and inspections.' }
      ],
      faqs: [
        { q: 'Is it turnkey?', a: 'Yes, we handle everything from conception to handover.' }
      ]
    }
  };

  openFaqIndex = signal<number | null>(0);
  private platformId = inject(PLATFORM_ID);

  get service() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return null;
    
    if (isPlatformBrowser(this.platformId)) {
        const websiteDraft = localStorage.getItem('blucid_website_draft');
        if (websiteDraft) {
            try {
                const parsed = JSON.parse(websiteDraft);
                if (parsed?.services?.serviceDetails?.[id]) {
                    return parsed.services.serviceDetails[id];
                }
            } catch { /* ignore */ }
        }
        
        const websiteContent = localStorage.getItem('blucid_website_content');
        if (websiteContent) {
           try {
               const parsed = JSON.parse(websiteContent);
               if (parsed?.services?.serviceDetails?.[id]) {
                   return parsed.services.serviceDetails[id];
               }
           } catch { /* ignore */ }
        }
    }
    
    return this.serviceData[id] || null;
  }

  ngOnInit() {
    this.route.params.subscribe(() => {
      const service = this.service;
      if (service) {
        const pageTitle = `${service.title} | Blucid Enterprise`;
        this.title.setTitle(pageTitle);
        this.meta.updateTag({ name: 'description', content: service.longDescription });
        this.meta.updateTag({ property: 'og:title', content: pageTitle });
        this.meta.updateTag({ property: 'og:description', content: service.longDescription });
        this.meta.updateTag({ property: 'og:image', content: service.image });
      }
    });
  }

  toggleFaq(index: number) {
    this.openFaqIndex.update(current => current === index ? null : index);
  }
}
