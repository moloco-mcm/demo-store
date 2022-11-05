import React from 'react';
import { useRouter } from 'next/router';
import 'styled-components/macro';

import useBannerAd from '../../hooks/use-banner-ad';
import { fireTrackingEvents } from '../../common/utils/tracker';
import Banner from '../../components/banner';

type Props = {
  className?: string;
  inventoryId: string;
  items?: string[];
  searchQuery?: string;
  width: number;
  height: number;
};

export const BannerAd = (props: Props) => {
  const { className, inventoryId, items, searchQuery, width, height } = props;

  const router = useRouter();

  const { isLoading, data, isError } = useBannerAd({
    inventoryId,
    items,
    searchQuery,
  });

  const { bannerAd } = data || {};

  const handleBannerClick = () => {
    if (!bannerAd) return;
    const { clickTrackers } = bannerAd;

    if (clickTrackers) {
      fireTrackingEvents(clickTrackers);
    }

    // TODO: enable navigation
    // router.push(`/special-offer?requestId=${bannerAd.requestId}`);
  };

  const handleBannerVisible = () => {
    if (!bannerAd) return;
    const { impTrackers } = bannerAd;
    if (impTrackers) {
      fireTrackingEvents(impTrackers);
    }
  };

  // render nothing when error occurs
  if (isError) return null;

  // render nothing when no banner returned from auction
  if (!isLoading && !bannerAd) return null;

  return (
    <Banner
      className={className}
      isLoading={isLoading}
      imageUrl={bannerAd?.imageUrl}
      altText="banner ad"
      width={width}
      height={height}
      onClick={handleBannerClick}
      onVisible={handleBannerVisible}
    />
  );
};
