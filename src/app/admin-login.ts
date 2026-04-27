import {ChangeDetectionStrategy, Component, inject, signal, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-admin-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatIconModule, RouterLink],
  template: `
    <div class="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div class="max-w-md w-full">
        <!-- Brand -->
        <div class="text-center mb-10">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-white shadow-xl mb-4">
            <mat-icon class="text-3xl">admin_panel_settings</mat-icon>
          </div>
          <h1 class="text-3xl font-display font-black text-secondary">Admin Portal</h1>
          <p class="text-slate-500 mt-2">Blucid Enterprise Inc. Management</p>
        </div>

        <!-- Login Card -->
        <div class="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 p-8 lg:p-10 border border-slate-100">
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <div>
              <label for="username" class="block text-sm font-bold text-secondary mb-2 uppercase tracking-widest">Username</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <mat-icon class="text-xl">person</mat-icon>
                </div>
                <input 
                  id="username"
                  type="text" 
                  formControlName="username"
                  placeholder="admin"
                  class="block w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-hidden text-secondary"
                >
              </div>
            </div>

            <div>
              <label for="password" class="block text-sm font-bold text-secondary mb-2 uppercase tracking-widest">Password</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <mat-icon class="text-xl">lock</mat-icon>
                </div>
                <input 
                  id="password"
                  [type]="showPassword() ? 'text' : 'password'" 
                  formControlName="password"
                  placeholder="••••••••"
                  class="block w-full pl-12 pr-12 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-hidden text-secondary"
                >
                <button 
                  type="button"
                  (click)="showPassword.set(!showPassword())"
                  class="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-primary transition-colors"
                >
                  <mat-icon>{{ showPassword() ? 'visibility_off' : 'visibility' }}</mat-icon>
                </button>
              </div>
            </div>

            @if (errorMessage()) {
              <div class="p-4 rounded-xl bg-red-50 border border-red-100 flex items-center gap-3 text-red-600 text-sm font-medium animate-shake">
                <mat-icon class="text-red-500">error_outline</mat-icon>
                {{ errorMessage() }}
              </div>
            }

            <button 
              type="submit" 
              [disabled]="loginForm.invalid || isLoading()"
              class="w-full py-5 rounded-2xl bg-primary text-white font-bold shadow-lg shadow-blue-200 hover:bg-primary-dark hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:translate-y-0 transition-all flex items-center justify-center gap-2"
            >
              @if (isLoading()) {
                <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              } @else {
                Sign In
                <mat-icon>login</mat-icon>
              }
            </button>
          </form>

          <div class="mt-8 pt-8 border-t border-slate-50 text-center">
            <a routerLink="/" class="text-sm font-bold text-slate-400 hover:text-primary transition-colors inline-flex items-center gap-2">
              <mat-icon class="text-lg">arrow_back</mat-icon>
              Back to Website
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
      20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    .animate-shake {
      animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
    }
  `]
})
export class AdminLogin {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  showPassword = signal(false);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set(null);

      // Simulate network request
      setTimeout(() => {
        const {username, password} = this.loginForm.value;
        if (username === 'admin' && password === 'adminpass') {
          // In a real app, we would set a token in localStorage/cookie
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('admin_logged_in', 'true');
          }
          this.router.navigate(['/admindashboard']);
        } else {
          this.errorMessage.set('Invalid credentials. Please try again.');
          this.isLoading.set(false);
        }
      }, 800);
    }
  }
}
