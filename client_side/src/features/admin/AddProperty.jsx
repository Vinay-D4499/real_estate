// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { TrashIcon } from '@heroicons/react/24/solid';
// import { baseURL } from "../../../src/config/baseURL";
// import SavePropertyDetails from '../propertydetails/SavePropertyDetails';

// const AddProperty = () => {
//     const [propertyTypes, setPropertyTypes] = useState([]);
//     const [propertyType, setPropertyType] = useState('');
//     const [showConfirmDelete, setShowConfirmDelete] = useState(false);
//     const [showAddConfirm, setShowAddConfirm] = useState(false);
//     const [showModal, setShowModal] = useState(false);
//     const [propertyToDelete, setPropertyToDelete] = useState(null);
//     const [loading, setLoading] = useState(false); // Loading state for API calls

//     useEffect(() => {
//         fetchPropertyTypes();
//     }, []);

//     const fetchPropertyTypes = async () => {
//         setLoading(true);
//         try {
//             const response = await axios.get(`${baseURL}/api/properties/getAllPropertyTypes`);
//             setPropertyTypes(response.data.properties);
//         } catch (error) {
//             console.error('Error fetching property types:', error);
//             toast.error('Error fetching property types.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleInputChange = (e) => {
//         setPropertyType(e.target.value.trim());
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!propertyType) return;
//         setShowModal(false);
//         setShowAddConfirm(true);
//     };

//     const confirmAddProperty = async () => {
//         if (!propertyType) return;

//         setLoading(true);
//         try {
//             const token = localStorage.getItem('token');
//             const config = { headers: { Authorization: `Bearer ${token}` } };

//             await axios.post(`${baseURL}/api/properties/addPropertyType`, { propertyType }, config);
//             toast.success('Property type added successfully!');
//             setPropertyType('');
//             fetchPropertyTypes();
//         } catch (error) {
//             console.error('Error adding property type:', error);
//             toast.error('Error adding property type.');
//         } finally {
//             setLoading(false);
//             setShowAddConfirm(false);
//             setShowModal(false);
//         }
//     };

//     const confirmDelete = (propertyId) => {
//         setPropertyToDelete(propertyId);
//         setShowConfirmDelete(true);
//     };

//     const deleteProperty = async () => {
//         if (propertyToDelete === null) return;

//         setLoading(true);
//         try {
//             await axios.delete(`${baseURL}/api/properties/deletePropertyType/${propertyToDelete}`);
//             toast.success('Successfully deleted the property type.');
//             fetchPropertyTypes();
//         } catch (error) {
//             console.error('Error deleting property type:', error);
//             toast.error('Error deleting property type.');
//         } finally {
//             setLoading(false);
//             setPropertyToDelete(null);
//             setShowConfirmDelete(false);
//         }
//     };

//     return (
//         <>
//         <div className="flex flex-col justify-center items-center bg-gray-100 p-4 relative">
//             {/* Overlay for dimming effect when modal is open */}
//             {(showModal || showConfirmDelete || showAddConfirm) && (
//                 <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
//             )}
            
//             <button
//                 onClick={() => setShowModal(true)}
//                 className="bg-blue-500 text-white rounded px-4 py-2 mb-4 hover:bg-blue-600 transition duration-200"
//             >
//                 Add Property Type
//             </button>

//             <h2 className="text-2xl font-semibold text-center mb-4">Property Types</h2>
//             {loading ? (
//                 <p className="text-gray-500">Loading property types...</p>
//             ) : (
//                 <div className="w-full max-w-xl p-4">
//                     <table className="w-full rounded-lg table-auto bg-white shadow-md overflow-hidden">
//                         <thead>
//                             <tr className="bg-blue-500 text-white">
//                                 <th className="p-1 text-xs font-semibold text-left">ID</th>
//                                 <th className="p-1 text-xs font-semibold text-left">Property Type</th>
//                                 <th className="p-1 text-xs font-semibold text-left">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {propertyTypes.length > 0 ? (
//                                 propertyTypes.map((propertyType, index) => (
//                                     <tr key={propertyType.id} className="border-b hover:bg-gray-100">
//                                         <td className="p-1 text-xs">{index + 1}</td>
//                                         <td className="p-1 text-xs">{propertyType.name}</td>
//                                         <td className="p-1 text-xs">
//                                             <button
//                                                 className="bg-red-500 text-white rounded px-4 py-2 mr-2 flex items-center"
//                                                 onClick={() => confirmDelete(propertyType.id)}
//                                                 aria-label={`Delete ${propertyType.name}`}
//                                             >
//                                                 <TrashIcon className='h-5 w-5 mr-1' />
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan="3" className="p-4 text-center text-sm text-gray-500">
//                                         No property types available.
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>

//                     {/* Confirmation dialog for deletion */}
//                     {showConfirmDelete && (
//                         <div className="fixed inset-0 flex items-center justify-center z-50">
//                             <div className="bg-white rounded-lg shadow-lg p-6 z-50">
//                                 <h2 className="text-lg font-semibold">Confirm Delete</h2>
//                                 <p>Are you sure you want to delete this property type?</p>
//                                 <div className="flex justify-end mt-4">
//                                     <button
//                                         className="bg-red-500 text-white rounded px-4 py-2 mr-2"
//                                         onClick={deleteProperty}
//                                     >
//                                         Delete
//                                     </button>
//                                     <button
//                                         className="bg-gray-300 text-gray-800 rounded px-4 py-2"
//                                         onClick={() => setShowConfirmDelete(false)}
//                                     >
//                                         Cancel
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     {/* Confirmation dialog for adding property type */}
//                     {showAddConfirm && (
//                         <div className="fixed inset-0 flex items-center justify-center z-50">
//                             <div className="bg-white rounded-lg shadow-lg p-6 z-50">
//                                 <h2 className="text-lg font-semibold">Confirm Add</h2>
//                                 <p>Are you sure you want to add this property type?</p>
//                                 <div className="flex justify-end mt-4">
//                                     <button
//                                         className="bg-green-500 text-white rounded px-4 py-2 mr-2"
//                                         onClick={confirmAddProperty}
//                                     >
//                                         Yes, Add
//                                     </button>
//                                     <button
//                                         className="bg-gray-300 text-gray-800 rounded px-4 py-2"
//                                         onClick={() => setShowAddConfirm(false)}
//                                     >
//                                         Cancel
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             )}

//             {/* Modal for adding property type */}
//             {showModal && (
//                 <div className="fixed inset-0 flex items-center justify-center z-50">
//                     <div className="bg-white rounded-lg shadow-lg p-6 z-50">
//                         <h2 className="text-lg font-semibold mb-4">Add Property Type</h2>
//                         <form onSubmit={handleSubmit}>
//                             <div className="mb-4">
//                                 <input
//                                     type="text"
//                                     className="border border-gray-300 rounded w-full p-2"
//                                     value={propertyType}
//                                     onChange={handleInputChange}
//                                     placeholder="Enter property type"
//                                     required
//                                 />
//                             </div>
//                             <div className="flex justify-end">
//                                 <button
//                                     type="submit"
//                                     className="bg-blue-500 text-white rounded px-4 py-2 mr-2"
//                                 >
//                                     Add
//                                 </button>
//                                 <button
//                                     type="button"
//                                     className="bg-gray-300 text-gray-800 rounded px-4 py-2"
//                                     onClick={() => setShowModal(false)}
//                                 >
//                                     Cancel
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//             <SavePropertyDetails />
//         </>
//     );
// };

// export default AddProperty;
