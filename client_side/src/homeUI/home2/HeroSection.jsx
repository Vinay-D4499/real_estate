// src/components/HeroSection.jsx
import React from 'react';
import SVGIcon from './SVGIcon';
import 'animate.css';

const HeroSection = () => {
  return (
    <section
      className="relative h-screen bg-cover bg-center flex items-center justify-center text-center overflow-hidden"
      style={{
        backgroundImage: 'url("https://suratfarmhouse.com/wp-content/uploads/2022/04/WhatsApp-Image-2022-04-27-at-10.41.49-AM-2-1651041248.jpeg")',
        // backgroundImage: 'url("https://wallpaperaccess.com/full/3158925.jpg")',
      }}
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Main Text Content */}
      <div className="z-10 space-y-4 px-6 md:px-0">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight animate__animated animate__fadeInDown animate__delay-1s retro-font">
          Discover Your Dream Home
        </h1>
        <p className="mt-2 text-lg md:text-2xl text-gray-100 animate__animated animate__fadeIn animate__delay-2s">
          Luxury apartments, modern villas, and more await you.
        </p>
        <a
          href="#properties"
          className="mt-6 inline-block px-10 py-4 bg-gradient-to-r from-[#FFB6C1] to-[#FF6F91] rounded-full text-lg md:text-xl font-semibold text-gray-900 shadow-lg hover:scale-110 transform transition-transform duration-300 animate__animated animate__fadeInUp animate__delay-3s"
        >
          Browse Listings
        </a>
      </div>

      {/* Memphis-Style Shapes */}
      <div className="absolute top-0 left-1/3 w-24 h-24 bg-[#FFC107] rounded-full opacity-80 transform rotate-45 animate__animated animate__bounceIn animate__delay-1s"></div>
      <div className="absolute bottom-0 right-1/3 w-20 h-20 bg-[#3DDC84] rounded-tr-full rounded-bl-full opacity-80 animate__animated animate__bounceIn animate__delay-2s"></div>
      <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-[#FF6F91] rounded-full opacity-70 animate__animated animate__fadeInUp animate__delay-2s"></div>
      <div className="absolute bottom-1/3 left-1/4 w-20 h-8 bg-[#FF4081] rounded opacity-70 animate__animated animate__fadeIn animate__delay-3s"></div>

      {/* SVG Icon Overlays */}
      <div className="absolute top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2 animate__animated animate__fadeIn animate__delay-1s">
        <SVGIcon iconType="home" animation="animate__fadeInUp" />
      </div>
      <div className="absolute top-1/4 right-1/4 transform translate-x-1/2 -translate-y-1/2 animate__animated animate__zoomIn animate__delay-2s">
        <SVGIcon iconType="key" animation="animate__zoomIn" />
      </div>
      <div className="absolute bottom-1/4 left-1/4 transform -translate-x-1/2 translate-y-1/2 animate__animated animate__fadeInUp animate__delay-3s">
        <SVGIcon iconType="circle" animation="animate__fadeInUp" />
      </div>
      <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2 animate__animated animate__flipInX animate__delay-4s">
        <SVGIcon iconType="home" animation="animate__flipInX" />
      </div>
    </section>
  );
};

export default HeroSection;
