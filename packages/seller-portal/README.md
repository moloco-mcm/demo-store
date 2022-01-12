# RMP Seller Portal

## Running local dev server

To get started, just clone the repository, set required environmental variables and run the commands below

```sh
yarn install
yarn workspace @rmp-demo-store/seller-portal dev
```

## Environmental variables

Use `.env.local` file to load environmental variables. Refer to `.sample.env.local` to see an example.

### MOLOCO RMP

- RMP_SSO_SECRET: SSO Secret Key.
- NEXT_PUBLIC_RMP_PORTAL_URL: Base URL of RMP Wigetized(Embedded) Campaign Manager.
- NEXT_PUBLIC_RMP_PLATFORM_ID: RMP Platform ID.

### Firebase

The Seller Portal app uses Firebase to authenticate users. Create a Firebase project with email/password-based auth enabled and provide configurations for the Firebase project through the env variables listed below.

- GOOGLE_APPLICATION_CREDENTIALS: Path to local Firebase service account key file (e.g. `./demo-store-adminsdk-key.json`)
- FIREBASE_SERVICE_ACCOUNT: Firebase service account credential for the project in JSON format. (Please choose between `GOOGLE_APPLICATION_CREDENTIALS` and `FIREBASE_SERVICE_ACCOUNT`. Don't use the both at the same time.)
- NEXT_PUBLIC_FIREBASE_API_KEY: API key for the Firebase project. You can obtain it from https://support.google.com/firebase/answer/701559.
- NEXT_PUBLIC_FIREBASE_PROJECT_ID: Unique identifier for the Firebase/GCP project.
- NEXT_PUBLIC_FIREBASE_APP_ID: Unique identifier for the Firebase app.

### Sentry (Optional)

- NEXT_PUBLIC_SENTRY_DSN: Sentry Data Source Name (ref: https://docs.sentry.io/product/sentry-basics/dsn-explainer/)

© Moloco, Inc. 2022 All rights reserved. Released under Apache 2.0 License
