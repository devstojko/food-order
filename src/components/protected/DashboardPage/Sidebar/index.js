import React from 'react';
import SidebarItem from './SidebarItem';
import './Sidebar.scss';

const links = [
  { iconClass: 'fas fa-home', text: 'Rooms' },
  { iconClass: 'far fa-envelope', text: 'Inbox' },
  { iconClass: 'fab fa-product-hunt', text: 'Products' },
  { iconClass: 'fas fa-receipt', text: 'Invoices' },
  { iconClass: 'far fa-user', text: 'Customers' },
  { iconClass: 'far fa-comments', text: 'Chat Room' },
  { iconClass: 'far fa-calendar-alt', text: 'Calendar' },
  { iconClass: 'fas fa-cog', text: 'Settings' }
];

const Sidebar = () => (
  <aside className="sidebar">
    {links.map((link, i) => (
      <SidebarItem key={i} link={link} />
    ))}
  </aside>
);

export default Sidebar;
