import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import _ from 'lodash';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';

import CategoryAnswered from 'components/Categories/CategoryAnswered';
import Filters from 'components/Categories/Filters';
import GoalButton from 'components/Goals/GoalButton';
import GoalButtonToggle from 'components/Goals/GoalButtonToggle';
import StatementCmp from 'components/Statements/Statement';
import { maturityLevels } from 'data';
import {
  getStatementsAnswered,
  getStatementsUnaswered,
} from 'store/statements';
import { ArrowLeftWhiteIcon } from 'images';
import { getCategoryById } from 'store/categories';
import { DEFAULT_LANGUAGE, getSelectedLanguage } from 'store/languages';
import { getResultsByCategory } from 'store/results';
import { useTranslations } from 'i18n';
import { FADE_VARIANTS } from 'const';

const CategoryResultPage = () => {
  const history = useHistory();

  const { categoryId } = useParams<{ categoryId: string }>();
  const category = useSelector(getCategoryById(categoryId));
  const selectedLanguage = useSelector(getSelectedLanguage);
  const answeredStatements = useSelector(getStatementsAnswered(categoryId));
  const unansweredStatements = useSelector(getStatementsUnaswered(categoryId));
  const results = useSelector(getResultsByCategory(categoryId));
  const { t } = useTranslations();

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [maturityStage, setMaturityStage] = useState<string | null>(null);
  const [resultsVisible, setResultsVisible] = useState<boolean>(false);

  const handleMaturitySelected = (selectedMaturityStage: string) => {
    if (maturityStage === selectedMaturityStage) {
      setMaturityStage(null);
    } else {
      setMaturityStage(selectedMaturityStage);
    }

    setResultsVisible(true);
  };

  const selectedMaturityStageName = maturityStage
    ? maturityLevels.find((ml: any) => ml.id === maturityStage)[
        selectedLanguage.id
      ]?.name
    : null;

  if (!category) {
    return null;
  }

  const filteredAnsweredStatements = answeredStatements
    .filter(
      (s) =>
        selectedTags.length === 0 ||
        _.intersection(s.tags, selectedTags).length > 0
    )
    .filter((s) => !maturityStage || s.maturity_stage === maturityStage);

  const filteredUnasweredStatements = unansweredStatements
    .filter(
      (s) =>
        selectedTags.length === 0 ||
        _.intersection(s.tags, selectedTags).length > 0
    )
    .filter((s) => !maturityStage || s.maturity_stage === maturityStage);

  const categoryData =
    category[selectedLanguage.id] || category[DEFAULT_LANGUAGE];

  return (
    <div className="mb-5">
      <header className="questions-header category-results-header">
        <div>
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => history.push('/category')}
          >
            <img className="mr-1" src={ArrowLeftWhiteIcon} alt="Arrow right" />
            <span>{t('categoryBack')}</span>
          </button>
        </div>
        <div className="questions-header-content">
          <div className="questions-header-card-title">{categoryData.name}</div>
          <div className="questions-header-card-description">
            {categoryData.description}
          </div>
        </div>
        <div />
      </header>

      <Filters
        statements={[...answeredStatements, ...unansweredStatements]}
        onChange={(tags) => setSelectedTags(tags)}
      />

      <div className="goals">
        <div className="goals-left">
          <GoalButtonToggle />
        </div>
        <div className="goals-list">
          {maturityLevels.map((ml: any) => (
            <GoalButton
              key={ml.id}
              title={ml[selectedLanguage.id]?.name}
              tooltip={ml[selectedLanguage.id]?.description}
            />
          ))}
        </div>
      </div>

      <CategoryAnswered
        category={category}
        onCardClicked={handleMaturitySelected}
        isFilterable={true}
      />

      {!resultsVisible && (
        <div className="category-results-helperText">
          {t('categoryClickOnMaturityLevel')}
        </div>
      )}

      {resultsVisible && (
        <>
          <div className="category-results-content">
            <AnimatePresence>
              {filteredUnasweredStatements.length > 0 && (
                <motion.header
                  className="content-header text-md-center"
                  layout
                  variants={FADE_VARIANTS}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <h3>{`Unanswered statements${
                    selectedMaturityStageName
                      ? ` in ${selectedMaturityStageName}`
                      : ''
                  }`}</h3>
                </motion.header>
              )}
            </AnimatePresence>

            <AnimateSharedLayout>
              <AnimatePresence>
                {filteredUnasweredStatements.map((statement) => (
                  <StatementCmp
                    key={statement.statementId}
                    statement={statement}
                  />
                ))}
              </AnimatePresence>

              <AnimatePresence>
                {filteredAnsweredStatements.length > 0 && (
                  <motion.header
                    className="content-header text-md-center"
                    layout
                    variants={FADE_VARIANTS}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <h3>{`Finished statements${
                      selectedMaturityStageName
                        ? ` in ${selectedMaturityStageName}`
                        : ''
                    }`}</h3>
                  </motion.header>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {filteredAnsweredStatements.map((statement) => (
                  <StatementCmp
                    key={statement.statementId}
                    statement={statement}
                    answered={
                      results.filter(
                        (r) => r.statementId === statement.statementId
                      )[0]?.answerId
                    }
                  />
                ))}
              </AnimatePresence>
            </AnimateSharedLayout>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryResultPage;
