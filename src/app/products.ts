import {Component, computed, signal, OnInit, inject, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [MatIconModule, FormsModule, RouterLink],
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

    <section class="py-12 bg-white border-b border-slate-100 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <h2 class="text-center text-xs font-bold uppercase tracking-[0.3em] text-slate-400">Trusted by Industry Leaders</h2>
      </div>
      <div class="relative flex overflow-x-hidden">
        <div class="animate-marquee flex whitespace-nowrap items-center gap-16 py-4">
          @for (logo of brandLogos; track logo.name) {
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
        <!-- Duplicate for seamless loop -->
        <div class="absolute top-0 animate-marquee2 flex whitespace-nowrap items-center gap-16 py-4">
          @for (logo of brandLogos; track logo.name + '-dup') {
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

    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Filters & Sorting -->
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16 p-6 sm:p-10 bg-white rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-200/50 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-2 h-full bg-primary/10"></div>
          
          <div class="flex flex-col gap-6 flex-grow">
            <div class="flex flex-wrap items-center gap-3">
              <span class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mr-2">Product Categories</span>
              <div class="flex flex-wrap gap-2">
                @for (cat of categories(); track cat) {
                  <button 
                    (click)="activeCategory.set(cat)"
                    [class]="activeCategory() === cat ? 'bg-secondary text-white shadow-xl shadow-secondary/20 scale-105' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-100 hover:border-slate-300'"
                    class="px-5 py-2.5 rounded-2xl text-[11px] font-black transition-all duration-300 active:scale-95 flex items-center gap-2 group"
                  >
                    @if (cat === 'All') { <mat-icon class="!text-sm !w-4 !h-4 group-hover:rotate-12 transition-transform">grid_view</mat-icon> }
                    @else if (cat === 'Solar Panels') { <mat-icon class="!text-sm !w-4 !h-4 group-hover:rotate-12 transition-transform">wb_sunny</mat-icon> }
                    @else if (cat === 'Batteries') { <mat-icon class="!text-sm !w-4 !h-4 group-hover:rotate-12 transition-transform">battery_charging_full</mat-icon> }
                    @else if (cat === 'Switch Panels') { <mat-icon class="!text-sm !w-4 !h-4 group-hover:rotate-12 transition-transform">settings_input_component</mat-icon> }
                    @else { <mat-icon class="!text-sm !w-4 !h-4 group-hover:rotate-12 transition-transform">extension</mat-icon> }
                    {{cat}}
                  </button>
                }
              </div>
            </div>

            <div class="flex flex-wrap items-center gap-8">
              <div class="flex items-center gap-4 group">
                <div class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors border border-slate-100">
                  <mat-icon class="!text-xl">sort</mat-icon>
                </div>
                <div class="flex flex-col">
                  <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Sort Products</span>
                  <select 
                    [(ngModel)]="sortBy" 
                    class="bg-transparent border-0 p-0 text-sm font-black text-secondary focus:outline-none focus:ring-0 cursor-pointer hover:text-primary transition-colors"
                  >
                    <option value="default">Featured Selection</option>
                  </select>
                </div>
              </div>

              <div class="h-8 w-px bg-slate-200 hidden sm:block"></div>

              <label class="flex items-center gap-4 cursor-pointer group select-none">
                <div class="relative">
                  <input type="checkbox" [(ngModel)]="onlyInStock" class="sr-only peer">
                  <div class="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:bg-primary transition-all duration-500 shadow-inner"></div>
                  <div class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-lg transition-transform duration-500 peer-checked:translate-x-5 flex items-center justify-center">
                    <div class="w-1 h-1 rounded-full bg-slate-200 peer-checked:bg-primary"></div>
                  </div>
                </div>
                <div class="flex flex-col">
                  <span class="text-[11px] font-black uppercase tracking-widest text-slate-600 group-hover:text-primary transition-colors">In Stock Only</span>
                  <span class="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Available now</span>
                </div>
              </label>

              @if (isAnyFilterActive()) {
                <div class="ml-auto">
                    <button 
                      (click)="clearFilters()"
                      class="flex items-center gap-2 text-rose-500 hover:text-rose-600 text-[10px] font-black uppercase tracking-widest transition-all hover:gap-3 bg-rose-50 px-4 py-2 rounded-xl border border-rose-100 hover:bg-rose-100 shadow-sm"
                    >
                      Reset Filters
                      <mat-icon class="!text-sm !w-4 !h-4">refresh</mat-icon>
                    </button>
                </div>
              }
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          @for (product of filteredProducts(); track product.name) {
            <div class="group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-slate-100 transition-all duration-500">
              <div class="aspect-square overflow-hidden bg-slate-50 relative">
                <a [routerLink]="['/products', product.id]">
                  <img [src]="product.images && product.images.length > 0 ? product.images[0] : (product.image || '')" [alt]="product.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerpolicy="no-referrer">
                </a>
                <div class="absolute top-4 left-4 flex gap-2">
                  <div class="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/10">
                    {{product.category}}
                  </div>
                  @if (!product.inStock) {
                    <div class="px-3 py-1 bg-rose-500 text-white rounded-full text-[10px] font-bold uppercase tracking-widest">
                      Out of Stock
                    </div>
                  }
                </div>
              </div>
              <div class="p-8">
                <a [routerLink]="['/products', product.id]">
                  <h3 class="text-xl font-bold text-secondary mb-2 group-hover:text-primary transition-colors">{{product.name}}</h3>
                </a>
                <p class="text-slate-500 text-sm mb-6 leading-relaxed">{{product.desc}}</p>
                <div class="flex flex-col gap-4">
                  <div class="flex items-center justify-between">
                    
                    <!-- Share Icons -->
                    <div class="flex gap-2">
                       <button (click)="share('facebook', product)" class="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all" title="Share on Facebook">
                         <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                       </button>
                       <button (click)="share('whatsapp', product)" class="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-green-500 hover:border-green-500 transition-all" title="Share on WhatsApp">
                         <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                       </button>
                    </div>
                  </div>

                  <a 
                    [routerLink]="['/contact']" 
                    [queryParams]="{interest: product.name}"
                    class="flex items-center justify-center gap-2 w-full py-4 bg-slate-900 hover:bg-primary text-white rounded-2xl font-bold transition-all shadow-lg shadow-slate-200 group/btn"
                  >
                    <mat-icon class="text-sm group-hover:scale-110 transition-transform">request_quote</mat-icon>
                    Request a Quote
                  </a>
                </div>
              </div>
            </div>
          } @empty {
            <div class="col-span-full py-20 text-center">
              <mat-icon class="text-6xl text-slate-200 mb-4">search_off</mat-icon>
              <h3 class="text-xl font-bold text-secondary">No products found</h3>
              <p class="text-slate-500">Try adjusting your filters or category selection.</p>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class Products implements OnInit {
  private platformId = inject(PLATFORM_ID);

  pageData = signal({
    headerTitle: 'Our Products',
    headerSubtitle: 'High-performance solar hardware and electrical components for every installation.',
    bannerImage: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2072&auto=format&fit=crop',
  });

  activeCategory = signal('All');
  categories = computed(() => {
    const cats = this.products().map(p => p.category);
    return ['All', ...new Set(cats)];
  });
  sortBy = signal<'default'>('default');
  onlyInStock = signal(false);

  isAnyFilterActive = computed(() => {
    return this.activeCategory() !== 'All' || this.onlyInStock();
  });

  clearFilters() {
    this.activeCategory.set('All');
    this.onlyInStock.set(false);
    this.sortBy.set('default');
  }

  brandLogos = [
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
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  products = signal<any[]>([
    {
      id: 'blucid-mono-550w',
      name: 'Blucid 550W Mono-Crystalline Panel',
      category: 'Solar PV',
      desc: 'High-efficiency PERC technology solar panel designed for maximum yield in tropical climates like the Philippines.',
      inStock: true,
      image: 'https://www.seaforestpv.com/uploadfile/202104/15/c198d017f8916bec19d695977febcca9_medium.jpg',
      images: ['https://www.seaforestpv.com/uploadfile/202104/15/c198d017f8916bec19d695977febcca9_medium.jpg'],
      specs: [
        { label: 'Max Power', value: '550W' },
        { label: 'Efficiency', value: '21.3%' },
        { label: 'Cell Type', value: 'Monocrystalline PERC' },
        { label: 'Warranty', value: '25 Years Performance' }
      ]
    },
    {
      id: 'industrial-ups-10kva',
      name: 'Industrial Double Conversion UPS (10kVA)',
      category: 'Power Systems',
      desc: 'Reliable uninterrupted power supply (UPS) for hospitals, data centers, and manufacturing plants. Features zero transfer time.',
      inStock: true,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRhO8GSDAFs44Gvq8NM_PFZM9bF86yBWf3xQ&s',
      images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRhO8GSDAFs44Gvq8NM_PFZM9bF86yBWf3xQ&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRhO8GSDAFs44Gvq8NM_PFZM9bF86yBWf3xQ&s'],
      specs: [
        { label: 'Capacity', value: '10kVA / 9kW' },
        { label: 'Topology', value: 'Online Double Conversion' },
        { label: 'Input Voltage', value: '220VAC / 230VAC' },
        { label: 'Run-time', value: 'Scalable with Battery Banks' }
      ]
    },
    {
      id: 'solar-water-purifier-sv120',
      name: 'Solar Water Purification SV-120',
      category: 'Water Solutions',
      desc: 'Standalone solar-powered system for producing clean drinking water from brackish or seawater sources. 120 L/H capacity.',
      inStock: true,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-pUJXe4qBbGMK5NTZ_Gd3qVH8jgfQTRvckg&s',
      images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-pUJXe4qBbGMK5NTZ_Gd3qVH8jgfQTRvckg&s'],
      specs: [
        { label: 'Capacity', value: '120 Liters/Hour' },
        { label: 'Source', value: 'Brackish / Sea Water' },
        { label: 'Power Source', value: 'Integrated Solar PV' },
        { label: 'Filter Life', value: '12-18 Months' }
      ]
    },
    {
      id: 'telecom-rectifier-system',
      name: 'Telecom DC Power Rectifier System',
      category: 'Telecom',
      desc: 'High-grade DC power supply solution for telecom base stations and fiber optic hubs. Optimized for battery life and stability.',
      inStock: true,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyH5UkAXeML7Om7yPwDB0jMP6WnyfaGuwH8w&s',
      images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyH5UkAXeML7Om7yPwDB0jMP6WnyfaGuwH8w&s'],
      specs: [
        { label: 'Output Voltage', value: '48V DC' },
        { label: 'Efficiency', value: '>96%' },
        { label: 'Cooling', value: 'Forced Air / Natural' },
        { label: 'Compliance', value: 'Telcordia Standard' }
      ]
    },
    {
      id: 'precision-industrial-aircon',
      name: 'Precision Industrial HVAC Unit',
      category: 'Air Conditioning',
      desc: 'Dedicated cooling solution for server rooms and industrial machinery. Maintains precise temperature and humidity controls.',
      inStock: true,
      image: 'https://image.made-in-china.com/202f0j00MUuoJWGsagpf/PV-Panels-400W-Watt-Polycrystalline-Solar-Panels-with-72-Cells-for-Solar-Power-System-with-Solar-Inverter.webp',
      images: ['https://image.made-in-china.com/202f0j00MUuoJWGsagpf/PV-Panels-400W-Watt-Polycrystalline-Solar-Panels-with-72-Cells-for-Solar-Power-System-with-Solar-Inverter.webp'],
      specs: [
        { label: 'Cooling Capacity', value: '24,000 BTU - 60,000 BTU' },
        { label: 'Inverter Tech', value: 'High Efficiency DC Inverter' },
        { label: 'Usage', value: '24/7 Continuous Duty' }
      ]
    },
    {
      id: 'smart-distribution-panel-iot',
      name: 'Smart IoT Electrical Distribution Panel',
      category: 'Electrical',
      desc: 'Intelligent switch panel with real-time energy monitoring, leak detection, and automatic transfer switching capabilities.',
      inStock: true,
      image: 'https://www.solarpartscomponents.com/wp-content/uploads/2018/08/solar-mounting-rail-SPC-R001.jpg',
      images: ['https://www.solarpartscomponents.com/wp-content/uploads/2018/08/solar-mounting-rail-SPC-R001.jpg'],
      specs: [
        { label: 'Monitoring', value: 'Wi-Fi / LAN / 4G' },
        { label: 'Max Capacity', value: '100A / 200A' },
        { label: 'Sensors', value: 'Phase, Current, Temp' }
      ]
    }
  ]);

  filteredProducts = computed(() => {
    let result = [...this.products()];
    // ... filtering logic ... //
    if (this.activeCategory() !== 'All') {
      result = result.filter(p => p.category === this.activeCategory());
    }

    if (this.onlyInStock()) {
      result = result.filter(p => p.inStock);
    }

    return result;
  });

  share(platform: string, product: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
    if (!isPlatformBrowser(this.platformId)) return;
    
    // Construct valid URL for sharing - usually the detail page
    const baseUrl = window.location.origin;
    const url = encodeURIComponent(`${baseUrl}/products/${product.id}`);
    const text = encodeURIComponent(`Check out ${product.name} from Blucid Enterprise!`);
    
    let shareUrl = '';
    if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    } else if (platform === 'whatsapp') {
      shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const websiteDraft = localStorage.getItem('blucid_website_draft');
      if (websiteDraft) {
        try {
          const parsed = JSON.parse(websiteDraft);
          if (parsed && parsed.products) {
            this.pageData.set(parsed.products);
          }
        } catch { /* ignore */ }
      } else {
        const websiteContent = localStorage.getItem('blucid_website_content');
        if (websiteContent) {
          try {
            const parsed = JSON.parse(websiteContent);
            if (parsed && parsed.products) {
              this.pageData.set(parsed.products);
            }
          } catch { /* ignore */ }
        }
      }

      const productsStr = localStorage.getItem('blucid_products');
      if (productsStr) {
        try {
          const p = JSON.parse(productsStr);
          if (Array.isArray(p) && p.length > 0) {
            this.products.set(p);
          }
        } catch { /* ignore */ }
      }
    }
  }
}