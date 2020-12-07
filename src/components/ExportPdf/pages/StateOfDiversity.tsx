import { Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import commonStyles from 'components/ExportPdf/common-styles';
import { maturityLevels } from 'data';
import { IconTarget } from 'images/pdf';
import React from 'react';
import _ from 'lodash';
import { CategoryState } from 'store/categories';
import { Language } from 'store/languages';
import { Goal, Result } from 'store/results';
import { Answer, Statement } from 'store/statements';
import { interpolateColor } from 'utils/colors';

const styles = StyleSheet.create({
  iconLegend: {
    flexDirection: 'row',
    fontSize: 8,
    color: '#222',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconLegendImage: {
    width: 13.6,
    marginRight: 4,
  },
  maturityLevelLegend: {
    marginBottom: 16,
    fontSize: 8,
    color: '#222',
  },
  maturityLevelLegendTitle: {
    marginBottom: 2,
  },

  table: {
    borderBottom: '1pt solid #eee',
    marginBottom: 38,
  },
  tableHeading: {
    flexDirection: 'row',
    fontSize: 10,
    color: '#444',
    marginBottom: 2,
    textAlign: 'center',
  },
  tableRow: {
    paddingVertical: StyleSheet.hairlineWidth,
    borderTop: '1pt solid #eee',
    flexDirection: 'row',
    height: 56,
    alignItems: 'stretch',
    width: '100%',
  },
  tableColTitle: {
    flexGrow: 1,
    flexShrink: 1,
    justifyContent: 'center',
    paddingRight: 16,
  },
  tableColLevel: {
    width: 64,
    marginLeft: StyleSheet.hairlineWidth,
  },
  tableColLevelHeader: {
    alignItems: 'flex-end',
    paddingTop: 1.5,
    paddingRight: 3.65,
    height: 13,
  },
  tableGoalIcon: {
    height: 13,
  },
  tableColLevelContent: {
    textAlign: 'center',
    fontSize: 8,
    color: '#444',
  },
  tableColLevelAnsweredNumber: {
    color: '#000',
    fontSize: 14,
  },
});

type StateOfDiversityProps = {
  t: (t: string) => string;
  language: Language;
  categories: CategoryState;
  results: Result[];
  statements: Statement[];
  goals: Goal[];
};

export default function StateOfDiversity({
  t,
  language,
  categories,
  statements,
  results,
  goals,
}: StateOfDiversityProps) {
  return (
    <Page style={commonStyles.pageBody}>
      <Text style={commonStyles.h2}>{t('categoriesStateOfDiversity')}</Text>
      <View style={styles.table}>
        <View style={styles.tableHeading}>
          <View style={styles.tableColTitle} />
          {maturityLevels.map((level: any) => (
            <Text style={styles.tableColLevel} key={level.id}>
              {level[language.id].name}
            </Text>
          ))}
        </View>
        {categories.map((category) => {
          const resultsCategory = results.filter(
            (r) => r.category === category.id
          );
          const answeredStatements = statements.filter(
            (s) => !!_.find(resultsCategory, { statementId: s.statementId })
          );
          const unansweredStatements = statements.filter(
            (s) =>
              s.category === category.id && answeredStatements.indexOf(s) < 0
          );

          return (
            <View style={styles.tableRow} key={category.id}>
              <View style={styles.tableColTitle}>
                <Text>{category[language.id].name}</Text>
              </View>
              {maturityLevels.map(({ id: mStage, ...level }: any) => {
                const maturityAnswered = answeredStatements.filter(
                  (ma) => ma.maturity_stage === mStage
                );

                const maturityUnanswered = unansweredStatements.filter(
                  (mu) => mu.maturity_stage === mStage
                );

                // Find matching results from statements
                const totalResults = maturityAnswered.map((ma) => {
                  return resultsCategory.find(
                    (r) => r.statementId === ma.statementId
                  );
                });

                const doNotApply = totalResults.filter(
                  (tr) => tr?.answerId === Answer.DoesntApply
                ).length;

                const sumResults = totalResults.reduce((acc, cur) => {
                  if (cur?.answerId === Answer.DoesntApply) {
                    return acc;
                  }
                  return acc + (cur?.answerId || 0);
                }, 0);

                const gradient =
                  maturityAnswered.length > 0
                    ? sumResults / (maturityAnswered.length * 3)
                    : 0;

                const color = `#${interpolateColor(
                  'FFFFFF',
                  'c7c7c6',
                  gradient
                )}`;

                const isGoalSet = goals.find(
                  (g) =>
                    g.categoryId === category.id && g.maturityStage === mStage
                );

                return (
                  <View
                    style={[styles.tableColLevel, { backgroundColor: color }]}
                    key={mStage}
                  >
                    <View style={styles.tableColLevelHeader}>
                      {isGoalSet ? (
                        <Image src={IconTarget} style={styles.tableGoalIcon} />
                      ) : null}
                    </View>
                    <View style={styles.tableColLevelContent}>
                      <Text style={styles.tableColLevelAnsweredNumber}>
                        {maturityAnswered.length}/
                        {maturityAnswered.length + maturityUnanswered.length}
                      </Text>
                      <Text>{t('categoryAnswered')}</Text>
                      <Text>{`${doNotApply} do not apply`}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          );
        })}
      </View>
      <View style={styles.iconLegend}>
        <Image src={IconTarget} style={styles.iconLegendImage} />
        <Text>Symbol marks your desired maturity level for category</Text>
      </View>
      {maturityLevels.map((level: any) => (
        <View style={styles.maturityLevelLegend} key={level.id} wrap={false}>
          <Text style={[commonStyles.bold, styles.maturityLevelLegendTitle]}>
            {level[language.id].name}
          </Text>
          <Text>{level[language.id].description}</Text>
        </View>
      ))}
    </Page>
  );
}
