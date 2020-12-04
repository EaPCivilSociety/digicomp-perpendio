export interface Statement {
  category: string;
  maturity_stage: string;
  tags: string[];
  statement: StatementLanguage;
  statementId: number;
  mandatory?: boolean;
}

export interface StatementLanguage {
  [language: string]: string;
}

// REDUX TYPES
export type StatementState = {
  allStatements: Statement[];
};

export enum StatementActions {
  SET_STATEMENTS = 'statements/set_statements',
}

export enum Answer {
  NotAtAll = 1,
  Somewhat = 2,
  VeryMuch = 3,
  DoesntApply = 4,
}
