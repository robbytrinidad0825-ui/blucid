import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-solar-calculator',
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  template: `
    <section class="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h1 class="text-primary mb-6" style="font-family: Arial; font-weight: bold; font-size: 40px;">Solar Savings Calculator</h1>
          <p class="text-lg" style="color: #040404;">Estimate your potential savings and system size based on your monthly electricity bill.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <!-- Input Form -->
          <div class="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h3 class="text-xl font-bold text-primary mb-6 flex items-center gap-2">
              <mat-icon class="text-amber-500">settings_input_component</mat-icon>
              Your Energy Details
            </h3>
            
            <form [formGroup]="calcForm" class="space-y-6">
              <div>
                <label for="monthlyBill" class="block text-sm font-semibold text-slate-700 mb-2">Average Monthly Bill (PHP)</label>
                <div class="relative">
                  <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₱</span>
                  <input 
                    id="monthlyBill"
                    type="number" 
                    formControlName="monthlyBill"
                    class="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                    placeholder="e.g. 5000"
                  >
                </div>
              </div>

              <div>
                <label for="kwhRate" class="block text-sm font-semibold text-slate-700 mb-2">Cost per kWh (Optional, PHP)</label>
                <input 
                  id="kwhRate"
                  type="number" 
                  formControlName="kwhRate"
                  class="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                  placeholder="e.g. 12"
                >
              </div>

              <div class="pt-4">
                <div class="p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-3">
                  <mat-icon class="text-amber-600 shrink-0">info</mat-icon>
                  <p class="text-sm text-amber-800 leading-relaxed">
                    This estimate assumes average solar irradiation in the Philippines and a standard grid-tied system efficiency.
                  </p>
                </div>
              </div>
            </form>
          </div>

          <!-- Results Display -->
          <div class="space-y-6">
            <div class="bg-primary text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
              <div class="relative z-10">
                <h3 class="text-lg font-medium opacity-80 mb-2">Estimated Monthly Savings</h3>
                <div class="text-5xl md:text-6xl font-black mb-6">
                  ₱{{ estimatedSavings() | number:'1.0-0' }}
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                  <div class="bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
                    <p class="text-xs uppercase tracking-wider opacity-70 mb-1">Recommended System</p>
                    <p class="text-xl font-bold">{{ systemSize() }} kWp</p>
                  </div>
                  <div class="bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
                    <p class="text-xs uppercase tracking-wider opacity-70 mb-1">Payback Period</p>
                    <p class="text-xl font-bold">{{ paybackPeriod() }} Years</p>
                  </div>
                </div>
              </div>

              <!-- Abstract Background Elements -->
              <div class="absolute -right-8 -bottom-8 w-48 h-48 bg-amber-400 rounded-full blur-3xl opacity-20"></div>
              <div class="absolute -left-8 -top-8 w-32 h-32 bg-sky-400 rounded-full blur-2xl opacity-10"></div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <mat-icon class="text-emerald-500 mb-3">eco</mat-icon>
                <h4 class="font-bold text-slate-900 mb-1">Carbon Reduction</h4>
                <p class="text-sm text-slate-600">Equivalent to planting {{ treesPlanted() }} trees per year.</p>
              </div>
              <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <mat-icon class="text-indigo-500 mb-3">account_balance_wallet</mat-icon>
                <h4 class="font-bold text-slate-900 mb-1">25-Year Savings</h4>
                <p class="text-sm text-slate-600">Total estimated savings of ₱{{ directSavings25Year() | number:'1.0-0' }}M.</p>
              </div>
            </div>

            <button class="w-full py-5 bg-amber-500 hover:bg-amber-600 text-white font-black rounded-2xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 group transform active:scale-[0.98]">
              Get a Detailed Quotation
              <mat-icon class="group-hover:translate-x-1 transition-transform">arrow_forward</mat-icon>
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
    :host {
      display: block;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    `
  ]
})
export class SolarCalculator {
  calcForm = new FormGroup({
    monthlyBill: new FormControl(8000, [Validators.required, Validators.min(500)]),
    kwhRate: new FormControl(12, [Validators.min(1)]),
  });

  // Derived signals using values from the form
  monthlyBill = signal(8000);
  kwhRate = signal(12);

  constructor() {
    this.calcForm.valueChanges.subscribe(val => {
      this.monthlyBill.set(val.monthlyBill || 0);
      this.kwhRate.set(val.kwhRate || 12);
    });
  }

  estimatedSavings = computed(() => {
    // Assuming a solar system can offset about 70-90% of the bill on average in PH
    return this.monthlyBill() * 0.85;
  });

  systemSize = computed(() => {
    const bill = this.monthlyBill();
    const rate = this.kwhRate() || 12;
    const monthlyKwh = bill / rate;
    const dailyKwh = monthlyKwh / 30;
    
    // PH average sun hours is ~4.5 hours
    // System Size = (Daily Energy / Sun Hours) / Efficiency (0.75-0.8)
    const size = (dailyKwh / 4.5) / 0.8;
    return parseFloat(size.toFixed(2));
  });

  paybackPeriod = computed(() => {
    // Very rough estimate: Higher bills usually have faster payback due to tiered pricing
    if (this.monthlyBill() > 15000) return 3.5;
    if (this.monthlyBill() > 8000) return 4.5;
    return 6;
  });

  treesPlanted = computed(() => {
    // ~1kWp saves ~1 ton of CO2 per year
    // 1 ton CO2 is roughly 45 trees
    return Math.round(this.systemSize() * 45);
  });

  directSavings25Year = computed(() => {
    // 25 years of monthly savings, with 3% annual electricity inflation
    let total = 0;
    let annualSavings = this.estimatedSavings() * 12;
    for (let i = 0; i < 25; i++) {
        total += annualSavings;
        annualSavings *= 1.03;
    }
    return parseFloat((total / 1000000).toFixed(2));
  });
}
