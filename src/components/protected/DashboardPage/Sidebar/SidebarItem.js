import React from 'react';

const SidebarItem = ({ link }) => (
  <div className="sidebar__item">
    <i className={link.iconClass} />
    <span>{link.text}</span>
  </div>
);

export default SidebarItem;
