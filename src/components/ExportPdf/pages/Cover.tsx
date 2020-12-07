import { Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { Logo } from 'images/pdf';
import React from 'react';
import { format } from 'date-fns';
import commonStyles from '../common-styles';
import { LATO } from '../const';

const styles = StyleSheet.create({
  body: {
    paddingTop: 50,
    paddingBottom: 58,
    paddingHorizontal: 50,
    fontFamily: LATO,
    fontSize: 12,
  },
  logo: {
    width: 140,
  },
  content: {
    width: 300,
    marginHorizontal: 'auto',
    textAlign: 'center',
    alignItems: 'flex-start',
  },
  title: {
    marginBottom: 49,
  },
  sectionTitle: {
    fontSize: 8,
    marginBottom: 4,
  },
  paragraph: {
    marginBottom: 16,
  },
  codeWrapper: {
    marginTop: 'auto',
    textAlign: 'center',
    fontSize: 8,
  },
  codeSectionTitle: {
    marginBottom: 8,
  },
});

type CoverProps = {
  compilerName?: string;
  organizationName?: string;
  code: string;
  t: (t: string) => string;
};

export default function Cover({
  compilerName = '',
  organizationName = '',
  t,
  code,
}: CoverProps) {
  return (
    <Page wrap={false} style={styles.body}>
      <View style={{ marginBottom: 109 }}>
        <Image src={Logo} style={styles.logo} />
      </View>
      <View style={styles.content}>
        <Text style={[commonStyles.h1, styles.title]}>{t('pdfTitle')}</Text>
        {compilerName ? (
          <>
            <Text style={styles.sectionTitle}>{t('pdfCompiledBy')}:</Text>
            <Text style={styles.paragraph}>{compilerName}</Text>
          </>
        ) : null}
        {organizationName ? (
          <>
            <Text style={styles.sectionTitle}>{t('pdfOnBehalfOf')}:</Text>
            <Text style={styles.paragraph}>{organizationName}</Text>
          </>
        ) : null}
        <Text style={styles.paragraph}>
          {format(new Date(), 'dd--MM--yyyy')}
        </Text>
      </View>
      <View style={styles.codeWrapper}>
        <Text style={[commonStyles.bold, styles.codeSectionTitle]}>
          {t('pdfAssessmentCode')}:
        </Text>
        <Text>{code}</Text>
      </View>
    </Page>
  );
}
