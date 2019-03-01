import React from 'react';

const SidebarList = ({ title, children }) => (
  <div className="list">
    <h3>{title}</h3>
    {children}
  </div>
);

export default SidebarList;
