import React from 'react';

const Icon = ({ path }) => (
  <svg
    className='icon'
    xmlns="http://www.w3.org/2000/svg"
    width="24" height="24" viewBox="0 0 24 24"
    fill="currentColor" 
  >
    <path d={path} />
  </svg>
);

export default Icon;
