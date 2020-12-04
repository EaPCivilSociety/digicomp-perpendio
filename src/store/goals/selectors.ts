import { RootState } from 'store';

export const getGoalActive = (state: RootState) => {
  return state.goal.settingGoalsActive;
};
