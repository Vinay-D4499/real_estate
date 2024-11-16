// src/components/PropertyList.jsx
import React, { useEffect } from 'react';
import PropertyCard from './PropertyCard';
import AOS from 'aos';
import 'aos/dist/aos.css';

const PropertyList = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const properties = [
    {
      image: 'https://th.bing.com/th?id=OIP.a_0sHqsAJtygGNTwNbDGJwHaE8&w=305&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2',
      title: 'Luxury House in Malibu',
      type: 'House',
    },
    {
      image: 'https://wallpaperaccess.com/full/1142283.jpg',
      title: 'Modern City Apartment',
      type: 'Apartment',
    },
    {
      image: 'https://th.bing.com/th/id/OIP.cuKz9t-_UoQrZ0ZZG7ohcwHaEo?rs=1&pid=ImgDetMain',
      title: 'Stunning Villa',
      type: 'Villa',
    },
    {
      image: 'https://th.bing.com/th/id/OIP.jEyDnxXEUuwtF6HMELFo7gHaE-?rs=1&pid=ImgDetMain',
      title: 'Farmhouse Retreat',
      type: 'Farm',
    },
  ];

  return (
    <section
      id="properties"
      className="py-16 bg-gradient-to-r from-[#A1C4FD] via-[#C2E9FB] to-[#E8F9FD] relative overflow-hidden"
    >
      <h2
        className="text-4xl font-extrabold text-center mt-10 text-gray-800 z-50"
        data-aos="fade-down"
      >
        Featured Properties
      </h2>

      {/* Decorative Shapes */}
      <div
        className="absolute top-10 left-10 w-16 h-16 bg-[#FFA45B] rounded-full opacity-75 transform rotate-45 z-10"
        data-aos="fade-in"
        data-aos-delay="100"
      ></div>
      <div
        className="absolute bottom-20 right-20 w-24 h-6 bg-[#FF6F91] rounded opacity-75 transform rotate-12"
        data-aos="fade-in"
        data-aos-delay="200"
      ></div>
      <div
        className="absolute top-1/3 left-1/3 w-20 h-20 bg-[#42A5F5] rounded-full opacity-60"
        data-aos="fade-in"
        data-aos-delay="300"
      ></div>

      {/* Property Cards Grid */}
      <div
        className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        {properties.map((property, index) => (
          <div
            className="transform transition-all duration-300 hover:scale-105"
            data-aos="zoom-in"
            data-aos-delay={`${index * 100 + 500}`} // staggered delay for each card
            key={index}
          >
            <PropertyCard {...property} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PropertyList;
