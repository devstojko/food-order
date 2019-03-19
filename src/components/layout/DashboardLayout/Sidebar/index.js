import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Sidebar.scss';

const links = [
  { iconClass: 'fas fa-home', text: 'Rooms' },
  { iconClass: 'far fa-envelope', text: 'Inbox' },
  { iconClass: 'fab fa-product-hunt', text: 'Products' },
  { iconClass: 'fas fa-receipt', text: 'Invoices' },
  { iconClass: 'far fa-user', text: 'Customers' },
  { iconClass: 'far fa-comments', text: 'Chat Room', to: '/chat' },
  { iconClass: 'far fa-calendar-alt', text: 'Calendar' },
  { iconClass: 'fas fa-cog', text: 'Settings', to: '/profile-settings' }
];

const Sidebar = () => (
  <aside className="sidebar">
    <div className="sidebar__logo">
      <Link to="/">Food-Order</Link>
    </div>
    {links.map((link, i) => (
      <NavLink key={i} to={link.to || '/404'} className="sidebar__item">
        <i className={link.iconClass} />
        {link.text}
      </NavLink>
    ))}
  </aside>
);

export default Sidebar;
