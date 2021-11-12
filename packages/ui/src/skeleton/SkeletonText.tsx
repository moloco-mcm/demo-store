import React from 'react';
import 'styled-components/macro';

import Stack from '../stack';
import { SizeKey, SpaceKey } from '../theme/types';
import { Skeleton } from './Skeleton';

type SkeletonTextOptions = {
  noOfLines?: number;
  spacing?: SpaceKey;
  skeletonHeight?: SizeKey;
};

type SkeletonTextProps = { className?: string } & SkeletonTextOptions;

export const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
  (props, ref) => {
    const { noOfLines = 1, spacing = 2, className, skeletonHeight } = props;

    const skeletons = Array(noOfLines)
      .fill(1)
      .map((_, index) => index + 1)
      .map((lineNo) => {
        const isLast = noOfLines === lineNo;
        return (
          <Skeleton
            key={`${lineNo}`}
            height={skeletonHeight}
            css={`
              width: ${noOfLines > 1 && isLast ? '80%' : '100%'};
            `}
          />
        );
      });
    return (
      <Stack
        ref={ref}
        direction="column"
        spacing={spacing}
        className={className}
      >
        {skeletons}
      </Stack>
    );
  }
);
