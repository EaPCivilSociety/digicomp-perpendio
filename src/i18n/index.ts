import { useIntl } from 'react-intl';

import { en } from './en';
import { hr } from './hr';

export const translations = { en, hr };

export const languages = [
  { code: 'en', name: 'English' },
  { code: 'hr', name: 'Croatian' },
];

export const useTranslations = () => {
  const { formatMessage } = useIntl();
  const t = (id: string) => formatMessage({ id });

  return { t, formatMessage };
};
