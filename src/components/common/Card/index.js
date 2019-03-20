import React from 'react';
import PropTypes from 'prop-types';
import userImg from '@images/user.png';
import './Card.scss';

const Card = ({ status }) => (
  <div className="card">
    <div className="card__header">
      Don piza
      <span className={`card__status card__status--${status}`}>{status}</span>
    </div>
    <div className="card__content">Add order</div>
    <div className="card__footer">
      <img className="card__user" src={userImg} alt="user" />
      <div className="card__info">
        <p>
          <strong>David Lee</strong> is ordering food
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
