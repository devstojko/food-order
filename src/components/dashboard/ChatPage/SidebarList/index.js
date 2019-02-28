import React from 'react';
import Avatar from '@common/Avatar';
import './SidebarList.scss';

const SidebarList = ({ title, items, funcOnItems }) => (
  <div className="list">
    <h3>{title}</h3>
    {items.map(i => (
      <div className="chat-item" onClick={() => funcOnItems(i.id)} key={i.id}>
        {console.log(i.id)}
        <Avatar />
        <div className="chat-item__text">
          <strong>
            {i.firstName} {i.lastName}
          </strong>
          <span>Last message text</span>
        </div>
        <div className="chat-item__time">13 min ago</div>
      </div>
    ))}
  </div>
);

export default SidebarList;
