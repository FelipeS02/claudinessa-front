import React from 'react';
import './text.css';

const Text = ({
  children,
  type = '',
  color = 'primary',
  className = '',
  ...attributes
}) => {
  return (
    <span className={`${type} ${color} ${className}`} {...attributes}>
      {children}
    </span>
  );
};

export default Text;
