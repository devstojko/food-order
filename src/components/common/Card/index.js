import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Avatar from '../Avatar';
import './Card.scss';

const Card = ({ status }) => (
  <div className="card">
    <div className="card__header">
      Don piza
      <span className={`card__status card__status--${status}`}>
        <FormattedMessage id={status} defaultMessage={status} />
      </span>
    </div>
    <div className="card__content">
      <FormattedMessage id="addOrder" defaultMessage="Add order" />
    </div>
    <div className="card__footer">
      <Avatar />
      <div className="card__info">
        <p>
          <strong>David Lee</strong>{' '}
          <FormattedMessage id="isOrdering" defaultMessage="is ordering food" />
        </p>
        <span>4 min ago</span>
      </div>
    </div>
  </div>
);

Card.propTypes = {
  status: PropTypes.string
};

export default Card;
