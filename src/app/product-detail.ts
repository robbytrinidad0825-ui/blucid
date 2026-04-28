import {Component, inject, signal, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {SeoService} from './seo';

interface ProductSpec {
  label: string;
  value: string;
}

interface ProductInfo {
  id: string;
  name: string;
  category: string;
  desc: string;
  inStock: boolean;
  images: string[];
  specs: ProductSpec[];
  features?: { icon: string, text: string }[];
}

@Component({
  selector: 'app-product-detail',
  imports: [MatIconModule, RouterLink],
  template: `
    @if (product) {
      <section class="pt-20 pb-12 bg-slate-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <a routerLink="/products" class="inline-flex items-center text-sm font-bold text-primary hover:underline mb-8">
            <mat-icon class="mr-2">arrow_back</mat-icon>
            Back to Products
          </a>

          <div class="lg:grid lg:grid-cols-2 lg:gap-16">
            <!-- Image Carousel & Zoom -->
            <div class="space-y-6">
              <div class="relative aspect-square rounded-[2.5rem] overflow-hidden bg-white border border-slate-100 shadow-sm group cursor-zoom-in">
                <img 
                  [src]="product.images[activeImageIndex()]" 
                  [alt]="product.name" 
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-150"
                  [style.transform-origin]="zoomOrigin()"
                  (mousemove)="handleZoom($event)"
                  (mouseleave)="resetZoom()"
                  referrerpolicy="no-referrer"
                >
                <div class="absolute top-4 left-4">
                  @if (!product.inStock) {
                    <div class="px-4 py-1.5 bg-rose-500 text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                      Out of Stock
                    </div>
                  }
                </div>
              </div>

              <!-- Thumbnails -->
              <div class="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                @for (img of product.images; track img; let i = $index) {
                  <button 
                    (click)="activeImageIndex.set(i)"
                    [class]="activeImageIndex() === i ? 'border-primary ring-2 ring-primary/20' : 'border-slate-100 hover:border-primary/50'"
                    class="flex-shrink-0 w-24 h-24 rounded-2xl border-2 overflow-hidden bg-white transition-all"
                  >
                    <img [src]="img" [alt]="product.name" class="w-full h-full object-cover" referrerpolicy="no-referrer">
                  </button>
                }
              </div>
            </div>

            <!-- Product Info -->
            <div class="mt-12 lg:mt-0">
              <div class="mb-8">
                <div class="text-xs font-bold uppercase tracking-widest text-primary mb-4">{{product.category}}</div>
                <h1 class="text-4xl lg:text-5xl font-display font-black text-secondary mb-4">{{product.name}}</h1>
              </div>

              <p class="text-slate-800 text-lg leading-relaxed mb-10">{{product.desc}}</p>

              <div class="space-y-6 mb-10">
                <h3 class="text-sm font-bold uppercase tracking-widest text-secondary border-b border-slate-100 pb-4">Technical Specifications</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                  @for (spec of product.specs; track spec.label) {
                    <div class="flex justify-between items-center py-2 border-b border-slate-50">
                      <span class="text-slate-400 text-sm">{{spec.label}}</span>
                      <span class="text-secondary font-bold text-sm">{{spec.value}}</span>
                    </div>
                  }
                </div>
              </div>

              <div class="mb-10">
                <h3 class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Share this product:</h3>
                <div class="flex gap-3">
                  <button (click)="share('facebook')" class="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-primary hover:text-primary transition-all" title="Share on Facebook">
                    <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </button>
                  <button (click)="share('twitter')" class="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-primary hover:text-primary transition-all" title="Share on X">
                    <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </button>
                  <button (click)="share('linkedin')" class="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-primary hover:text-primary transition-all" title="Share on LinkedIn">
                    <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </button>
                  <button (click)="share('whatsapp')" class="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-primary hover:text-primary transition-all" title="Share on WhatsApp">
                    <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </button>
                </div>
              </div>

              <div class="flex flex-col sm:flex-row gap-4">
                <a 
                  [routerLink]="['/contact']" 
                  [queryParams]="{interest: product.name}"
                  class="flex-grow inline-flex items-center justify-center px-8 py-4 rounded-full bg-slate-900 text-white font-bold hover:bg-primary transition-all shadow-xl shadow-blue-200"
                >
                  <mat-icon class="mr-2">request_quote</mat-icon>
                  Get a Quote
                </a>
                <button class="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-slate-200 text-secondary font-bold hover:bg-slate-50 transition-all">
                  <mat-icon class="mr-2">favorite_border</mat-icon>
                  Wishlist
                </button>
              </div>

              <div class="mt-10 flex flex-wrap items-center gap-6 text-slate-400 text-xs font-bold uppercase tracking-widest">
                @for (feat of product.features; track $index) {
                  <div class="flex items-center gap-2">
                    <mat-icon class="text-primary text-sm">{{feat.icon}}</mat-icon>
                    {{feat.text}}
                  </div>
                } @empty {
                  <div class="flex items-center gap-2">
                    <mat-icon class="text-primary text-sm">verified</mat-icon>
                    Genuine Product
                  </div>
                  <div class="flex items-center gap-2">
                    <mat-icon class="text-primary text-sm">local_shipping</mat-icon>
                    Laguna Delivery
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    } @else {
      <div class="py-40 text-center">
        <h1 class="text-2xl font-bold text-secondary">Product not found</h1>
        <a routerLink="/products" class="text-primary font-bold hover:underline mt-4 inline-block">Return to Shop</a>
      </div>
    }
  `,
  styles: [`
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
  `]
})
export class ProductDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private seo = inject(SeoService);
  
  private platformId = inject(PLATFORM_ID);
  
  activeImageIndex = signal(0);
  zoomOrigin = signal('center');

  ngOnInit() {
    this.route.params.subscribe(() => {
      const product = this.product;
      if (product) {
        this.seo.updateTags({
          title: product.name,
          description: product.desc,
          image: product.images[0],
          url: `https://blucidenterprise.com/product/${product.id}`
        });
      }
    });
  }

  productData: Record<string, ProductInfo> = {
    'blucid-mono-550w': {
      id: 'blucid-mono-550w',
      name: 'Blucid 550W Mono-Crystalline Panel',
      category: 'Solar PV',
      desc: 'Our premium solar panel featuring high-efficiency monocrystalline cells with PERC technology. Designed for maximum energy yield even in low-light conditions, perfect for industrial and residential rooftops in the Philippines.',
      inStock: true,
      images: [
        'https://www.seaforestpv.com/uploadfile/202104/15/c198d017f8916bec19d695977febcca9_medium.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu1dKGqsW14GL7Qy5Qg58SXAj2iKkTBn9s0g&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfd3i5tDxQI0VK1hPyaO5-g-wVNUKIGMMXcA&s'
      ],
      specs: [
        { label: 'Max Power', value: '550W' },
        { label: 'Efficiency', value: '21.3%' },
        { label: 'Cell Type', value: 'Monocrystalline PERC' },
        { label: 'Dimensions', value: '2279 x 1134 x 35mm' },
        { label: 'Weight', value: '28.5 kg' },
        { label: 'Warranty', value: '25 Years Performance' }
      ],
      features: [
        { icon: 'verified', text: 'Tier 1 Quality' },
        { icon: 'wb_sunny', text: 'High Efficiency PERC' },
        { icon: 'security', text: '25-Year Performance' },
        { icon: 'location_on', text: 'Laguna Stock' }
      ]
    },
    'industrial-ups-10kva': {
      id: 'industrial-ups-10kva',
      name: 'Industrial Double Conversion UPS (10kVA)',
      category: 'Power Systems',
      desc: 'True online double conversion UPS designed for critical industrial loads. It provides perfectly clean power with zero transition time during outages, ensuring your sensitive machinery and servers are always protected.',
      inStock: true,
      images: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRhO8GSDAFs44Gvq8NM_PFZM9bF86yBWf3xQ&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRhO8GSDAFs44Gvq8NM_PFZM9bF86yBWf3xQ&s'
      ],
      specs: [
        { label: 'Capacity', value: '10kVA / 9kW' },
        { label: 'Topology', value: 'Online Double Conversion' },
        { label: 'Form Factor', value: 'Tower / Rackmount' },
        { label: 'Power Factor', value: '0.9' },
        { label: 'Efficiency', value: '94% (High Efficiency Mode)' },
        { label: 'Warranty', value: '2 Years' }
      ],
      features: [
        { icon: 'bolt', text: 'Zero Transfer Time' },
        { icon: 'settings', text: 'LCD Status Display' },
        { icon: 'battery_charging_full', text: 'Smart Charging' },
        { icon: 'power', text: 'Pure Sine Wave' }
      ]
    },
    'solar-water-purifier-sv120': {
      id: 'solar-water-purifier-sv120',
      name: 'Solar Water Purification SV-120',
      category: 'Water Solutions',
      desc: 'The SV-120 is a revolutionary solar-powered water purification unit. It uses advanced reverse osmosis and UV sterilization to produce clean drinking water from any source, including seawater and brackish groundwater.',
      inStock: true,
      images: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-pUJXe4qBbGMK5NTZ_Gd3qVH8jgfQTRvckg&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-pUJXe4qBbGMK5NTZ_Gd3qVH8jgfQTRvckg&s'
      ],
      specs: [
        { label: 'Production', value: '120 L/H (Seawater)' },
        { label: 'Power Input', value: '450W Solar PV' },
        { label: 'Filter Stages', value: '5-Stage RO + UV' },
        { label: 'Storage', value: 'External Tank Ready' },
        { label: 'Frame', value: 'Corrosion Resistant Aluminum' },
        { label: 'Auto-Flush', value: 'Integrated' }
      ],
      features: [
        { icon: 'water_drop', text: 'Clean Drinking Water' },
        { icon: 'wb_sunny', text: '100% Solar Powered' },
        { icon: 'precision_manufacturing', text: 'Reverse Osmosis' },
        { icon: 'health_and_safety', text: 'UV Sterilized' }
      ]
    },
    'telecom-rectifier-system': {
      id: 'telecom-rectifier-system',
      name: 'Telecom DC Power Rectifier System',
      category: 'Telecom',
      desc: 'Reliable DC power conversion system specialized for the telecom industry. It manages battery charging and provides stable DC output for antennas, routers, and hubs with industry-leading efficiency.',
      inStock: true,
      images: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyH5UkAXeML7Om7yPwDB0jMP6WnyfaGuwH8w&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyH5UkAXeML7Om7yPwDB0jMP6WnyfaGuwH8w&s'
      ],
      specs: [
        { label: 'Output', value: '-48V DC' },
        { label: 'Modules', value: 'Hot-Swappable' },
        { label: 'Efficiency', value: '96.5%' },
        { label: 'Monitoring', value: 'SNMP / Web Interface' },
        { label: 'Max Current', value: '150A (Expandable)' },
        { label: 'Reliability', value: 'MTBF > 500,000 Hours' }
      ],
      features: [
        { icon: 'dns', text: 'Modular Design' },
        { icon: 'network_check', text: 'IoT Remote Access' },
        { icon: 'battery_std', text: 'Temp-Compened Charging' },
        { icon: 'verified_user', text: 'Telecom Certified' }
      ]
    },
    'precision-industrial-aircon': {
      id: 'precision-industrial-aircon',
      name: 'Precision Industrial HVAC Unit',
      category: 'Air Conditioning',
      desc: 'Engineered for environments where temperature and humidity are critical. These precision air conditioners are perfect for server rooms, medical labs, and industrial control centers requiring 24/7 reliability.',
      inStock: true,
      images: [
        'https://image.made-in-china.com/202f0j00MUuoJWGsagpf/PV-Panels-400W-Watt-Polycrystalline-Solar-Panels-with-72-Cells-for-Solar-Power-System-with-Solar-Inverter.webp',
        'https://image.made-in-china.com/202f0j00MUuoJWGsagpf/PV-Panels-400W-Watt-Polycrystalline-Solar-Panels-with-72-Cells-for-Solar-Power-System-with-Solar-Inverter.webp'
      ],
      specs: [
        { label: 'Capacity', value: '5 TR (60,000 BTU)' },
        { label: 'Type', value: 'Inverter Ducted / Floor' },
        { label: 'Refrigerant', value: 'R410A (Eco-Friendly)' },
        { label: 'Humidity Control', value: 'Integrated Dehumidifier' },
        { label: 'Airflow', value: 'High Static Pressure' },
        { label: 'Maintenance', value: 'Front Access Design' }
      ],
      features: [
        { icon: 'ac_unit', text: 'Precision Cooling' },
        { icon: 'device_thermostat', text: 'Humidity Control' },
        { icon: 'timer', text: '24/7 Operation' },
        { icon: 'eco', text: 'High EER Rating' }
      ]
    },
    'smart-distribution-panel-iot': {
      id: 'smart-distribution-panel-iot',
      name: 'Smart IoT Electrical Distribution Panel',
      category: 'Electrical',
      desc: 'The brain of your electrical infrastructure. This smart panel tracks energy usage per circuit, warns of potential leaks or overloads, and allows remote monitoring and management through a secure cloud interface.',
      inStock: true,
      images: [
        'https://www.solarpartscomponents.com/wp-content/uploads/2018/08/solar-mounting-rail-SPC-R001.jpg',
        'https://www.solarpartscomponents.com/wp-content/uploads/2018/08/solar-mounting-rail-SPC-R001.jpg'
      ],
      specs: [
        { label: 'Circuits', value: '24-Way (customizable)' },
        { label: 'Connectivity', value: 'Wi-Fi / Ethernet / RS485' },
        { label: 'Monitoring', value: 'Voltage, Current, Harmonics' },
        { label: 'Alerts', value: 'Email / Push Notifications' },
        { label: 'Integration', value: 'BMS Compatible' },
        { label: 'Protection', value: 'Integrated SPD Class II' }
      ],
      features: [
        { icon: 'visibility', text: 'App Monitoring' },
        { icon: 'warning', text: 'Leakage Detection' },
        { icon: 'analytics', text: 'Energy Analytics' },
        { icon: 'lock', text: 'Certified Safety' }
      ]
    }
  };

  get product() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return null;

    // Try to load from localStorage first (for admin updates)
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem('blucid_products');
      if (stored) {
        try {
          const products = JSON.parse(stored);
          const found = products.find((p: ProductInfo) => p.id === id);
          if (found) return found;
        } catch (e) {
          console.error('Error parsing stored products', e);
        }
      }
    }

    return this.productData[id] || null;
  }

  handleZoom(event: MouseEvent) {
    if (isPlatformBrowser(this.platformId)) {
      const target = event.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      this.zoomOrigin.set(`${x}% ${y}%`);
    }
  }

  resetZoom() {
    this.zoomOrigin.set('center');
  }

  share(platform: string) {
    if (!this.product || !isPlatformBrowser(this.platformId)) return;
    
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out this ${this.product.name} from Blucid Enterprise!`);
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  }
}
