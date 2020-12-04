import { Result, ResultActions } from './types';

export const setResult = (payload: Result) => ({
  type: ResultActions.SET_RESULT,
  payload,
});

export const loadResults = (payload: Result) => ({
  type: ResultActions.LOAD_RESULTS,
  payload,
});

export const loadGoals = (payload: Result) => ({
  type: ResultActions.LOAD_GOALS,
  payload,
});

export const setGoal = (maturityStage: string, categoryId: string) => ({
  type: ResultActions.SET_GOAL,
  payload: { maturityStage, categoryId },
});

export const removeGoal = (maturityStage: string, categoryId: string) => ({
  type: ResultActions.REMOVE_GOAL,
  payload: { maturityStage, categoryId },
});

export const reset = () => ({
  type: ResultActions.RESET,
});
