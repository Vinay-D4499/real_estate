import React, { useEffect, useState } from "react";
import { userSpecificProperties } from "../components/userAPI";
import PropertyCard from "./PropertyCard";
import FullscreenModal from "./FullScreenModal";

const AssignedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await userSpecificProperties();
        setProperties(response);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperties();
  }, []);

  const openModal = (media) => {
    setSelectedMedia(media);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-50 p-4">
      <h1 className="mb-4 font-extrabold text-2xl text-gray-900 dark:text-white">
      </h1>
      <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onMediaClick={openModal}
          />
        ))}
      </div>
      <FullscreenModal
        media={selectedMedia}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default AssignedProperties;
