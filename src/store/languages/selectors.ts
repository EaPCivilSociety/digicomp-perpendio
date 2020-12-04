import { RootState } from 'store';

export const getLanguages = (state: RootState) => state.languages.languages;

export const getSelectedLanguage = (state: RootState) =>
  state.languages.selectedLanguage;
