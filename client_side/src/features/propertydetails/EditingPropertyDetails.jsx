import React, { useState } from 'react';
import axios from 'axios';
import { PencilIcon } from '@heroicons/react/24/solid';

const EditingPropertyDetails = ({ propertyDetail }) => {
  const [file, setFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setErrorMessage('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('propertymedia_id', propertyDetail.media.propertymedia_id); // Property media ID
    formData.append('id', propertyDetail.id); // Property details ID
    formData.append('media', file);

    try {
      const response = await axios.put(`${baseURL}/api/propertyMedia/updateMedia`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
         
      if (response.status === 200) {
        setSuccessMessage('Media updated successfully!');
        setFile(null);
        setIsEditing(false);
      } else {
        throw new Error('Failed to update media.');
      }
    } catch (error) {
      setErrorMessage('Error updating media. Please try again.');
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Edit Property Details</h3>
        <PencilIcon
          className="h-5 w-5 cursor-pointer text-blue-600"
          onClick={handleEditClick}
        />
      </div>

      {isEditing && (
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Upload Media</label>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Update
          </button>
        </form>
      )}

      {successMessage && (
        <p className="text-green-500 mt-4">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="text-red-500 mt-4">{errorMessage}</p>
      )}
    </div>
  );
};

export default EditingPropertyDetails;
