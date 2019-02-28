import React from 'react';
import Avatar from '@common/Avatar';
import './SidebarList.scss';

const SidebarListItem = ({ data }) => (
  <div className="chat-item">
    <Avatar />
    <div className="chat-item__text">
      <strong>User Name</strong>
      <span>Last message text</span>
    </div>
    <div className="chat-item__time">13 min ago</div>
  </div>
);

const SidebarList = ({ title, items }) => (
  <div className="list">
    <h3>{title}</h3>
    {items.map(i => (
      <SidebarListItem key={i.id} data={i} />
    ))}
  </div>
);

export default SidebarList;
