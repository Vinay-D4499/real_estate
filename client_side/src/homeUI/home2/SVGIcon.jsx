// src/components/SVGIcon.jsx
import React from 'react';

// Multiple icons with different animation styles
const SVGIcon = ({ iconType = 'circle', animation = 'animate__bounceIn' }) => {
  switch (iconType) {
    case 'circle':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-20 w-20 text-[#FF6F91] ${animation}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M2 10a8 8 0 1116 0A8 8 0 012 10zm8-6a6 6 0 100 12A6 6 0 0010 4z" clipRule="evenodd" />
        </svg>
      );
    case 'home':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-20 w-20 text-[#FFB6C1] ${animation}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3l7 7-1.5 1.5-5.5-5.5V15h-2V5L4.5 11.5 3 10l7-7z" clipRule="evenodd" />
        </svg>
      );
    case 'key':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-20 w-20 text-[#A1C4FD] ${animation}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.5 6A2.5 2.5 0 1114 8.5a2.5 2.5 0 012.5-2.5zm-5.6 4.7a3.6 3.6 0 00-5.1 0l-4.5 4.5a3.6 3.6 0 005.1 5.1l4.5-4.5a3.6 3.6 0 000-5.1z" clipRule="evenodd" />
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-20 w-20 text-[#C2E9FB] ${animation}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M2 10a8 8 0 1116 0A8 8 0 012 10zm8-6a6 6 0 100 12A6 6 0 0010 4z" clipRule="evenodd" />
        </svg>
      );
  }
};

export default SVGIcon;
