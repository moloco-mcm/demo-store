import 'styled-components/macro';
import { space } from '@rmp-demo-store/ui/theme-utils';

import Skeleton from '@rmp-demo-store/ui/skeleton';
import { SkeletonText } from '@rmp-demo-store/ui/skeleton/SkeletonText';

import { ProductItem } from './StyledComponents';

type Props = {
  numOfRows: number;
  numOfColumns?: number;
};

export const ProductItemSkeletons = (props: Props) => {
  const { numOfRows, numOfColumns = 10 } = props;
  return (
    <>
      {Array(10)
        .fill(1)
        .map((_, index) => (
          <div key={index}>
            {Array(numOfRows)
              .fill(1)
              .map((_, index) => (
                <ProductItem.Container key={index}>
                  <ProductItem.ImageContainer>
                    <Skeleton
                      css={`
                        width: 100%;
                        height: 100%;
                      `}
                    />
                  </ProductItem.ImageContainer>
                  <ProductItem.InfoContainer>
                    <div
                      css={`
                        padding-top: ${space(1)};
                      `}
                    >
                      <SkeletonText noOfLines={3} spacing={1} />
                    </div>
                  </ProductItem.InfoContainer>
                </ProductItem.Container>
              ))}
          </div>
        ))}
    </>
  );
};
