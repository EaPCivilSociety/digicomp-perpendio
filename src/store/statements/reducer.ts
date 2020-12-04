import { Statement, StatementActions, StatementState } from './types';

const initialState = {
  allStatements: [],
  activeStatement: null,
};

export const statementReducer = (
  state: StatementState = initialState,
  action: {
    type: StatementActions;
    payload: any;
  }
): StatementState => {
  switch (action.type) {
    case StatementActions.SET_STATEMENTS:
      const statements: Statement[] = action.payload.map(
        (s: Statement, i: number) => ({ ...s, statementId: i })
      );
      return {
        ...state,
        allStatements: statements,
      };
  }
  return state;
};
