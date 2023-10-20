import React from 'react';
import { useTranslations } from 'i18n';
import {
  HowToOne,
  HowToThree,
  HowToTwo,
  HowToFour,
  HowToFive,
  HowToSix,
} from 'images';

const HowToUsePage = () => {
  const { t } = useTranslations();

  return (
    <div className="card page-card">
      <h3>{t('howToUsePageTitle')}</h3>
      <p>
        <i>
          FYI the screengrabs below showcase the Diversity and Inclusion version
          of the tool. The features are all the same, but your version might
          look slightly different.
        </i>
      </p>
      <img src={HowToOne} alt="" className="img-fluid howto-image" />
      <p
        dangerouslySetInnerHTML={{
          __html: t('howToUseIntro'),
        }}
      />
      <ul className="styled-list">
        <li
          dangerouslySetInnerHTML={{
            __html: t('howToUseListA1'),
          }}
        />
        <li
          dangerouslySetInnerHTML={{
            __html: t('howToUseListA2'),
          }}
        />
        <li
          dangerouslySetInnerHTML={{
            __html: t('howToUseListA3'),
          }}
        />
        <li
          dangerouslySetInnerHTML={{
            __html: t('howToUseListA4'),
          }}
        />
        <li
          dangerouslySetInnerHTML={{
            __html: t('howToUseListA5'),
          }}
        />
      </ul>

      <h4>{t('howToUseAssigningValuesToStatements')}</h4>

      <p>{t('howToUseParagraph1')}</p>

      <ul className="styled-list">
        <li>{t('howToUseListB1')}</li>
        <li>{t('howToUseListB2')}</li>
        <li>{t('howToUseListB3')}</li>
        <li>{t('howToUseListB4')}</li>
      </ul>

      <p>{t('howToUseParagraph2')}</p>
      <p>{t('howToUseParagraph3')}</p>

      <h3>{t('howToUseAnalysingYourAssessment')}</h3>

      <p>{t('howToUseParagraph4')}</p>

      <h4>{t('howToUseSeeASnapshot')}</h4>
      <img src={HowToTwo} alt="" className="img-fluid howto-image" />

      <h4>{t('howToUseFilterTheResultsByDiveristy')}</h4>
      <img src={HowToThree} alt="" className="img-fluid howto-image" />

      <h4>{t('howToUseAssignMaturityGoals')}</h4>
      <img src={HowToFour} alt="" className="img-fluid howto-image" />

      <h4>{t('howToUseSaveYourProgress')}</h4>
      <img src={HowToFive} alt="" className="img-fluid howto-image" />

      <h4>{t('howToUseExportToPDF')}</h4>
      <img src={HowToSix} alt="" className="img-fluid howto-image" />

      <h3>{t('howToUseSavingAndExporting')}</h3>
      <p>{t('howToUseParagraph5')}</p>
      <p>{t('howToUseParagraph6')}</p>
      <p>{t('howToUseParagraph7')}</p>
    </div>
  );
};

export default HowToUsePage;
