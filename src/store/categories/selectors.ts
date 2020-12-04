import { RootState } from 'store';

export const getCategories = (state: RootState) => state.categories;

export const getCategoryById = (id: string) => (state: RootState) =>
  state.categories.find((c) => c.id === id);
