import React, { useState } from 'react';
import axios from 'axios';
import MediaUploader from './MediaUpload'; // Import MediaUploader
import { baseURL } from "../../../src/config/baseURL"; 

const AddPropertyDetails = ({ details, onClose }) => {
  console.log(details.id, "details.id in AddPropertyDetails");

  const [formData, setFormData] = useState({
    property_name: details?.property_name || '',
    property_type_id: details?.property_type_id || '',
    property_description: details?.property_description || '',
    property_address: details?.property_address || '',
    property_maplocation: details?.property_maplocation || '',
    property_sq_feets_or_length: details?.property_sq_feets_or_length || '',
    property_price: details?.property_price || '',
    is_available: details?.is_available || true,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        propertydetailsdata: formData,
      };

      const response = await axios.put(
        `${baseURL}/api/propertyDetails/properties/${details.id}`,
        payload
      );

      alert('Property details updated successfully!');
      console.log(response.data);
      onClose();
    } catch (error) {
      console.error('Failed to update property details:', error);
      alert('Failed to update property details. Please try again.');
    }
  };

  const handleUploadComplete = (uploadedMedia) => {
    console.log('Media uploaded successfully:', uploadedMedia);
    // You can add logic to refresh the media list or inform the parent component
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="property_name"
          value={formData.property_name}
          onChange={handleInputChange}
          placeholder="Property Name"
          className="border p-2 rounded-md"
        />
        <input
          type="text"
          name="property_type_id"
          value={formData.property_type_id}
          onChange={handleInputChange}
          placeholder="Property Type ID"
          className="border p-2 rounded-md"
        />
        <textarea
          name="property_description"
          value={formData.property_description}
          onChange={handleInputChange}
          placeholder="Description"
          className="border p-2 rounded-md col-span-2"
        ></textarea>
        <input
          type="text"
          name="property_address"
          value={formData.property_address}
          onChange={handleInputChange}
          placeholder="Address"
          className="border p-2 rounded-md"
        />
        <input
          type="text"
          name="property_maplocation"
          value={formData.property_maplocation}
          onChange={handleInputChange}
          placeholder="Map Location"
          className="border p-2 rounded-md"
        />
        <input
          type="number"
          name="property_sq_feets_or_length"
          value={formData.property_sq_feets_or_length}
          onChange={handleInputChange}
          placeholder="Sq Feet or Length"
          className="border p-2 rounded-md"
        />
        <input
          type="number"
          name="property_price"
          value={formData.property_price}
          onChange={handleInputChange}
          placeholder="Price"
          className="border p-2 rounded-md"
        />
        <select
          name="is_available"
          value={formData.is_available}
          onChange={(e) =>
            setFormData({ ...formData, is_available: e.target.value === 'true' })
          }
          className="border p-2 rounded-md"
        >
          <option value="true">Available</option>
          <option value="false">Unavailable</option>
        </select>
      </div>

      {/* Media Uploader Component */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Upload Property Media</h2>
        <MediaUploader
          propertyId={details.id}
          onUploadComplete={handleUploadComplete} // Handle media upload completion
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 mt-4"
      >
        Save Changes
      </button>
    </form>
  );
};

export default AddPropertyDetails;
