import { InfoDarkIcon, InfoLightIcon } from 'images';
import React from 'react';

type GoalButtonProps = {
  title: string;
  tooltip: string;
};

const GoalButton = ({ title, tooltip }: GoalButtonProps) => {
  return (
    <button className="goal-button">
      <div className="goal-button-title">{title}</div>

      <div className="goal-button-tooltip">
        <img src={InfoLightIcon} alt="" />

        <div className="goal-button-tooltip-content">
          <img src={InfoDarkIcon} alt="" />
          <div>{tooltip}</div>
        </div>
      </div>
    </button>
  );
};

export default GoalButton;
