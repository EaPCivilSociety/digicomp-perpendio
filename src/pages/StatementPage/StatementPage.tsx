import React, { useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ArrowLeftWhiteIcon, ArrowRightIcon } from 'images';
import { getRandomStatement, getStatementsByCategory } from 'store/statements';
import StatementCmp from 'components/Statements/Statement';
import Progress from 'components/Statements/Progress';
import { getResultsByCategory } from 'store/results';
import { getCategoryById } from 'store/categories';
import { getSelectedLanguage } from 'store/languages';
import { useTranslations } from 'i18n';

const StatementPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const history = useHistory();
  const { t } = useTranslations();

  const language = useSelector(getSelectedLanguage);
  const category = useSelector(getCategoryById(categoryId));
  const statements = useSelector(getStatementsByCategory(categoryId));
  const randomStatement = useSelector(getRandomStatement(categoryId));
  const results = useSelector(getResultsByCategory(categoryId));

  useEffect(() => {
    if (statements.length && statements.length === results.length) {
      history.push('/category');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results]);

  return (
    <div className="mb-5">
      <div className="questions">
        <header className="questions-header">
          <div>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={() => history.push('/category')}
            >
              <img
                className="mr-1"
                src={ArrowLeftWhiteIcon}
                alt="Arrow right"
              />
              <span>{t('statementPageBack')}</span>
            </button>
          </div>
          <div className="questions-header-content">
            <div className="questions-header-card-title">
              {category ? category![language.id]?.name : ''}
            </div>
            <div className="questions-header-card-description">
              {category ? category![language.id]?.description : ''}
            </div>
          </div>
          <div>
            <Link to={`/category`} className="btn btn-primary btn-sm">
              <span>{t('statementShowResults')}</span>
              <img className="ml-1" src={ArrowRightIcon} alt="Arrow right" />
            </Link>
          </div>
        </header>
        <StatementCmp statement={randomStatement} />
        <Progress
          progressCurrent={results.length}
          progressRequired={1}
          progressTotal={statements.length}
        />
      </div>
    </div>
  );
};

export default StatementPage;
