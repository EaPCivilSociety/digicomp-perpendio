/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import Tooltip from 'components/Tooltip/Tooltip';

import { DEFAULT_LANGUAGE, getSelectedLanguage } from 'store/languages';
import { Answer, Statement } from 'store/statements';
import { Result, setResult } from 'store/results';
import { useTranslations } from 'i18n';
import { FADE_VARIANTS } from 'const';
import { tags } from 'data';

type StatementProps = {
  statement?: Statement;
  answered?: Answer;
};

const StatementCmp = ({ statement, answered }: StatementProps) => {
  const dispatch = useDispatch();
  const language = useSelector(getSelectedLanguage);
  const { t } = useTranslations();

  const handleAnswer = (answerType: Answer) => {
    if (!!statement && !answered) {
      const result: Result = {
        statementId: statement.statementId,
        answerId: answerType,
        category: statement.category,
      };
      dispatch(setResult(result));
    }
  };

  // const getTagTranslation = (tag: string): string => {
  //   const tagTranslation = tags.filter((tt: any) => tt.id === tag)[0];

  //   return tagTranslation ? tagTranslation[language.id]?.name : '';
  // };

  const getTag = (tag: any): any => {
    const tagFromTags = tags.filter((tt: any) => tt.id === tag)[0];
    return tagFromTags;
  };

  return (
    <motion.div
      className="card question-card"
      layout
      variants={FADE_VARIANTS}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="question-card-content">
        <AnimatePresence exitBeforeEnter>
          <motion.p
            key={statement?.statementId}
            variants={FADE_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {statement?.statement[language.id] ||
              statement?.statement[DEFAULT_LANGUAGE]}
          </motion.p>
        </AnimatePresence>
      </div>
      <div className="question-card-label">
        {t('statementsHowMuchDoesThis')}
      </div>
      <div className="question-card-buttons">
        <button
          className={classNames('btn btn-1', {
            active: answered === Answer.NotAtAll,
          })}
          disabled={answered != null ? true : undefined}
          onClick={() => handleAnswer(Answer.NotAtAll)}
        >
          {t('statementsNotAtAll')}
        </button>
        <button
          className={classNames('btn btn-2', {
            active: answered === Answer.Somewhat,
          })}
          disabled={answered != null ? true : undefined}
          onClick={() => handleAnswer(Answer.Somewhat)}
        >
          {t('statementsSomewhat')}
        </button>
        <button
          className={classNames('btn btn-3', {
            active: answered === Answer.VeryMuch,
          })}
          disabled={answered != null ? true : undefined}
          onClick={() => handleAnswer(Answer.VeryMuch)}
        >
          {t('statementsVeryMuch')}
        </button>
        <div className="separator" />
        <button
          className={classNames('btn btn-4', {
            active: answered === Answer.DoesntApply,
          })}
          disabled={answered != null ? true : undefined}
          onClick={() => handleAnswer(Answer.DoesntApply)}
        >
          {t('statementsDoesNotApply')}
        </button>
      </div>
      <ul className="question-card-tags">
        {/* {statement?.tags &&
          statement?.tags.map((tag: string, index: number) => (
            <li key={index}>{getTag(tag)}</li>
          ))} */}
        {/* {statement?.tags && <li>{statement.tags}</li>} */}
        {statement?.tags && (
          <li>
            <Tooltip
              key={getTag(statement.tags).en.id}
              title={getTag(statement.tags).en.name}
              tooltip={getTag(statement.tags).en.description}
            />
          </li>
        )}
      </ul>
    </motion.div>
  );
};

export default memo(StatementCmp);
