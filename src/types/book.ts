export type BadgeType = 'NEW' | 'BESTSELLER';

export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  rating: number;
  bgColor: string;
  badge?: BadgeType;
  categoryIds: number[];
  isEditorsPick: boolean;
  isBestseller: boolean;
  isNewArrival: boolean;
  dateAdded: string;
  description: string;
  pages: number;
  publisher: string;
}

export interface Category {
  id: number;
  name: string;
}
