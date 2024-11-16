import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';

import houseImage from '../../assets/image/houseImage.png';
import house3D from '../../assets/image/house3D.png';
import farmLand from '../../assets/image/farmLand.jpg';
import apartments from '../../assets/image/apartments.jpg';
import villa from '../../assets/image/villa.jpg';

const PropertyGallery = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, easing: 'ease-in-out', once: true });
    }, []);

    const images = [
        { src: houseImage, alt: 'House Image', aos: 'fade-up' },
        { src: house3D, alt: '3D House Image', aos: 'fade-down' },
        { src: farmLand, alt: 'Farm Land', aos: 'fade-right' },
        { src: apartments, alt: 'Apartments', aos: 'fade-left' },
        { src: villa, alt: 'Villa', aos: 'zoom-in' },
        { src: houseImage, alt: 'House Image', aos: 'fade-up' },
        { src: house3D, alt: '3D House Image', aos: 'fade-down' },
        { src: farmLand, alt: 'Farm Land', aos: 'fade-right' },
        { src: apartments, alt: 'Apartments', aos: 'fade-left' },
        { src: villa, alt: 'Villa', aos: 'zoom-in' },
    ];

    return (
        <section className="bg-black py-16">
            <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-200">
                Explore Our Properties
            </h2>
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 lg:px-0">
                <div className="relative col-span-1 lg:col-span-2 row-span-2 overflow-hidden rounded-lg" data-aos="zoom-in">
                    <img src={images[0].src} alt={images[0].alt} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                </div>
                <div className="relative overflow-hidden rounded-lg" data-aos="fade-up">
                    <img src={images[1].src} alt={images[1].alt} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                </div>
                <div className="relative overflow-hidden rounded-lg" data-aos="fade-down">
                    <img src={images[2].src} alt={images[2].alt} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                </div>
                <div className="relative overflow-hidden rounded-lg" data-aos="fade-right">
                    <img src={images[3].src} alt={images[3].alt} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                </div>
                <div className="relative overflow-hidden rounded-lg" data-aos="fade-left">
                    <img src={images[4].src} alt={images[4].alt} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                </div>
                <div className="relative overflow-hidden rounded-lg" data-aos="fade-up">
                    <img src={images[1].src} alt={images[1].alt} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                </div>
                <div className="relative col-span-1 lg:col-span-2 row-span-2 overflow-hidden rounded-lg" data-aos="zoom-in">
                    <img src={images[0].src} alt={images[0].alt} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                </div>
                <div className="relative overflow-hidden rounded-lg" data-aos="fade-right">
                    <img src={images[3].src} alt={images[3].alt} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                </div>
                <div className="relative overflow-hidden rounded-lg" data-aos="fade-left">
                    <img src={images[4].src} alt={images[4].alt} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                </div>
            </div>
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 lg:px-0">
                <div className="relative overflow-hidden rounded-lg" data-aos="fade-up">
                    <img src={images[1].src} alt={images[1].alt} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                </div>
                <div className="relative col-span-1 lg:col-span-2 row-span-2 overflow-hidden rounded-lg" data-aos="zoom-in">
                    <img src={images[0].src} alt={images[0].alt} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                </div>
                <div className="relative overflow-hidden rounded-lg" data-aos="fade-down">
                    <img src={images[2].src} alt={images[2].alt} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                </div>
                <div className="relative overflow-hidden rounded-lg" data-aos="fade-right">
                    <img src={images[3].src} alt={images[3].alt} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                </div>
                <div className="relative overflow-hidden rounded-lg" data-aos="fade-left">
                    <img src={images[4].src} alt={images[4].alt} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                </div>
            </div>
        </section>
    );
};

export default PropertyGallery;
