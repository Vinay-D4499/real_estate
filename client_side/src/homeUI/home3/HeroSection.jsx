import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative bg-white text-gray-900 py-12 sm:py-32 lg:py-24">
      {/* Background geometric shapes */}
      <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none">
        {/* Circles */}
        <div className="absolute w-64 h-64 bg-blue-300 rounded-full opacity-20 transform translate-x-20 translate-y-20"></div>
        <div className="absolute w-96 h-96 bg-green-300 rounded-full opacity-15 transform translate-x-72 translate-y-64"></div>
        <div className="absolute w-64 h-64 bg-blue-300 rounded-full opacity-20 transform translate-x-40 translate-y-10"></div>
        <div className="absolute w-96 h-96 bg-green-300 rounded-full opacity-15 transform translate-x-72 translate-y-96"></div>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 text-center px-6 sm:px-12 lg:px-24">
        <h1 className="text-6xl sm:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight max-w-3xl mx-auto">
          Find Your Ideal Property — House, Apartment, Gated Community, or Farm Land
        </h1>
        <p className="mt-6 text-xl sm:text-2xl text-gray-600 max-w-xl mx-auto">
          Explore a curated selection of properties designed to fit your lifestyle. Whether you’re looking for a luxurious home, a cozy apartment, or a spacious plot of land, we have something for you.
        </p>

        {/* Call to Action Button */}
        <div className="mt-10">
          <a
            href="#properties-gallery"
            className="inline-block bg-black text-white text-lg font-semibold py-4 px-10 rounded-full transition transform duration-300 hover:scale-105 hover:bg-gray-800 focus:outline-none"
          >
            Browse Our Properties
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
