/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { GlobeIcon } from 'images';
import {
  getLanguages,
  getSelectedLanguage,
  Language,
  setSelectedLanguage,
} from 'store/languages';

const LanguageDropdown = () => {
  const [showMenu, setShowMenu] = useState(false);

  const dispatch = useDispatch();
  const languages = useSelector(getLanguages);
  const selectedLanguage = useSelector(getSelectedLanguage);

  const languageClicked = (language: Language) => (
    ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    ev.preventDefault();
    dispatch(setSelectedLanguage(language));
    setShowMenu(false);
  };

  return (
    <div className="language">
      <div
        className={classNames('language-dropdown dropdown', {
          hidden: showMenu,
        })}
      >
        <button
          className="btn btn-sm dropdown-toggle"
          type="button"
          data-toggle="dropdown"
          onClick={() => setShowMenu(!showMenu)}
        >
          <img src={GlobeIcon} alt="Choose language" />
          <span>{selectedLanguage.description}</span>
        </button>
      </div>
      <div className={classNames('dropdown-menu', { show: showMenu })}>
        {languages.map((lang, index) => {
          return (
            <a
              key={index}
              className={classNames('dropdown-item', {
                active: lang.id === selectedLanguage.id,
              })}
              href="#"
              onClick={languageClicked(lang)}
            >
              {lang.description}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default LanguageDropdown;
