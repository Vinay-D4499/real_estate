import React, { useState } from 'react';
import axios from 'axios';
import MediaUploader from './MediaUpload'; // Import MediaUploader
import { baseURL } from "../../../src/config/baseURL"; 
import { FaTimes } from 'react-icons/fa'; // Import FontAwesome for the close icon
import PropertyTypes from './PropertyTypes';

const AddPropertyDetails = ({ details }) => {
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
  console.log("proerperty type id ", details.property_type_id)

  // Local state to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(true);

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
      // alert('Property details updated successfully!');
      handleClose(); // Close the modal after successful submission
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

  // Close the modal
  const handleClose = () => {
    setIsModalOpen(false); // Set the modal state to close
  };

  if (!isModalOpen) {
    return null; // Render nothing when the modal is closed
  }

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="relative bg-white shadow-lg mx-4 sm:mx-6 lg:mx-auto p-6 rounded-lg w-full max-w-4xl max-h-[calc(100vh-50px)] overflow-y-auto">
        {/* Close Icon */}
        <button
          onClick={handleClose}
          className="top-4 right-4 absolute text-gray-500 hover:text-gray-700"
        >
          <FaTimes className="w-6 h-6" />
        </button>

        <h2 className="mb-4 font-semibold text-2xl text-center">
          Edit Property Details
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Responsive Grid for Inputs */}
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <input
              type="text"
              name="property_name"
              value={formData.property_name}
              onChange={handleInputChange}
              placeholder="Property Name"
              className="p-2 border rounded-md w-full"
            />
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-sm">
                Property Type
              </label>
              <PropertyTypes
                onSelectType={handlePropertyTypeChange}
                selectedTypeId={formData.property_type_id} // Pass the current property type ID
              />
            </div>
            <textarea
              name="property_description"
              value={formData.property_description}
              onChange={handleInputChange}
              placeholder="Description"
              className="md:col-span-2 p-2 border rounded-md w-full"
            ></textarea>
            <input
              type="text"
              name="property_address"
              value={formData.property_address}
              onChange={handleInputChange}
              placeholder="Address"
              className="p-2 border rounded-md w-full"
            />
            <input
              type="text"
              name="property_maplocation"
              value={formData.property_maplocation}
              onChange={handleInputChange}
              placeholder="Map Location"
              className="p-2 border rounded-md w-full"
            />
            <input
              type="number"
              name="property_sq_feets_or_length"
              value={formData.property_sq_feets_or_length}
              onChange={handleInputChange}
              placeholder="Sq Feet or Length"
              className="p-2 border rounded-md w-full"
            />
            <input
              type="number"
              name="property_price"
              value={formData.property_price}
              onChange={handleInputChange}
              placeholder="Price"
              className="p-2 border rounded-md w-full"
            />
            <select
              name="is_available"
              value={formData.is_available}
              onChange={(e) =>
                setFormData({ ...formData, is_available: e.target.value === 'true' })
              }
              className="p-2 border rounded-md w-full"
            >
              <option value="true">Available</option>
              <option value="false">Unavailable</option>
            </select>
          </div>

          {/* Media Uploader */}
          <div className="mt-4">
            <h3 className="mb-2 font-semibold text-lg">Upload Property Media</h3>
            <MediaUploader
              propertyId={details.id}
              onUploadComplete={handleUploadComplete}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-md text-white"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md text-white"
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
//     <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
//       <div className="relative bg-white shadow-lg mx-4 sm:mx-6 lg:mx-auto p-6 rounded-lg w-full max-w-4xl max-h-[calc(100vh-50px)] overflow-y-auto">
//         {/* Close Icon */}
//         <button
//           onClick={onClose}
//           className="top-4 right-4 absolute text-gray-500 hover:text-gray-700"
//         >
//           <FaTimes className="w-6 h-6" />
//         </button>

//         <h2 className="mb-4 font-semibold text-2xl text-center">
//           Edit Property Details
//         </h2>

//         <form onSubmit={handleSubmit}>
//           {/* Responsive Grid for Inputs */}
//           <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
//             <input
//               type="text"
//               name="property_name"
//               value={formData.property_name}
//               onChange={handleInputChange}
//               placeholder="Property Name"
//               className="p-2 border rounded-md w-full"
//             />

//             {/* Property Types Dropdown */}
//             <div>
//               <label className="block mb-1 font-medium text-gray-700 text-sm">
                
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
//               className="md:col-span-2 p-2 border rounded-md w-full"
//             ></textarea>
//             <input
//               type="text"
//               name="property_address"
//               value={formData.property_address}
//               onChange={handleInputChange}
//               placeholder="Address"
//               className="p-2 border rounded-md w-full"
//             />
//             <input
//               type="text"
//               name="property_maplocation"
//               value={formData.property_maplocation}
//               onChange={handleInputChange}
//               placeholder="Map Location"
//               className="p-2 border rounded-md w-full"
//             />
//             <input
//               type="number"
//               name="property_sq_feets_or_length"
//               value={formData.property_sq_feets_or_length}
//               onChange={handleInputChange}
//               placeholder="Sq Feet or Length"
//               className="p-2 border rounded-md w-full"
//             />
//             <input
//               type="number"
//               name="property_price"
//               value={formData.property_price}
//               onChange={handleInputChange}
//               placeholder="Price"
//               className="p-2 border rounded-md w-full"
//             />
//             <select
//               name="is_available"
//               value={formData.is_available}
//               onChange={(e) =>
//                 setFormData({ ...formData, is_available: e.target.value === 'true' })
//               }
//               className="p-2 border rounded-md w-full"
//             >
//               <option value="true">Available</option>
//               <option value="false">Unavailable</option>
//             </select>
//           </div>

//           {/* Media Uploader */}
//           <div className="mt-4">
//             <h3 className="mb-2 font-semibold text-lg">Upload Property Media</h3>
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
//               className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-md text-white"
//             >
//               Close
//             </button>
//             <button
//               type="submit"
//               className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md text-white"
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
