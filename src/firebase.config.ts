import { EnvironmentProviders } from '@angular/core';
import { initializeApp, provideFirebaseApp, getApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getStorage, provideStorage } from '@angular/fire/storage';

// NOTE: Replace this with your own Firebase configuration
const FIREBASE_CONFIG = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

export function provideFirebase(): EnvironmentProviders[] {
  return [
    provideFirebaseApp(() => initializeApp(FIREBASE_CONFIG)),
    provideFirestore(() => getFirestore(getApp())),
    provideAuth(() => getAuth(getApp())),
    provideStorage(() => getStorage(getApp())),
  ];
}

export const db = getFirestore(initializeApp(FIREBASE_CONFIG));
export const storage = getStorage(initializeApp(FIREBASE_CONFIG));
