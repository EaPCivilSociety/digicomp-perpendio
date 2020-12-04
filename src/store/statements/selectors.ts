import { maturityLevels } from 'data';
import _ from 'lodash';

import { RootState } from 'store';

import { Statement } from './types';

export const getStatements = (state: RootState) =>
  state.statements.allStatements;

export const getMaturityStages = (state: RootState): string[] =>
  maturityLevels.map((ml: any) => ml.id);

export const getStatementsByCategory = (categoryId: string) => (
  state: RootState
) => {
  return state.statements.allStatements.filter(
    (s) => s.category === categoryId
  );
};

export const getStatementsUnaswered = (categoryId: string) => (
  state: RootState
) => {
  const filteredStatements = getStatementsByCategory(categoryId)(state);
  const unansweredStatements = _.differenceWith(
    filteredStatements,
    state.results.allResults,
    (first, second) => first.statementId === second.statementId
  );
  return unansweredStatements;
};

export const getStatementsAnswered = (categoryId: string) => (
  state: RootState
) => {
  const filteredStatements = getStatementsByCategory(categoryId)(state);
  const answeredStatements = filteredStatements.filter(
    (statement) =>
      state.results.allResults.filter(
        (res) => res.statementId === statement.statementId
      ).length > 0
  );

  return answeredStatements;
};

export const getRandomStatement = (categoryId: string) => (
  state: RootState
) => {
  const statements = getStatementsUnaswered(categoryId)(state);
  const mandatoryStatements = statements.filter((s) => s.mandatory);

  if (mandatoryStatements.length > 0) {
    return _.sample<Statement>(mandatoryStatements);
  }

  return _.sample<Statement>(statements);
};
