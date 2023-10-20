import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { decompress } from 'shrink-string';

import { useToggle } from 'hooks/useToggle';
import { ArrowRightIcon } from 'images';
import { loadGoals, loadResults } from 'store/results';
import { useTranslations } from 'i18n';

const WelcomeCard = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslations();

  const [welcomeContentOpen, toggleWelcomeContent] = useToggle(true);
  const [code, setCode] = useState<string>('');

  const handleDeserialization = async () => {
    try {
      const jsonString = await decompress(code.trim());
      const json = JSON.parse(jsonString);
      dispatch(loadResults(json.results));
      dispatch(loadGoals(json.goals));
      setCode('');
      history.push('/category');
    } catch {
      alert('Error loading saved code');
    }
  };

  return (
    <div className="card welcome-card">
      <h1>{t('welcomeTitle')}</h1>
      {welcomeContentOpen && (
        <>
          {/* <p style={{ whiteSpace: 'pre-line' }}>{t('welcomeDescription')}</p> */}
          <p
            style={{ whiteSpace: 'pre-line' }}
            dangerouslySetInnerHTML={{
              __html: t('welcomeDescription'),
            }}
          />
          <div className="d-flex flex-column align-items-center welcome-buttons mt-4">
            <button
              type="button"
              className="btn btn-primary welcome-btn"
              onClick={() => history.push('/category')}
            >
              {t('welcomeStartSelfAssessment')}
            </button>
            <p className="mb-1 mt-4">{t('welcomeOr')}</p>
            <button
              type="button"
              className="btn btn-transparent"
              onClick={toggleWelcomeContent}
            >
              {t('welcomePickUpWhereYouLeft')}
            </button>
          </div>
        </>
      )}

      {!welcomeContentOpen && (
        <div className="d-flex flex-column align-items-center">
          <div className="form-inline welcome-form">
            <div className="form-group mr-0 mr-md-3 mb-3 mb-md-0 welcome-form-group">
              <label htmlFor="inputURL" className="sr-only">
                {t('welcomeEnterCode')}
              </label>
              <input
                type="text"
                className="form-control welcome-input"
                id="inputURL"
                placeholder={t('welcomeEnterCode')}
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary btn-sm welcome-btn-continue"
              onClick={handleDeserialization}
            >
              <span>{t('welcomeContinue')}</span>
              <img className="ml-1" src={ArrowRightIcon} alt="Arrow right" />
            </button>
          </div>
          <p className="mb-1 mt-4">{t('welcomeOr')}</p>
          <button
            type="button"
            className="btn btn-transparent"
            onClick={toggleWelcomeContent}
          >
            {t('welcomeStartNewSelfAssessment')}
          </button>
        </div>
      )}
    </div>
  );
};

export default WelcomeCard;
