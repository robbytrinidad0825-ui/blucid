import {Component, HostListener, signal, inject, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {NgClass} from '@angular/common';
import { animate } from 'motion';


@Component({
  selector: 'app-back-to-top',
  imports: [MatIconModule, NgClass],
  template: `
    <div
      class="fixed bottom-8 right-8 z-50 flex items-center justify-center transition-all duration-500"
      [ngClass]="{
        'opacity-100 translate-y-0 scale-100 pointer-events-auto': isVisible(),
        'opacity-0 translate-y-10 scale-50 pointer-events-none': !isVisible()
      }"
    >
      <!-- Glow Effect -->
      <div class="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150 animate-pulse pointer-events-none"></div>

      <button
        (click)="scrollToTop()"
        class="relative w-16 h-16 bg-white dark:bg-slate-900 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:-translate-y-2 active:scale-90 group overflow-hidden border border-slate-100 dark:border-slate-800"
        aria-label="Back to top"
      >
        <!-- Circular Progress SVG -->
        <svg class="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
          <!-- Background track -->
          <circle
            cx="50" cy="50" r="46"
            fill="transparent"
            stroke="currentColor"
            stroke-width="4"
            class="text-slate-100 dark:text-slate-800"
          />
          <!-- Progress stroke -->
          <circle
            cx="50" cy="50" r="46"
            fill="transparent"
            stroke="currentColor"
            stroke-width="6"
            stroke-linecap="round"
            [style.stroke-dasharray]="289"
            [style.stroke-dashoffset]="289 * (1 - scrollProgress())"
            class="text-primary transition-all duration-100 ease-out"
          />
        </svg>

        <div class="relative z-10 flex flex-col items-center justify-center transition-transform duration-500 group-active:-translate-y-full">
          <div class="flex flex-col items-center">
            <mat-icon class="text-primary group-hover:animate-bounce !text-2xl !w-6 !h-6 mb-0.5">rocket</mat-icon>
            <span class="text-[8px] font-black uppercase tracking-tighter text-slate-400 group-hover:text-primary transition-colors">GO UP</span>
          </div>
          
          <div class="absolute top-[calc(100%+1rem)] flex flex-col items-center">
            <mat-icon class="text-white !text-2xl !w-6 !h-6">rocket_launch</mat-icon>
          </div>
        </div>

        <!-- Launch Flash -->
        <div class="absolute inset-0 bg-primary opacity-0 group-active:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </button>
    </div>
  `,
  styles: [`
    :host { display: block; }
    @keyframes rocket-vibrate {
      0%, 100% { transform: translateY(0); }
      25% { transform: translateY(-1px); }
      75% { transform: translateY(1px); }
    }
    .group:hover mat-icon {
      animation: rocket-vibrate 0.1s infinite;
    }
  `]
})
export class BackToTop {
  isVisible = signal(false);
  scrollProgress = signal(0);
  private platformId = inject(PLATFORM_ID);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      const scrollY = window.pageYOffset;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      this.isVisible.set(scrollY > 400);
      
      if (height > 0) {
        this.scrollProgress.set(Math.min(scrollY / height, 1));
      } else {
        this.scrollProgress.set(0);
      }
    }
  }

  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      const startY = window.pageYOffset;
      
      // Use motion's animate for a custom easing scroll
      animate(startY, 0, {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for a premium feel
        onUpdate: (latest) => {
          window.scrollTo(0, latest);
        }
      });
    }
  }
}
