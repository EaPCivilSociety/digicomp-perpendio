import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { getResults } from 'store/results';

import WelcomeCard from './WelcomeCard';

const WelcomePage = () => {
  const results = useSelector(getResults);

  if (results.length > 0) {
    return <Redirect to="/category" />;
  }

  return (
    <div className="mb-5">
      <WelcomeCard />
    </div>
  );
};

export default WelcomePage;
