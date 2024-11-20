import React, { useEffect } from 'react';
import { FaHome, FaCity, FaWarehouse, FaTractor } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'animate.css';

const Features = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="bg-black text-white py-12 px-6">
         <h2 className="font-heading mb-4 bg-yellow-300 text-black text-center text-4xl px-4 py-2 rounded-lg md:w-64 md:mx-auto  font-semibold tracking-widest uppercase title-font animate__animated animate__fadeIn">
                            More About Us
                        </h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:pt-10">
        
        {/* Residential Properties */}
        <div className="block rounded-xl border border-gray-800 p-6" data-aos="fade-up">
          <span className="flex items-center justify-center w-12 h-12 rounded-lg bg-yellow-300 text-black animate__animated animate__fadeIn">
            <FaHome size={24} />
          </span>
          <h2 className="mt-4 font-semibold text-lg text-white">
            Residential Properties
          </h2>
          <p className="mt-2 text-gray-400">
            Find your perfect home with our selection of apartments, houses, and villas.
          </p>
        </div>

        {/* Commercial Spaces */}
        <div className="block rounded-xl border border-gray-800 p-6" data-aos="fade-up">
          <span className="flex items-center justify-center w-12 h-12 rounded-lg bg-yellow-300 text-black animate__animated animate__fadeIn">
            <FaCity size={24} />
          </span>
          <h2 className="mt-4 font-semibold text-lg text-white">
            Commercial Spaces
          </h2>
          <p className="mt-2 text-gray-400">
            Discover office spaces, retail stores, and warehouses to expand your business.
          </p>
        </div>

        {/* Agricultural Land */}
        <div className="block rounded-xl border border-gray-800 p-6" data-aos="fade-up">
          <span className="flex items-center justify-center w-12 h-12 rounded-lg bg-yellow-300 text-black animate__animated animate__fadeIn">
            <FaTractor size={24} />
          </span>
          <h2 className="mt-4 font-semibold text-lg text-white">
            Agricultural Land
          </h2>
          <p className="mt-2 text-gray-400">
            Invest in fertile agricultural land for your farming or business projects.
          </p>
        </div>

        {/* Warehousing Solutions */}
        <div className="block rounded-xl border border-gray-800 p-6" data-aos="fade-up">
          <span className="flex items-center justify-center w-12 h-12 rounded-lg bg-yellow-300 text-black animate__animated animate__fadeIn">
            <FaWarehouse size={24} />
          </span>
          <h2 className="mt-4 font-semibold text-lg text-white">
            Warehousing Solutions
          </h2>
          <p className="mt-2 text-gray-400">
            Secure and spacious warehouses available for your storage needs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
