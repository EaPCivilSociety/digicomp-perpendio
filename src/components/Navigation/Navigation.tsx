/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
import { useTranslations } from 'i18n';

import { CloseIcon, Logo, MenuIcon } from 'images';
import { useToggle } from 'hooks/useToggle';
// import { LanguageDropdown } from 'components/LanguageDropdown';
import Footer from 'components//Footer/Footer';

// import {
//   getLanguages,
//   getSelectedLanguage,
//   Language,
//   setSelectedLanguage,
// } from 'store/languages';
// import classNames from 'classnames';
import ResetModal from 'components/ResetModal/ResetModal';

const Navigation = () => {
  const history = useHistory();
  const [mobileMenuOpen, toggleMobileMenu] = useToggle(false);
  const [modalVisbility, toggleModal] = useToggle(false);
  const { t } = useTranslations();

  // const dispatch = useDispatch();
  // const languages = useSelector(getLanguages);
  // const selectedLanguage = useSelector(getSelectedLanguage);

  // const languageClicked =
  //   (language: Language) =>
  //   (ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
  //     ev.preventDefault();
  //     dispatch(setSelectedLanguage(language));
  //   };

  const logoClicked = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    history.push('/');
  };

  const handleRestart = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    toggleModal();
  };

  mobileMenuOpen
    ? document.body.classList.add('mobile-menu-open')
    : document.body.classList.remove('mobile-menu-open');

  return (
    <>
      <header className="navigation">
        <div className="navigation-mobile">
          {!mobileMenuOpen && (
            <button
              onClick={toggleMobileMenu}
              className="navigation-menu navigation-button"
            >
              <img src={MenuIcon} alt="Mobile menu" />
            </button>
          )}
          {mobileMenuOpen && (
            <button
              onClick={toggleMobileMenu}
              className="navigation-close navigation-button"
            >
              <img src={CloseIcon} alt="Mobile menu" />
            </button>
          )}
          <img
            src={Logo}
            alt="Logo"
            height="70px"
            className="navigation-mobile-logo"
          />
          <div className="navigation-mobile-spacer" />
        </div>

        <div className="navigation-desktop">
          {/* <div className="navigation-desktop__left"> */}
          <a href="#" onClick={logoClicked}>
            <img src={Logo} alt="Logo" className="navigation-desktop-logo" />
          </a>
          <ul className="navigation-desktop__navigation">
            <li className="active">
              <Link to={`/about`} title={t('navigationAbout')}>
                {t('navigationAbout')}
              </Link>
            </li>
            <li className="active">
              <Link to={`/how-to-use`} title={t('navigationTutorial')}>
                {t('navigationTutorial')}
              </Link>
            </li>
            <li className="active">
              <Link to={`/resources`} title={t('navigationResources')}>
                {t('navigationResources')}
              </Link>
            </li>
            <li className="active">
              <a href="#" onClick={handleRestart}>
                {t('navigationRestartAssessment')}
              </a>
            </li>
          </ul>
          {/* </div> */}
        </div>

        {/* <LanguageDropdown /> */}

        {mobileMenuOpen && (
          <div className="mobile-menu">
            <ul className="mobile-menu__navigation">
              <li className="active">
                <Link to={`/about`} title={t('navigationAbout')}>
                  {t('navigationAbout')}
                </Link>
              </li>
              <li className="active">
                <Link to={`/how-to-use`} title={t('navigationTutorial')}>
                  {t('navigationTutorial')}
                </Link>
              </li>
              <li className="active">
                <Link to={`/resources`} title={t('navigationResources')}>
                  {t('navigationResources')}
                </Link>
              </li>
              <li className="active">
                <a href="#" onClick={handleRestart}>
                  {t('navigationRestartAssessment')}
                </a>
              </li>
            </ul>

            <div className="d-flex flex-column align-items-center">
              {/* <div className="mobile-menu__language">
                <img src={GlobeIcon} alt="Choose language" />
                <b>{t('navigationLanguages')}</b>
              </div>
              <ul className="mobile-menu__navigation language-picker">
                {languages.map((lang, index) => {
                  return (
                    <li key={index}>
                      <a
                        href="#"
                        className={classNames({
                          active: lang.id === selectedLanguage.id,
                        })}
                        onClick={languageClicked(lang)}
                      >
                        {lang.description}
                      </a>
                    </li>
                  );
                })}
              </ul> */}
              <Footer />
            </div>
          </div>
        )}
      </header>

      <ResetModal open={modalVisbility} setOpen={toggleModal} />
    </>
  );
};

export default Navigation;
