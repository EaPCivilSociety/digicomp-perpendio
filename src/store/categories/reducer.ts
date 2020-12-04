import { CategoryActions, CategoryState } from './types';

export const categoryReducer = (
  state: CategoryState = [],
  action: {
    type: CategoryActions;
    payload: CategoryState;
  }
): CategoryState => {
  switch (action.type) {
    case CategoryActions.SET_CATEGORIES:
      return action.payload;
  }
  return state;
};
