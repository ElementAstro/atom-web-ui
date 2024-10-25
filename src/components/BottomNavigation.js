// src/components/BottomNavigation.js
import React from 'react';

const BottomNavigation = ({ items, onItemSelect }) => {
  return (
    <div className="bottom-navigation">
      {items.map((item, index) => (
        <button key={index} className="nav-item" onClick={() => onItemSelect(item)}>
          {item.icon} {/* 假设 item.icon 是一个图标组件 */}
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default BottomNavigation;
