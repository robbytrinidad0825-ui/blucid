// src/app/services/website-content.service.ts
// Two responsibilities:
//   1. Customer Inquiries — read/delete messages submitted from the public website
//   2. Edit Website      — save/load editable content (hero text, about section, etc.)
//      that appears live on the public-facing website

import { Injectable } from '@angular/core';
import {
  collection, doc, addDoc, updateDoc, deleteDoc,
  getDocs, getDoc, setDoc, orderBy, query, where,
  serverTimestamp, Timestamp
} from 'firebase/firestore';
import { db } from '../src/firebase.config';

// ─── Customer Inquiries ──────────────────────────────────────────

export interface CustomerInquiry {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  isRead: boolean;
  createdAt?: Timestamp;
}

// ─── Website Editable Content ────────────────────────────────────

export interface HeroContent {
  headline: string;       // main big title
  subheadline: string;
  ctaText: string;        // button label e.g. "Get a Free Quote"
  ctaLink: string;
  backgroundImageUrl?: string;
  backgroundImagePath?: string;
}

export interface AboutContent {
  title: string;
  description: string;
  imageUrl?: string;
  imagePath?: string;
}

export interface WebsiteContent {
  hero: HeroContent;
  about: AboutContent;
  contactEmail: string;
  contactPhone: string;
  address: string;
  updatedAt?: Timestamp;
}

// ─── Service ─────────────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class WebsiteContentService {

  // ── Customer Inquiries ──────────────────────────────────────────

  async getAllInquiries(): Promise<CustomerInquiry[]> {
    const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as CustomerInquiry));
  }

  async getUnreadInquiries(): Promise<CustomerInquiry[]> {
    const q = query(collection(db, 'inquiries'), where('isRead', '==', false));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as CustomerInquiry));
  }

  // Called when a visitor submits the contact form on the public website
  async submitInquiry(data: Omit<CustomerInquiry, 'id' | 'isRead' | 'createdAt'>): Promise<void> {
    await addDoc(collection(db, 'inquiries'), {
      ...data,
      isRead: false,
      createdAt: serverTimestamp()
    });
  }

  // Mark as read when admin opens the inquiry
  async markAsRead(id: string): Promise<void> {
    await updateDoc(doc(db, 'inquiries', id), { isRead: true });
  }

  async deleteInquiry(id: string): Promise<void> {
    await deleteDoc(doc(db, 'inquiries', id));
  }

  // ── Edit Website Content ────────────────────────────────────────
  // Uses a single fixed document: websiteContent/main
  // Admin edits → saved to Firestore → public website reads it live

  async getWebsiteContent(): Promise<WebsiteContent | null> {
    const snap = await getDoc(doc(db, 'websiteContent', 'main'));
    return snap.exists() ? snap.data() as WebsiteContent : null;
  }

  async saveWebsiteContent(data: Partial<WebsiteContent>): Promise<void> {
    await setDoc(doc(db, 'websiteContent', 'main'), {
      ...data,
      updatedAt: serverTimestamp()
    }, { merge: true }); // merge:true so partial updates don't overwrite everything
  }

  // Convenience: update just the hero section
  async updateHero(hero: Partial<HeroContent>): Promise<void> {
    await this.saveWebsiteContent({ hero } as any);
  }

  // Convenience: update just the about section
  async updateAbout(about: Partial<AboutContent>): Promise<void> {
    await this.saveWebsiteContent({ about } as any);
  }
}
