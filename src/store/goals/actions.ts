import { GoalActions } from './types';

export const setGoalActive = (payload: boolean) => ({
  type: GoalActions.SET_GOAL_ACTIVE,
  payload,
});
