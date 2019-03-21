import React from 'react';
import { connect } from 'react-redux';
import serbiaFlag from '@images/serbia.svg';
import usaFlag from '@images/usa.svg';
import { setEn, setSr } from '@actions/languageActions';
import './Language.scss';

const Language = ({ setEn, setSr }) => (
  <div className="language-picker">
    <img src={usaFlag} alt="us" className="flag" onClick={setEn} />
    <img src={serbiaFlag} alt="sr" className="flag" onClick={setSr} />
  </div>
);

export default connect(
  null,
  { setEn, setSr }
)(Language);
