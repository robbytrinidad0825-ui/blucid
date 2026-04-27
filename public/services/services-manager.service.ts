// src/app/services/services-manager.service.ts
// Handles CRUD for the "Manage Services" admin section.
// All changes saved here appear instantly on the public website.

import { Injectable } from '@angular/core';
import {
  collection, doc, addDoc, updateDoc, deleteDoc,
  getDocs, getDoc, orderBy, query, serverTimestamp, Timestamp
} from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../../src/firebase.config';

export interface ServiceStep {
  order: number;
  title: string;
  description: string;
}

export interface Service {
  id?: string;
  title: string;               // e.g. "Solar System Installation"
  iconName: string;            // Material icon name e.g. "solar_power"
  description: string;
  features: string[];          // comma-separated list split into array
  featuredImageUrl?: string;   // download URL from Firebase Storage
  featuredImagePath?: string;  // storage path for deletion
  steps: ServiceStep[];        // step-by-step process
  order: number;               // display order on public website
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

@Injectable({ providedIn: 'root' })
export class ServicesManagerService {

  private col = collection(db, 'services');

  // ── Read ────────────────────────────────────────────────────────

  async getAllServices(): Promise<Service[]> {
    const q = query(this.col, orderBy('order', 'asc'));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as Service));
  }

  async getServiceById(id: string): Promise<Service | null> {
    const snap = await getDoc(doc(db, 'services', id));
    return snap.exists() ? { id: snap.id, ...snap.data() } as Service : null;
  }

  // ── Create ──────────────────────────────────────────────────────

  async createService(data: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const ref = await addDoc(this.col, {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return ref.id;
  }

  // ── Update ──────────────────────────────────────────────────────

  async updateService(id: string, data: Partial<Service>): Promise<void> {
    await updateDoc(doc(db, 'services', id), {
      ...data,
      updatedAt: serverTimestamp()
    });
  }

  // ── Delete ──────────────────────────────────────────────────────

  async deleteService(id: string, imagePath?: string): Promise<void> {
    // Delete the service image from Storage if it exists
    if (imagePath) {
      await deleteObject(ref(storage, imagePath)).catch(() => {});
    }
    await deleteDoc(doc(db, 'services', id));
  }

  // ── Image Upload ─────────────────────────────────────────────────

  uploadServiceImage(serviceId: string, file: File): Promise<{ url: string; path: string }> {
    return new Promise((resolve, reject) => {
      const path = `services/${serviceId}/${Date.now()}_${file.name}`;
      const fileRef = ref(storage, path);
      const task = uploadBytesResumable(fileRef, file);

      task.on('state_changed', null,
        reject,
        async () => {
          const url = await getDownloadURL(task.snapshot.ref);
          resolve({ url, path });
        }
      );
    });
  }
}
