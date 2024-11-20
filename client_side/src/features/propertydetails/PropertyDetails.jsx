import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddPropertyDetails from './AddPropertyDetails';
import DeletePropertyMedia from './DeletePropertyMedia';
import { baseURL } from "../../../src/config/baseURL";

const PropertyDetails = ({ typeId }) => {
  const [propertyDetails, setPropertyDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editDetails, setEditDetails] = useState(null);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      setLoading(true);
      setError(null); // Reset error state
      try {
        const response = await axios.get(`${baseURL}/api/propertyDetails/properties/${typeId}`);
        console.log(response.data,"-----------------response properties, ")
        if (response.data?.property?.propertyDetails) {
          setPropertyDetails(response.data.property.propertyDetails);
        } else {
          throw new Error('No property details found');
        }
      } catch (error) {
        console.error(error);
        setError('No Images or Videos Found for this Property please upload.....');
      } finally {
        setLoading(false);
      }
    };

    if (typeId) fetchPropertyDetails();
  }, [typeId]);

  const handleUpdateClick = (details) => {
    setEditDetails(details);
    setShowModal(true);
  };

  const handleDeleteMediaSuccess = (mediaId) => {
    setPropertyDetails((prevDetails) => {
      return prevDetails.map((detail) => ({
        ...detail,
        media: detail.media.filter((mediaItem) => mediaItem.propertymedia_id !== mediaId),
      }));
    });
  };

  const formatMediaUrl = (url) => {
    return url.startsWith("https://") ? url : `https://${url}`;
  };

  const handleDetailsUpdate = (updatedDetail) => {
    setPropertyDetails((prevDetails) =>
      prevDetails.map((detail) => (detail.id === updatedDetail.id ? updatedDetail : detail))
    );
    setShowModal(false); // Close the modal after updating the details
  };

  if (loading) return <p className="text-center text-gray-500">Loading property details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Property Details</h2>
      {propertyDetails.map((detail) => (
        <div
          key={detail.id}
          className="bg-white shadow-md p-4 mb-4 rounded-lg border border-gray-200"
        >
          <h3 className="text-xl font-semibold mb-2">{detail.property_name}</h3>
          <p className="mb-2">Price: {detail.property_price}</p>
          <p className="mb-2">Location: {detail.property_address}</p>
          <p className="mb-2">Description: {detail.property_description}</p>

          {/* Media Section */}
          <div className="flex flex-col md:flex-row gap-6 mb-4">
            {/* Images */}
            <div className="flex flex-wrap gap-4 w-full md:w-1/2">
              {detail.media
                .filter((mediaItem) => mediaItem.propertymedia_img)
                .map((mediaItem) => (
                  <div key={mediaItem.propertymedia_id} className="relative">
                    <img
                      src={formatMediaUrl(mediaItem.propertymedia_img)}
                      alt="Property"
                      className="h-auto rounded-md"
                    />
                    <DeletePropertyMedia
                      mediaId={mediaItem.propertymedia_id}
                      onDeleteSuccess={handleDeleteMediaSuccess}
                    />
                  </div>
                ))}
            </div>

            {/* Videos */}
            <div className="flex flex-wrap gap-4 w-full md:w-1/2">
              {detail.media
                .filter((mediaItem) => mediaItem.propertymedia_video)
                .map((mediaItem) => (
                  <div key={mediaItem.propertymedia_id} className="relative">
                    <video controls className="h-auto rounded-md">
                      <source
                        src={formatMediaUrl(mediaItem.propertymedia_video)}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                    <DeletePropertyMedia
                      mediaId={mediaItem.propertymedia_id}
                      onDeleteSuccess={handleDeleteMediaSuccess}
                    />
                  </div>
                ))}
            </div>
          </div>

          {/* Update Button */}
          <button
            className="px-4 py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={() => handleUpdateClick(detail)}
          >
            Update
          </button>
        </div>
      ))}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setShowModal(false)} // Close modal when clicking on the close button
            >
              ✖
            </button>
            <h2 className="text-xl font-semibold mb-4">Update Property Details</h2>
            <AddPropertyDetails
              details={editDetails}
              onDetailsUpdate={handleDetailsUpdate} // Handle the updated details
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
