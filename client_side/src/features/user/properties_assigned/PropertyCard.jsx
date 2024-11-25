import React from "react";
import { FiMessageCircle } from "react-icons/fi";
import MediaCarousel from "./MediaCarousel";

const PropertyCard = ({ property, onMediaClick }) => {
  const details = property.PropertyDetail;

  // Generate the WhatsApp chat link with pre-filled message
  const generateWhatsAppLink = () => {
    const phoneNumber = import.meta.env.VITE_WHATSAPP_PHONE; 
    const message = `Hello, I am interested in knowing more about the property named "${details.property_name}" located at "${details.property_address}". Could you please share more details?`;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="bg-white dark:bg-gray-200 shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="font-bold text-center text-indigo-900 text-lg">
          {details.property_name}
        </h2>
        <p className="text-center text-gray-600 text-sm">
          {details.property_address}
        </p>
        <p className="mt-2 text-center text-gray-800">
          <span className="font-semibold">Price:</span> ₹{details.property_price}
        </p>
        <p className="text-center text-gray-800">
          <span className="font-semibold">Size:</span> {details.property_sq_feets_or_length} sq. ft.
        </p>
        <p className="mt-2 text-center text-gray-600 text-sm">
          {details.property_description}
        </p>
      </div>
      <MediaCarousel media={details.media} onMediaClick={onMediaClick} />
      <div className="flex justify-center p-4 bg-gray-50 dark:bg-gray-800">
        <a
          href={generateWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-all duration-300 focus:outline-none"
          title="Chat on WhatsApp"
        >
          <FiMessageCircle className="text-xl mr-2" />
          Chat on WhatsApp
        </a>
      </div>
    </div>
  );
};

export default PropertyCard;
