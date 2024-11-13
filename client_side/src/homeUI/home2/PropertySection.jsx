// src/components/PropertiesSection.jsx
import React from 'react';
import PropertyCard from './PropertyCard';
import SVGIcon from './SVGIcon';

const properties = [
  {
    image: 'https://source.unsplash.com/1600x900/?house',
    title: 'Luxury Villa',
    price: '$1,500,000',
    type: 'Villa',
  },
  {
    image: 'https://source.unsplash.com/1600x900/?apartment',
    title: 'Modern Apartment',
    price: '$700,000',
    type: 'Apartment',
  },
  {
    image: 'https://source.unsplash.com/1600x900/?office',
    title: 'Commercial Office',
    price: '$850,000',
    type: 'Office',
  },
  {
    image: 'https://source.unsplash.com/1600x900/?farm',
    title: 'Farm Land',
    price: '$250,000',
    type: 'Farm Land',
  },
];

const PropertiesSection = () => {
  return (
    <section id="properties" className="py-16 bg-gradient-to-r from-[#A1C4FD] via-[#C2E9FB] to-[#E8F9FD]">
      <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800">Featured Properties</h2>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {properties.map((property, index) => (
          <div className="relative group">
            <PropertyCard key={index} {...property} />
            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-30 group-hover:opacity-0 transition-opacity duration-300">
              <SVGIcon iconType="home" animation="animate__bounceIn" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PropertiesSection;
