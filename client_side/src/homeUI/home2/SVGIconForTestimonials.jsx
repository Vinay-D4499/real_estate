// src/components/SVGIcon.jsx
import React from 'react';

const SVGIconForTestimonials = ({ iconType = 'circle', animation = 'animate__bounceIn' }) => {
  switch (iconType) {
    case 'circle':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-16 w-16 text-[#FF6F91] ${animation}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M2 10a8 8 0 1116 0A8 8 0 012 10zm8-6a6 6 0 100 12A6 6 0 0010 4z" clipRule="evenodd" />
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-16 w-16 text-[#FFB6C1] ${animation}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3l7 7-1.5 1.5-5.5-5.5V15h-2V5L4.5 11.5 3 10l7-7z" clipRule="evenodd" />
        </svg>
      );
  }
};

export default SVGIconForTestimonials;
