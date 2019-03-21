import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { setEn, setSr } from '@actions/languageActions';
import Card from '@common/Card';
import './HomePage.scss';

const HomePage = ({ setEn, setSr }) => (
  <div className="homepage">
    <h1 className="homepage__title">
      <FormattedMessage id="welcome" defaultMessage="Welcome" />
    </h1>

    <Card status="active" />
    <Card status="ordering" />

    <button onClick={setEn}>english</button>
    <button onClick={setSr}>serbian</button>
  </div>
);

export default connect(
  null,
  { setEn, setSr }
)(HomePage);
