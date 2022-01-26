import { readFileSync } from 'fs';
import { Index } from 'flexsearch';

const SEARCH_INDEX_PATH = './search-index.json';

export const loadSearchIndex = () => {
  try {
    const buffer = readFileSync(SEARCH_INDEX_PATH);
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
