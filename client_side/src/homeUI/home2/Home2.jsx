// src/components/Home2.jsx
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import HeroSection from './HeroSection';
import PropertyList from './PropertyList';
import TestimonialSection from './TestimonialSection';
import AboutUs from './AboutUs';
import 'animate.css';
import PropertiesGallery from './PropertiesGallery';

const Home2 = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="bg-[#FDF0D5] text-gray-800">
      {/* Hero Section with Scroll Animation */}
      <section data-aos="fade-in">
        <HeroSection />
      </section>

      {/* About Us Section with Retro Colors and Slide Animation */}
      <section data-aos="fade-left" data-aos-delay="200">
        <AboutUs />
      </section>

      {/* Property List Section with Staggered Animation */}
      <section data-aos="fade-right" data-aos-delay="400">
        <PropertyList />
      </section>

      {/* Testimonials Section with Fade Up Animation */}
      <section data-aos="fade-up" data-aos-delay="600">
        <TestimonialSection />
      </section>

      <section data-aos="fade-up" data-aos-delay="800">
        <PropertiesGallery />
      </section>
    </div>
  );
};

export default Home2;
