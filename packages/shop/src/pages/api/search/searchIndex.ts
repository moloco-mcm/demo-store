import { Index } from 'flexsearch';
import { getFirebaseAdminApp } from '../../../common/firebase-admin';

const SEARCH_INDEX_PATH = 'search-index.json';

export const loadSearchIndex = async () => {
  try {
    const firebase = getFirebaseAdminApp();
    const storage = firebase.storage();
    const [buffer] = await storage
      .bucket(process.env.GCS_BUCKET_NAME)
      .file(SEARCH_INDEX_PATH)
      .download();

    const content = buffer.toString();
    const serializedIndex = JSON.parse(content);

    const searchIndex = new Index();
    var keys = Object.keys(serializedIndex);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      searchIndex.import(key, serializedIndex[key]);
    }
    return searchIndex;
  } catch (error) {
    return undefined;
  }
};
