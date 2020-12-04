export type Language = {
  id: string;
  description: string;
};

// REDUX TYPES
export type LanguageState = {
  languages: Language[];
  selectedLanguage: Language;
};

export enum LanguageActions {
  SET_LANGUAGES = 'language/set_languages',
  SET_SELECTED_LANGUAGE = 'language/set_selected_language',
}
