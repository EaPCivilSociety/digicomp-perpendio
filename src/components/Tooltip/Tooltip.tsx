import { InfoDarkIcon } from 'images';
import React from 'react';

type TooltipProps = {
  title: string;
  tooltip: string;
};

const Tooltip = ({ title, tooltip }: TooltipProps) => {
  return (
    <div className="goal-button-tooltip">
      <div>{title}</div>
      <div className="goal-button-tooltip-content">
        <img src={InfoDarkIcon} alt="" />
        <div>{tooltip}</div>
      </div>
    </div>
  );
};

export default Tooltip;
