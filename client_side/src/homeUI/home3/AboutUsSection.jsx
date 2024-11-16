import React from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import realEstateAbout from '../../assets/image/real_estate_about.jpg';
import searchApartment from '../../assets/image/search_apartment.png';
import searchHouseForCouple from '../../assets/image/house3D.png';
import rentApartment from '../../assets/image/rent_apartment.png';
import villa from '../../assets/image/villa.jpg';

const AboutUsSection = () => {
  return (
    <section className="bg-white text-gray-800 py-12 px-6 md:px-12 lg:px-24">
      {/* About Us Main Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
        <div className="md:w-1/2 space-y-6 order-2 md:order-1">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            About Us
          </h2>
          <p className="text-lg md:text-xl text-gray-700">
            At our real estate platform, we strive to connect people with their dream homes, whether it's a cozy house, a luxury villa, or a spacious apartment. We provide a range of properties that cater to different lifestyles and needs, ensuring that you find the perfect place to call home.
          </p>
          <a
            href="#contact"
            className="inline-block bg-pink-600 text-white text-lg font-medium py-3 px-6 rounded-lg transition duration-200 hover:bg-pink-700"
          >
            Learn More
          </a>
        </div>
        <div className="md:w-1/2 flex items-center justify-center order-1 md:order-2">
          <img src={realEstateAbout} alt="About us - Real Estate" className="w-full max-w-sm max-h-64 rounded-lg shadow-lg object-cover" />
        </div>
      </div>

      {/* Questions and Answers Section */}
      <div className="space-y-12">
        {/* Q&A Item - Apartment */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2 space-y-4">
            <div className="flex items-center space-x-2 text-blue-600">
              <FaQuestionCircle />
              <h3 className="text-2xl font-bold">Looking for an Apartment?</h3>
            </div>
            <p className="text-lg text-gray-700">
              We offer modern apartments with all amenities you could dream of. Whether you’re looking for a place downtown or in a quiet suburb, we have options tailored for you.
            </p>
          </div>
          <div className="md:w-1/2 flex items-center justify-center">
            <img src={searchApartment} alt="Searching for an Apartment" className="w-full max-w-sm max-h-64 rounded-lg shadow-lg object-cover" />
          </div>
        </div>

        {/* Q&A Item - House */}
        <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-8">
          <div className="md:w-1/2 space-y-4">
            <div className="flex items-center space-x-2 text-purple-600">
              <FaQuestionCircle />
              <h3 className="text-2xl font-bold">Looking for a House?</h3>
            </div>
            <p className="text-lg text-gray-700">
              We provide a selection of cozy and spacious houses, perfect for couples, families, and individuals alike. Find a home that suits your lifestyle and feel at home.
            </p>
          </div>
          <div className="md:w-1/2 flex items-center justify-center">
            <img src={searchHouseForCouple} alt="Searching for a House" className="w-full max-w-sm max-h-64 rounded-lg shadow-lg object-cover" />
          </div>
        </div>

        {/* Q&A Item - Rental Apartment */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2 space-y-4">
            <div className="flex items-center space-x-2 text-yellow-600">
              <FaQuestionCircle />
              <h3 className="text-2xl font-bold">Need an Apartment for Rent?</h3>
            </div>
            <p className="text-lg text-gray-700">
              Our platform offers a variety of rental apartments that are ideal for both short-term and long-term stays. Get the flexibility you need without compromising on quality.
            </p>
          </div>
          <div className="md:w-1/2 flex items-center justify-center">
            <img src={rentApartment} alt="Apartment for Rent" className="w-full max-w-sm max-h-64 rounded-lg shadow-lg object-cover" />
          </div>
        </div>

        {/* Q&A Item - Villa */}
        <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-8">
          <div className="md:w-1/2 space-y-4">
            <div className="flex items-center space-x-2 text-green-600">
              <FaQuestionCircle />
              <h3 className="text-2xl font-bold">Looking for a Villa?</h3>
            </div>
            <p className="text-lg text-gray-700">
              Experience the luxury of villa living. With options in beautiful, serene locations, we offer villas that provide comfort, space, and privacy.
            </p>
          </div>
          <div className="md:w-1/2 flex items-center justify-center">
            <img src={villa} alt="Looking for a Villa" className="w-full max-w-sm max-h-64 rounded-lg shadow-lg object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
