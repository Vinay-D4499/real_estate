import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddPropertyDetails from './AddPropertyDetails';
import DeletePropertyMedia from './DeletePropertyMedia'; // Import the DeletePropertyMedia component
import { useParams } from 'react-router-dom';
import { baseURL } from "../../../src/config/baseURL"; 

const PropertyDetails = ({ typeId }) => {
  // const {typeId} = useParams();
  const [propertyDetails, setPropertyDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editDetails, setEditDetails] = useState(null); // To pass details to modal

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
       
        const response = await axios.get(`${baseURL}/api/propertyDetails/properties/${typeId}`);
         
        console.log(response.data,"responsedata====details");
        if (response.data?.property?.propertyDetails) {
          setPropertyDetails(response.data.property.propertyDetails);
        } else {
          throw new Error('No property details found');
        }
      } catch (error) {
        setError('Failed to load property details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (typeId) fetchPropertyDetails();
  }, [typeId]);

  const handleUpdateClick = (details) => {
    setEditDetails(details); // Pass the current details to the modal
    setShowModal(true); // Show the modal
  };

  const handleDeleteMediaSuccess = (mediaId) => {
    console.log(mediaId,"------mediadid")
    // Remove the deleted media from the state
    setPropertyDetails((prevDetails) => {
      return prevDetails.map((detail) => {
        // Update each property's media by filtering out the deleted media item
        return {
          ...detail,
          media: detail.media.filter((mediaItem) => mediaItem.propertymedia_id !== mediaId),
        };
      });
    });
  };

  if (loading) return <p>Loading property details...</p>;
  if (error) return <p>{error}</p>;

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
  
        {/* Divide Images and Videos into Separate Sections */}
        <div className="flex flex-col md:flex-row gap-6 mb-4">
          {/* Images Section */}
          <div className="flex flex-wrap gap-4 w-full md:w-1/2">
            {detail.media
              .filter((mediaItem) => mediaItem.propertymedia_img)
              .map((mediaItem, index) => (
                <div key={index} className="relative">
                  <img
                    src={mediaItem.propertymedia_img}
                    alt="Property"
                    className="h-auto rounded-md"
                  />
                  {/* Add Delete button for Images */}
                  <DeletePropertyMedia
                    mediaId={mediaItem.propertymedia_id}
                    onDeleteSuccess={handleDeleteMediaSuccess} // Pass the success callback
                  />
                </div>
              ))}
          </div>
  
          {/* Videos Section */}
        </div>
          <div className="flex flex-wrap gap-4 w-full md:w-1/2">
            {detail.media
              .filter((mediaItem) => mediaItem.propertymedia_video)
              .map((mediaItem, index) => (
                <div key={index} className="relative">
                  <video controls className="h-auto rounded-md">
                    <source src={mediaItem.propertymedia_video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  {/* Add Delete button for Videos */}
                  <DeletePropertyMedia
                    mediaId={mediaItem.propertymedia_id}
                    onDeleteSuccess={handleDeleteMediaSuccess} // Pass the success callback
                  />
                </div>
              ))}
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
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 relative">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            onClick={() => setShowModal(false)}
          >
            {/* Close Button */}
          </button>
          <h2 className="text-xl font-semibold mb-4">Update Property Details</h2>
          <AddPropertyDetails
            details={editDetails} // Pass details to AddPropertyDetails
            onClose={() => setShowModal(false)} // Close the modal
          />
        </div>
      </div>
    )}
  </div>
  
  );
};

export default PropertyDetails;
