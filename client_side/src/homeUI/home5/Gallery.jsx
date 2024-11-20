import React, { useState } from 'react';
import houseImage from '../../assets/image/houseImage.png';
import house3D from '../../assets/image/house3D.png';
import farmLand from '../../assets/image/farmLand.jpg';
import apartments from '../../assets/image/apartments.jpg';
import villa from '../../assets/image/villa.jpg';

const Gallery = () => {
    const images = [
        { src: houseImage, alt: 'House ' },
        { src: house3D, alt: ' House ' },
        { src: farmLand, alt: 'Farm Land' },
        { src: apartments, alt: 'Apartments' },
        { src: villa, alt: 'Villa' },
        { src: houseImage, alt: 'House ' },
        { src: house3D, alt: ' House ' },
        { src: farmLand, alt: 'Farm Land' },
        { src: apartments, alt: 'Apartments' },
        { src: villa, alt: 'Villa' },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);

    const openModal = (image) => {
        setCurrentImage(image);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentImage(null);
    };

    return (
        <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        Property Gallery
                    </h2>
                    <p className="mt-4 text-gray-600">
                        Explore our diverse range of properties through our gallery.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="relative group overflow-hidden rounded-lg shadow-lg transform transition duration-500 hover:scale-105 cursor-pointer"
                            onClick={() => openModal(image)}
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                                <span className="text-white font-semibold text-lg">{image.alt}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal for fullscreen image */}
                {isModalOpen && currentImage && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                        <div className="relative">
                            <button
                                className="absolute top-2 right-2 text-white text-3xl font-bold"
                                onClick={closeModal}
                            >
                                &times;
                            </button>
                            <img
                                src={currentImage.src}
                                alt={currentImage.alt}
                                className="max-w-full max-h-screen object-contain"
                            />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Gallery;
