// src/components/PropertyCard.jsx
import React from 'react';

const PropertyCard = ({ image, title, price, type }) => {
  return (
    <div
      className="group relative overflow-hidden rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-xl"
      data-aos="zoom-in"
      data-aos-delay="100"
    >
      {/* Property Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-64 object-cover rounded-t-xl transition-transform transform group-hover:scale-110"
      />

      {/* Property Info */}
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-gradient-to-t from-black to-transparent p-6 text-white group-hover:bg-gradient-to-t group-hover:from-black group-hover:to-transparent">
        <h3 className="text-2xl font-semibold text-center">{title}</h3>
        <p className="text-lg font-semibold text-gray-300 text-center">{type}</p>
        <p className="text-xl font-bold mt-4">{price ? price : 'Price upon request'}</p>
      </div>
    </div>
  );
};

export default PropertyCard;
