import * as env from '@/misc/env';
import * as admin from 'firebase-admin';

export const firebase = admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: env.get('FIREBASE_DATABASE_URL'),
});
