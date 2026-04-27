// src/app/services/products-manager.service.ts
// Handles CRUD for the "Manage Products" admin section.
// Supports multiple product images (gallery), stock info, and status.

import { Injectable } from '@angular/core';
import {
  collection, doc, addDoc, updateDoc, deleteDoc,
  getDocs, getDoc, orderBy, query, where,
  serverTimestamp, Timestamp
} from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../../src/firebase.config';

export type ProductStatus = 'In Stock' | 'Out of Stock' | 'Low Stock';

export type ProductCategory =
  | 'Solar Panels'
  | 'Batteries'
  | 'Switch Panels'
  | 'Accessories'
  | string;   // allows custom categories

export interface ProductImage {
  url: string;
  path: string;   // storage path — needed for deletion
  order: number;
}

export interface Product {
  id?: string;
  name: string;              // e.g. "Blucid Mono-Crystalline 550W"
  category: ProductCategory;
  description: string;
  stock: number;             // number of units
  status: ProductStatus;     // auto-set based on stock
  gallery: ProductImage[];   // multiple product images
  price?: number;            // optional
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

@Injectable({ providedIn: 'root' })
export class ProductsManagerService {

  private col = collection(db, 'products');

  // ── Read ────────────────────────────────────────────────────────

  async getAllProducts(): Promise<Product[]> {
    const q = query(this.col, orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as Product));
  }

  async getProductsByCategory(category: ProductCategory): Promise<Product[]> {
    const q = query(this.col, where('category', '==', category));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as Product));
  }

  async getProductById(id: string): Promise<Product | null> {
    const snap = await getDoc(doc(db, 'products', id));
    return snap.exists() ? { id: snap.id, ...snap.data() } as Product : null;
  }

  // ── Helpers ─────────────────────────────────────────────────────

  // Automatically determine status from stock count
  resolveStatus(stock: number): ProductStatus {
    if (stock === 0) return 'Out of Stock';
    if (stock <= 5)  return 'Low Stock';
    return 'In Stock';
  }

  // ── Create ──────────────────────────────────────────────────────

  async createProduct(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const ref = await addDoc(this.col, {
      ...data,
      status: this.resolveStatus(data.stock),
      gallery: data.gallery ?? [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return ref.id;
  }

  // ── Update ──────────────────────────────────────────────────────

  async updateProduct(id: string, data: Partial<Product>): Promise<void> {
    const update: any = { ...data, updatedAt: serverTimestamp() };

    // Auto-update status whenever stock changes
    if (data.stock !== undefined) {
      update.status = this.resolveStatus(data.stock);
    }

    await updateDoc(doc(db, 'products', id), update);
  }

  // ── Delete ──────────────────────────────────────────────────────

  async deleteProduct(id: string, gallery: ProductImage[] = []): Promise<void> {
    // Remove all images from Firebase Storage
    await Promise.all(
      gallery.map(img => deleteObject(ref(storage, img.path)).catch(() => {}))
    );
    await deleteDoc(doc(db, 'products', id));
  }

  // ── Gallery Image Upload ──────────────────────────────────────────

  uploadProductImage(
    productId: string,
    file: File,
    order: number
  ): Promise<ProductImage> {
    return new Promise((resolve, reject) => {
      const path = `products/${productId}/${Date.now()}_${file.name}`;
      const fileRef = ref(storage, path);
      const task = uploadBytesResumable(fileRef, file);

      task.on('state_changed', null,
        reject,
        async () => {
          const url = await getDownloadURL(task.snapshot.ref);
          resolve({ url, path, order });
        }
      );
    });
  }

  // Upload multiple gallery images at once
  async uploadMultipleImages(productId: string, files: File[]): Promise<ProductImage[]> {
    return Promise.all(
      files.map((file, index) => this.uploadProductImage(productId, file, index))
    );
  }

  // Remove a single image from Storage + update product gallery
  async removeProductImage(productId: string, image: ProductImage, currentGallery: ProductImage[]): Promise<void> {
    await deleteObject(ref(storage, image.path)).catch(() => {});
    const updatedGallery = currentGallery
      .filter(img => img.path !== image.path)
      .map((img, index) => ({ ...img, order: index }));
    await this.updateProduct(productId, { gallery: updatedGallery });
  }
}
