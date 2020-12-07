import { useIntl } from 'react-intl';

import { en } from './en';
import { fr } from './fr';
import { es } from './es';

export const translations = { en, fr, es };

export const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'French' },
  { code: 'es', name: 'Spanish' },
];

export const useTranslations = () => {
  const { formatMessage } = useIntl();
  const t = (id: string) => formatMessage({ id });

  return { t, formatMessage };
};
