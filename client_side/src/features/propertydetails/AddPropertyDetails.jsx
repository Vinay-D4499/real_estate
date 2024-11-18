import React, { useState } from 'react';
import axios from 'axios';
import MediaUploader from './MediaUpload'; // Import MediaUploader
import { baseURL } from "../../../src/config/baseURL"; 
import { FaTimes } from 'react-icons/fa'; // Import FontAwesome for the close icon
import PropertyTypes from './PropertyTypes';

const AddPropertyDetails = ({ details, onClose }) => {
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
      await axios.put(
        `${baseURL}/api/propertyDetails/properties/${details.id}`,
        payload
      );
      alert('Property details updated successfully!');
      onClose();
    } catch (error) {
      console.error('Failed to update property details:', error);
      alert('Failed to update property details. Please try again.');
    }
  };

  const handleUploadComplete = (uploadedMedia) => {
    console.log('Media uploaded successfully:', uploadedMedia);
  };

  const handlePropertyTypeChange = (propertyTypeId) => {
        setFormData({ ...formData, property_type_id: propertyTypeId });
      };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white w-full max-w-4xl mx-4 sm:mx-6 lg:mx-auto p-6 rounded-lg shadow-lg relative overflow-y-auto max-h-[calc(100vh-50px)]">
      {/* Close Icon */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        <FaTimes className="w-6 h-6" />
      </button>
  
      <h2 className="text-2xl font-semibold text-center mb-4">
        Edit Property Details
      </h2>
  
      <form onSubmit={handleSubmit}>
        {/* Responsive Grid for Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="property_name"
            value={formData.property_name}
            onChange={handleInputChange}
            placeholder="Property Name"
            className="border p-2 rounded-md w-full"
          />
          {/* <input
            type="text"
            name="property_type_id"
            value={formData.property_type_id}
            onChange={handleInputChange}
            placeholder="Property Type ID"
            className="border p-2 rounded-md w-full"
          /> */}
           <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
              
             <PropertyTypes
               onSelectType={handlePropertyTypeChange}
               selectedTypeId={formData.property_type_id} // Pass the current property type ID
             />
             </label>
           </div>
          <textarea
            name="property_description"
            value={formData.property_description}
            onChange={handleInputChange}
            placeholder="Description"
            className="border p-2 rounded-md w-full md:col-span-2"
          ></textarea>
          <input
            type="text"
            name="property_address"
            value={formData.property_address}
            onChange={handleInputChange}
            placeholder="Address"
            className="border p-2 rounded-md w-full"
          />
          <input
            type="text"
            name="property_maplocation"
            value={formData.property_maplocation}
            onChange={handleInputChange}
            placeholder="Map Location"
            className="border p-2 rounded-md w-full"
          />
          <input
            type="number"
            name="property_sq_feets_or_length"
            value={formData.property_sq_feets_or_length}
            onChange={handleInputChange}
            placeholder="Sq Feet or Length"
            className="border p-2 rounded-md w-full"
          />
          <input
            type="number"
            name="property_price"
            value={formData.property_price}
            onChange={handleInputChange}
            placeholder="Price"
            className="border p-2 rounded-md w-full"
          />
          <select
            name="is_available"
            value={formData.is_available}
            onChange={(e) =>
              setFormData({ ...formData, is_available: e.target.value === 'true' })
            }
            className="border p-2 rounded-md w-full"
          >
            <option value="true">Available</option>
            <option value="false">Unavailable</option>
          </select>
        </div>
  
        {/* Media Uploader */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Upload Property Media</h3>
          <MediaUploader
            propertyId={details.id}
            onUploadComplete={handleUploadComplete}
          />
        </div>
  
        {/* Buttons */}
        <div className="flex justify-between items-center mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Close
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
  
  );
};

export default AddPropertyDetails;


// import React, { useState } from 'react';
// import axios from 'axios';
// import MediaUploader from './MediaUpload'; // Import MediaUploader
// import PropertyTypes from './PropertyTypes'; // Import PropertyTypes
// import { baseURL } from "../../../src/config/baseURL";
// import { FaTimes } from 'react-icons/fa'; // Import FontAwesome for the close icon

// const AddPropertyDetails = ({ details, onClose }) => {
//   const [formData, setFormData] = useState({
//     property_name: details?.property_name || '',
//     property_type_id: details?.property_type_id || '',
//     property_description: details?.property_description || '',
//     property_address: details?.property_address || '',
//     property_maplocation: details?.property_maplocation || '',
//     property_sq_feets_or_length: details?.property_sq_feets_or_length || '',
//     property_price: details?.property_price || '',
//     is_available: details?.is_available || true,
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handlePropertyTypeChange = (propertyTypeId) => {
//     setFormData({ ...formData, property_type_id: propertyTypeId });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = {
//         propertydetailsdata: formData,
//       };
//       await axios.put(
//         `${baseURL}/api/propertyDetails/properties/${details.id}`,
//         payload
//       );
//       alert('Property details updated successfully!');
//       onClose();
//     } catch (error) {
//       console.error('Failed to update property details:', error);
//       alert('Failed to update property details. Please try again.');
//     }
//   };

//   const handleUploadComplete = (uploadedMedia) => {
//     console.log('Media uploaded successfully:', uploadedMedia);
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white w-full max-w-4xl mx-4 sm:mx-6 lg:mx-auto p-6 rounded-lg shadow-lg relative overflow-y-auto max-h-[calc(100vh-50px)]">
//         {/* Close Icon */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//         >
//           <FaTimes className="w-6 h-6" />
//         </button>

//         <h2 className="text-2xl font-semibold text-center mb-4">
//           Edit Property Details
//         </h2>

//         <form onSubmit={handleSubmit}>
//           {/* Responsive Grid for Inputs */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input
//               type="text"
//               name="property_name"
//               value={formData.property_name}
//               onChange={handleInputChange}
//               placeholder="Property Name"
//               className="border p-2 rounded-md w-full"
//             />

//             {/* Property Types Dropdown */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
                
//               <PropertyTypes
//                 onSelectType={handlePropertyTypeChange}
//                 selectedTypeId={formData.property_type_id} // Pass the current property type ID
//               />
//               </label>

//             </div>

//             <textarea
//               name="property_description"
//               value={formData.property_description}
//               onChange={handleInputChange}
//               placeholder="Description"
//               className="border p-2 rounded-md w-full md:col-span-2"
//             ></textarea>
//             <input
//               type="text"
//               name="property_address"
//               value={formData.property_address}
//               onChange={handleInputChange}
//               placeholder="Address"
//               className="border p-2 rounded-md w-full"
//             />
//             <input
//               type="text"
//               name="property_maplocation"
//               value={formData.property_maplocation}
//               onChange={handleInputChange}
//               placeholder="Map Location"
//               className="border p-2 rounded-md w-full"
//             />
//             <input
//               type="number"
//               name="property_sq_feets_or_length"
//               value={formData.property_sq_feets_or_length}
//               onChange={handleInputChange}
//               placeholder="Sq Feet or Length"
//               className="border p-2 rounded-md w-full"
//             />
//             <input
//               type="number"
//               name="property_price"
//               value={formData.property_price}
//               onChange={handleInputChange}
//               placeholder="Price"
//               className="border p-2 rounded-md w-full"
//             />
//             <select
//               name="is_available"
//               value={formData.is_available}
//               onChange={(e) =>
//                 setFormData({ ...formData, is_available: e.target.value === 'true' })
//               }
//               className="border p-2 rounded-md w-full"
//             >
//               <option value="true">Available</option>
//               <option value="false">Unavailable</option>
//             </select>
//           </div>

//           {/* Media Uploader */}
//           <div className="mt-4">
//             <h3 className="text-lg font-semibold mb-2">Upload Property Media</h3>
//             <MediaUploader
//               propertyId={details.id}
//               onUploadComplete={handleUploadComplete}
//             />
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-between items-center mt-6">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
//             >
//               Close
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
//             >
//               Save Changes
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddPropertyDetails;
