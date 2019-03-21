import React from 'react';
import { FormattedMessage } from 'react-intl';
import Button from '@common/Button';
import './NotFoundPage.scss';

const NotFoundPage = ({ history }) => (
  <div className="not-found">
    <h1 className="title-primary">
      404 -
      <FormattedMessage id="notFound" defaultMessage="Page Not Found" />
    </h1>
    <Button text="goBack" onClick={history.goBack} />
  </div>
);

export default NotFoundPage;
