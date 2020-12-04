import { Statement, StatementActions } from './types';

export const setStatements = (payload: Statement[]) => ({
  type: StatementActions.SET_STATEMENTS,
  payload,
});
