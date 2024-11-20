import React, { useEffect } from 'react';
import { FaHome, FaBuilding, FaTractor, FaHouseUser, FaCity } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const HeroSection = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <>
            <section>
                <div className="bg-black text-white ">
                    <div className="container mx-auto flex flex-col md:flex-row items-center  ">
                        <div className="flex flex-col w-full lg:w-1/3 justify-center items-start p-8">
                            <h1 className="text-3xl md:text-5xl p-2 text-yellow-300 tracking-loose">
                                RealEstateHub
                            </h1>
                            <h2 className="text-3xl md:text-5xl leading-relaxed md:leading-snug mb-2">
                                Your Dream Property Awaits
                            </h2>
                            <p className="text-sm md:text-base text-gray-50 mb-4">
                                Discover a range of properties, from houses and apartments to farmland and villas, tailored to your needs.
                            </p>
                            <a
                                href="#"
                                className="bg-transparent hover:bg-yellow-300 text-yellow-300 hover:text-black rounded shadow hover:shadow-lg py-2 px-4 border border-yellow-300 hover:border-transparent"
                            >
                                Browse Properties
                            </a>
                        </div>
                        <div className="p-8 mt-2 mb-6 md:mb-0 md:mt-0 ml-0 md:ml-12 lg:w-2/3 flex justify-center">
                            <div className="h-48 flex flex-wrap content-center justify-center">
                                <div className="icon-hover flex justify-center items-center mt-8 mx-4" data-aos="fade-up">
                                    <FaHome className="text-yellow-300 text-6xl sm:text-8xl" title="House" />
                                </div>
                                <div className="icon-hover flex justify-center items-center mt-8 mx-4" data-aos="fade-up">
                                    <FaBuilding className="text-yellow-300 text-6xl sm:text-8xl" title="Apartment" />
                                </div>
                                <div className="icon-hover flex justify-center items-center mt-8 mx-4" data-aos="fade-up">
                                    <FaTractor className="text-yellow-300 text-6xl sm:text-8xl" title="Farm Land" />
                                </div>
                                <div className="icon-hover flex justify-center items-center mt-8 mx-4" data-aos="fade-up">
                                    <FaHouseUser className="text-yellow-300 text-6xl sm:text-8xl" title="Villa" />
                                </div>
                                <div className="icon-hover flex justify-center items-center mt-8 mx-4" data-aos="fade-up">
                                    <FaCity className="text-yellow-300 text-6xl sm:text-8xl" title="Gated Community" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default HeroSection;
