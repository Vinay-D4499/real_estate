import React from "react";
import MediaCarousel from "./MediaCarousel";

const PropertyCard = ({ property, onMediaClick }) => {
  const details = property.PropertyDetail;

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
    </div>
  );
};

export default PropertyCard;
