import {Component, signal, OnInit, OnDestroy, PLATFORM_ID, inject, computed} from '@angular/core';
import {isPlatformBrowser, DecimalPipe} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {PORTFOLIO_PROJECTS, PortfolioProject} from './portfolio-data';
import {SeoService} from './seo';

@Component({
  selector: 'app-home',
  imports: [MatIconModule, RouterLink, DecimalPipe, FormsModule],
  template: `
    <!-- Hero Section -->
    <section class="relative bg-white overflow-hidden pt-12 pb-20 lg:pt-24 lg:pb-32">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <!-- 1st Grid: Text Content -->
          <div class="animate-fade-in text-center lg:text-left">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-display font-black text-primary leading-[1.1] tracking-tight mb-6">
              {{ homeData().heroTitle }}
            </h1>
            
            <p class="text-lg text-slate-800 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
              {{ homeData().heroSubtitle }}
            </p>

            <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
              <a routerLink="/contact" class="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 rounded-full bg-primary text-white font-bold shadow-lg shadow-primary/30 hover:bg-primary-dark hover:-translate-y-0.5 active:scale-95 transition-all duration-300">
                Get a Free Quote
              </a>
              <button (click)="scrollToPortfolio()" class="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 rounded-full bg-white text-primary font-bold border-2 border-primary/20 hover:border-primary transition-all active:scale-95 cursor-pointer">
                Our Portfolio
              </button>
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
              <span class="text-sm text-slate-500 font-medium">4.9 stars | 9 reviews</span>
            </div>
          </div>

          <!-- 2nd Grid: Hero Image Section -->
          <div class="relative">
            <div class="relative group h-full">
              <!-- Carousel Frame -->
              <div class="relative rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-100 aspect-[4/3] isolate border-4 border-white">
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

    <!-- Brand Banner -->
    <section class="py-12 bg-white border-b border-slate-100 overflow-hidden">
      <div class="relative flex overflow-x-hidden">
        <div class="animate-marquee flex whitespace-nowrap items-center gap-16 py-4">
          @for (logo of homeData().brands; track logo.name) {
            <div class="flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 min-w-[120px]">
              @if (logo.img) {
                <img [src]="logo.img" [alt]="logo.name" class="h-16 w-auto object-contain">
              } @else {
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center p-2">
                    <mat-icon class="text-3xl text-slate-400">{{logo.icon}}</mat-icon>
                  </div>
                  <span class="text-xl font-display font-black text-slate-300 tracking-tighter">{{logo.name}}</span>
                </div>
              }
            </div>
          }
        </div>
        <div class="absolute top-0 animate-marquee2 flex whitespace-nowrap items-center gap-16 py-4">
          @for (logo of homeData().brands; track logo.name + '-dup') {
            <div class="flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 min-w-[120px]">
              @if (logo.img) {
                <img [src]="logo.img" [alt]="logo.name" class="h-16 w-auto object-contain">
              } @else {
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center p-2">
                    <mat-icon class="text-3xl text-slate-400">{{logo.icon}}</mat-icon>
                  </div>
                  <span class="text-xl font-display font-black text-slate-300 tracking-tighter">{{logo.name}}</span>
                </div>
              }
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Nature of Business Section -->
    <section class="py-24 bg-white relative overflow-hidden">
      <!-- Decorative Elements -->
      <div class="absolute inset-0 z-0">
        <div class="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-400/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center max-w-3xl mx-auto mb-20">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-primary text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
            <mat-icon class="text-sm">business_center</mat-icon>
            Our Expertise
          </div>
          <h2 class="text-4xl lg:text-5xl font-display font-black text-primary leading-tight mb-6">
            {{ homeData().businessNaturesTitle || 'Nature of Business' }}
          </h2>
          <p class="text-lg text-slate-800 leading-relaxed">{{ homeData().businessNaturesSubtitle }}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (nature of homeData().businessNatures; track nature.title) {
            <div class="bg-slate-50 rounded-[2rem] p-10 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden isolate">
              <!-- Hover effect bg -->
              <div class="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-bl-full translate-x-24 -translate-y-24 group-hover:translate-x-12 group-hover:-translate-y-12 transition-transform duration-700 ease-out -z-10"></div>
              
              <div class="relative z-10">
                <div class="w-16 h-16 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                  <mat-icon class="text-3xl text-primary group-hover:text-white transition-colors">{{nature.icon}}</mat-icon>
                </div>
                
                <h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">{{nature.category}}</h4>
                <h3 class="text-xl font-display font-bold text-secondary mb-4 leading-tight">{{nature.title}}</h3>
                <p class="text-slate-800 leading-relaxed text-sm">{{nature.desc}}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Portfolio Section -->
    <section id="portfolio" class="py-24 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h4 class="text-primary font-bold uppercase tracking-widest text-xs mb-4">{{ homeData().portfolioTitle || 'Our Portfolio' }}</h4>
          <h2 class="text-4xl lg:text-5xl font-display font-black text-primary leading-tight mb-6">{{ homeData().projectsTitle }}</h2>
          <p class="text-slate-800">{{ homeData().projectsSubtitle }}</p>
        </div>
        
        @if (homeData().portfolioDisplayFormat === 'grid') {
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            @for (project of homeData().projects; track project.id) {
              <div (click)="openProject(project)" (keydown.enter)="openProject(project)" tabindex="0" class="block group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary">
                <!-- Image Container -->
                <div class="aspect-[4/5] overflow-hidden">
                  <img [src]="project.image" [alt]="project.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerpolicy="no-referrer">
                </div>
                <!-- Top Right Indicator -->
                <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-secondary flex items-center gap-1 shadow-lg border border-white/20">
                  <mat-icon class="text-[14px] w-[14px] h-[14px] leading-[14px]">photo_library</mat-icon>
                  {{project.gallery.length}}
                </div>
                <!-- Content Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex flex-col justify-end p-6">
                  <span class="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-2">{{project.category || 'Solar Project'}}</span>
                  <h3 class="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors leading-tight">{{project.title}}</h3>
                  <p class="text-sm text-white flex items-center gap-1 mt-1 mb-3">
                    <mat-icon class="text-white text-[16px] w-[16px] h-[16px] leading-[16px]">location_on</mat-icon>
                    {{project.location}}
                  </p>
                  <div class="flex items-center text-white text-sm font-bold uppercase tracking-wider opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    View Details <mat-icon class="text-[16px] ml-1">arrow_forward</mat-icon>
                  </div>
                </div>
              </div>
            }
          </div>
        } @else {
          <!-- Carousel View -->
          <div class="relative group/carousel">
            <div class="flex gap-6 overflow-x-auto pb-10 hide-scrollbar snap-x snap-mandatory px-4 -mx-4">
              @for (project of homeData().projects; track project.id) {
                <div (click)="openProject(project)" (keydown.enter)="openProject(project)" tabindex="0" class="flex-none w-[280px] sm:w-[350px] snap-center block group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  <!-- Image Container -->
                  <div class="aspect-[4/5] overflow-hidden">
                    <img [src]="project.image" [alt]="project.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerpolicy="no-referrer">
                  </div>
                  <!-- Top Right Indicator -->
                  <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-secondary flex items-center gap-1 shadow-lg border border-white/20">
                    <mat-icon class="text-[14px] w-[14px] h-[14px] leading-[14px]">photo_library</mat-icon>
                    {{project.gallery.length}}
                  </div>
                  <!-- Content Overlay -->
                  <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex flex-col justify-end p-6">
                    <span class="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-2">{{project.category || 'Solar Project'}}</span>
                    <h3 class="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors leading-tight">{{project.title}}</h3>
                    <p class="text-sm text-white flex items-center gap-1 mt-1 mb-3">
                      <mat-icon class="text-white text-[16px] w-[16px] h-[16px] leading-[16px]">location_on</mat-icon>
                      {{project.location}}
                    </p>
                    <div class="flex items-center text-white text-sm font-bold uppercase tracking-wider opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      View Details <mat-icon class="text-[16px] ml-1">arrow_forward</mat-icon>
                    </div>
                  </div>
                </div>
              }
            </div>
            <!-- Scroll Hint -->
            <div class="flex justify-center mt-4 lg:hidden">
              <div class="flex gap-1.5 items-center bg-slate-200/50 px-3 py-1.5 rounded-full">
                <mat-icon class="text-slate-400 !text-[14px] !w-[14px] !h-[14px]">swipe</mat-icon>
                <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Swipe to explore</span>
              </div>
            </div>
          </div>
        }
      </div>
    </section>

    <!-- Promotional Feature Section -->
    <section class="py-32 relative overflow-hidden bg-white text-secondary isolate">
      <!-- Atmospheric Gradient Background -->
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-white to-white -z-20"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          
          <!-- Content Left -->
          <div class="lg:col-span-5 mb-16 lg:mb-0 relative z-10">
            <div class="inline-flex items-center px-4 py-2 rounded-full border border-slate-100 uppercase tracking-[0.2em] text-[10px] font-bold mb-10 text-slate-500 bg-slate-50 backdrop-blur-md shadow-sm">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-400 mr-3 animate-pulse"></span>
              Promotional Feature
            </div>
            
            <h2 class="text-4xl lg:text-7xl font-display font-black mb-8 leading-[1.1] tracking-tight text-primary">
              {{ homeData().videoTitle || 'Experience the Power of the Sun' }}
            </h2>
            
            <p class="text-slate-800 text-lg leading-relaxed mb-12 font-light">
              {{ homeData().videoDescription || 'Watch how Blucid Enterprise transforms homes and businesses with sustainable energy. Our integrated solar solutions provide reliable, cost-effective power while reducing your carbon footprint. Join the green revolution today and secure your energy future.' }}
            </p>
            
            <div class="flex items-center gap-12 border-t border-slate-100 pt-8 mt-12">
              @for (stat of homeData().videoStats; track stat.label) {
                <div class="flex flex-col">
                  <span class="text-4xl font-display font-light text-secondary mb-2">{{stat.value}}</span>
                  <span class="text-[10px] font-sans text-slate-400 uppercase tracking-widest">{{stat.label}}</span>
                </div>
              }
            </div>
          </div>
          
          <!-- Video Right -->
          <div class="lg:col-span-7 relative">
            <div class="relative w-full aspect-[4/3] lg:aspect-video rounded-[32px] overflow-hidden shadow-2xl isolate border border-slate-100 group bg-slate-50">
              <video 
                autoplay 
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

    <!-- Solar Savings Calculator Section -->
    <section id="roi-calculator" class="py-24 bg-slate-50 relative overflow-hidden">
      <!-- Background Accents -->
      <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
      <div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-400/5 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center max-w-3xl mx-auto mb-20">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
            <mat-icon class="text-sm">analytics</mat-icon>
            Your Investment Roadmap
          </div>
          <h2 class="text-4xl lg:text-6xl font-display font-black text-primary mb-6 tracking-tight">Solar Savings Calculator</h2>
          <p class="text-lg text-slate-800 leading-relaxed">Discover the financial and environmental impact of switching to solar power. Our calculator uses real-market data for Laguna.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <!-- Inputs Column -->
          <div class="lg:col-span-4 space-y-6">
            <div class="bg-white rounded-[2.5rem] p-8 lg:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col h-full">
              <h3 class="text-xl font-display font-black text-secondary mb-10 flex items-center gap-3">
                <span class="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center">
                  <mat-icon>edit_note</mat-icon>
                </span>
                Usage Details
              </h3>

              <div class="space-y-10 flex-grow">
                <!-- Bill Input -->
                <div class="space-y-4">
                  <div class="flex justify-between items-end">
                    <label for="bill-amount" class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Monthly Electric Bill</label>
                    <span class="text-2xl font-display font-black text-primary">₱{{billAmount() | number}}</span>
                  </div>
                  <div class="relative pt-2">
                    <input id="bill-amount" type="range" [ngModel]="billAmount()" (ngModelChange)="billAmount.set($event)" min="1000" max="100000" step="500" class="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary">
                    <div class="flex justify-between mt-2 text-[10px] font-bold text-slate-300">
                      <span>₱1k</span>
                      <span>₱50k</span>
                      <span>₱100k</span>
                    </div>
                  </div>
                </div>

                <!-- Rate Input -->
                <div class="space-y-4">
                  <div class="flex justify-between items-end">
                    <label for="kw-price" class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Rate (PHP/kWh)</label>
                    <span class="text-xl font-display font-black text-secondary">₱{{kilowattPrice() | number:'1.2-2'}}</span>
                  </div>
                  <div class="relative pt-2">
                    <input id="kw-price" type="range" [ngModel]="kilowattPrice()" (ngModelChange)="kilowattPrice.set($event)" min="8" max="20" step="0.5" class="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary">
                    <div class="flex justify-between mt-2 text-[10px] font-bold text-slate-300">
                      <span>₱8</span>
                      <span>₱14</span>
                      <span>₱20</span>
                    </div>
                  </div>
                </div>

                <!-- Manual Input Option -->
                <div class="pt-6 border-t border-slate-50 grid grid-cols-2 gap-4">
                  <div>
                    <label for="exact-bill" class="block text-[9px] font-black text-slate-400 uppercase mb-2">Exact Bill</label>
                    <input id="exact-bill" type="number" [ngModel]="billAmount()" (ngModelChange)="billAmount.set($event)" class="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-secondary focus:ring-2 focus:ring-primary/20 outline-none">
                  </div>
                  <div>
                    <label for="manual-roof-area" class="block text-[9px] font-black text-slate-400 uppercase mb-2">Roof Area (sqm)</label>
                    <input id="manual-roof-area" type="number" [ngModel]="roofArea()" (ngModelChange)="roofArea.set($event)" class="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-secondary focus:ring-2 focus:ring-primary/20 outline-none">
                  </div>
                </div>
              </div>

              <!-- Recommendation Note -->
              <div class="mt-10 p-5 bg-amber-50 rounded-2xl border border-amber-100/50 flex gap-4">
                <mat-icon class="text-amber-500 shrink-0">tips_and_updates</mat-icon>
                <p class="text-[11px] text-amber-700 leading-relaxed font-medium">
                  Based on your bill, we recommend a <b>{{solarCalculations().systemSizeNeeded}}kWp</b> system to offset your consumption.
                </p>
              </div>
            </div>
          </div>

          <!-- Results Column -->
          <div class="lg:col-span-8 flex flex-col gap-6">
            <!-- Primary Results Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
              <!-- Result 1: System Size -->
              <div class="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col justify-between group overflow-hidden relative">
                <div class="absolute -right-6 -top-6 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                <div>
                  <div class="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                    <mat-icon>solar_power</mat-icon>
                  </div>
                  <p class="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-1">Recommended System Size</p>
                  <h4 class="text-5xl font-display font-black text-secondary leading-none">{{solarCalculations().systemSizeNeeded}} <span class="text-lg text-slate-400">kWp</span></h4>
                </div>
                <p class="text-xs text-slate-800 mt-6 leading-relaxed">This size covers nearly all your daytime electrical requirements.</p>
              </div>

              <!-- Result 2: Payback -->
              <div class="bg-secondary p-8 rounded-[2.5rem] shadow-xl shadow-slate-900/10 flex flex-col justify-between relative overflow-hidden group">
                <div class="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full group-hover:scale-120 transition-transform duration-700"></div>
                <div>
                  <div class="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center mb-6">
                    <mat-icon>history</mat-icon>
                  </div>
                  <p class="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-1">Estimated Payback Period</p>
                  <h4 class="text-5xl font-display font-black text-white leading-none">{{solarCalculations().paybackYears}} <span class="text-lg text-slate-400">Years</span></h4>
                </div>
                <p class="text-xs text-slate-800 mt-6 leading-relaxed">After this period, your generated electricity is essentially free.</p>
              </div>

              <!-- Result 3: Savings Over Time -->
              <div class="md:col-span-2 bg-white p-8 lg:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-12 items-center">
                <div class="flex-grow space-y-8 w-full">
                  <div class="flex flex-col sm:flex-row gap-8 sm:gap-16">
                    <div class="space-y-1">
                      <p class="text-[10px] font-black text-slate-800 uppercase tracking-widest">Monthly Savings</p>
                      <h4 class="text-3xl font-display font-black text-emerald-600">₱{{solarCalculations().monthlySavings | number:'1.0-0'}}</h4>
                    </div>
                    <div class="space-y-1">
                      <p class="text-[10px] font-black text-slate-800 uppercase tracking-widest">Yearly Savings</p>
                      <h4 class="text-3xl font-display font-black text-emerald-700">₱{{solarCalculations().yearlySavings | number:'1.0-0'}}</h4>
                    </div>
                    <div class="space-y-1">
                      <p class="text-[10px] font-black text-slate-800 uppercase tracking-widest">25-Year Lifetime Savings</p>
                      <h4 class="text-4xl font-display font-black text-primary">₱{{solarCalculations().lifetimeSavings | number:'1.0-0'}}</h4>
                    </div>
                  </div>
                  
                  <!-- Savings Progress Visual -->
                  <div class="space-y-4 pt-4">
                    <div class="flex justify-between text-xs font-bold text-slate-500 mb-2">
                      <span>Investment: ₱{{solarCalculations().estimatedCost | number:'1.0-0'}}</span>
                      <span class="text-primary">Profit: ₱{{solarCalculations().lifetimeSavings - solarCalculations().estimatedCost | number:'1.0-0'}}</span>
                    </div>
                    <div class="h-4 bg-slate-100 rounded-full overflow-hidden flex">
                      <div class="h-full bg-secondary" [style.width.%]="(solarCalculations().estimatedCost / solarCalculations().lifetimeSavings) * 100"></div>
                      <div class="h-full bg-primary" [style.width.%]="100 - (solarCalculations().estimatedCost / solarCalculations().lifetimeSavings) * 100"></div>
                    </div>
                    <div class="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                      <span>Initial Cost</span>
                      <span>Total Net Profit after 25 Years</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Environmental Impact -->
              <div class="md:col-span-2 bg-emerald-900 rounded-[2.5rem] p-8 lg:p-10 text-white flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
                 <div class="absolute inset-0 bg-emerald-800 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                 <div class="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center text-emerald-300 shrink-0">
                    <mat-icon class="!text-[40px] !w-[40px] !h-[40px] leading-[40px]">park</mat-icon>
                 </div>
                 <div class="flex-grow space-y-2 text-center md:text-left">
                    <h5 class="text-lg font-display font-bold">Your Environmental Contribution</h5>
                    <p class="text-emerald-300/80 text-xs leading-relaxed max-w-xl">
                      Your system will offset approximately <b>{{solarCalculations().co2Saved | number:'1.0-0'}} kg</b> of CO2 emissions annually. That's equivalent to planting <b>{{solarCalculations().trees}} mature trees</b> every year.
                    </p>
                 </div>
                 <div class="hidden xl:flex flex-col items-center justify-center bg-white/5 px-6 py-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                   <span class="text-2xl font-display font-black">{{solarCalculations().trees}}</span>
                   <span class="text-[9px] font-black uppercase tracking-widest text-emerald-400">Trees / Yr</span>
                 </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footnote / Disclaimer -->
        <div class="mt-16 flex flex-col md:flex-row items-center justify-between gap-8 p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
          <div class="flex items-center gap-6">
            <div class="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <mat-icon>verified</mat-icon>
            </div>
            <div>
              <h4 class="text-lg font-display font-bold text-secondary">Get a Detailed Proposal</h4>
              <p class="text-sm text-slate-800">Every roof is unique. Our engineers provide a free site visit and 3D shading analysis for precise accuracy.</p>
            </div>
          </div>
          <a routerLink="/contact" class="inline-flex items-center justify-center px-10 py-5 rounded-full bg-secondary text-white font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
            Send My Details
            <mat-icon class="ml-2">arrow_forward</mat-icon>
          </a>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-3xl lg:text-5xl font-display font-black text-primary mb-6">{{ homeData().featuresTitle }}</h2>
          <p class="text-slate-800">{{ homeData().featuresSubtitle }}</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          @for (feat of homeData().features; track feat.title) {
            <div class="p-8 rounded-3xl bg-slate-50 hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 group">
              <div class="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <mat-icon>{{feat.icon}}</mat-icon>
              </div>
              <h3 class="text-xl font-bold text-secondary mb-4">{{feat.title}}</h3>
              <p class="text-slate-800 text-sm leading-relaxed">{{feat.desc}}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-24 bg-slate-50 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div class="max-w-2xl">
            <h4 class="text-primary font-bold uppercase tracking-widest text-xs mb-4">{{homeData().testimonialsTitle}}</h4>
            <h2 class="text-3xl lg:text-5xl font-display font-black text-primary leading-tight">
              {{ homeData().testimonialsSubtitle }}
            </h2>
          </div>
          <div class="flex gap-4">
            <div class="text-right">
              <p class="text-2xl font-display font-black text-secondary">4.9/5</p>
              <p class="text-xs text-slate-800 uppercase font-bold tracking-widest">Average Rating</p>
            </div>
            <div class="flex text-amber-400">
              <mat-icon>star</mat-icon>
              <mat-icon>star</mat-icon>
              <mat-icon>star</mat-icon>
              <mat-icon>star</mat-icon>
              <mat-icon>star</mat-icon>
            </div>
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
              <p class="text-slate-800 mb-8 flex-grow leading-relaxed">"{{testimonial.quote}}"</p>
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

    <!-- CTA Section -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-secondary rounded-[3rem] overflow-hidden relative">
          <div class="absolute top-0 right-0 w-1/2 h-full bg-primary/10 skew-x-12 translate-x-1/4"></div>
          <div class="px-8 py-16 lg:p-20 relative z-10 text-center lg:text-left lg:flex lg:items-center lg:justify-between">
            <div class="lg:max-w-2xl">
              <h2 class="text-3xl lg:text-5xl font-display font-black text-white mb-6">{{homeData().ctaTitle}}</h2>
              <p class="text-slate-800 text-lg">{{homeData().ctaSubtitle}}</p>
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

    <!-- Portfolio Modal -->
    @if (selectedProject()) {
      <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-900/80 backdrop-blur-md transition-all duration-300">
        <div class="bg-white rounded-[2.5rem] w-full max-w-6xl max-h-[95vh] flex flex-col relative shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
          
          <!-- Close Button -->
          <button (click)="closeProject()" class="absolute top-4 right-4 z-50 w-12 h-12 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center backdrop-blur transition-colors" aria-label="Close modal">
            <mat-icon>close</mat-icon>
          </button>

          <!-- Scrollable Content -->
          <div class="overflow-y-auto flex-1">
             <section class="relative bg-slate-900 pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
                <div class="absolute inset-0">
                  <img [src]="selectedProject()?.image" alt="Background" class="w-full h-full object-cover opacity-30" referrerpolicy="no-referrer">
                  <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/20"></div>
                </div>
                <div class="max-w-4xl mx-auto px-4 relative z-10 text-center">
                  <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                    {{selectedProject()?.category || 'Solar Project'}}
                  </div>
                  <h2 class="text-3xl md:text-5xl font-display font-black text-white mb-4">{{selectedProject()?.title}}</h2>
                  <p class="text-lg text-slate-800 flex items-center justify-center gap-2">
                    <mat-icon class="text-[18px] w-[18px] h-[18px] leading-[18px]">location_on</mat-icon> {{selectedProject()?.location}}
                  </p>
                </div>
             </section>

             <section class="py-12 bg-white shrink-0 -mt-8 relative z-20 rounded-t-[2rem]">
                <div class="max-w-5xl mx-auto px-6">
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 p-6 bg-slate-50 border border-slate-100 rounded-3xl shadow-sm">
                    <div>
                       <p class="text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-1">Client</p>
                       <p class="text-base font-bold text-secondary">{{selectedProject()?.client}}</p>
                    </div>
                    <div>
                       <p class="text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-1">Date</p>
                       <p class="text-base font-bold text-secondary">{{selectedProject()?.completionDate}}</p>
                    </div>
                    <div>
                       <p class="text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-1">System Size</p>
                       <p class="text-base font-bold text-secondary">{{selectedProject()?.systemSize}}</p>
                    </div>
                    <div>
                       <p class="text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-1">Energy Saved</p>
                       <p class="text-base font-bold text-secondary">{{selectedProject()?.energySaved}}</p>
                    </div>
                  </div>

                  <div class="max-w-3xl mx-auto text-center mb-16">
                    <h3 class="text-2xl font-display font-black text-secondary mb-4">Project Overview</h3>
                    <p class="text-lg text-slate-800 leading-relaxed">{{selectedProject()?.description}}</p>
                  </div>

                  <div class="pb-8">
                     <div class="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                           <h4 class="text-primary font-bold uppercase tracking-widest text-[10px] mb-1">Gallery</h4>
                           <h3 class="text-2xl font-display font-black text-secondary">A Closer Look</h3>
                        </div>
                        <div class="text-slate-500 font-medium">
                           Showing {{selectedProject()?.gallery?.length}} photos
                        </div>
                     </div>
                     
                     <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        @for (img of selectedProject()?.gallery; track img) {
                           <div (click)="openImage(img)" tabindex="0" (keydown.enter)="openImage(img)" class="rounded-2xl overflow-hidden shadow-sm aspect-[4/3] group relative bg-slate-100 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary">
                              <img [src]="img" alt="Gallery Photo" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerpolicy="no-referrer">
                              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                                <mat-icon class="text-white opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300 !w-12 !h-12 !text-[48px] leading-[48px]">zoom_in</mat-icon>
                              </div>
                           </div>
                        }
                     </div>
                  </div>
                </div>
             </section>
          </div>
        </div>
      </div>
    }

    <!-- Image Viewer Modal -->
    @if (selectedImage()) {
      <div role="button" tabindex="0" (keydown.enter)="closeImage()" (keydown.escape)="closeImage()" class="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-sm transition-all duration-300 animate-in fade-in duration-300" (click)="closeImage()">
        <!-- Close Button -->
        <button (click)="closeImage()" class="absolute top-6 right-6 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center backdrop-blur transition-colors" aria-label="Close image">
          <mat-icon>close</mat-icon>
        </button>
        <img [src]="selectedImage()" alt="Enlarged gallery photo" class="max-w-full max-h-full object-contain shadow-2xl rounded-lg animate-in zoom-in-95 duration-300" referrerpolicy="no-referrer" (click)="$event.stopPropagation()" (keydown.enter)="$event.stopPropagation()" tabindex="0" role="button">
      </div>
    }
  `
})


export class Home implements OnInit, OnDestroy {
  homeData = signal({
    heroTitle: 'Full-Service Engineering & Power Integration.',
    heroSubtitle: 'We simplify your operations by combining professional solar setups with expert electrical contracting and industrial sourcing. Reliable power and aftermarket support, all under one roof.',
    bannerImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVgh9oWfrFuDp4RP4of2ukqm1hC_xupXkvpA&s',
    heroImages: [
      'https://thumbs.dreamstime.com/b/community-driven-solar-energy-project-represented-panel-house-roof-basking-bright-sun-symbolizing-pursuit-415609601.jpg',
      'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=2070&auto=format&fit=crop',
      'https://img.freepik.com/premium-photo/solar-panels-green-energy-home-white-background-3d-illustration_175992-241.jpg'
    ],
    heroTrustText: 'Trusted by 500+ Businesses',
    brands: [
      { name: 'Brand 1', icon: '', img: '/img/logo/Picture1.png' },
      { name: 'Brand 2', icon: '', img: '/img/logo/Picture2.png' },
      { name: 'Brand 3', icon: '', img: '/img/logo/Picture3.png' },
      { name: 'Brand 4', icon: '', img: '/img/logo/Picture4.png' },
      { name: 'Brand 5', icon: '', img: '/img/logo/Picture5.png' },
      { name: 'Brand 6', icon: '', img: '/img/logo/Picture6.png' },
      { name: 'Brand 7', icon: '', img: '/img/logo/Picture7.png' },
      { name: 'Brand 8', icon: '', img: '/img/logo/Picture8.png' },
      { name: 'Brand 9', icon: '', img: '/img/logo/Picture9.png' },
      { name: 'Brand 10', icon: '', img: '/img/logo/Picture10.png' },
      { name: 'Brand 11', icon: '', img: '/img/logo/Picture11.png' },
      { name: 'Brand 12', icon: '', img: '/img/logo/Picture12.png' },
      { name: 'Brand 13', icon: '', img: '/img/logo/Picture13.png' },
      { name: 'Brand 14', icon: '', img: '/img/logo/Picture14.png' }
    ],
    featuresTitle: 'Why Choose Blucid?',
    featuresSubtitle: 'We don\'t just install panels; we build long-term energy independence for our clients with premium hardware and expert engineering.',
    features: [
       { title: 'Expert Installation', desc: 'Our certified engineers ensure every panel and wire is perfectly placed for maximum efficiency and safety.', icon: 'engineering' },
       { title: 'Premium Quality', desc: 'We only use top-tier solar panels, battery supplies, and volt switch panels from trusted global manufacturers.', icon: 'verified' },
       { title: 'Lifetime Support', desc: 'Our relationship doesn\'t end at installation. We provide ongoing maintenance and technical support for your system.', icon: 'support_agent' }
    ],
    businessNaturesTitle: 'Nature of Business',
    businessNaturesSubtitle: 'Comprehensive electrical and engineering solutions tailored to your specific requirements.',
    businessNatures: [
      { category: 'Contracting', title: 'Electrical Works', icon: 'electrical_services', desc: 'Expert contracting and sub-contracting for all types of electrical installations and wiring.' },
      { category: 'Telecommunications', title: 'Telecom Projects', icon: 'cell_tower', desc: 'Pole erection, fiber optic cable laying & fixing, cable splicing, batteries and rectifier installation.' },
      { category: 'Sustainable Energy', title: 'Solar PV Systems', icon: 'solar_power', desc: 'Design, supply, and installation of Solar PV Systems for residential, commercial, and industrial.' },
      { category: 'Power Backup', title: 'UPS Systems', icon: 'battery_charging_full', desc: 'Complete UPS supply, reliable installation, and ongoing maintenance.' },
      { category: 'HVAC', title: 'Air Conditioning', icon: 'ac_unit', desc: 'Supply, installation, and maintenance of advanced Air Conditioning Systems.' },
      { category: 'Construction', title: 'General Construction', icon: 'architecture', desc: 'Small and medium-sized construction projects and professional renovation services.' }
    ],
    portfolioTitle: 'Our Portfolio',
    projectsTitle: 'Accomplished Projects',
    projectsSubtitle: 'Explore some of our recent installations and see how we are empowering the community with clean energy.',
    projects: PORTFOLIO_PROJECTS,
    portfolioDisplayFormat: 'grid',
    videoTitle: 'Experience the Power of the Sun',
    videoDescription: 'Watch how Blucid Enterprise transforms homes and businesses with sustainable energy. Our integrated solar solutions provide reliable, cost-effective power while reducing your carbon footprint. Join the green revolution today and secure your energy future.',
    videoStats: [
      { value: '500+', label: 'Installations' },
      { value: '15MW', label: 'Clean Energy' }
    ],
    videoUrl: 'https://youbite-medical.web.app/blucid.mp4',
    
    testimonialsTitle: 'Testimonials',
    testimonialsSubtitle: 'What our clients say about Blucid Enterprise Inc.',
    testimonials: [
      {
        name: 'Roberto Santos',
        role: 'Homeowner, Calamba',
        quote: 'Switching to solar with Blucid was the best decision for our family. Our electric bill dropped by 80% and the installation was incredibly professional.',
        image: 'https://picsum.photos/seed/person1/100/100'
      },
      {
        name: 'Maria Clara',
        role: 'Business Owner, Real',
        quote: 'The team at Blucid handled everything from the wiring to the volt switch panels. Their technical expertise is unmatched in Laguna.',
        image: 'https://picsum.photos/seed/person2/100/100'
      },
      {
        name: 'Antonio Luna',
        role: 'Facility Manager',
        quote: 'We needed a robust battery backup system for our warehouse. Blucid delivered a high-capacity solution that has never failed us.',
        image: 'https://picsum.photos/seed/person3/100/100'
      }
    ],
    ctaTitle: 'Ready to switch to solar?',
    ctaSubtitle: 'Join hundreds of satisfied customers in Laguna who are saving thousands on their electricity bills.',
    ctaButtonText: 'Start Your Journey'
  });

  private platformId = inject(PLATFORM_ID);
  private seo = inject(SeoService);
 
  currentHeroIndex = signal(0);
  private heroInterval: ReturnType<typeof setInterval> | undefined;

  nextHero() {
    this.currentHeroIndex.update(i => (i + 1) % this.homeData().heroImages.length);
  }

  prevHero() {
    this.currentHeroIndex.update(i => (i - 1 + this.homeData().heroImages.length) % this.homeData().heroImages.length);
  }

  scrollToPortfolio() {
    const el = document.getElementById('portfolio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
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
      url: 'https://blucidenterprise.com'
    });

    if (isPlatformBrowser(this.platformId)) {
      // Auto-play timer for hero
      this.heroInterval = setInterval(() => this.nextHero(), 8000);

       // Look for temporary preview or official content
       const draft = localStorage.getItem('blucid_website_draft');
       if (draft) {
         try {
           const parsed = JSON.parse(draft);
           if (parsed.home) {
              this.homeData.update(curr => ({
                 ...curr,
                 ...parsed.home
              }));
           }
         } catch {
            // ignore
         }
       } else {
         const saved = localStorage.getItem('blucid_website_content');
         if (saved) {
           try {
             const parsed = JSON.parse(saved);
             if (parsed.home) {
                this.homeData.update(curr => ({
                   ...curr,
                   ...parsed.home
                }));
             }
           } catch {
             // ignore
           }
         }
       }
    }
  }

  ngOnDestroy() {
    if (this.heroInterval) {
      clearInterval(this.heroInterval);
    }
  }

  portfolioProjects = PORTFOLIO_PROJECTS;

  brandLogos = [
    { name: 'Brand 1', img: '/img/logo/Picture1.png' },
    { name: 'Brand 2', img: '/img/logo/Picture2.png' },
    { name: 'Brand 3', img: '/img/logo/Picture3.png' },
    { name: 'Brand 4', img: '/img/logo/Picture4.png' },
    { name: 'Brand 5', img: '/img/logo/Picture5.png' },
    { name: 'Brand 6', img: '/img/logo/Picture6.png' },
    { name: 'Brand 7', img: '/img/logo/Picture7.png' },
    { name: 'Brand 8', img: '/img/logo/Picture8.png' },
    { name: 'Brand 9', img: '/img/logo/Picture9.png' },
    { name: 'Brand 10', img: '/img/logo/Picture10.png' },
    { name: 'Brand 11', img: '/img/logo/Picture11.png' },
    { name: 'Brand 12', img: '/img/logo/Picture12.png' },
    { name: 'Brand 13', img: '/img/logo/Picture13.png' },
    { name: 'Brand 14', img: '/img/logo/Picture14.png' }
  ];

  testimonials = [
    {
      name: 'Roberto Santos',
      role: 'Homeowner, Calamba',
      quote: 'Switching to solar with Blucid was the best decision for our family. Our electric bill dropped by 80% and the installation was incredibly professional.',
      image: 'https://picsum.photos/seed/person1/100/100'
    },
    {
      name: 'Maria Clara',
      role: 'Business Owner, Real',
      quote: 'The team at Blucid handled everything from the wiring to the volt switch panels. Their technical expertise is unmatched in Laguna.',
      image: 'https://picsum.photos/seed/person2/100/100'
    },
    {
      name: 'Antonio Luna',
      role: 'Facility Manager',
      quote: 'We needed a robust battery backup system for our warehouse. Blucid delivered a high-capacity solution that has never failed us.',
      image: 'https://picsum.photos/seed/person3/100/100'
    }
  ];

  isMuted = signal(false);

  toggleMute() {
    this.isMuted.update(v => !v);
  }

  selectedProject = signal<PortfolioProject | null>(null);

  openProject(p: PortfolioProject) {
    this.selectedProject.set(p);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeProject() {
    this.selectedProject.set(null);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  selectedImage = signal<string | null>(null);

  openImage(img: string) {
    this.selectedImage.set(img);
  }

  closeImage() {
    this.selectedImage.set(null);
  }
}
