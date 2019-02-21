import React from 'react';
import userImg from '../../../../images/user.png';
import './Navbar.scss';

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar__logo">Food-Order</div>
    <div className="navbar__search">
      <i className="fas fa-search" />
      <input type="text" placeholder="Search transactions, invoices or help" />
    </div>
    <div className="navbar__links">
      <div className="navbar__icons">
        <i className="fas fa-question-circle" />
        <i className="fas fa-comments" />
        <i className="fas fa-bell" />
        <span className="navbar__separator" />
      </div>

      <div className="navbar__user">
        User Name
        <img className="navbar__avatar" src={userImg} alt="user" />
        <div className="navbar__dropdown">
          <div className="navbar__dropdown-link">Random Link 1</div>
          <div className="navbar__dropdown-link">Random Link 2</div>
          <div className="navbar__dropdown-link">Logout</div>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
