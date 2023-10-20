import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';

import { useTranslations } from 'i18n';
import { getResults } from 'store/results';
import { getCategories } from 'store/categories';
import Categories from 'components/Categories/Categories';
import CategoryAnswered from 'components/Categories/CategoryAnswered';
// import Filters from 'components/Categories/Filters';
import GoalButtonToggle from 'components/Goals/GoalButtonToggle';
import GoalButton from 'components/Goals/GoalButton';
import { maturityLevels } from 'data';
import { getSelectedLanguage } from 'store/languages';
import { StarIcon, File } from 'images';
import SaveModal from 'components/SaveModal/SaveModal';
import { useToggle } from 'hooks/useToggle';
import { getStatements } from 'store/statements';
import ExportModal from 'components/ExportPdf/ExportModal';

const Categorypage = () => {
  const { t } = useTranslations();
  const results = useSelector(getResults);
  const categories = useSelector(getCategories);
  const language = useSelector(getSelectedLanguage);
  const statements = useSelector(getStatements);

  const showResults = !_.isEmpty(results);
  // remember to remove the bottom version and re-add the commented out version
  // when adding back the tag selection
  // const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTags] = useState<string[]>([]);

  const [modalVisbility, toggleModal] = useToggle(false);
  const [exportModalVisibility, toggleExportModal] = useToggle(false);

  const { title, intro, description } = useMemo(() => {
    if (showResults) {
      return {
        title: t('categoriesChooseNext'),
        intro: null,
        description: t('categoriesDescriptionSecond'),
      };
    }

    return {
      title: t('categoriesPleaseChoose'),
      intro: t('introTutorial'),
      description: t('categoriesDescriptionFirst'),
    };
  }, [showResults, t]);

  return (
    <div className="mb-5">
      {showResults && (
        <div className="category-hero">
          <h1>{t('categoriesStateOfDiversity')}</h1>

          <div>
            <button
              className="btn btn-sm btn-primary category-hero-btn mr-2"
              onClick={toggleExportModal}
            >
              <img
                src={File}
                alt=""
                style={{ position: 'relative', top: -1 }}
              />
              <span className="ml-2">{t('categoriesExport')}</span>
            </button>

            <button
              className="btn btn-sm btn-primary category-hero-btn"
              onClick={toggleModal}
            >
              <img
                src={StarIcon}
                alt=""
                style={{ position: 'relative', top: -1 }}
              />
              <span className="ml-2">{t('categoriesSave')}</span>
            </button>
          </div>
        </div>
      )}
      {showResults && (
        <>
          {/* <Filters onChange={(tags) => setSelectedTags(tags)} /> */}
          <div className="goals">
            <div className="goals-left">
              <GoalButtonToggle />
            </div>
            <div className="goals-list">
              {maturityLevels.map((ml: any) => (
                <GoalButton
                  key={ml.id}
                  title={ml[language.id]?.name}
                  tooltip={ml[language.id]?.description}
                />
              ))}
            </div>
          </div>

          {categories.map((cat, i) => {
            const categoryResults = results.filter(
              (r) => r.category === cat.id
            );

            const noResults = _.isEmpty(categoryResults);

            // don't show categories with no results
            if (noResults) {
              return null;
            }

            const allAnswered =
              categoryResults.length ===
              statements.filter((s) => s.category === cat.id).length;

            return (
              <CategoryAnswered
                key={i}
                category={cat}
                status={!noResults && !allAnswered}
                filteredTags={selectedTags}
              />
            );
          })}
        </>
      )}

      {showResults && (
        <div className="category-mobile-save">
          <button
            className="btn btn-sm btn-primary category-hero-btn"
            onClick={toggleModal}
          >
            <img
              src={StarIcon}
              alt=""
              style={{ position: 'relative', top: -1 }}
            />
            <span className="ml-2">{t('categoriesSave')}</span>
          </button>
        </div>
      )}

      {!showResults ? (
        <div className="category-page-content">
          <header className="content-header text-md-center">
            <h1>{title}</h1>
            <p>{description}</p>
            <p>{intro}</p>
          </header>
        </div>
      ) : (
        <div className="category-page-content space-top">
          <header className="content-header text-md-center">
            <h3>{title}</h3>
            <p>{description}</p>
            <p>{intro}</p>
          </header>
        </div>
      )}

      <Categories showOnlyUnanswered={true} />

      <SaveModal open={modalVisbility} setOpen={toggleModal} />
      <ExportModal open={exportModalVisibility} setOpen={toggleExportModal} />
    </div>
  );
};

export default Categorypage;
