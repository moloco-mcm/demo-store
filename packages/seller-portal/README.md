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
- RMP_SSO_SECRET: SSO Secret Key
- NEXT_PUBLIC_RMP_PORTAL_URL: Base URL of RMP Wigetized(Embedded) Campaign Manager
- NEXT_PUBLIC_RMP_PLATFORM_ID: RMP Platform ID

### Firebase
The Seller Portal app uses Firebase to authenticate users. Create a Firebase project with email/password-based auth enabled and set one of the variables below to link the app with your Firebase project
- FIREBASE_SERVICE_ACCOUNT: Firebase service account credential for the project
- GOOGLE_APPLICATION_CREDENTIALS: Path to local Firebase service account key file (e.g. `./demo-store-adminsdk-key.json`)

### Sentry (Optional)
- NEXT_PUBLIC_SENTRY_DSN: Sentry Data Source Name (ref: https://docs.sentry.io/product/sentry-basics/dsn-explainer/)

