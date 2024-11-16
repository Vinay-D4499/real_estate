// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// import 'swiper/swiper-bundle.css'; // Import Swiper styles
// import { FaHome, FaCity, FaTree } from 'react-icons/fa';

// import houseImage from '../../assets/image/houseImage.png';
// import house3D from '../../assets/image/house3D.png';
// import farmLand from '../../assets/image/farmLand.jpg';
// import apartments from '../../assets/image/apartments.jpg';
// import villa from '../../assets/image/villa.jpg';

// const HeroSection = () => {
//   return (
//     <section className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-blue-200 via-green-200 to-yellow-200 text-gray-800 py-12 px-6 md:px-12 lg:px-24">
//       {/* Left side: Text content */}
//       <div className="md:w-1/2 space-y-6">
//         <h1 className="text-4xl md:text-5xl font-bold leading-tight">
//           Discover Your Dream Property
//         </h1>
//         <p className="text-lg md:text-xl text-gray-700">
//           Explore a wide variety of properties including cozy houses, modern apartments, spacious gated communities, fertile farmlands, and luxurious villas. Find the ideal space that suits your lifestyle.
//         </p>
//         <div className="flex space-x-4 text-blue-600 text-2xl">
//           <FaHome title="House" />
//           <FaCity title="Apartment" />
//           <FaTree title="Farmland" />
//         </div>
//         <a
//           href="#properties"
//           className="inline-block bg-blue-600 text-white text-lg font-medium py-3 px-6 rounded-lg transition duration-200 hover:bg-blue-700 mt-4"
//         >
//           Browse Properties
//         </a>
//       </div>

//       {/* Right side: Swiper Carousel */}
//       <div className="mt-8 md:mt-0 md:w-1/2 flex justify-center">
//         <Swiper
//           modules={[Navigation, Pagination, Autoplay]}
//           spaceBetween={10}
//           slidesPerView={1}
//           navigation
//           pagination={{ clickable: true }}
//           autoplay={{ delay: 3000, disableOnInteraction: false }}
//           className="w-full max-w-md rounded-lg shadow-lg"
//         >
//           <SwiperSlide>
//             <img src={houseImage} alt="Cozy House" className="w-full h-64 object-cover" />
//           </SwiperSlide>
//           <SwiperSlide>
//             <img src={house3D} alt="3D House Model" className="w-full h-64 object-cover" />
//           </SwiperSlide>
//           <SwiperSlide>
//             <img src={farmLand} alt="Farmland" className="w-full h-64 object-cover" />
//           </SwiperSlide>
//           <SwiperSlide>
//             <img src={apartments} alt="Apartments" className="w-full h-64 object-cover" />
//           </SwiperSlide>
//           <SwiperSlide>
//             <img src={villa} alt="Villa" className="w-full h-64 object-cover" />
//           </SwiperSlide>
//         </Swiper>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;


import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaHome, FaCity, FaTree } from 'react-icons/fa';
import houseImage from '../../assets/image/houseImage.png';
import house3D from '../../assets/image/house3D.png';
import farmLand from '../../assets/image/farmLand.jpg';
import apartments from '../../assets/image/apartments.jpg';
import villa from '../../assets/image/villa.jpg';

const HeroSection = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between  py-12 px-6 md:px-12 lg:px-24">
      {/* Right side: Image Carousel */}
      <div className="order-1 md:order-2 mt-8 md:mt-0 md:w-1/2 flex justify-center">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          className="w-full max-w-lg rounded-lg shadow-xl"
        >
          <div className="relative">
            <img src={houseImage} alt="Cozy House" className="w-full h-96 object-contain rounded-lg shadow-lg border-4 border-purple-500" />
            <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-3 py-1 rounded-md text-sm">House</p>
          </div>
          <div className="relative">
            <img src={house3D} alt="3D House Model" className="w-full h-96 object-contain rounded-lg shadow-lg border-4 border-pink-500" />
            <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-pink-600 text-white px-3 py-1 rounded-md text-sm">House </p>
          </div>
          <div className="relative">
            <img src={farmLand} alt="Farmland" className="w-full h-96 object-contain rounded-lg shadow-lg border-4 border-orange-500" />
            <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-orange-600 text-white px-3 py-1 rounded-md text-sm">Farmland</p>
          </div>
          <div className="relative">
            <img src={apartments} alt="Apartments" className="w-full h-96 object-contain rounded-lg shadow-lg border-4 border-yellow-500" />
            <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-yellow-600 text-white px-3 py-1 rounded-md text-sm">Apartments</p>
          </div>
          <div className="relative">
            <img src={villa} alt="Villa" className="w-full h-96 object-contain rounded-lg shadow-lg border-4 border-green-500" />
            <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-3 py-1 rounded-md text-sm">Villa</p>
          </div>
        </Carousel>
      </div>

      {/* Left side: Text content */}
      <div className="order-2 md:order-1 md:w-1/2 space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Discover Your Dream Property
        </h1>
        <p className="text-lg md:text-xl text-gray-700">
          Explore a wide variety of properties including cozy houses, modern apartments, spacious gated communities, fertile farmlands, and luxurious villas. Find the ideal space that suits your lifestyle.
        </p>
        <div className="flex space-x-4 text-purple-800 text-2xl">
          <FaHome title="House" />
          <FaCity title="Apartment" />
          <FaTree title="Farmland" />
        </div>
        <a
          href="#properties"
          className="inline-block bg-purple-600 text-white text-lg font-medium py-3 px-6 rounded-lg transition duration-200 hover:bg-purple-700 mt-4"
        >
          Browse Properties
        </a>
      </div>
    </section>
  );
};

export default HeroSection;

