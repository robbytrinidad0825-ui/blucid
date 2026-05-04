import {Component, inject, OnInit, signal, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {SeoService} from './seo';

interface ServiceItem { id: string; title: string; }
interface ProductItem { id: string; name: string; }

@Component({
  selector: 'app-contact',
  imports: [MatIconModule, ReactiveFormsModule],
  template: `
    <section class="pt-20 pb-12 bg-slate-50 relative overflow-hidden">
      <!-- Banner Image -->
      <div class="absolute inset-0 z-0 opacity-20">
        <img [src]="pageData().bannerImage" alt="" class="w-full h-full object-cover">
      </div>
      <div class="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50 z-0"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 class="mb-6 font-display" style="color: #224064; font-size: 40px; font-family: Arial; font-weight: bold;">{{pageData().headerTitle}}</h1>
        <p class="max-w-2xl mx-auto" style="color: #000000; font-size: 18px; font-family: Arial;">{{pageData().headerSubtitle}}</p>
      </div>
    </section>

    <section class="py-20 bg-white relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <!-- Contact Form Side -->
          <div class="relative">
            <div class="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl -z-10"></div>
            
            <h2 class="mb-3 tracking-tight" style="color: #224064; font-family: Arial; font-weight: bold; font-size: 32px;">
              {{ pageData().formTitle || 'Project Details' }}
            </h2>
            <p class="mb-10 text-lg leading-relaxed" style="color: #000000;">Fill out the form below and our specialists will provide a custom energy solution tailored to your site.</p>
            
            @if (submitted) {
              <div class="p-10 rounded-[2.5rem] bg-emerald-50 border border-emerald-100/50 text-center animate-in fade-in zoom-in-95 duration-700 shadow-2xl shadow-emerald-500/10">
                <div class="w-24 h-24 bg-emerald-500 text-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-emerald-500/30 rotate-3 transition-transform hover:rotate-0">
                  <mat-icon class="!w-12 !h-12 !text-[48px]">verified</mat-icon>
                </div>
                <h3 class="text-3xl font-display font-black text-secondary mb-4 leading-tight tracking-tight">Request Received!</h3>
                <p class="text-slate-800 mb-10 text-lg leading-relaxed">
                  Thank you for choosing <span class="text-primary font-bold">Blucid</span>. Your project details have been safely transmitted to our engineering team. We'll reach out within <span class="font-bold text-secondary">24 hours</span>.
                </p>
                <button (click)="submitted = false" class="w-full py-5 rounded-2xl bg-secondary text-white font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
                  Submit New Request
                </button>
              </div>
            } @else {
              <div class="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-2xl shadow-slate-200/50 p-8 sm:p-10">
                <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-7">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-7">
                    <!-- Name Input -->
                    <div class="space-y-1.5">
                      <label for="name" class="flex items-center gap-2 text-[10px] uppercase tracking-widest ml-1" style="color: #000000; font-family: Arial; font-weight: bold;">
                        <mat-icon class="!w-3 !h-3 !text-[12px]">person</mat-icon> Full Name
                      </label>
                      <div class="relative group">
                        <input id="name" type="text" formControlName="name" 
                          class="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-secondary focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all group-hover:border-slate-300 shadow-sm"
                          [class.border-rose-400]="contactForm.get('name')?.touched && contactForm.get('name')?.invalid"
                          placeholder="Ex: Juan Dela Cruz">
                        @if (contactForm.get('name')?.touched && contactForm.get('name')?.invalid) {
                          <div class="absolute right-4 top-1/2 -translate-y-1/2 text-rose-500 animate-in fade-in zoom-in">
                            <mat-icon class="!w-5 !h-5 !text-[20px]">error_outline</mat-icon>
                          </div>
                        }
                      </div>
                      @if (contactForm.get('name')?.touched && contactForm.get('name')?.invalid) {
                        <p class="text-rose-500 text-[10px] font-black uppercase tracking-widest select-none animate-in slide-in-from-top-1 ml-1">Identity validation failed</p>
                      }
                    </div>

                    <!-- Email Input -->
                    <div class="space-y-1.5">
                      <label for="email" class="flex items-center gap-2 text-[10px] uppercase tracking-widest ml-1" style="color: #000000; font-weight: bold; font-family: Arial;">
                        <mat-icon class="!w-3 !h-3 !text-[12px]">alternate_email</mat-icon> Email Address
                      </label>
                      <div class="relative group">
                        <input id="email" type="email" formControlName="email" 
                          class="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-secondary focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all group-hover:border-slate-300 shadow-sm"
                          [class.border-rose-400]="contactForm.get('email')?.touched && contactForm.get('email')?.invalid"
                          placeholder="yourname@email.com">
                        @if (contactForm.get('email')?.touched && contactForm.get('email')?.invalid) {
                          <div class="absolute right-4 top-1/2 -translate-y-1/2 text-rose-500 animate-in fade-in zoom-in">
                            <mat-icon class="!w-5 !h-5 !text-[20px]">error_outline</mat-icon>
                          </div>
                        }
                      </div>
                      @if (contactForm.get('email')?.touched && contactForm.get('email')?.invalid) {
                        <p class="text-rose-500 text-[10px] font-black uppercase tracking-widest select-none animate-in slide-in-from-top-1 ml-1">Enter valid electronic mail</p>
                      }
                    </div>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-7">
                    <!-- Phone Input -->
                    <div class="space-y-1.5">
                      <label for="phone" class="flex items-center gap-2 text-[10px] uppercase tracking-widest ml-1" style="color: #000000; font-weight: bold; font-family: Arial;">
                        <mat-icon class="!w-3 !h-3 !text-[12px]">call</mat-icon> Mobile Number
                      </label>
                      <div class="relative group">
                        <input id="phone" type="tel" formControlName="phone" 
                          class="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-secondary focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all group-hover:border-slate-300 shadow-sm"
                          [class.border-rose-400]="contactForm.get('phone')?.touched && contactForm.get('phone')?.invalid"
                          placeholder="09XX XXX XXXX">
                      </div>
                      @if (contactForm.get('phone')?.touched && contactForm.get('phone')?.invalid) {
                        <p class="text-rose-500 text-[10px] font-black uppercase tracking-widest select-none animate-in slide-in-from-top-1 ml-1">Active contact required</p>
                      }
                    </div>

                    <!-- Location Input -->
                    <div class="space-y-1.5">
                      <label for="location" class="flex items-center gap-2 text-[10px] uppercase tracking-widest ml-1" style="color: #000000; font-family: Arial; font-weight: bold;">
                        <mat-icon class="!w-3 !h-3 !text-[12px]">near_me</mat-icon> Site Location
                      </label>
                      <div class="relative group">
                        <input id="location" type="text" formControlName="location" 
                          class="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-secondary focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all group-hover:border-slate-300 shadow-sm"
                          [class.border-rose-400]="contactForm.get('location')?.touched && contactForm.get('location')?.invalid"
                          placeholder="City, Province">
                      </div>
                      @if (contactForm.get('location')?.touched && contactForm.get('location')?.invalid) {
                        <p class="text-rose-500 text-[10px] font-black uppercase tracking-widest select-none animate-in slide-in-from-top-1 ml-1">Site coordinate required</p>
                      }
                    </div>
                  </div>

                  <div class="space-y-1.5">
                    <label for="interest" class="flex items-center gap-2 text-[10px] uppercase tracking-widest ml-1" style="color: #000000; font-family: Arial; font-weight: bold;">
                      <mat-icon class="!w-3 !h-3 !text-[12px]">bolt</mat-icon> Project Category
                    </label>
                    <select id="interest" formControlName="interest" 
                      class="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-secondary focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all appearance-none cursor-pointer shadow-sm">
                      <optgroup label="Our Services">
                        @for (service of services(); track service.id) {
                          <option [value]="service.title">{{service.title}}</option>
                        }
                      </optgroup>
                      <optgroup label="Primary Products">
                        @for (product of products(); track product.id) {
                          <option [value]="product.name">{{product.name}}</option>
                        }
                      </optgroup>
                      <option value="Other">Other Strategic Inquiry</option>
                    </select>
                  </div>

                  <!-- Message Area -->
                  <div class="space-y-1.5">
                    <label for="message" class="flex items-center gap-2 text-[10px] uppercase tracking-widest ml-1" style="font-family: Arial; font-weight: bold; color: #000000;">
                      <mat-icon class="!w-3 !h-3 !text-[12px]">description</mat-icon> Detailed Requirements
                    </label>
                    <textarea id="message" formControlName="message" rows="5" 
                      class="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-secondary focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all group-hover:border-slate-300 shadow-sm resize-none"
                      [class.border-rose-400]="contactForm.get('message')?.touched && contactForm.get('message')?.invalid"
                      placeholder="Tell us about your energy patterns, roof material, or specific project deadlines..."></textarea>
                    @if (contactForm.get('message')?.touched && contactForm.get('message')?.invalid) {
                      <p class="text-rose-500 text-[10px] font-black uppercase tracking-widest select-none animate-in slide-in-from-top-1 ml-1">Manifest required documentation</p>
                    }
                  </div>

                  <button type="submit" 
                    [disabled]="contactForm.invalid" 
                    class="group relative w-full overflow-hidden rounded-[1.5rem] bg-primary py-6 font-black text-white shadow-2xl shadow-blue-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:grayscale disabled:scale-100 disabled:shadow-none">
                    <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span class="relative z-10 flex items-center justify-center gap-3 tracking-widest uppercase text-sm">
                      Submit Quote Parameters <mat-icon>arrow_forward</mat-icon>
                    </span>
                  </button>
                  <p class="text-center text-[10px] uppercase tracking-widest" style="font-weight: bold; font-family: Arial; color: #000000;">Secure transmission enabled</p>
                </form>
              </div>
            }
          </div>

          <!-- Info Side -->
          <div class="lg:pt-10" style="padding-top: 0px;">
            <h2 class="mb-3 tracking-tight" style="color: #224064; font-family: Arial; font-size: 32px; font-weight: bold;">
              {{ pageData().officeTitle || 'Our Office' }}
            </h2>
            <p class="mb-12 text-lg leading-relaxed" style="color: #000000;">Visit our technical center or connect via high-priority communication channels.</p>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 mb-12">
              <div class="group flex gap-6 p-6 rounded-3xl bg-slate-50/50 border border-slate-100 transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/40">
                <div class="w-14 h-14 rounded-2xl bg-white text-primary flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                  <mat-icon class="!w-7 !h-7 !text-[28px]">location_on</mat-icon>
                </div>
                <div>
                  <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">HQ Address</h4>
                  <p class="leading-relaxed" style="font-family: Arial; font-weight: bold;">{{pageData().address}}</p>
                </div>
              </div>
              
              <div class="group flex gap-6 p-6 rounded-3xl bg-slate-50/50 border border-slate-100 transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/40">
                <div class="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                  <mat-icon class="!w-7 !h-7 !text-[28px]">phone_iphone</mat-icon>
                </div>
                <div>
                  <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Direct Line</h4>
                  <p class="leading-relaxed" style="font-weight: bold; font-family: Arial;">{{pageData().phone}}</p>
                </div>
              </div>
              
              <div class="group flex gap-6 p-6 rounded-3xl bg-slate-50/50 border border-slate-100 transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/40">
                <div class="w-14 h-14 rounded-2xl bg-blue-50 text-primary flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                  <mat-icon class="!w-7 !h-7 !text-[28px]">alternate_email</mat-icon>
                </div>
                <div>
                  <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Email Protocol</h4>
                  <p class="leading-relaxed underline decoration-primary/30 underline-offset-4" style="font-weight: bold; font-family: Arial;">{{pageData().email}}</p>
                </div>
              </div>
              
              <div class="group flex gap-6 p-6 rounded-3xl bg-slate-50/50 border border-slate-100 transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/40">
                <div class="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                  <mat-icon class="!w-7 !h-7 !text-[28px]">more_time</mat-icon>
                </div>
                <div>
                  <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Operations</h4>
                  <p class="leading-relaxed" style="font-weight: bold; font-family: Arial;">{{ pageData().workingHours || 'MON to FRI at 8:00 AM - 5:00 PM' }}</p>
                </div>
              </div>
            </div>

            <div class="group h-80 rounded-[2.5rem] overflow-hidden border border-slate-200/60 shadow-inner bg-slate-100 relative">
              <div class="absolute inset-0 pointer-events-none z-10 border-[12px] border-white/40 rounded-[2.5rem]"></div>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3867.756204558455!2d121.1444!3d14.2111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd63f8e5e5e5e5%3A0x5e5e5e5e5e5e5e5e!2sReal%2C%20Calamba%2C%20Laguna!5e0!3m2!1sen!2sph!4v1620000000000!5m2!1sen!2sph" 
                width="100%" 
                height="100%" 
                style="border:0;" 
                allowfullscreen="" 
                loading="lazy"
                class="relative transition-opacity duration-700 group-hover:opacity-100 grayscale hover:grayscale-0 opacity-80"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class Contact implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private seo = inject(SeoService);

  pageData = signal({
    headerTitle: 'Get In Touch',
    headerSubtitle: 'We would love to hear from you',
    bannerImage: 'https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=2071&auto=format&fit=crop',
    address: 'B1 L12, Cuervo II Rd, Real, Calamba, 4027 Laguna',
    email: 'info@blucidinc.com',
    phone: '+(049) 520 5780',
    formTitle: 'Project Details',
    officeTitle: 'Our Office',
    workingHours: 'MON to FRI at 8:00 AM - 5:00 PM'
  });
  private route = inject(ActivatedRoute);
  submitted = false;

  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    interest: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required])
  });

  services = signal<ServiceItem[]>([]);
  products = signal<ProductItem[]>([]);

  ngOnInit() {
    this.seo.updateTags({
      title: 'Contact Us & Free Quote',
      description: 'Get a free quote for your solar and electrical projects in Laguna. Contact Blucid Enterprise Inc. for professional energy solutions and technical support.',
      image: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=2070&auto=format&fit=crop',
      url: 'https://blucidenterprise.com/contact'
    });

    if (isPlatformBrowser(this.platformId)) {
      const websiteDraft = localStorage.getItem('blucid_website_draft');
      if (websiteDraft) {
        try {
          const parsed = JSON.parse(websiteDraft);
          if (parsed && parsed.contact) {
            this.pageData.set(parsed.contact);
          }
        } catch { /* ignore */ }
      } else {
        const websiteContent = localStorage.getItem('blucid_website_content');
        if (websiteContent) {
          try {
            const parsed = JSON.parse(websiteContent);
            if (parsed && parsed.contact) {
              this.pageData.set(parsed.contact);
            }
          } catch { /* ignore */ }
        }
      }

      // Load Services
      const servicesStr = localStorage.getItem('blucid_services');
      if (servicesStr) {
        try {
          const s = JSON.parse(servicesStr);
          if (Array.isArray(s)) this.services.set(s);
        } catch { /* ignore */ }
      } else {
        // Fallback to default services if not set
        this.services.set([
          { id: 'electrical-works', title: 'Electrical Contracting' },
          { id: 'telecom-projects', title: 'Telecom Projects' },
          { id: 'solar-installation', title: 'Solar PV Systems' },
          { id: 'ups-systems', title: 'UPS Systems' },
          { id: 'air-conditioning', title: 'Air Conditioning Systems' },
          { id: 'construction-renovation', title: 'Construction & Renovation' }
        ]);
      }

      // Load Products
      const productsStr = localStorage.getItem('blucid_products');
      if (productsStr) {
        try {
          const p = JSON.parse(productsStr);
          if (Array.isArray(p)) this.products.set(p);
        } catch { /* ignore */ }
      } else {
        // Fallback to default products
        this.products.set([
          { id: 'blucid-mono-550w', name: 'Blucid 550W Mono-Crystalline Panel' },
          { id: 'industrial-ups-10kva', name: 'Industrial Double Conversion UPS (10kVA)' },
          { id: 'solar-water-purifier-sv120', name: 'Solar Water Purification SV-120' },
          { id: 'telecom-rectifier-system', name: 'Telecom DC Power Rectifier System' },
          { id: 'precision-industrial-aircon', name: 'Precision Industrial HVAC Unit' },
          { id: 'smart-distribution-panel-iot', name: 'Smart IoT Electrical Distribution Panel' }
        ]);
      }
    }

    this.route.queryParams.subscribe(params => {
      if (params['interest']) {
        this.contactForm.patchValue({ interest: params['interest'] });
      } else if (this.services().length > 0) {
        this.contactForm.patchValue({ interest: (this.services()[0] as ServiceItem).title });
      } else {
        this.contactForm.patchValue({ interest: 'Other' });
      }
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      if (isPlatformBrowser(this.platformId)) {
        const inquiriesStr = localStorage.getItem('blucid_inquiries') || '[]';
        try {
          const inquiries = JSON.parse(inquiriesStr);
          const newInquiry = {
            id: Date.now().toString(),
            customerName: this.contactForm.value.name,
            email: this.contactForm.value.email,
            phone: this.contactForm.value.phone,
            productName: this.contactForm.value.interest,
            message: this.contactForm.value.message,
            status: 'new',
            createdAt: new Date().toISOString()
          };
          inquiries.push(newInquiry);
          localStorage.setItem('blucid_inquiries', JSON.stringify(inquiries));
        } catch (e) {
          console.error('Error saving inquiry', e);
        }
      }
      this.submitted = true;
      this.contactForm.reset();
      // Set default interest if services exist
      if (this.services().length > 0) {
        this.contactForm.patchValue({ interest: (this.services()[0] as ServiceItem).title });
      } else {
        this.contactForm.patchValue({ interest: 'Other' });
      }
    }
  }
}
