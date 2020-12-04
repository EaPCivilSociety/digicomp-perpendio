import { RootState } from 'store';

export const getResults = (state: RootState) => {
  return state.results.allResults;
};

export const getResultsByCategory = (categoryId: string) => (
  state: RootState
) => {
  return getResults(state).filter((r) => r.category === categoryId);
};

export const getGoals = (state: RootState) => {
  return state.results.goals;
};
