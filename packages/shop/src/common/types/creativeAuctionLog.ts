export type CreativeAuctionLog = {
  response: {
    requestId: string;
    items?: {
      itemId: string;
      impTrackers: string[];
      clickTrackers: string[];
    }[];
  };
  expireAt: Date;
};
