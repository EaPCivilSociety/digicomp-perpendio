import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import { categories, languages, statements } from 'data';
import { translations } from 'i18n';

import { WelcomePage } from 'pages/WelcomePage';
import { CategoryPage } from 'pages/CategoryPage';
import { CategoryResultPage } from 'pages/CategoryResultPage';
import { StatementPage } from 'pages/StatementPage';
import { NotFound } from 'pages/NotFound';
import { AboutPage } from 'pages/AboutPage';
import { HowToUsePage } from 'pages/HowToUsePage';
import { ResourcesPage } from 'pages/ResourcesPage';

import { setCategories } from 'store/categories';
import { setLanguages, getSelectedLanguage } from 'store/languages';
import { setStatements } from 'store/statements';

import './styles/bootstrap.min.css';
import './App.scss';
import MainLayout from './MainLayout';

const TRANSLATION_FALLBACK_LANGUAGE = 'en';

function App() {
  const dispatch = useDispatch();
  const selectedLanguage = useSelector(getSelectedLanguage);

  const defaultTranslations = translations[TRANSLATION_FALLBACK_LANGUAGE];
  // @ts-ignore
  const selectedLanguageTranslations = translations[selectedLanguage.id] as any;

  useEffect(() => {
    dispatch(setCategories(categories));
    dispatch(setLanguages(languages));
    dispatch(setStatements(statements));
  }, [dispatch]);

  return (
    <IntlProvider
      locale={selectedLanguage.id}
      // @ts-ignore
      messages={{ ...defaultTranslations, ...selectedLanguageTranslations }}
    >
      <MainLayout>
        <Switch>
          <Route path={'/'} exact component={WelcomePage} />
          <Route path={'/about'} exact component={AboutPage} />
          <Route path={'/resources'} exact component={ResourcesPage} />
          <Route path={'/how-to-use'} exact component={HowToUsePage} />
          <Route path={'/category'} exact component={CategoryPage} />
          <Route
            path={'/category-result/:categoryId'}
            exact
            component={CategoryResultPage}
          />
          <Route
            path={'/statement/:categoryId'}
            exact
            component={StatementPage}
          />
          <Route component={NotFound} />
        </Switch>
      </MainLayout>
    </IntlProvider>
  );
}

export default App;
