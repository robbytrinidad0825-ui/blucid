// src/app/services/job-orders.service.ts
// Handles CRUD for Service Job Orders.
// Tracks client, service type, technician, schedule, location, status.

import { Injectable } from '@angular/core';
import {
  collection, doc, addDoc, updateDoc, deleteDoc,
  getDocs, getDoc, orderBy, query, where,
  serverTimestamp, Timestamp
} from 'firebase/firestore';
import { db } from '../firebase.config';

export type JobStatus = 'Pending' | 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';

export interface JobOrder {
  id?: string;
  jobId?: string;          // auto-generated display ID e.g. "#101"
  clientName: string;
  contactNumber: string;
  serviceType: string;     // must match a service title from Manage Services
  technician: string;      // assigned technician name or "Unassigned"
  scheduledDate: string;   // ISO date string e.g. "2026-05-10"
  location: string;        // e.g. "Calamba, Laguna"
  status: JobStatus;
  notes?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

@Injectable({ providedIn: 'root' })
export class JobOrdersService {

  private col = collection(db, 'jobOrders');

  // ── Read ────────────────────────────────────────────────────────

  async getAllJobOrders(): Promise<JobOrder[]> {
    const q = query(this.col, orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as JobOrder));
  }

  async getJobOrdersByStatus(status: JobStatus): Promise<JobOrder[]> {
    const q = query(this.col, where('status', '==', status));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as JobOrder));
  }

  async getJobOrderById(id: string): Promise<JobOrder | null> {
    const snap = await getDoc(doc(db, 'jobOrders', id));
    return snap.exists() ? { id: snap.id, ...snap.data() } as JobOrder : null;
  }

  // ── Create ──────────────────────────────────────────────────────

  async createJobOrder(data: Omit<JobOrder, 'id' | 'jobId' | 'createdAt' | 'updatedAt'>): Promise<string> {
    // Get total count to generate sequential job ID (#101, #102...)
    const allOrders = await this.getAllJobOrders();
    const nextNumber = 101 + allOrders.length;
    const jobId = `#${nextNumber}`;

    const ref = await addDoc(this.col, {
      ...data,
      jobId,
      status: data.status ?? 'Pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return ref.id;
  }

  // ── Update ──────────────────────────────────────────────────────

  async updateJobOrder(id: string, data: Partial<JobOrder>): Promise<void> {
    await updateDoc(doc(db, 'jobOrders', id), {
      ...data,
      updatedAt: serverTimestamp()
    });
  }

  // Shortcut: update only the status
  async updateStatus(id: string, status: JobStatus): Promise<void> {
    await this.updateJobOrder(id, { status });
  }

  // ── Delete ──────────────────────────────────────────────────────

  async deleteJobOrder(id: string): Promise<void> {
    await deleteDoc(doc(db, 'jobOrders', id));
  }
}
