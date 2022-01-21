import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import 'styled-components/macro';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import Input from '@rmp-demo-store/ui/input';
import { IconButton } from '@rmp-demo-store/ui/button';
import Stack from '@rmp-demo-store/ui/stack';
import { space, zIndex } from '@rmp-demo-store/ui/theme-utils';

import useQueryParams from '../../hooks/use-query-params';
import AppLayout from '../../containers/app-layout';
import SearchResult from '../../containers/search-result';

const Search: NextPage<{}> = () => {
  const router = useRouter();
  const { t } = useTranslation('search');

  const { searchWord: searchWordQueryParam } = useQueryParams();

  const [searchWord, setSearchWord] = React.useState(
    () => searchWordQueryParam
  );

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
        <title>Demo Store {searchWord && `- ${searchWord}`}</title>
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
            placeholder={t('search')}
            autoFocus
            onChange={handleSearchWordInputChange}
            onKeyDown={handleSearchWordInputKeyDown}
          />
        </Stack>
        {searchWordQueryParam && (
          <SearchResult searchWord={searchWordQueryParam} />
        )}
      </AppLayout>
    </>
  );
};

export default Search;
