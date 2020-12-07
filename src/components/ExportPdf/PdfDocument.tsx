import { Document } from '@react-pdf/renderer';
import React from 'react';

import { CategoryState } from 'store/categories';
import { Language } from 'store/languages';
import { Goal, Result } from 'store/results';
import { Statement } from 'store/statements';

import CategoriesAndStatements from './pages/CategoriesAndStatements';
import Cover from './pages/Cover';
import Introduction from './pages/Introduction';
import Resources from './pages/Resources';
import StateOfDiversity from './pages/StateOfDiversity';

type PdfDocumentProps = {
  compilerName?: string;
  organizationName?: string;
  code: string;
  t: (t: string) => string;
  results: Result[];
  categories: CategoryState;
  language: Language;
  statements: Statement[];
  goals: Goal[];
};

export default function PdfDocument({
  compilerName = '',
  organizationName = '',
  t,
  code,
  ...data
}: PdfDocumentProps) {
  return (
    <Document
      title={t('pdfTitle')}
      author={organizationName}
      producer={compilerName}
    >
      <Cover
        t={t}
        compilerName={compilerName}
        organizationName={organizationName}
        code={code}
      />
      <Introduction t={t} />
      <StateOfDiversity t={t} {...data} />
      <CategoriesAndStatements t={t} {...data} />
      <Resources />
    </Document>
  );
}
