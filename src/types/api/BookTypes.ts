export enum BookStatusEnum {
  TO_READ,
  READING,
  READ,
  ABANDONED,
}

export type BookReadingStatusType =
  | 'TO_READ'
  | 'READING'
  | 'READ'
  | 'ABANDONED';

export type BookListItemType = {
  id: number;
  title: string;
  author: string;
  price: number;
};

type ReviewType = {
  username: string;
  review: string;
};

export type BookDetails = {
  book: BookListItemType;
  rate: number;
  myRate: number;
  reviews: ReviewType[];
  isRateByMe: boolean;
  isReviewByMe: boolean;
  status: BookReadingStatusType | null;
};

export type OrderType = {
  id: number;
  book: BookListItemType;
};

export type OrderDetailsType = {
  id: number;
  book: BookListItemType;
  customerFullName: string;
  deliverFullAddress: string;
};
