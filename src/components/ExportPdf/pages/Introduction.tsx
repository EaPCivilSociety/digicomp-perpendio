import { Link, Page, Text, View } from '@react-pdf/renderer';
import React from 'react';
import commonStyles from '../common-styles';

type IntroductionProps = {
  t: (t: string) => string;
};

const stripHtmlRegex = /(<([^>]+)>)/gi;

const sanitizeText = (s: string) =>
  s.replaceAll(stripHtmlRegex, '').replaceAll('&amp;', '&');

export default function Introduction({ t }: IntroductionProps) {
  return (
    <Page style={commonStyles.pageBody}>
      <View wrap={false}>
        <Text style={commonStyles.h2}>{t('aboutSelfDiagnosticTool')}</Text>
        <Text style={commonStyles.mb1}>
          {sanitizeText(t('aboutParagraphOne'))}
        </Text>
        <Text style={commonStyles.mb1}>
          {sanitizeText(t('aboutParagraphTwo'))}
        </Text>
      </View>

      <View wrap={false}>
        <Text style={commonStyles.h2}>{t('pdfIntroduction')}</Text>
        <Text style={commonStyles.mb1}>
          {sanitizeText(t('aboutParagraphThree'))}
        </Text>
        <Text style={commonStyles.mb1}>
          {sanitizeText(t('aboutParagraphFour'))}
        </Text>
        <Text style={commonStyles.mb1}>
          {sanitizeText(t('aboutParagraphFive'))}
        </Text>
      </View>

      <View wrap={false}>
        <Text style={commonStyles.h2}>
          {sanitizeText(t('aboutAcknowledgments'))}
        </Text>
        <Text style={commonStyles.mb1}>
          {sanitizeText(t('aboutCreativeConsultancyTeams'))}
        </Text>
        <Text style={commonStyles.mb1}>
          {sanitizeText(t('aboutSensemakingLab'))}
        </Text>
        <Text style={commonStyles.mb1}>
          {sanitizeText(t('aboutCIVICUSSupportTeam'))}
        </Text>
        <Text style={commonStyles.mb1}>
          {sanitizeText(t('aboutDIGNAAdvisoryGroupMembers'))}
        </Text>
        <Text style={commonStyles.mb1}>
          {sanitizeText(t('aboutSpecialThanks'))}
        </Text>
        <Text style={commonStyles.mb1}>
          {sanitizeText(t('pdfAboutSpecialAppreciation1'))}{' '}
          <Link src="https://lindaraftree.com/" style={commonStyles.link}>
            Linda Raftree
          </Link>
          {sanitizeText(t('pdfAboutSpecialAppreciation2'))}{' '}
          <Link
            src="https://lindaraftree.com/2019/10/17/a-responsible-data-maturity-model-for-non-profits/"
            style={commonStyles.link}
          >
            {sanitizeText(t('pdfAboutSpecialAppreciationLink2'))}
          </Link>{' '}
          {sanitizeText(t('pdfAboutSpecialAppreciation3'))}
        </Text>
      </View>
    </Page>
  );
}
