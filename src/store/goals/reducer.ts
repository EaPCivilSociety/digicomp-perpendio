import { GoalActions, GoalState } from './types';

const initialState = {
  settingGoalsActive: false,
};

export const goalReducer = (
  state: GoalState = initialState,
  action: {
    type: GoalActions;
    payload: any;
  }
): GoalState => {
  switch (action.type) {
    case GoalActions.SET_GOAL_ACTIVE:
      const newValue = action.payload as boolean;
      return {
        ...state,
        settingGoalsActive: newValue,
      };
  }
  return state;
};
