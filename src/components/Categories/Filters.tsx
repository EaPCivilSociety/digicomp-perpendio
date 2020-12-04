/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { useToggle } from 'hooks/useToggle';
import { FiltersCloseIcon, FiltersOpenIcon } from 'images';
import { getSelectedLanguage } from 'store/languages';
import { tags as allTags } from 'data';
import { Statement } from 'store/statements';
import _ from 'lodash';
import { useTranslations } from 'i18n';

interface FilterProps {
  statements?: Statement[];
  onChange?: (selectedTags: string[]) => void;
}

const Filters = ({ onChange, statements = [] }: FilterProps) => {
  const selectedLanguage = useSelector(getSelectedLanguage);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const { t } = useTranslations();

  const [filtersOpen, toggleFilters] = useToggle(false);
  const activeClass = filtersOpen ? 'is--active' : undefined;

  const statementTags = _.uniq(
    statements
      .filter((s) => !!s.tags)
      .reduce((acc: string[], cur) => [...acc, ...cur.tags], [])
  );

  const availableTags = allTags.filter(
    (tag: any) =>
      !statements ||
      statements.length === 0 ||
      statementTags.find((tt) => tt === tag.id)
  );

  const toggleTag = (id: string) => {
    const newTags = !selectedTags.find((tag) => tag === id)
      ? [...selectedTags, id]
      : selectedTags.filter((tag) => tag !== id);

    setSelectedTags(newTags);

    if (onChange) {
      onChange(newTags);
    }
  };

  return (
    <div className="filters">
      <div className="filters-header">
        <button
          onClick={toggleFilters}
          className={`filters-btn btn-toggle ${activeClass}`}
        >
          {!filtersOpen ? (
            <>
              <img src={FiltersOpenIcon} alt="Filters open" />
              <div>{t('filtersShowFiltersByArea')}</div>
            </>
          ) : (
            <>
              <img src={FiltersCloseIcon} alt="Filters closed" />
              <div>{t('filtersRemoveFiltersByArea')}</div>
            </>
          )}
        </button>
        <div className="filters-header-line" />
      </div>
      {filtersOpen && (
        <div className={`filters-content ${activeClass}`}>
          {availableTags.map((tag: any) => (
            <button
              key={tag.id}
              className={classNames('btn-toggle', {
                'is--active': selectedTags.indexOf(tag.id) > -1,
              })}
              onClick={() => toggleTag(tag.id)}
            >
              {tag[selectedLanguage.id]?.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filters;
