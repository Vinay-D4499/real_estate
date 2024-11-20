import React, { useEffect } from 'react';
import 'animate.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaMapMarkerAlt, FaHome, FaMoneyBillWave, FaClipboardList } from 'react-icons/fa';

const AboutUs = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <>
            <section className="bg-black text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center">
                        <h2 className="font-heading mb-4 bg-yellow-300 text-black px-4 py-2 rounded-lg md:w-64 md:mx-auto text-xs font-semibold tracking-widest uppercase title-font animate__animated animate__fadeIn">
                            Why Choose Us?
                        </h2>
                        <p className="font-heading mt-2 text-3xl leading-8 font-semibold tracking-tight text-white sm:text-4xl animate__animated animate__fadeInUp">
                            Your Trusted Real Estate Partner
                        </p>
                        <p className="mt-4 max-w-2xl text-lg text-gray-300 lg:mx-auto animate__animated animate__fadeInUp">
                            We help you find the perfect property—whether it's a cozy home, luxurious villa, or Apartments.
                        </p>
                    </div>
                    <div className="mt-10">
                        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                            <div className="relative" data-aos="fade-right">
                                <dt>
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-yellow-300 text-black">
                                        <FaMapMarkerAlt className="text-2xl" />
                                    </div>
                                    <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-100">
                                        Prime Locations
                                    </p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-gray-400">
                                    We offer properties in prime locations to ensure great connectivity and high returns.
                                </dd>
                            </div>
                            <div className="relative" data-aos="fade-left">
                                <dt>
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-yellow-300 text-black">
                                        <FaHome className="text-2xl" />
                                    </div>
                                    <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-100">
                                        Variety of Properties
                                    </p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-gray-400">
                                    From apartments to villas and gated communities, we cater to all housing needs.
                                </dd>
                            </div>
                            <div className="relative" data-aos="fade-right">
                                <dt>
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-yellow-300 text-black">
                                        <FaMoneyBillWave className="text-2xl" />
                                    </div>
                                    <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-100">
                                        Affordable Financing
                                    </p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-gray-400">
                                    Our affordable financing options make owning your dream property easier than ever.
                                </dd>
                            </div>
                            <div className="relative" data-aos="fade-left">
                                <dt>
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-yellow-300 text-black">
                                        <FaClipboardList className="text-2xl" />
                                    </div>
                                    <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-100">
                                        Transparent Process
                                    </p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-gray-400">
                                    We ensure a smooth, transparent buying process with no hidden costs or surprises.
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AboutUs;
