import 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import { color, fontSize } from '@rmp-demo-store/ui/theme-utils';
import { FontSizeKey } from '@rmp-demo-store/ui/theme/types';

import SkeletonLoader from '../../common/skeleton-loader';

type Props = {
  isLoading?: boolean;
  rating?: number;
  reviewCount?: number;
  size?: FontSizeKey;
};

const renderStars = (
  numOfStars: number,
  icon: React.ComponentProps<typeof FontAwesomeIcon>['icon']
) =>
  Array(numOfStars)
    .fill(1)
    .map((_, index) => (
      <FontAwesomeIcon key={index} icon={icon} fixedWidth size="sm" />
    ));

export const Rating = (props: Props) => {
  const { rating, reviewCount, size = 'md', isLoading } = props;

  const { numOfFullStars, hasHalfStar, numOfEmptyStars } = (() => {
    if (rating === undefined) {
      return { numOfFullStars: 0, hasHalfStar: false, numOfEmptyStars: 0 };
    }
    const numOfFullStars = rating > 0 ? Math.floor(rating) : 0;
    const hasHalfStar = !!Math.round(rating - numOfFullStars);
    const numOfEmptyStars = 5 - numOfFullStars - (hasHalfStar ? 1 : 0);
    return { numOfFullStars, hasHalfStar, numOfEmptyStars };
  })();

  return (
    <div
      css={`
        font-size: ${fontSize(size)};
        display: flex;
      `}
    >
      <SkeletonLoader
        isLoaded={!isLoading}
        skeletonHeight={3}
        fallback={<>{renderStars(5, faStarEmpty)}</>}
      >
        <span
          css={`
            color: ${color('yellow.500')};
            display: inline-flex;
            align-items: center;
            width: max-content;
          `}
        >
          {rating !== undefined && (
            <>
              {renderStars(numOfFullStars, faStar)}
              {hasHalfStar && (
                <FontAwesomeIcon icon={faStarHalfAlt} fixedWidth size="sm" />
              )}
              {renderStars(numOfEmptyStars, faStarEmpty)}
            </>
          )}
        </span>
      </SkeletonLoader>
      {!isLoading && reviewCount !== undefined && (
        <span>{`(${reviewCount.toLocaleString()})`}</span>
      )}
    </div>
  );
};
