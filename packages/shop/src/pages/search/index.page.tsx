import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import 'styled-components/macro';
import debounce from 'lodash/debounce';

import Input from '@rmp-demo-store/ui/input';
import Button from '@rmp-demo-store/ui/button';
import Stack from '@rmp-demo-store/ui/stack';
import { space, zIndex } from '@rmp-demo-store/ui/theme-utils';

import AppLayout from '../../containers/app-layout';
import SearchResult from '../../containers/search-result';

const DEBOUNCE_TIME = 1_000;

const Search: NextPage<{}> = () => {
  const [searchWord, setSearchWord] = React.useState('');
  const [debouncedSearchWord, setDebouncedSearchWord] =
    React.useState(searchWord);

  const updateDebouncedSearchWord = React.useMemo(
    () =>
      debounce((newSearchWord: string) => {
        setDebouncedSearchWord(newSearchWord);
      }, DEBOUNCE_TIME),
    []
  );

  const handleSearchWordInputChange: React.ChangeEventHandler<
    HTMLInputElement
  > = (e) => {
    const { value } = e.target;
    setSearchWord(value);
    updateDebouncedSearchWord(value.trim());
  };

  const handleSearchWordInputKeyDown: React.KeyboardEventHandler<
    HTMLInputElement
  > = (e) => {
    if (e.key !== 'Enter') return;
    updateDebouncedSearchWord.flush();
  };

  return (
    <>
      <Head>
        <title>Demo Store - Search</title>
      </Head>
      <AppLayout hideNavBar>
        <Stack
          spacing={1}
          css={`
            position: sticky;
            top: 0;
            padding: ${space(2)};
            background-color: inherit;
            z-index: ${zIndex('sticky')};
          `}
        >
          <Input
            type="text"
            value={searchWord}
            autoFocus
            onChange={handleSearchWordInputChange}
            onKeyDown={handleSearchWordInputKeyDown}
          />
          <Button variant="ghost">Cancel</Button>
        </Stack>
        <SearchResult searchWord={debouncedSearchWord} />
      </AppLayout>
    </>
  );
};

export default Search;
