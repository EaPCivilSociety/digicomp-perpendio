import { Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { maturityLevels } from 'data';
import { IconTarget } from 'images/pdf';
import _ from 'lodash';
import React, { Fragment } from 'react';
import { CategoryState } from 'store/categories';
import { Language } from 'store/languages';
import { Goal, Result } from 'store/results';
import { Answer, Statement } from 'store/statements';
import commonStyles from '../common-styles';
import { CRIMSON } from '../const';

const styles = StyleSheet.create({
  categoryHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  categoryHeadingTitle: {
    marginBottom: 0,
  },
  categoryLeadingFlag: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 53,
    height: 14,
    borderRadius: 24,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#d7d7d7',
    marginLeft: 10,
    fontSize: 8,
    color: '#444',
  },
  categoryLeadingFlagImage: {
    width: 9,
    marginRight: 4,
  },
  categoryHeadingSeparator: {
    width: 247,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ccc',
    marginTop: 22,
    marginHorizontal: 'auto',
  },

  maturityLevel: {
    marginTop: 28,
  },
  maturityLevelName: {
    marginBottom: 16,
  },

  statementText: {
    fontFamily: CRIMSON,
    marginBottom: 7,
    color: '#333',
  },
  statementFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statementAnswers: {
    flexDirection: 'row',
    fontSize: 8,
    alignItems: 'center',
  },
  statementAnswerTag: {
    paddingTop: 3,
    paddingBottom: 2,
    paddingHorizontal: 6,
    border: '1pt solid #e6e6e6',
    borderRadius: 2,
    marginRight: 4,
    fontSize: 8,
  },
  statementAnswerSeparator: {
    width: StyleSheet.hairlineWidth,
    height: 18,
    backgroundColor: '#e6e6e6',
    marginLeft: 4,
    marginRight: 8,
  },
  horizontalRule: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ccc',
    marginVertical: 16,
  },
  statementTags: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statementTagSeparator: {
    color: '#ccc',
    fontSize: 12,
    marginHorizontal: 4,
  },
});

type CategoriesAndStatementsProps = {
  t: (t: string) => string;
  results: Result[];
  categories: CategoryState;
  language: Language;
  statements: Statement[];
  goals: Goal[];
};

export default function CategoriesAndStatements({
  t,
  categories,
  results,
  language,
  goals,
  statements,
}: CategoriesAndStatementsProps) {
  const answeredCategories = categories.filter((c) =>
    _.find(results, { category: c.id })
  );
  const skippedCategories = categories.filter(
    (c) => answeredCategories.indexOf(c) < 0
  );

  return (
    <Page style={commonStyles.pageBody}>
      <Text style={commonStyles.h2}>{t('pdfCategoriesAndStatements')}</Text>

      {[answeredCategories, skippedCategories].map((cs, cI) =>
        cs.map((cat, i) => {
          const hasGoal = _.find(goals, { categoryId: cat.id });
          const maturityLevel =
            !!hasGoal && _.find(maturityLevels, { id: hasGoal.maturityStage });

          return (
            <View key={cat.id} break={i > 0 || cI > 0}>
              <View style={styles.categoryHeading}>
                <Text style={[commonStyles.h3, styles.categoryHeadingTitle]}>
                  {cat[language.id].name}
                </Text>
                {!!hasGoal ? (
                  <View style={styles.categoryLeadingFlag}>
                    <Image
                      src={IconTarget}
                      style={styles.categoryLeadingFlagImage}
                    />
                    <Text>{maturityLevel[language.id].name}</Text>
                  </View>
                ) : null}
              </View>
              <Text>{cat[language.id].description}</Text>
              <View style={styles.categoryHeadingSeparator} />

              {maturityLevels.map((level: any) => {
                const levelStatements = statements.filter(
                  (s) => s.category === cat.id && s.maturity_stage === level.id
                );

                const answeredStatements = (levelStatements
                  .map((s) => {
                    const result = _.find(results, {
                      statementId: s.statementId,
                    });

                    if (result) {
                      return { ...s, result };
                    }
                    return null;
                  })
                  .filter(Boolean) as (Statement & { result: Result })[]).sort(
                  (a, b) => {
                    if (
                      a.result.answerId === Answer.DoesntApply &&
                      b.result.answerId !== Answer.DoesntApply
                    ) {
                      return 1;
                    }
                    if (
                      b.result.answerId === Answer.DoesntApply &&
                      a.result.answerId !== Answer.DoesntApply
                    ) {
                      return -1;
                    }
                    return 0;
                  }
                );
                const unansweredStatements = levelStatements.filter(
                  (s) => !_.find(results, { statementId: s.statementId })
                ) as (Statement & { result?: Result })[];

                return (
                  <View style={styles.maturityLevel} key={level.id}>
                    <Text style={[commonStyles.h4, styles.maturityLevelName]}>
                      {level[language.id].name}
                    </Text>
                    {[answeredStatements, unansweredStatements].map(
                      (mapStatements, mI) =>
                        mapStatements.map((statement, sI) => (
                          <View wrap={false} key={statement.statementId}>
                            {sI > 0 ||
                            (mI > 0 && answeredStatements.length > 0) ? (
                              <View style={styles.horizontalRule} />
                            ) : null}
                            <Text style={styles.statementText}>
                              “{statement.statement[language.id]}”
                            </Text>
                            <View style={styles.statementFooter}>
                              <View style={styles.statementAnswers}>
                                <Text
                                  style={[
                                    styles.statementAnswerTag,
                                    statement?.result?.answerId ===
                                    Answer.NotAtAll
                                      ? commonStyles.black
                                      : {},
                                  ]}
                                >
                                  {t('statementsNotAtAll')}
                                </Text>
                                <Text
                                  style={[
                                    styles.statementAnswerTag,
                                    statement?.result?.answerId ===
                                    Answer.Somewhat
                                      ? commonStyles.black
                                      : {},
                                  ]}
                                >
                                  {t('statementsSomewhat')}
                                </Text>
                                <Text
                                  style={[
                                    styles.statementAnswerTag,
                                    statement?.result?.answerId ===
                                    Answer.VeryMuch
                                      ? commonStyles.black
                                      : {},
                                  ]}
                                >
                                  {t('statementsVeryMuch')}
                                </Text>
                                <View style={styles.statementAnswerSeparator} />
                                <Text
                                  style={[
                                    styles.statementAnswerTag,
                                    statement?.result?.answerId ===
                                    Answer.DoesntApply
                                      ? commonStyles.black
                                      : {},
                                  ]}
                                >
                                  {t('statementsDoesNotApply')}
                                </Text>
                              </View>
                              {statement.tags?.length > 0 ? (
                                <View style={styles.statementTags}>
                                  {statement.tags.map((tag, index) => (
                                    <Fragment key={tag}>
                                      {index > 0 ? (
                                        <Text
                                          style={styles.statementTagSeparator}
                                        >
                                          /
                                        </Text>
                                      ) : null}
                                      <Text style={commonStyles.small}>
                                        {tag}
                                      </Text>
                                    </Fragment>
                                  ))}
                                </View>
                              ) : null}
                            </View>
                          </View>
                        ))
                    )}
                  </View>
                );
              })}
            </View>
          );
        })
      )}
    </Page>
  );
}
