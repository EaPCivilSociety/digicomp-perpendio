import { CategoryActions, CategoryState } from './types';

export const setCategories = (payload: CategoryState) => ({
  type: CategoryActions.SET_CATEGORIES,
  payload,
});
