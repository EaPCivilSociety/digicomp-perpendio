import { Answer } from 'store/statements';

export interface Result {
  statementId: number;
  answerId: Answer;
  category: string;
}

export interface Goal {
  categoryId: string;
  maturityStage: string;
}

// REDUX TYPES
export type ResultState = {
  allResults: Result[];
  goals: Goal[];
};

export enum ResultActions {
  SET_RESULT = 'results/set_result',
  LOAD_RESULTS = 'results/load_results',
  LOAD_GOALS = 'results/load_goals',
  SET_GOAL = 'results/set_goal',
  REMOVE_GOAL = 'results/remove_goal',
  RESET = 'results/reset',
}
