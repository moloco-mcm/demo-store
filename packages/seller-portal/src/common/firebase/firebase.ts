import { initializeApp, getApp, getApps } from 'firebase/app';
import { initializeAuth, getAuth, inMemoryPersistence } from 'firebase/auth';

import firebaseConfigs from './config';

const config = (() => {
  if (process.env.NEXT_PUBLIC_STAGE === 'prod') return firebaseConfigs.prod;
  // fallback to dev config, so firebase app always to be initialized
  return firebaseConfigs.test;
})();

export const getFirebaseApp = () => {
  if (getApps().length === 0) {
    const app = initializeApp(config);

    initializeAuth(app, {
      persistence: inMemoryPersistence,
    });

    return app;
  }
  return getApp();
};

export const getFirebaseAuth = () => {
  const app = getFirebaseApp();
  return getAuth(app);
};
