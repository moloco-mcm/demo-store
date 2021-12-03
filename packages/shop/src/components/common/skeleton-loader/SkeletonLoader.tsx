import React from 'react';
import 'styled-components/macro';

import Skeleton from '@rmp-demo-store/ui/skeleton';

export type SkeletonLoaderOptions = {
  className?: string;
  width?: string;
  skeletonHeight?: React.ComponentProps<typeof Skeleton>['height'];
  isLoaded?: boolean;
  fallback?: React.ReactChild;
};

export const SkeletonLoader: React.FC<SkeletonLoaderOptions> = (props) => {
  const {
    className,
    children,
    width = '100%',
    isLoaded,
    skeletonHeight,
    fallback = 'Loading...',
  } = props;

  if (isLoaded) {
    return <>{children}</>;
  }

  // accept only one child. throw error if there are multiple children
  const firstChild = React.Children.only(children);

  const clonedChildren = React.isValidElement(firstChild)
    ? React.cloneElement(firstChild, {
        children: fallback, // replace child's content with the given fallback string
      })
    : fallback;

  return (
    <div
      css={`
        display: grid;
        grid-template-areas: 'stack';
        align-items: center;
        width: min-content;
      `}
      className={className}
    >
      <Skeleton
        height={skeletonHeight}
        css={`
          grid-area: stack;
          width: ${width};
        `}
      />
      <div
        css={`
          grid-area: stack;
          visibility: hidden;
        `}
        aria-hidden="true"
      >
        {clonedChildren}
      </div>
    </div>
  );
};
