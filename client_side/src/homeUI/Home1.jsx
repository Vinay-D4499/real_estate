import React, { useState } from 'react'
import gallery1 from '../assets/image/gallery-1.png';
import gallery2 from '../assets/image/gallery-2.png';
import gallery3 from '../assets/image/gallery-3.png';
import gallery4 from '../assets/image/gallery-4.png';
import gallery5 from '../assets/image/gallery-5.png';
import gallery6 from '../assets/image/gallery-6.png';
import gallery7 from '../assets/image/gallery-7.png';

import testimoni1 from '../assets/image/default.png';
// import testimoni2 from '../assets/image/testimoni-2.png';
import testimoni3 from '../assets/image/testimoni-3.png';
import testimoni4 from '../assets/image/testimoni-4.png';
import featureImg from '../assets/image/feature-img.png';
import { MapIcon, StarIcon } from '@heroicons/react/24/solid';
import './home1.css'



const Home1 = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    // Define different images for each category
    const images = {
        All: [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7],
        House: [gallery1, gallery3, gallery4],
        Villa: [gallery2, gallery5, gallery6],
        Apartment: [gallery7, gallery3, gallery2],
    };
    return (
        <>
            <>
                {/* home section */}
                <section className="bg-white mb-20 md:mb-52 xl:mb-72">
                    <div className="container max-w-screen-xl mx-auto px-4">
                        {/* <nav class="flex-wrap lg:flex items-center py-14 xl:relative z-10" x-data="{navbarOpen:false}">

              <div class="flex items-center justify-between mb-10 lg:mb-0">
                  <img src="assets/image/navbar-logo.png" alt="Logo img" class="w-52 md:w-80 lg:w-full">

                  <button class="lg:hidden w-10 h-10 ml-auto flex items-center justify-center text-green-700 border border-green-700 rounded-md" @click="navbarOpen = !navbarOpen">
                      <i data-feather="menu"></i>
                  </button>
              </div>

              <ul class="lg:flex flex-col lg:flex-row lg:items-center lg:mx-auto lg:space-x-8 xl:space-x-16" :class="{'hidden':!navbarOpen,'flex':navbarOpen}">

                  <li class="font-semibold text-gray-900 text-lg hover:text-gray-400 transition ease-in-out duration-300 mb-5 lg:mb-0">
                      <a href="#">Landing</a>
                  </li>
  
                  <li class="font-semibold text-gray-900 text-lg hover:text-gray-400 transition ease-in-out duration-300 mb-5 lg:mb-0">
                      <a href="#">Pages</a>
                  </li>
  
                  <li class="font-semibold text-gray-900 text-lg hover:text-gray-400 transition ease-in-out duration-300 mb-5 lg:mb-0">
                      <a href="#">Contact</a>
                  </li>
  
                  <li class="font-semibold text-gray-900 text-lg hover:text-gray-400 transition ease-in-out duration-300 mb-5 lg:mb-0">
                      <a href="#">About</a>
                  </li>

              </ul>

              <button class="px-5 py-3 lg:block border-2 border-green-700 rounded-lg font-semibold text-green-700 text-lg hover:bg-green-700 hover:text-white transition ease-linear duration-500" :class="{'hidden':!navbarOpen,'flex':navbarOpen}">
                  Request quote
              </button>

          </nav> */}
                        <div className="flex items-center justify-center xl:justify-start">
                            <div className="mt-28 text-center xl:text-left">
                                <h1 className="font-semibold text-4xl md:text-6xl lg:text-7xl text-gray-900 leading-normal mb-6">
                                    Get your desired <br /> Property now
                                </h1>
                                <p className="font-normal text-xl text-gray-400 leading-relaxed mb-12">
                                    Owning a dream property, whether it's a house, farm, villa, flat, mansion, or even a beachfront retreat, is everyone's aspiration.<br /> Have you found your perfect place?
                                </p>
                                <button className="px-6 py-4 bg-green-700 text-white font-semibold text-lg rounded-xl hover:bg-green-900 transition ease-in-out duration-500">
                                    Contact us
                                </button>
                            </div>
                            <div className=" xl:block xl:absolute z-0 top-0 right-0">
                                <img src={featureImg} alt="Home img" />
                            </div>
                        </div>
                    </div>{" "}
                    {/* container.// */}
                </section>
                {/* home section //nd */}
                {/* feature section */}
                <section className="bg-white py-10 md:py-16 xl:relative">
                    <div className="container max-w-screen-xl mx-auto px-4">
                        <div className="flex flex-col xl:flex-row justify-end">
                            {/* Image Section */}
                            <div className="hidden xl:block xl:absolute left-0 bottom-0 w-full">
                                <img src={featureImg} alt="Feature img" />
                            </div>

                            {/* Content Section */}
                            <div>
                                <h1 className="font-semibold text-gray-900 text-xl md:text-4xl text-center leading-normal mb-6">
                                    Choice of various types of <br /> house
                                </h1>
                                <p className="font-normal text-gray-400 text-md md:text-xl text-center mb-16">
                                    We provide a wide selection of home types for you and your <br /> family, and you are free to choose a home model.
                                </p>

                                {/* Best Home Guarantee */}
                                <div className="flex flex-col md:flex-row justify-center xl:justify-start space-x-4 mb-20">
                                    <div className="px-8 h-20 mx-auto md:mx-0  rounded-lg flex items-center justify-center mb-5 md:mb-0">
                                        {/* <i data-feather="check-circle" className="text-green-900"></i> */}
                                        <MapIcon className='h-20 w-20'/>
                                    </div>
                                    <div className="text-center md:text-left">
                                        <h4 className="font-semibold text-gray-900 text-2xl mb-2">Prime Locations</h4>
                                        <p className="font-normal text-gray-400 text-xl leading-relaxed">
                                            Whether you prefer serene countryside views or vibrant cityscapes, <br /> our properties are located in the most desirable areas.
                                        </p>
                                    </div>
                                </div>

                                {/* Safe Transaction */}
                                <div className="flex flex-col md:flex-row justify-center xl:justify-start space-x-4 mb-20">
                                    <div className="px-8 h-20 mx-auto md:mx-0  rounded-lg flex items-center justify-center mb-5 md:mb-0">
                                        {/* <i data-feather="lock" className="text-green-900"></i> */}
                                        <MapIcon className='h-20 w-20'/>
                                    </div>
                                    <div className="text-center md:text-left">
                                        <h4 className="font-semibold text-gray-900 text-2xl mb-2">Wide Range of Properties</h4>
                                        <p className="font-normal text-gray-400 text-xl leading-relaxed">
                                            Explore various property types, from cozy homes to <br /> luxurious villas and beachfront escapes.
                                        </p>
                                    </div>
                                </div>

                                {/* Low and Cost Home Taxes */}
                                <div className="flex flex-col md:flex-row justify-center xl:justify-start space-x-4">
                                    <div className="px-8 h-20 mx-auto md:mx-0  rounded-lg flex items-center justify-center mb-5 md:mb-0">
                                        {/* <i data-feather="credit-card" className="text-green-900"></i> */}
                                        <MapIcon className='h-20 w-20'/>
                                    </div>
                                    <div className="text-center md:text-left">
                                        <h4 className="font-semibold text-gray-900 text-2xl mb-2">Perfect for Every Lifestyle</h4>
                                        <p className="font-normal text-gray-400 text-xl leading-relaxed">
                                            From peaceful retreats to modern urban flats, <br /> our diverse properties cater to every taste and lifestyle.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> {/* container.// */}
                </section>

                {/* feature section //end */}
                {/* gallery section */}
                <section className="bg-white py-10 md:py-16">
                    <div className="container max-w-screen-xl mx-auto px-4">
                        <h1 className="font-semibold text-gray-900 text-4xl text-center mb-10">
                            Our Gallery
                        </h1>

                        {/* Category selection buttons */}
                        <div className="hidden md:block flex items-center text-center space-x-10 lg:space-x-20 mb-12">
                            <button
                                onClick={() => handleCategoryChange('All')}
                                className={`px-6 py-2 ${selectedCategory === 'All' ? 'bg-green-800 text-white' : 'text-gray-900'} font-semibold text-xl rounded-lg hover:bg-green-600 transition ease-in-out duration-500`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => handleCategoryChange('House')}
                                className={`px-6 py-2 ${selectedCategory === 'House' ? 'bg-green-800 text-white' : 'text-gray-900'} font-normal text-xl rounded-lg hover:bg-gray-200 hover:text-gray-400 transition ease-in-out duration-500`}
                            >
                                House
                            </button>
                            <button
                                onClick={() => handleCategoryChange('Villa')}
                                className={`px-6 py-2 ${selectedCategory === 'Villa' ? 'bg-green-800 text-white' : 'text-gray-900'} font-normal text-xl rounded-lg hover:bg-gray-200 hover:text-gray-400 transition ease-in-out duration-500`}
                            >
                                Villa
                            </button>
                            <button
                                onClick={() => handleCategoryChange('Apartment')}
                                className={`px-6 py-2 ${selectedCategory === 'Apartment' ? 'bg-green-800 text-white' : 'text-gray-900'} font-normal text-xl rounded-lg hover:bg-gray-200 hover:text-gray-400 transition ease-in-out duration-500`}
                            >
                                Apartment
                            </button>
                        </div>

                        {/* Image grid with fade-in animation */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                            {images[selectedCategory].map((image, index) => (
                                <div
                                    key={index}
                                    className="image-container transition-opacity duration-500 ease-in-out opacity-0 animate-fadeIn"
                                >
                                    <img
                                        src={image}
                                        alt={`Gallery Image ${index + 1}`}
                                        className="w-full h-full object-cover mb-4 hover:opacity-75 transition ease-in-out duration-500"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* gallery section //end */}
                {/* testimoni section */}
                <section className="bg-white py-10 md:py-16">
                    <div className="container max-w-screen-xl mx-auto px-4 xl:relative">
                        <p className="font-normal text-gray-400 text-lg md:text-xl text-center uppercase mb-6">
                            Testimonial
                        </p>
                        <h1 className="font-semibold text-gray-900 text-2xl md:text-4xl text-center leading-normal mb-14">
                            What People Say <br /> About Us
                        </h1>
                        <div className="hidden xl:block xl:absolute top-0">
                            <img src={testimoni1} alt="Decorative testimonial" width={20} height={20} />
                        </div>
                        <div className="hidden xl:block xl:absolute top-32">
                            <img src={testimoni1} alt="Decorative testimonial" />
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center justify-center md:space-x-8 lg:space-x-12 mb-10 md:mb-20">
                            {/* First Testimonial */}
                            <div className="bg-gray-100 rounded-lg mb-10 md:mb-0">
                                <img
                                    src={testimoni1}
                                    alt="Person testimonial"
                                    className="mx-8 my-8"
                                    width={100} height={100}
                                />
                                <div className="flex items-center gap-1 mx-8">
                                    {[...Array(5)].map((_, index) => (
                                        <StarIcon key={index} className="w-5 h-5 text-yellow-500" />
                                    ))}
                                </div>
                                <p className="font-normal text-sm lg:text-md text-gray-400 mx-8 my-8">
                                    I highly recommend this property service. I was assisted by experts who helped me find the perfect home for my family, and the process was seamless.
                                </p>
                                <h3 className="font-semibold text-gray-900 text-xl md:text-2xl lg:text-3xl mx-8 mb-8">
                                    Aarav Sharma
                                </h3>
                            </div>

                            {/* Second Testimonial */}
                            <div className="bg-gray-100 rounded-lg">
                                <img
                                    src={testimoni1}
                                    alt="Person testimonial"
                                    className="mx-8 my-8"
                                    width={100} height={100}
                                />
                                <div className="flex items-center gap-1 mx-8">
                                    {[...Array(5)].map((_, index) => (
                                        <StarIcon key={index} className="w-5 h-5 text-yellow-500" />
                                    ))}
                                </div>
                                <p className="font-normal text-sm lg:text-md text-gray-400 mx-8 my-8">
                                    The property service is truly exceptional. I found my dream apartment in a prime location, and the entire experience was smooth and professional.
                                </p>
                                <h3 className="font-semibold text-gray-900 text-xl md:text-2xl lg:text-3xl mx-8 mb-8">
                                    Sushanth Shetty
                                </h3>
                            </div>
                        </div>

                    </div>
                </section>
                {/* testimoni section //end */}
                {/* book section */}
                <section className="bg-white py-10 md:py-16">
                    <div className="container max-w-screen-xl mx-auto px-4 xl:relative">
                        <div className="bg-green-800 flex flex-col lg:flex-row items-center justify-evenly py-14 rounded-3xl">
                            <div className="text-center lg:text-left mb-10 lg:mb-0">
                                <h1 className="font-semibold text-white text-4xl md:text-5xl lg:text-7xl leading-normal mb-4">
                                    Talk to us <br /> to discuss
                                </h1>
                                <p className="font-normal text-white text-md md:text-xl">
                                    Need more time to discuss? Won’t worry, we are <br /> ready to help
                                    you. You can fill in the column on the <br /> right to book a
                                    meeting with us. Totally free.
                                </p>
                            </div>
                            <div className="hidden xl:block xl:absolute right-0">
                                <img src="assets/image/book.png" alt="Image" />
                            </div>
                            <div className="hidden md:block bg-white xl:relative px-6 py-3 rounded-3xl">
                                <div className="py-3">
                                    <h3 className="font-semibold text-gray-900 text-3xl">
                                        Book a meeting
                                    </h3>
                                </div>
                                <div className="py-3">
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        className="px-4 py-4 w-96 bg-gray-100 placeholder-gray-400 rounded-xl outline-none"
                                    />
                                </div>
                                <div className="py-3">
                                    <input
                                        type="text"
                                        placeholder="Email"
                                        className="px-4 py-4 w-96 bg-gray-100 placeholder-gray-400 rounded-xl outline-none"
                                    />
                                </div>
                                {/* <div className="py-3 relative">
                                    <input
                                        type="text"
                                        placeholder="Date"
                                        className="px-4 py-4 w-96 bg-gray-100 font-normal text-lg placeholder-gray-400 rounded-xl outline-none"
                                    />
                                    <div className="absolute inset-y-0 left-80 ml-6 flex items-center text-xl text-gray-600">
                                        <i data-feather="calendar" />
                                    </div>
                                </div> */}
                                {/* <div className="py-3 relative">
                                    <input
                                        type="text"
                                        placeholder="Virtual Meeting"
                                        className="px-4 py-4 w-96 bg-gray-100 placeholder-gray-400 rounded-xl outline-none"
                                    />
                                    <div className="absolute inset-y-0 left-80 ml-6 flex items-center text-xl text-gray-600">
                                        <i data-feather="chevron-down" />
                                    </div>
                                </div> */}
                                <div className="py-3">
                                    <button className="w-full py-4 font-semibold text-lg text-white bg-green-700 rounded-xl hover:bg-green-900 transition ease-in-out duration-500">
                                        Booking
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>{" "}
                    {/* container.// */}
                </section>
                {/* book section //end */}
            </>

        </>
    )
}

export default Home1