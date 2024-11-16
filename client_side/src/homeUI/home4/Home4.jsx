import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import HeroSection from './HeroSection';
import AboutUs from './AboutUs';
import './home4.css'
import Features from './Features';
import Testimonials from './Testimonials';
import PropertyGallery from './PropertyGallery';

const Home4 = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with custom settings
  }, []);

  return (
    <>
      <HeroSection />
      <AboutUs />
      <Features />
      <Testimonials />
      <PropertyGallery />
    </>
  );
}

export default Home4;
