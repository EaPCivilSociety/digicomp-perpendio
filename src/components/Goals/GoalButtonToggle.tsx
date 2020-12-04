import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { GoalActiveIcon, GoalLightIcon } from 'images';
import { getGoalActive, setGoalActive } from 'store/goals';
import { useTranslations } from 'i18n';

const GoalButtonToggle = () => {
  const dispatch = useDispatch();
  const { t } = useTranslations();

  const goalButtonActive = useSelector(getGoalActive);
  const activeClass = goalButtonActive ? 'is--active' : undefined;

  const buttonClicked = () => {
    dispatch(setGoalActive(!goalButtonActive));
  };

  return (
    <button
      onClick={buttonClicked}
      className={`goal-btn-toggle btn-toggle ${activeClass}`}
    >
      {!goalButtonActive ? (
        <>
          <img src={GoalLightIcon} alt="Goals open" />
          <div>{t('goalButtonSetGoalPerCategory')}</div>
        </>
      ) : (
        <>
          <img src={GoalActiveIcon} alt="Goals closed" />
          <div>{t('goalButtonFinishSettingGoal')}</div>
        </>
      )}
    </button>
  );
};

export default GoalButtonToggle;
