import * as admin from 'firebase-admin';

export const getFirebaseAdminApp = () => {
  if (admin.apps.length === 0) {
    // To enable firebase admin SDK, do one of the followings
    // a) put service account credential to the FIREBASE_SERVICE_ACCOUNT env variable
    // b) put the path to  JSON file with service account key to the GOOGLE_APPLICATION_CREDENTIALS env variable
    const appOptions = process.env.FIREBASE_SERVICE_ACCOUNT
      ? {
          credential: admin.credential.cert(
            JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT) // use FIREBASE_SERVICE_ACCOUNT
          ),
        }
      : undefined; // fallback to GOOGLE_APPLICATION_CREDENTIALS

    const app = admin.initializeApp(appOptions);

    app.firestore().settings({ ignoreUndefinedProperties: true });
    return app;
  }
  return admin.app();
};
