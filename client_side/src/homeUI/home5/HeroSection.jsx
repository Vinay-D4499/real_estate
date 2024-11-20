import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import houseImage from '../../assets/image/houseImage.png';
import house3D from '../../assets/image/house3D.png';
import farmLand from '../../assets/image/farmLand.jpg';
import apartments from '../../assets/image/apartments.jpg';
import villa from '../../assets/image/villa.jpg';

const HeroSection = () => {
    return (
        <section className="pt-12 ">
            <div className="px-12 mx-auto max-w-7xl">
                <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
                    <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-normal text-white md:text-6xl md:tracking-tight">
                        <span>Find</span> <span className="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-400 to-purple-500 lg:inline">Your Dream Property</span> <span>With Us</span>
                    </h1>
                    <p className="px-0 mb-8 text-lg text-gray-400 md:text-xl lg:px-24">
                        Discover the best properties across India. From luxurious villas to affordable apartments, we have something for everyone. Let us help you find your next home.
                    </p>
                    <div className="mb-4 space-x-0 md:space-x-2 md:mb-8">
                        <a href="#_" className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-white bg-green-400 rounded-2xl sm:w-auto sm:mb-0">
                            Get Started
                            <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                        </a>
                        <a href="#_" className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg bg-gray-100 rounded-2xl sm:w-auto sm:mb-0">
                            Explore Properties
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                            </svg>
                        </a>
                    </div>
                </div>
                <div className="w-full mx-auto mt-20 text-center md:w-10/12">
                    <Carousel
                        infiniteLoop={true}
                        autoPlay={true}
                        interval={3000}
                        showArrows={false} // Hide next/prev arrows
                        showThumbs={false} // Hide thumbnails
                        dynamicHeight={false}
                        showStatus={false} // Hide status
                    >
                        <div className="relative">
                            <img
                                src={houseImage}
                                alt="House"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black to-transparent text-white w-full text-center">
                                <h3 className="text-2xl font-bold">Modern Living, Timeless Comfort</h3>
                                <p className="mt-2 text-lg">Find your perfect home with all the amenities you desire.</p>
                            </div>
                        </div>
                        <div className="relative">
                            <img
                                src={house3D}
                                alt="House 3D"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black to-transparent text-white w-full text-center">
                                <h3 className="text-2xl font-bold">Explore Your Dream Home </h3>
                                <p className="mt-2 text-lg">Find your perfect home with all the amenities you desire.</p>
                            </div>
                        </div>
                        <div className="relative">
                            <img
                                src={farmLand}
                                alt="Farm Land"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black to-transparent text-white w-full text-center">
                                <h3 className="text-2xl font-bold">Expansive Farm Land, Endless Possibilities</h3>
                                <p className="mt-2 text-lg">Own your slice of paradise with acres of land.</p>
                            </div>
                        </div>
                        <div className="relative">
                            <img
                                src={apartments}
                                alt="Apartments"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black to-transparent text-white w-full text-center">
                                <h3 className="text-2xl font-bold">Affordable Apartments, Luxurious Living</h3>
                                <p className="mt-2 text-lg">Modern living with a view – your new home awaits.</p>
                            </div>
                        </div>
                        <div className="relative">
                            <img
                                src={villa}
                                alt="Villa"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black to-transparent text-white w-full text-center">
                                <h3 className="text-2xl font-bold">Exclusive Villas for the Discerning Few</h3>
                                <p className="mt-2 text-lg">Live in luxury in a villa designed just for you.</p>
                            </div>
                        </div>
                    </Carousel>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
