import React from 'react';
import { connect } from 'react-redux';
import { logOut } from '@actions/authActions';
import Search from '@common/Search';
import Avatar from '@common/Avatar';
import './Navbar.scss';

const Navbar = ({ authUser, logOut }) => (
  <nav className="navbar">
    <div className="navbar__logo">Food-Order</div>
    <div className="navbar__search">
      <Search placeholder="Search transactions, invoices or help" />
    </div>

    <div className="navbar__links">
      <div className="navbar__icons">
        <i className="fas fa-question-circle" />
        <i className="fas fa-comments" />
        <i className="fas fa-bell" />
        <span className="navbar__separator" />
      </div>

      <div className="navbar__user">
        {authUser.email}
        <i className="fas fa-angle-down" />
        <Avatar />
        <div className="navbar__dropdown">
          <div className="navbar__dropdown-link">Random Link 1</div>
          <div className="navbar__dropdown-link">Random Link 2</div>
          <div className="navbar__dropdown-link" onClick={logOut}>
            Logout
          </div>
        </div>
      </div>
    </div>
  </nav>
);

const mapStateToProps = ({ authUser }) => ({ authUser });

export default connect(
  mapStateToProps,
  { logOut }
)(Navbar);
