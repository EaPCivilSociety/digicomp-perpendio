import { createStore, combineReducers, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import { categoryReducer, CategoryState } from './categories';
import { languageReducer, LanguageState } from './languages';
import { statementReducer, StatementState } from './statements';
import { resultReducer, ResultState } from './results';
import { goalReducer, GoalState } from './goals';

export interface RootState {
  categories: CategoryState;
  languages: LanguageState;
  statements: StatementState;
  results: ResultState;
  goal: GoalState;
}

export const rootReducer = combineReducers<RootState>({
  categories: categoryReducer,
  languages: languageReducer,
  statements: statementReducer,
  results: resultReducer,
  goal: goalReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['results'],
};

const pReducer = persistReducer<RootState>(persistConfig, rootReducer);

export const store: Store<RootState> = createStore(
  pReducer,
  composeWithDevTools()
);

export const persistor = persistStore(store);
