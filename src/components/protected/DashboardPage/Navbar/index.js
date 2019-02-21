import React from 'react';
import './Navbar.scss';

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar__logo">Food-Order</div>
    <div className="navbar__search">
      <i className="fas fa-search" />
      <input type="text" placeholder="Search transactions, invoices or help" />
    </div>
    <div className="navbar__links">Links....</div>
  </nav>
);

export default Navbar;
