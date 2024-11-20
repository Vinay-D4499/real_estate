import React, { useEffect, useState } from "react";
import { userSpecificProperties } from "../components/userAPI";
import PropertyCard from "./PropertyCard";
import FullscreenModal from "./FullScreenModal";

const AssignedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Search state
  const [searchLocation, setSearchLocation] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await userSpecificProperties();
        setProperties(response);
        setFilteredProperties(response); // Initialize filtered properties
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

  const handleSearch = () => {
    const filtered = properties.filter((property) => {
      const { property_address } = property.PropertyDetail || {}; // Ensure PropertyDetail exists

      // Normalize the search input and property location (removing extra spaces and converting to lowercase)
      const normalizedSearchLocation = searchLocation.trim().toLowerCase();
      const normalizedPropertyAddress = property_address
        ? property_address.trim().toLowerCase()
        : "";

      // Check if the property address matches the search location
      const locationMatches =
        normalizedSearchLocation === "" ||
        normalizedPropertyAddress.includes(normalizedSearchLocation);

      return locationMatches;
    });

    setFilteredProperties(filtered);
  };

  const handleClearFilters = () => {
    setSearchLocation("");
    setFilteredProperties(properties); // Reset to all properties
  };

  return (
    <div className="bg-gray-50 p-4">
      <h1 className="mb-4 font-extrabold text-2xl text-gray-900 dark:text-white">
        Assigned Properties
      </h1>

      {/* Search Filter (Location Only) */}
      <div className="flex sm:flex-row flex-col gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Location"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 p-2 rounded text-white"
        >
          Search
        </button>
        <button
          onClick={handleClearFilters}
          className="bg-gray-400 hover:bg-gray-500 p-2 rounded text-white"
        >
          Clear Filters
        </button>
      </div>

      {/* Property Cards */}
      <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onMediaClick={openModal}
            />
          ))
        ) : (
          <p className="text-gray-500">No properties found.</p>
        )}
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
