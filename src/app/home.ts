import {Component, signal, OnInit, OnDestroy, PLATFORM_ID, inject, computed} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {SeoService} from './seo';
import {WebsiteDataService} from './website-data';

@Component({
  selector: 'app-home',
  imports: [MatIconModule, RouterLink, FormsModule],
  template: `
    <!-- Hero Section -->
    <section class="relative bg-white overflow-hidden pb-20 lg:pb-32" style="padding-top: 70px;">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center" style="padding-top: 0px;">
          <!-- 1st Grid: Text Content -->
          <div class="animate-fade-in text-center lg:text-left">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-display font-black text-primary leading-[1.1] tracking-tight mb-6">
              {{ homeData().heroTitle }}
            </h1>
            
            <p class="text-lg leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0" style="color: #000000;">
              {{ homeData().heroSubtitle }}
            </p>

            <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
              <a routerLink="/contact" class="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 rounded-full bg-primary text-white font-bold shadow-lg shadow-primary/30 hover:bg-primary-dark hover:-translate-y-0.5 active:scale-95 transition-all duration-300">
                Get a Free Quote
              </a>
              <a routerLink="/portfolio" class="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 rounded-full bg-white text-primary font-bold border-2 border-primary/20 hover:border-primary transition-all active:scale-95 cursor-pointer">
                Our Portfolio
              </a>
            </div>

            <!-- Trust Indicator (Google Style) -->
            <div class="flex items-center justify-center lg:justify-start gap-4">
              <div class="flex items-center justify-center w-6 h-6 bg-white shadow-sm border border-slate-100 rounded-sm">
                <svg viewBox="0 0 24 24" class="w-4 h-4">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              <div class="flex text-amber-400">
                <mat-icon class="!text-[20px] !w-[20px] !h-[20px]">star</mat-icon>
                <mat-icon class="!text-[20px] !w-[20px] !h-[20px]">star</mat-icon>
                <mat-icon class="!text-[20px] !w-[20px] !h-[20px]">star</mat-icon>
                <mat-icon class="!text-[20px] !w-[20px] !h-[20px]">star</mat-icon>
                <mat-icon class="!text-[20px] !w-[20px] !h-[20px]">star_half</mat-icon>
              </div>
              <span class="text-sm font-medium" style="color: #224064;">4.9 stars | 9 reviews</span>
            </div>
          </div>

          <!-- 2nd Grid: Hero Image Section -->
          <div class="relative hidden md:block">
            <div class="relative group h-full">
              <!-- Carousel Frame -->
              <div class="relative rounded-[500px] overflow-hidden shadow-2xl bg-slate-100 aspect-[4/3] isolate border-4 border-white">
                <div class="relative h-full w-full">
                  @for (img of (homeData().heroImages || []); track img; let hi = $index) {
                    <div 
                       class="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out"
                       [class.opacity-100]="currentHeroIndex() === hi"
                       [class.opacity-0]="currentHeroIndex() !== hi"
                    >
                      <img [src]="img" [alt]="'Solar Installation ' + (hi + 1)" class="w-full h-full object-cover select-none" referrerpolicy="no-referrer">
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Promotional Feature Section -->
    <section class="py-20 md:py-32 relative overflow-hidden bg-white text-secondary isolate">
      <!-- Atmospheric Gradient Background -->
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-white to-white -z-20"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          
          <!-- Content Left -->
          <div class="lg:col-span-5 mb-16 lg:mb-0 relative z-10">
            <div class="inline-flex items-center px-4 py-2 rounded-full border border-slate-100 uppercase tracking-[0.2em] text-[10px] font-bold mb-6 md:mb-10 text-slate-500 bg-slate-50 backdrop-blur-md shadow-sm" style="color: #224064;">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-400 mr-3 animate-pulse"></span>
              Promotional Feature
            </div>
            
            <h2 class="mb-8 leading-[1.1] tracking-tight text-primary text-center lg:text-left" style="font-family: Arial; font-size: 40px; font-weight: bold;">
              {{ homeData().videoTitle || 'Experience the Power of the Sun' }}
            </h2>
            
            <p class="text-base md:text-lg leading-relaxed mb-12 font-light text-center lg:text-left" style="color: #000000;">
              {{ homeData().videoDescription || 'Watch how Blucid Enterprise transforms homes and businesses with sustainable energy. Our integrated solar solutions provide reliable, cost-effective power while reducing your carbon footprint. Join the green revolution today and secure your energy future.' }}
            </p>
            
            <div class="flex items-center justify-center lg:justify-start gap-8 md:gap-12 border-t border-slate-100 pt-8 mt-12">
              @for (stat of homeData().videoStats; track stat.label) {
                <div class="flex flex-col">
                  <span class="text-4xl font-display font-light text-secondary mb-2">{{stat.value}}</span>
                  <span class="text-[10px] font-sans uppercase tracking-widest" style="color: #224064;">{{stat.label}}</span>
                </div>
              }
            </div>
          </div>
          
          <!-- Video Right -->
          <div class="lg:col-span-7 relative">
            <div class="relative w-full aspect-[4/3] lg:aspect-video rounded-[32px] overflow-hidden shadow-2xl isolate border border-slate-100 group bg-slate-50">
              <video 
                [muted]="isMuted()" 
                loop 
                playsinline 
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-105"
              >
                <source [src]="homeData().videoUrl" type="video/mp4">
              </video>
              
              <!-- Subtle inner shadow to blend edges -->
              <div class="absolute inset-0 rounded-[32px] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)] pointer-events-none"></div>

              <!-- Sleek Mute Toggle -->
              <button 
                (click)="toggleMute()"
                class="absolute bottom-6 right-6 z-20 w-12 h-12 rounded-full bg-white/40 backdrop-blur-md border border-slate-200 text-slate-900 flex items-center justify-center hover:bg-white hover:text-black hover:scale-105 transition-all duration-300"
              >
                <mat-icon class="!text-[20px]">{{ isMuted() ? 'volume_off' : 'volume_up' }}</mat-icon>
              </button>
            </div>
            
            <!-- Atmospheric Blur behind the video -->
            <div class="absolute inset-0 -z-10 bg-primary/10 blur-[80px] transform rotate-[-5deg] scale-105"></div>
          </div>
          
        </div>
      </div>
    </section>


    <!-- Features Section -->
    <section class="py-16 md:py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-primary mb-6" style="text-align: center; font-family: Arial; font-weight: bold; font-size: 40px;">{{ homeData().featuresTitle }}</h2>
          <p style="font-size: 18px; color: #000000;">{{ homeData().featuresSubtitle }}</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          @for (feat of homeData().features; track feat.title) {
            <div class="p-8 rounded-3xl bg-slate-50 hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 group">
              <div class="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <mat-icon>{{feat.icon}}</mat-icon>
              </div>
              <h3 class="text-xl font-bold text-secondary mb-4">{{feat.title}}</h3>
              <p class="leading-relaxed" style="color: #000000; font-size: 16px;">{{feat.desc}}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Expertise Section -->
    @if (homeData().businessNatures && homeData().businessNatures.length > 0) {
    <section class="py-16 md:py-24 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div class="max-w-2xl text-center md:text-left">
            <h4 class="text-primary font-bold uppercase tracking-widest text-xs mb-4">Enterprise Capabilities</h4>
            <h2 class="text-primary leading-tight" style="font-family: Arial; font-weight: bold; font-size: 40px;">
              {{ homeData().businessNaturesTitle }}
            </h2>
            <p class="mt-4" style="font-size: 18px; font-family: Arial; font-weight: normal; color: #000000;">{{ homeData().businessNaturesSubtitle }}</p>
          </div>
          <button (click)="isExpertiseExpanded.set(!isExpertiseExpanded())" 
                  class="flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-primary/20 text-primary font-bold hover:bg-primary hover:text-white transition-all shadow-md active:scale-95 group">
            <span>{{ isExpertiseExpanded() ? 'Show Less' : 'Explore All Fields' }}</span>
            <mat-icon class="transition-transform duration-300" [class.rotate-180]="isExpertiseExpanded()">
              keyboard_arrow_down
            </mat-icon>
          </button>
        </div>

        @if (isExpertiseExpanded()) {
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            @for (nature of homeData().businessNatures; track nature.title) {
              <div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div class="flex items-center justify-between mb-6">
                  <div class="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <mat-icon class="!text-3xl">{{ nature.icon }}</mat-icon>
                  </div>
                  <span class="text-[10px] font-black uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full" style="color: #224064;">{{ nature.category }}</span>
                </div>
                <h3 class="text-xl font-bold text-secondary mb-4">{{ nature.title }}</h3>
                <p class="leading-relaxed opacity-80" style="color: #000000; font-size: 16px;">{{ nature.desc }}</p>
              </div>
            }
          </div>
        } @else {
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            @for (nature of homeData().businessNatures.slice(0, 3); track nature.title) {
              <div class="bg-white/60 backdrop-blur-sm p-6 rounded-3xl border border-slate-100 hover:bg-white transition-all">
                <div class="flex items-center gap-4 mb-4">
                  <div class="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                    <mat-icon class="!text-xl">{{ nature.icon }}</mat-icon>
                  </div>
                  <h3 class="text-base font-bold text-secondary">{{ nature.title }}</h3>
                </div>
                <p class="line-clamp-2 opacity-60" style="color: #000000; font-size: 16px;">{{ nature.desc }}</p>
              </div>
            }
          </div>
        }
      </div>
    </section>
    }

    <!-- CTA Section -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-secondary rounded-[3rem] overflow-hidden relative">
          <div class="absolute top-0 right-0 w-1/2 h-full bg-primary/10 skew-x-12 translate-x-1/4"></div>
          <div class="px-8 py-16 lg:p-20 relative z-10 text-center lg:text-left lg:flex lg:items-center lg:justify-between">
            <div class="lg:max-w-2xl">
              <h2 class="text-3xl lg:text-5xl font-display font-black text-white mb-6">{{homeData().ctaTitle}}</h2>
              <p class="text-white text-lg">{{homeData().ctaSubtitle}}</p>
            </div>
            <div class="mt-10 lg:mt-0">
              <a routerLink="/contact" class="inline-flex items-center justify-center px-10 py-5 rounded-full bg-primary text-white font-bold shadow-2xl shadow-blue-900/20 hover:bg-primary-dark hover:scale-105 transition-all">
                {{homeData().ctaButtonText}}
                <mat-icon class="ml-2">lightbulb</mat-icon>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section id="testimonials" class="py-16 md:py-24 bg-slate-50 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div class="max-w-2xl text-center md:text-left">
            <h4 class="text-primary font-bold uppercase tracking-widest text-xs mb-4">{{homeData().testimonialsTitle}}</h4>
            <h2 class="text-primary leading-tight" style="font-size: 40px; font-family: Arial; font-weight: bold;">
              {{ homeData().testimonialsSubtitle }}
            </h2>
          </div>
          <div class="flex flex-col items-center md:items-end gap-2">
            <div class="flex items-center gap-3">
              <p class="text-2xl font-display font-black text-secondary">4.9/5</p>
              <div class="flex text-amber-400">
                <mat-icon>star</mat-icon>
                <mat-icon>star</mat-icon>
                <mat-icon>star</mat-icon>
                <mat-icon>star</mat-icon>
                <mat-icon>star</mat-icon>
              </div>
            </div>
            <p class="text-xs text-slate-800 uppercase font-bold tracking-widest">Average Rating</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          @for (testimonial of homeData().testimonials; track testimonial.name) {
            <div class="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-500 group">
              <div class="flex text-amber-400 mb-6">
                @for (star of [1,2,3,4,5]; track star) {
                  <mat-icon class="text-sm">star</mat-icon>
                }
              </div>
              <p class="mb-8 flex-grow leading-relaxed" style="color: #000000;">"{{testimonial.quote}}"</p>
              <div class="flex items-center gap-4">
                <img [src]="testimonial.image" [alt]="testimonial.name" class="w-12 h-12 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" referrerpolicy="no-referrer">
                <div>
                  <h4 class="font-bold text-secondary text-sm">{{testimonial.name}}</h4>
                  <p class="text-xs text-slate-800">{{testimonial.role}}</p>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `
})


export class Home implements OnInit, OnDestroy {
  private websiteService = inject(WebsiteDataService);
  private platformId = inject(PLATFORM_ID);
  private seo = inject(SeoService);
  
  homeData = computed(() => this.websiteService.data().home);

  currentHeroIndex = signal(0);
  isExpertiseExpanded = signal(false);
  private heroInterval: ReturnType<typeof setInterval> | undefined;

  nextHero() {
    if (this.homeData().heroImages && this.homeData().heroImages.length > 0) {
      this.currentHeroIndex.update(i => (i + 1) % this.homeData().heroImages.length);
    }
  }

  prevHero() {
    if (this.homeData().heroImages && this.homeData().heroImages.length > 0) {
      this.currentHeroIndex.update(i => (i - 1 + this.homeData().heroImages.length) % this.homeData().heroImages.length);
    }
  }

  // Calculator Signals
  billAmount = signal<number>(5000);
  kilowattPrice = signal<number>(12); // PHP per kWh
  roofArea = signal<number>(50); // sqm

  solarCalculations = computed(() => {
    const monthlyBill = this.billAmount();
    const rate = this.kilowattPrice();
    const monthlyUsage = monthlyBill / (rate || 1);
    
    // Assumed production: 1kW system produces roughly 120kWh per month in PH
    // In PH, 1kWp on average produces 3.5 to 4.5 kWh/day. 4 * 30 = 120kWh/month.
    const systemSizeNeeded = parseFloat((monthlyUsage / 120).toFixed(1));
    
    // Estimated Cost: Larger systems have lower cost per kW.
    // 1-3kW: ~75k-85k/kW
    // 3-5kW: ~65k-75k/kW
    // 5kW+: ~60k-65k/kW
    let costPerKW = 80000;
    if (systemSizeNeeded >= 3) costPerKW = 70000;
    if (systemSizeNeeded >= 5) costPerKW = 62000;
    if (systemSizeNeeded >= 10) costPerKW = 58000;

    const estimatedCost = systemSizeNeeded * costPerKW;
    const monthlySavings = monthlyUsage * rate; 
    const yearlySavings = monthlySavings * 12;
    const lifetimeSavings = yearlySavings * 25; // 25 year panel warranty life
    
    const paybackYears = estimatedCost / (yearlySavings + 0.001);
    
    // Environmental Impact
    // 1kWh solar saves approx 0.7kg CO2 in PH grid mix
    const yearlyCO2Saved = (monthlyUsage * 12) * 0.7; 
    const treesEquivalent = yearlyCO2Saved / 20; // 1 tree handles ~20kg/year
    
    return {
      monthlyUsage,
      systemSizeNeeded: Math.max(systemSizeNeeded, 1), // Minimum 1kWp
      estimatedCost,
      monthlySavings,
      yearlySavings,
      lifetimeSavings,
      paybackYears: parseFloat(paybackYears.toFixed(1)),
      co2Saved: yearlyCO2Saved,
      trees: Math.floor(treesEquivalent)
    };
  });

  ngOnInit() {
    this.seo.updateTags({
      title: 'Solar Energy Solutions & Electrical Engineering in Laguna',
      description: 'Blucid Enterprise Inc. is a leading provider of sustainable energy solutions, high-quality solar installations, and electrical services in Laguna, Philippines.',
      image: (this.homeData().heroImages && this.homeData().heroImages.length > 0) ? this.homeData().heroImages[0] : 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2072&auto=format&fit=crop',
      url: 'https://blucidentinc.com'
    });

    if (isPlatformBrowser(this.platformId)) {
      // Auto-play timer for hero
      this.heroInterval = setInterval(() => this.nextHero(), 8000);
      
      // Look for temporary preview from admin
      const draft = this.websiteService.loadDraft();
      if (draft && draft.home) {
        // Here we just use the draft if it exists. In a real app we might want to 
        // merge or handle this differently, but for now we follow the existing pattern.
        // For simplicity let's assume the service handles the main source of truth.
      }
    }
  }

  ngOnDestroy() {
    if (this.heroInterval) {
      clearInterval(this.heroInterval);
    }
  }

  brandLogos = [];

  testimonials = [];

  isMuted = signal(true);

  toggleMute() {
    this.isMuted.update(v => !v);
  }
}
