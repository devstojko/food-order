import React from 'react';
import withAuthorzation from '../../../firebase/withAuthorization';

const ProfilePage = () => <div>Profile Page</div>;

const condition = authUser => !!authUser;
export default withAuthorzation(condition)(ProfilePage);
