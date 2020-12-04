import React from 'react';
import { useTranslations } from 'i18n';

const NotFound = () => {
  const { t } = useTranslations();

  return <h1>{t('notFound')}</h1>;
};

export default NotFound;
