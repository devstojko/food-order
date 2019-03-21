import React from 'react';
import { FormattedMessage } from 'react-intl';
import Card from '@common/Card';
import './HomePage.scss';

const HomePage = ({ setEn, setSr }) => (
  <div className="homepage">
    <h1 className="homepage__title">
      <FormattedMessage id="welcome" defaultMessage="Welcome" />
    </h1>

    <Card status="active" />
    <Card status="ordering" />
  </div>
);

export default HomePage;
