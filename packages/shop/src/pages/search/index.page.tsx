import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import 'styled-components/macro';

import Input from '@rmp-demo-store/ui/input';
import Button from '@rmp-demo-store/ui/button';
import Stack from '@rmp-demo-store/ui/stack';
import { space, zIndex } from '@rmp-demo-store/ui/theme-utils';

import AppLayout from '../../containers/app-layout';
import SearchResult from '../../containers/search-result';

const Search: NextPage<{}> = () => {
  const [searchWord, setSearchWord] = React.useState('');

  const handleSearchWordInputChange: React.ChangeEventHandler<
    HTMLInputElement
  > = (e) => {
    setSearchWord(e.target.value);
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
            value={searchWord}
            autoFocus
            onChange={handleSearchWordInputChange}
          />
          <Button variant="ghost">Cancel</Button>
        </Stack>
        <SearchResult searchWord={searchWord} />
      </AppLayout>
    </>
  );
};

export default Search;
