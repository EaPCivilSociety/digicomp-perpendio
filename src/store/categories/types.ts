export type Category = CategoryLanguage & {
  id: string;
};

export interface CategoryData {
  name: string;
  description: string;
}

export interface CategoryLanguage {
  [language: string]: CategoryData;
}

// REDUX TYPES
export type CategoryState = Category[];

export enum CategoryActions {
  SET_CATEGORIES = 'categories/set_categories',
}
