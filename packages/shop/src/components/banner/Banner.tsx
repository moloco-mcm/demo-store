import React from 'react';
import 'styled-components/macro';

import Skeleton from '@rmp-demo-store/ui/skeleton';
import VisibilityChecker from '../common/visibility-checker';

type Props = {
  className?: string;
  isLoading?: boolean;
  imageUrl?: string;
  altText: string;
  width: number;
  height: number;
  onClick?: () => void;
  onVisible?: () => void;
};

export const Banner = (props: Props) => {
  const {
    className,
    isLoading,
    imageUrl,
    altText,
    width,
    height,
    onClick,
    onVisible,
  } = props;

  const handleClick = () => {
    if (isLoading) return;
    onClick?.();
  };

  const handleVisible = () => {
    if (isLoading) return;
    onVisible?.();
  };

  return (
    <div
      className={className}
      css={`
        position: relative;
        width: 100%;
        padding-top: ${100 * (height / width)}%;
        overflow: hidden;
      `}
    >
      {isLoading ? (
        <Skeleton
          css={`
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          `}
        />
      ) : (
        <VisibilityChecker onVisible={handleVisible}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={altText}
            css={`
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              object-fit: contain;
              user-select: none;
              cursor: pointer;
            `}
            onClick={handleClick}
          />
        </VisibilityChecker>
      )}
    </div>
  );
};
