import React from 'react';
import PropTypes from 'prop-types';
import defaultAvatar from '../../../images/user.png';
import './Avatar.scss';

const Avatar = ({ image }) => (
  <img
    src={image ? image : defaultAvatar}
    onError={e => (e.target.src = defaultAvatar)}
    className="avatar"
    alt="avatar"
  />
);

Avatar.propTypes = {
  image: PropTypes.string
};

export default Avatar;
