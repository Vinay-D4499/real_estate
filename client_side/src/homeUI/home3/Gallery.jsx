import React, { useState } from 'react';
import houseImage from '../../assets/image/houseImage.png';
import house3D from '../../assets/image/house3D.png';
import farmLand from '../../assets/image/farmLand.jpg';
import apartments from '../../assets/image/apartments.jpg';
import villa from '../../assets/image/villa.jpg';

const Gallery = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    { src: houseImage, alt: 'Cozy House' },
    { src: house3D, alt: '3D House Model' },
    { src: farmLand, alt: 'Farmland' },
    { src: apartments, alt: 'Apartments' },
    { src: villa, alt: 'Villa' },
    { src: houseImage, alt: 'Cozy House' },
    { src: house3D, alt: '3D House Model' },
    { src: farmLand, alt: 'Farmland' },
    { src: apartments, alt: 'Apartments' },
    { src: villa, alt: 'Villa' },
  ];

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <section className="py-12 px-6 lg:px-24 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8">Gallery</h2>
      
      <div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        style={{
          gridAutoRows: '200px', 
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => openModal(image)}
            className={`overflow-hidden rounded-lg shadow-lg transform transition-transform duration-200 hover:scale-105 cursor-pointer ${
              index % 2 === 0 ? 'row-span-2' : 'row-span-1'
            }`}
            style={{
              gridRowEnd: index % 3 === 0 ? 'span 2' : 'span 1', 
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="relative max-w-3xl mx-auto">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-2xl font-bold bg-gray-800 rounded-full px-2"
            >
              &times;
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;