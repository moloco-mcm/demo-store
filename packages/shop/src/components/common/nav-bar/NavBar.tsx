import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faHome,
  faShoppingBag,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import 'styled-components/macro';

import Link from 'next/link';

import { IconButton } from '@rmp-demo-store/ui/button';
import {
  fontWeight,
  fontSize,
  space,
  color,
  radius,
} from '@rmp-demo-store/ui/theme-utils';
import { useRouter } from 'next/router';

type Props = {
  title?: string;
  showBrand?: boolean;
  showBackButton?: boolean;
  showHomeButton?: boolean;
  showSearchButton?: boolean;
  showCartButton?: boolean;
  numOfItemsInCart?: number;
};

export const NavBar: React.FC<Props> = (props) => {
  const {
    title,
    showBrand,
    showBackButton,
    showHomeButton,
    showSearchButton,
    showCartButton,
    numOfItemsInCart,
  } = props;

  const router = useRouter();

  const handleBackButtonClick = () => {
    if (history.length === 1) {
      router.push('/');
      return;
    }
    router.back();
  };

  const handleHomeButtonClick = () => {
    router.push('/');
  };

  const numOfLeftButtons = +!!showBackButton + +!!showHomeButton;
  const numOfRightButtons = +!!showSearchButton + +!!showCartButton;

  const titlePaddingComp = numOfLeftButtons - numOfRightButtons;

  return (
    <div
      css={`
        position: sticky;
        top: 0;
        display: flex;
        align-items: center;
        padding: ${space(2)};
        z-index: 10;
        background: ${color('white')};
      `}
    >
      {showBackButton && (
        <IconButton
          variant="ghost"
          colorScheme="gray"
          onClick={handleBackButtonClick}
        >
          <FontAwesomeIcon icon={faArrowLeft} size="lg" fixedWidth />
        </IconButton>
      )}
      {showHomeButton && (
        <IconButton
          variant="ghost"
          colorScheme="gray"
          onClick={handleHomeButtonClick}
        >
          <FontAwesomeIcon icon={faHome} size="lg" fixedWidth />
        </IconButton>
      )}
      {showBrand && (
        <div
          css={`
            flex: 1;
            padding: 0 ${space(2)};
            font-size: ${fontSize('lg')};
            font-weight: ${fontWeight('bold')};
          `}
        >
          <FontAwesomeIcon
            icon={faStore}
            css={`
              margin-right: ${space(2)};
            `}
          />
          Demo Store
        </div>
      )}
      {title && (
        <h1
          css={`
            line-height: ${space(10)};
            flex: 1;
            text-align: center;
            padding-left: calc(
              ${space(2)} + ${space(10)} *
                ${titlePaddingComp < 0 ? Math.abs(titlePaddingComp) : 0}
            );
            padding-right: calc(
              ${space(2)} + ${space(10)} *
                ${titlePaddingComp > 0 ? Math.abs(titlePaddingComp) : 0}
            );
            font-size: ${fontSize('lg')};
            font-weight: ${fontWeight('bold')};
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          `}
        >
          {title}
        </h1>
      )}
      {showSearchButton && (
        <IconButton variant="ghost" colorScheme="gray">
          <FontAwesomeIcon icon={faSearch} size="lg" fixedWidth />
        </IconButton>
      )}
      {showCartButton && (
        <div
          css={`
            position: relative;
          `}
        >
          <Link href="/cart" passHref>
            <IconButton variant="ghost" colorScheme="gray">
              <FontAwesomeIcon icon={faShoppingBag} size="lg" fixedWidth />
            </IconButton>
          </Link>
          {numOfItemsInCart !== undefined && numOfItemsInCart > 0 && (
            <span
              css={`
                position: absolute;
                display: flex;
                justify-content: center;
                align-items: center;
                top: 0;
                right: 0;
                min-width: 2.3ch;
                height: 2.3ch;
                padding: 0 ${space(1)};
                font-size: ${fontSize('sm')};
                font-weight: ${fontWeight('bold')};
                border-radius: ${radius('full')};
                color: ${color('white')};
                background-color: ${color('purple.500')};
                user-select: none;
                pointer-events: none;
              `}
            >
              {numOfItemsInCart > 99 ? '99+' : numOfItemsInCart}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
