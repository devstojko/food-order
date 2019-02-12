import React from 'react';
import withAuthorization from '../../../firebase/withAuthorization';

const HomePage = () => {
  console.log('ENTERED HOME');
  return <div>Home Page</div>;
};

const condition = authUser => !!authUser;
export default withAuthorization(condition)(HomePage);
