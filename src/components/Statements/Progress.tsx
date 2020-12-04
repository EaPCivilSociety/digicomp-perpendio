/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useTranslations } from 'i18n';

type ProgressProps = {
  progressTotal?: number;
  progressCurrent?: number;
  progressRequired?: number;
};

const Progress = ({
  progressCurrent = 8,
  progressRequired = 11,
  progressTotal = 27,
}: ProgressProps) => {
  // This is animated with CSS
  const percentage = (progressCurrent / progressTotal) * 100;
  const requiredPercentage = (progressRequired / progressTotal) * 100;
  const { t } = useTranslations();

  return (
    <div className="progressBox">
      <div className="progressBox-bar">
        <div
          className="progressBox-bar-progress"
          style={{
            clipPath: `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0% 100%)`,
          }}
        />
        <div
          className="progressBox-bar-progressRequired"
          style={{ left: `${requiredPercentage}%` }}
        >
          <svg
            width="3"
            height="23"
            viewBox="0 0 3 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="1.5"
              y1="4.37114e-08"
              x2="1.5"
              y2="23"
              stroke="white"
              strokeWidth="2"
              strokeDasharray="2 2"
            />
          </svg>
        </div>
      </div>
      <div className="progressBox-content">
        <div className="progressBox-content-total">
          {t('statementsProgress')} <span>{progressCurrent}</span>/
          <span>{progressTotal}</span>
        </div>
        <div className="progressBox-content-required">
          {t('statementsRequired')} <span>{progressRequired}</span>/
          <span>{progressTotal}</span>
        </div>
        <div className="progressBox-content-info">
          {t('statementsAssessment')}
        </div>
      </div>
    </div>
  );
};

export default Progress;
