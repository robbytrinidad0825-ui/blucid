import {Component, signal, inject, computed} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {PortfolioProject} from './portfolio-data';
import {WebsiteDataService} from './website-data';
import {SeoService} from './seo';

@Component({
  selector: 'app-portfolio',
  imports: [MatIconModule, RouterLink, CommonModule],
  template: `
    <!-- Hero Section -->
    <section class="pt-24 md:pt-32 pb-16 md:pb-24 bg-slate-50 relative overflow-hidden">
      <div class="absolute inset-0 z-0 opacity-20">
        @if (headerData().bannerImage) {
          <img [src]="headerData().bannerImage" alt="Portfolio Banner" class="w-full h-full object-cover" referrerpolicy="no-referrer">
        } @else {
          <div class="w-full h-full bg-slate-200"></div>
        }
      </div>
      <div class="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50 z-0"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h1 class="text-primary mb-6 leading-tight" style="font-size: clamp(28px, 5vw, 40px); font-family: Arial; font-weight: bold;">
          {{headerData().headerTitle || 'Our Portfolio'}}
        </h1>
        <p class="max-w-2xl mx-auto px-4" style="font-size: clamp(16px, 3vw, 18px); color: #000000;">
          {{headerData().headerSubtitle}}
        </p>
      </div>
    </section>

    <!-- Project Filtering & Grid -->
    <section class="py-20 bg-slate-50 min-h-screen">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Filter & Sort Controls -->
        <div class="mb-12 flex flex-col lg:flex-row lg:items-center justify-end gap-6">
          <!-- Sort Select -->
          <div class="flex items-center gap-3 shrink-0">
            <span class="text-slate-500 font-bold text-xs uppercase tracking-widest">Sort By:</span>
            <div class="flex p-1 bg-white rounded-xl shadow-sm border border-slate-100">
              <button 
                (click)="sortOption.set('Newest')"
                [class]="sortOption() === 'Newest' ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-50'"
                class="px-4 py-1.5 rounded-lg text-xs font-black transition-all"
              >
                Newest
              </button>
              <button 
                (click)="sortOption.set('Oldest')"
                [class]="sortOption() === 'Oldest' ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-50'"
                class="px-4 py-1.5 rounded-lg text-xs font-black transition-all"
              >
                Oldest
              </button>
            </div>
          </div>
        </div>

        <!-- Project Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (project of filteredProjects(); track project.id) {
            <div 
              (click)="openProject(project)"
              (keydown.enter)="openProject(project)"
              tabindex="0"
              role="button"
              class="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer border border-slate-100"
            >
              <div class="aspect-[4/3] overflow-hidden relative">
                <img [src]="project.image" [alt]="project.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerpolicy="no-referrer">
                <div class="absolute top-4 right-4 z-20">
                  <span class="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-black uppercase tracking-widest text-primary shadow-sm border border-slate-100">
                    {{ project.category }}
                  </span>
                </div>
              </div>
              <div class="p-8">
                <div class="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-[0.2em] mb-3">
                  <mat-icon class="!text-[14px] !w-[14px] !h-[14px] leading-[14px]">location_on</mat-icon>
                  {{ project.location }}
                </div>
                <h3 class="text-xl font-bold text-secondary mb-4 leading-tight group-hover:text-primary transition-colors">
                  {{ project.title }}
                </h3>
                <div class="flex items-center justify-between pt-4 border-t border-slate-50 text-slate-400 group-hover:text-primary transition-colors">
                  <span class="text-xs font-bold" style="color: #224064;">{{ project.completionDate }}</span>
                  <mat-icon style="color: #224064;">arrow_forward</mat-icon>
                </div>
              </div>
            </div>
          } @empty {
            <div class="col-span-full py-20 text-center">
              <mat-icon class="!text-6xl text-slate-200 mb-4 italic">work_off</mat-icon>
              <p class="text-slate-400 text-lg">No projects found in this category.</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Project Detail Modal -->
    @if (selectedProject()) {
      <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-900/80 backdrop-blur-md transition-all duration-300">
        <div class="bg-white rounded-[2.5rem] w-full max-w-6xl max-h-[95vh] flex flex-col relative shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
          
          <!-- Close Button -->
          <button (click)="closeProject()" class="absolute top-4 right-4 z-50 w-12 h-12 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center backdrop-blur transition-colors" aria-label="Close modal">
            <mat-icon>close</mat-icon>
          </button>

          <!-- Scrollable Content -->
          <div class="overflow-y-auto flex-1">
             <section class="relative bg-slate-900 pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden text-white">
                <div class="absolute inset-0 opacity-40">
                  <img [src]="selectedProject()?.image" alt="Background" class="w-full h-full object-cover blur-sm" referrerpolicy="no-referrer">
                  <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/40"></div>
                </div>
                <div class="max-w-4xl mx-auto px-6 relative z-10 text-center">
                  <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-blue-300 text-[10px] font-black uppercase tracking-widest mb-8 border border-primary/20">
                    {{selectedProject()?.category || 'Project Detail'}}
                  </div>
                  <h2 class="text-3xl md:text-5xl font-display font-black mb-6 leading-tight">{{selectedProject()?.title}}</h2>
                  <div class="flex flex-wrap items-center justify-center gap-6 text-slate-300">
                    <div class="flex items-center gap-2">
                       <mat-icon class="!text-lg">location_on</mat-icon>
                       <span class="font-medium">{{selectedProject()?.location}}</span>
                    </div>
                    <div class="flex items-center gap-2">
                       <mat-icon class="!text-lg">calendar_today</mat-icon>
                       <span class="font-medium">{{selectedProject()?.completionDate}}</span>
                    </div>
                  </div>
                </div>
             </section>

             <section class="py-12 bg-white shrink-0 -mt-10 relative z-20 rounded-t-[3rem]">
                <div class="max-w-5xl mx-auto px-6">
                  <!-- Project Stats -->
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16 p-8 bg-slate-50 border border-slate-100 rounded-[2rem] shadow-sm">
                    <div class="space-y-1">
                       <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Client</p>
                       <p class="text-base font-bold text-secondary">{{selectedProject()?.client}}</p>
                    </div>
                    <div class="space-y-1">
                       <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Size</p>
                       <p class="text-base font-bold text-secondary">{{selectedProject()?.systemSize || 'N/A'}}</p>
                    </div>
                    <div class="space-y-1">
                       <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Impact</p>
                       <p class="text-base font-bold text-secondary">{{selectedProject()?.energySaved || 'N/A'}}</p>
                    </div>
                    <div class="space-y-1">
                       <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</p>
                       <div class="flex items-center gap-1.5 text-emerald-600">
                          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span class="text-base font-bold">Completed</span>
                       </div>
                    </div>
                  </div>

                  <div class="grid lg:grid-cols-3 gap-16 mb-20">
                    <div class="lg:col-span-2">
                       <h3 class="text-2xl font-display font-black text-secondary mb-6 flex items-center gap-3">
                         <span class="w-8 h-1 bg-primary rounded-full"></span>
                         Project Description
                       </h3>
                       <div class="prose prose-slate max-w-none">
                         <p class="text-lg text-slate-700 leading-relaxed font-light">{{selectedProject()?.description}}</p>
                       </div>
                    </div>
                    <div class="bg-primary/5 p-8 rounded-[2rem] border border-primary/10 h-fit">
                       <h4 class="font-bold text-secondary mb-4 uppercase tracking-widest text-xs">Service Type</h4>
                       <div class="flex items-center gap-3 text-primary mb-8 font-bold">
                          <mat-icon>engineering</mat-icon>
                          <span>Full Turnkey Installation</span>
                       </div>
                       <a routerLink="/contact" (click)="closeProject()" class="w-full inline-flex items-center justify-center px-6 py-4 rounded-2xl bg-primary text-white font-bold hover:bg-primary-dark transition-all shadow-lg shadow-blue-500/20">
                         Inquire Now
                       </a>
                    </div>
                  </div>

                  <!-- Gallery -->
                  <div class="pb-12">
                     <div class="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-6">
                        <div>
                           <h4 class="text-primary font-bold uppercase tracking-widest text-[10px] mb-2">Project Media</h4>
                           <h3 class="text-3xl font-display font-black text-secondary">Visual Records</h3>
                        </div>
                        <div class="px-4 py-2 bg-slate-50 rounded-full text-slate-500 font-bold text-xs">
                           {{selectedProject()?.gallery?.length || 0}} items
                        </div>
                     </div>
                     
                     <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        @for (img of selectedProject()?.gallery; track img) {
                           <div (click)="openImage(img)" (keydown.enter)="openImage(img)" tabindex="0" role="button" class="rounded-3xl overflow-hidden shadow-sm aspect-video sm:aspect-square group relative bg-slate-100 cursor-zoom-in">
                              <img [src]="img" alt="Project detail photo" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerpolicy="no-referrer">
                              <div class="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <mat-icon class="text-white !text-4xl !w-12 !h-12 leading-[48px]">zoom_in</mat-icon>
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

    <!-- Lightbox -->
    @if (selectedImage()) {
      <div 
        class="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-sm animate-in fade-in duration-300" 
        (click)="closeImage()"
        (keydown.escape)="closeImage()"
        (keydown.enter)="closeImage()"
        tabindex="0"
        role="button"
      >
        <button (click)="closeImage()" class="absolute top-6 right-6 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center backdrop-blur transition-colors">
          <mat-icon>close</mat-icon>
        </button>
        <img [src]="selectedImage()" alt="Enlarged project photo" class="max-w-full max-h-full object-contain rounded-lg animate-in zoom-in-95 duration-300" (click)="$event.stopPropagation()" (keydown.enter)="$event.stopPropagation()" tabindex="0" role="presentation" referrerpolicy="no-referrer">
      </div>
    }
  `
})
export class Portfolio {
  private websiteService = inject(WebsiteDataService);
  private seo = inject(SeoService);

  projects = computed(() => this.websiteService.data().home.projects as PortfolioProject[]);
  headerData = computed(() => this.websiteService.data().portfolio);
  
  selectedProject = signal<PortfolioProject | null>(null);
  selectedImage = signal<string | null>(null);
  sortOption = signal<'Newest' | 'Oldest'>('Newest');

  filteredProjects = computed(() => {
    const all = [...this.projects()];
    const sort = this.sortOption();
    
    // Sorting by completionDate (string year like "2020", "2024")
    all.sort((a, b) => {
      const yearA = parseInt(a.completionDate) || 0;
      const yearB = parseInt(b.completionDate) || 0;
      return sort === 'Newest' ? yearB - yearA : yearA - yearB;
    });

    return all;
  });

  constructor() {
    this.seo.updateTags({
      title: 'Our Portfolio | Engineering & Solar Power Projects - Blucid Enterprise',
      description: 'View our successful renewable energy installations, electrical contracting works, and telecommunication infrastructure projects across the Philippines.',
      url: 'https://blucidinc.com/portfolio'
    });
  }

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

  openImage(img: string) {
    this.selectedImage.set(img);
  }

  closeImage() {
    this.selectedImage.set(null);
  }
}
