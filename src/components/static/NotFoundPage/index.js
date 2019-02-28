import React from 'react';
import Button from '@common/Button';
import './NotFoundPage.scss';

const NotFoundPage = ({ history }) => (
  <div className="not-found">
    <h1 className="title-primary">404 - Page Not Found</h1>
    <Button text="Go Back" onClick={history.goBack} />
  </div>
);

export default NotFoundPage;
