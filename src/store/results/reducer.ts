import { Goal, Result, ResultActions, ResultState } from './types';

const initialState: ResultState = {
  allResults: [],
  goals: [],
};

export const resultReducer = (
  state: ResultState = initialState,
  action: {
    type: ResultActions;
    payload: any;
  }
): ResultState => {
  switch (action.type) {
    case ResultActions.SET_RESULT:
      const result = action.payload as Result;
      return { ...state, allResults: [...state.allResults, result] };
    case ResultActions.LOAD_RESULTS:
      return { ...state, allResults: action.payload };
    case ResultActions.LOAD_GOALS:
      return { ...state, goals: action.payload };
    case ResultActions.SET_GOAL:
      const goalToAdd = action.payload as Goal;
      return { ...state, goals: [...state.goals, goalToAdd] };
    case ResultActions.REMOVE_GOAL:
      const goalToRemove = action.payload as Goal;
      const newGoals: Goal[] = [];
      state.goals.forEach((g) => {
        if (
          g.categoryId === goalToRemove.categoryId &&
          g.maturityStage === goalToRemove.maturityStage
        ) {
          return;
        }
        newGoals.push(g);
      });
      return { ...state, goals: newGoals };
    case ResultActions.RESET:
      return initialState;
  }
  return state;
};
