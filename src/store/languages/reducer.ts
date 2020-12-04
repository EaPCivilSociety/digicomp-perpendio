import { LanguageActions, LanguageState } from './types';

const initialState: LanguageState = {
  languages: [],
  selectedLanguage: {
    id: 'en',
    description: 'english',
  },
};

export const languageReducer = (
  state: LanguageState = initialState,
  action: {
    type: LanguageActions;
    payload: any;
  }
): LanguageState => {
  switch (action.type) {
    case LanguageActions.SET_LANGUAGES:
      return {
        ...state,
        languages: action.payload,
      };
    case LanguageActions.SET_SELECTED_LANGUAGE:
      return {
        ...state,
        selectedLanguage: action.payload,
      };
  }
  return state;
};
