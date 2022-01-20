import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import 'styled-components/macro';
import { useRouter } from 'next/router';

import Input from '@rmp-demo-store/ui/input';
import Button, { IconButton } from '@rmp-demo-store/ui/button';
import Stack from '@rmp-demo-store/ui/stack';
import { space, zIndex } from '@rmp-demo-store/ui/theme-utils';

import AppLayout from '../../containers/app-layout';
import SearchResult from '../../containers/search-result';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Search: NextPage<{}> = () => {
  const router = useRouter();

  const searchWordQueryParam = (() => {
    const { query } = router;
    if (typeof query.searchWord === 'string') {
      return query.searchWord;
    }

    if (typeof query.searchWord === 'object') {
      return query.searchWord[0];
    }

    return undefined;
  })();

  const [searchWord, setSearchWord] = React.useState(
    () => searchWordQueryParam
  );

  React.useEffect(() => {
    setSearchWord(searchWordQueryParam);
  }, [searchWordQueryParam]);

  const handleBackButtonClick = () => {
    if (history.length === 1) {
      router.push('/');
      return;
    }
    router.back();
  };

  const handleSearchWordInputChange: React.ChangeEventHandler<
    HTMLInputElement
  > = (e) => {
    const { value } = e.target;
    setSearchWord(value);
  };

  const handleSearchWordInputKeyDown: React.KeyboardEventHandler<
    HTMLInputElement
  > = (e) => {
    if (e.key !== 'Enter') return;

    router.replace({
      pathname: router.pathname,
      query: {
        searchWord,
      },
    });
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
          <IconButton
            variant="ghost"
            colorScheme="gray"
            onClick={handleBackButtonClick}
          >
            <FontAwesomeIcon icon={faArrowLeft} size="lg" fixedWidth />
          </IconButton>
          <Input
            id="searchWord"
            type="text"
            value={searchWord}
            autoFocus
            onChange={handleSearchWordInputChange}
            onKeyDown={handleSearchWordInputKeyDown}
          />
          {/* <Button variant="ghost">Cancel</Button> */}
        </Stack>
        <Stack
          direction="column"
          spacing={2}
          css={`
            padding: 0 ${space(2)} ${space(2)} ${space(2)};
          `}
        >
          {searchWordQueryParam !== undefined && (
            <SearchResult searchWord={searchWordQueryParam} />
          )}
        </Stack>
      </AppLayout>
    </>
  );
};

export default Search;
