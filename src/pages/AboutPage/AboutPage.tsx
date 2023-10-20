import React from 'react';
import { useTranslations } from 'i18n';

const AboutPage = () => {
  const { t } = useTranslations();

  return (
    <div className="card page-card">
      <h3>{t('aboutSelfDiagnosticTool')}</h3>
      <p
        dangerouslySetInnerHTML={{
          __html: t('aboutParagraphOne'),
        }}
      />
      <p
        dangerouslySetInnerHTML={{
          __html: t('aboutParagraphTwo'),
        }}
      />
      {/* <h3>{t('aboutWhatHappensNext')}</h3>
      <p>{t('aboutParagraphThree')}</p>
      <p>{t('aboutParagraphFour')}</p>
      <p>{t('aboutParagraphFive')}</p> */}

      <h3>{t('aboutAcknowledgments')}</h3>
      <p
        dangerouslySetInnerHTML={{
          __html: t('aboutCreativeConsultancyTeams'),
        }}
      />
      <p
        dangerouslySetInnerHTML={{
          __html: t('aboutSensemakingLab'),
        }}
      />
      {/* <p
        dangerouslySetInnerHTML={{
          __html: t('aboutCIVICUSSupportTeam'),
        }}
      /> */}
      <p
        dangerouslySetInnerHTML={{
          __html: t('aboutDIGNAAdvisoryGroupMembers'),
        }}
      />
      <p
        dangerouslySetInnerHTML={{
          __html: t('aboutSpecialThanks'),
        }}
      />
      <p
        dangerouslySetInnerHTML={{
          __html: t('aboutSpecialAppreciation'),
        }}
      />
    </div>
  );
};

export default AboutPage;
