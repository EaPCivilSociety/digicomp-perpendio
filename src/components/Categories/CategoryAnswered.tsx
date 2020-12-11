import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { Link, useHistory } from 'react-router-dom';
import classNames from 'classnames';

import { GoalCardIcon } from 'images';
import {
  Answer,
  getMaturityStages,
  getStatementsAnswered,
  getStatementsUnaswered,
} from 'store/statements';
import { getSelectedLanguage } from 'store/languages';
import {
  getGoals,
  getResultsByCategory,
  removeGoal,
  setGoal,
} from 'store/results';
import { Category } from 'store/categories';
import GoalButtonToggle from 'components/Goals/GoalButtonToggle';
import GoalButton from 'components/Goals/GoalButton';
import { maturityLevels } from 'data';
import { interpolateColor } from 'utils/colors';
import { getGoalActive } from 'store/goals';
import { useTranslations } from 'i18n';

type CategoryAnsweredProps = {
  category: Category;
  status?: boolean;
  onCardClicked?(maturityStage: string, category: Category): void;
  filteredTags?: string[];
  isFilterable?: boolean;
};

const CategoryAnswered = ({
  category,
  status = true,
  onCardClicked = _.noop,
  filteredTags = [],
  isFilterable,
}: CategoryAnsweredProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslations();
  const history = useHistory();

  const maturityStages = useSelector(getMaturityStages);
  const answeredStatements = useSelector(getStatementsAnswered(category.id));
  const unansweredStatements = useSelector(getStatementsUnaswered(category.id));
  const resultsCategory = useSelector(getResultsByCategory(category.id));
  const language = useSelector(getSelectedLanguage);
  const settingsGoalActive = useSelector(getGoalActive);
  const goals = useSelector(getGoals);

  const [filter, setFilter] = useState<string | null>(null);

  const handleCardClicked = (
    maturityStage: string,
    clickedCategory: Category
  ) => {
    if (isFilterable) {
      if (filter === maturityStage) {
        setFilter(null);
      } else {
        setFilter(maturityStage);
      }

      onCardClicked(maturityStage, clickedCategory);
    } else {
      history.push(`/category-result/${category.id}`);
    }
  };

  return (
    <div className="card card-elevation-xs category-answered">
      <Link
        className="category-answered-title"
        to={`/category-result/${category.id}`}
      >
        <h4>{category[language.id]?.name}</h4>
        <div className="category-answered-status">
          {status && <div className="status">{t('categoryInProgress')}</div>}
        </div>
      </Link>

      <div className="category-answered-goals">
        <div className="category-answered-goals-button">
          <GoalButtonToggle />
        </div>
        <div className="category-answered-goals-list">
          {maturityLevels.map((ml: any) => (
            <GoalButton
              key={ml.id}
              title={ml[language.id]?.name}
              tooltip={ml[language.id]?.description}
            />
          ))}
        </div>
      </div>

      <div className="category-answered-answers">
        {maturityStages.map((mStage, i) => {
          const maturityAnswered = answeredStatements
            .filter(
              (s) =>
                filteredTags.length === 0 ||
                _.intersection(s.tags, filteredTags).length > 0
            )
            .filter((ma) => ma.maturity_stage === mStage);

          const maturityUnanswered = unansweredStatements
            .filter(
              (s) =>
                filteredTags.length === 0 ||
                _.intersection(s.tags, filteredTags).length > 0
            )
            .filter((mu) => mu.maturity_stage === mStage);

          // Find matching results from statements
          const totalResults = maturityAnswered.map((ma) => {
            return resultsCategory.find(
              (r) => r.statementId === ma.statementId
            );
          });

          const doNotApply = totalResults.filter(
            (tr) => tr?.answerId === Answer.DoesntApply
          ).length;

          const sumResults = totalResults.reduce((acc, cur) => {
            if (cur?.answerId === Answer.DoesntApply) {
              return acc;
            }
            return acc + (cur?.answerId || 0);
          }, 0);

          const gradient =
            maturityAnswered.length > 0
              ? sumResults / (maturityAnswered.length * 3)
              : 0;

          const color = '#' + interpolateColor('FFFFFF', 'FFC434', gradient);

          const isGoalSet = goals.find(
            (g) => g.categoryId === category.id && g.maturityStage === mStage
          );

          const isGoalSetOnCategory = goals.find(
            (g) => g.categoryId === category.id
          );

          return (
            <div
              key={i}
              className={classNames('answer', {
                'is--active': isFilterable && filter === mStage,
                'is--inactive': isFilterable && !!filter && filter !== mStage,
                'hover--disabled': !isFilterable,
              })}
              style={{ backgroundColor: color }}
              onClick={() => handleCardClicked(mStage, category)}
            >
              <div className="answer-header">
                {settingsGoalActive && !isGoalSetOnCategory && (
                  <div
                    className="answer-header-content"
                    onClick={(e: any) => {
                      e.preventDefault();
                      e.stopPropagation();
                      dispatch(setGoal(mStage, category.id));
                    }}
                  >
                    <span>{t('categorySetAsGoal')}</span>
                    <img src={GoalCardIcon} alt="Set as goal" />
                  </div>
                )}
                {isGoalSet && (
                  <div
                    className="answer-header-content-remove"
                    onClick={(e: any) => {
                      e.preventDefault();
                      e.stopPropagation();
                      dispatch(removeGoal(mStage, category.id));
                    }}
                  >
                    <span>{t('categoryRemoveGoal')}</span>
                    <img src={GoalCardIcon} alt="Remove as goal" />
                  </div>
                )}
              </div>
              <div className="answer-content">
                <div>
                  <span>{maturityAnswered.length}</span>/
                  <span>
                    {maturityAnswered.length + maturityUnanswered.length}
                  </span>
                </div>
                <label>{t('categoryAnswered')}</label>
              </div>
              <div className="answer-footer">{`${doNotApply} ${t(
                'categoryDoNotApply'
              )}`}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryAnswered;
