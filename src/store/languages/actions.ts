import { Language, LanguageActions } from './types';

export const setLanguages = (payload: Language[]) => ({
  type: LanguageActions.SET_LANGUAGES,
  payload,
});

export const setSelectedLanguage = (payload: Language) => ({
  type: LanguageActions.SET_SELECTED_LANGUAGE,
  payload,
});
