// src/app/services/public-website.service.ts
// Used by the PUBLIC side of blucidinc.web.app — NOT the admin.
// Reads services, products, and website content from Firestore in REAL TIME.
// When admin saves a change, this updates automatically — no page refresh needed.

import { Injectable } from '@angular/core';
import {
  collection, doc, query, orderBy,
  onSnapshot, Unsubscribe
} from 'firebase/firestore';
import { Observable } from 'rxjs';
import { db } from '../src/firebase.config';
import { Service } from '../public/services/services-manager.service';
import { Product } from '../public/products/products-manager.service';
import { WebsiteContent } from './website-content.service';

@Injectable({ providedIn: 'root' })
export class PublicWebsiteService {

  // ── Real-time Services ──────────────────────────────────────────
  // Use in your public services page component
  // The Observable emits a new array every time admin changes a service

  getServicesRealtime(): Observable<Service[]> {
    return new Observable((observer) => {
      const q = query(collection(db, 'services'), orderBy('order', 'asc'));
      const unsub: Unsubscribe = onSnapshot(q,
        (snap) => {
          const services = snap.docs.map(d => ({ id: d.id, ...d.data() } as Service));
          observer.next(services);
        },
        (err) => observer.error(err)
      );
      // Cleanup when component is destroyed
      return () => unsub();
    });
  }

  // ── Real-time Products ──────────────────────────────────────────

  getProductsRealtime(): Observable<Product[]> {
    return new Observable((observer) => {
      const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
      const unsub: Unsubscribe = onSnapshot(q,
        (snap) => {
          const products = snap.docs.map(d => ({ id: d.id, ...d.data() } as Product));
          observer.next(products);
        },
        (err) => observer.error(err)
      );
      return () => unsub();
    });
  }

  // ── Real-time Website Content (hero, about, contact) ──────────

  getWebsiteContentRealtime(): Observable<WebsiteContent> {
    return new Observable((observer) => {
      const unsub: Unsubscribe = onSnapshot(
        doc(db, 'websiteContent', 'main'),
        (snap) => {
          if (snap.exists()) observer.next(snap.data() as WebsiteContent);
        },
        (err) => observer.error(err)
      );
      return () => unsub();
    });
  }
}


// ─────────────────────────────────────────────────────────────────
// EXAMPLE: How to use in your public Services page component
// src/app/pages/services/services.component.ts
// ─────────────────────────────────────────────────────────────────

/*
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PublicWebsiteService } from '../../services/public-website.service';
import { Service } from '../../services/services-manager.service';

@Component({
  selector: 'app-services',
  template: `
    <div *ngFor="let service of services">
      <mat-icon>{{ service.iconName }}</mat-icon>
      <h3>{{ service.title }}</h3>
      <p>{{ service.description }}</p>
      <img *ngIf="service.featuredImageUrl" [src]="service.featuredImageUrl" />
    </div>
  `
})
export class ServicesComponent implements OnInit, OnDestroy {
  services: Service[] = [];
  private sub!: Subscription;

  constructor(private publicSvc: PublicWebsiteService) {}

  ngOnInit(): void {
    // This auto-updates whenever admin saves a change
    this.sub = this.publicSvc.getServicesRealtime().subscribe(data => {
      this.services = data;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe(); // always clean up
  }
}
*/
