// src/components/AboutUs.jsx
import React, { useEffect } from 'react';
import { FaBuilding, FaHandsHelping, FaRegSmile } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AboutUs = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section
      id="about-us"
      className="py-16 bg-gradient-to-r from-[#A1C4FD] via-[#C2E9FB] to-[#E8F9FD] relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <h2
          className="text-4xl font-extrabold text-center mb-12 text-gray-900"
          data-aos="fade-down"
        >
          About Us
        </h2>

        {/* Content */}
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Text Section */}
          <div
            className="md:w-1/2 space-y-6"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            <h3 className="text-3xl font-bold text-gray-700">
              A Legacy of Excellence in Real Estate
            </h3>
            <p className="text-lg text-gray-800">
              We are a team of dedicated real estate professionals with years of
              experience in connecting clients to their dream properties. Our
              mission is to make buying, selling, or renting properties a
              seamless and fulfilling experience.
            </p>
            <p className="text-lg text-gray-800">
              With us, you'll discover not only the best properties but also a
              trusted partner in every step of the journey. We prioritize
              transparency, client satisfaction, and quality service, ensuring
              that you find a place to call home.
            </p>
          </div>

          {/* Icon Cards Section */}
          <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div
              className="bg-white rounded-lg shadow-lg p-6 text-center"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <FaBuilding className="text-5xl text-[#FF6F91] mx-auto mb-4" />
              <h4 className="text-xl font-bold text-gray-900">
                Wide Property Selection
              </h4>
              <p className="text-gray-700 mt-2">
                Choose from a range of premium houses, apartments, villas, and
                commercial properties in prime locations.
              </p>
            </div>
            <div
              className="bg-white rounded-lg shadow-lg p-6 text-center"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <FaHandsHelping className="text-5xl text-[#FFA45B] mx-auto mb-4" />
              <h4 className="text-xl font-bold text-gray-900">Expert Guidance</h4>
              <p className="text-gray-700 mt-2">
                Our team guides you through each step, from property selection to
                finalizing the deal with complete transparency.
              </p>
            </div>
            <div
              className="bg-white rounded-lg shadow-lg p-6 text-center"
              data-aos="zoom-in"
              data-aos-delay="400"
            >
              <FaRegSmile className="text-5xl text-[#42A5F5] mx-auto mb-4" />
              <h4 className="text-xl font-bold text-gray-900">
                Client Satisfaction
              </h4>
              <p className="text-gray-700 mt-2">
                We are committed to your satisfaction, ensuring a seamless
                experience tailored to your unique needs and preferences.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Memphis Shapes */}
      <div
        className="absolute top-10 left-20 w-16 h-16 bg-[#FF6F91] rounded-full opacity-75 transform rotate-45"
        data-aos="fade-in"
        data-aos-delay="500"
      ></div>
      <div
        className="absolute bottom-20 right-20 w-24 h-6 bg-[#42A5F5] rounded opacity-75 transform rotate-12"
        data-aos="fade-in"
        data-aos-delay="600"
      ></div>
      <div
        className="absolute top-1/3 left-1/3 w-20 h-20 bg-[#FFA45B] rounded-full opacity-60"
        data-aos="fade-in"
        data-aos-delay="700"
      ></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-8 h-8 bg-[#FFD3A5] rounded-full opacity-80"
        data-aos="fade-in"
        data-aos-delay="800"
      ></div>
    </section>
  );
};

export default AboutUs;
