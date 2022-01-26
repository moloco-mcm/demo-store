import { getFirebaseAdminApp } from './src/common/firebase-admin/admin';

const firebase = getFirebaseAdminApp();
const storage = firebase.storage();
const SEARCH_INDEX_FILENAME = 'search-index.json';

async function start() {
  await storage
    .bucket(process.env.GCS_BUCKET_NAME)
    .file(SEARCH_INDEX_FILENAME)
    .download({
      destination: './search-index.json',
    });

  console.log('Download finished.');
}

start();
