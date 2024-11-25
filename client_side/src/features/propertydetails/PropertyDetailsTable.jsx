import React, { useState, useRef } from 'react';
import PropertyDetails from './PropertyDetails';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { FaSquareXmark } from 'react-icons/fa6';
import toast from 'react-hot-toast';

const PropertyTable = ({ properties, onToggleStatus }) => {
    const [selectedTypeId, setSelectedTypeId] = useState(null);
    const detailsRef = useRef(null); // Reference for the PropertyDetails component

    const handleMoreClick = (propertyId) => {
        setSelectedTypeId(propertyId); // Set the selected property ID
        setTimeout(() => {
            if (detailsRef.current) {
                detailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 0);
    };

    const handleStatusToggle = async (propertyId, currentStatus) => {
        try {
            // Call the function passed as a prop to toggle the status
            await onToggleStatus(propertyId, !currentStatus);
            toast.success('Status updated successfully!');
        } catch (error) {
            toast.error('Failed to update status. Please try again.');
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg w-full max-w-4xl overflow-x-auto">
            <table className="w-full table-auto">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="p-2 font-semibold text-left text-sm">ID</th>
                        <th className="p-2 font-semibold text-left text-sm">Property Name</th>
                        <th className="p-2 font-semibold text-left text-sm">Location</th>
                        <th className="p-2 font-semibold text-left text-sm">Price</th>
                        <th className="p-2 font-semibold text-left text-sm">Square Feet</th>
                        <th className="p-2 font-semibold text-left text-sm">Status</th>
                        <th className="p-2 font-semibold text-left text-sm">Actions</th>
                        <th className="p-2 font-semibold text-left text-sm">Assign User</th>
                    </tr>
                </thead>
                <tbody>
                    {properties && properties.length > 0 ? (
                        properties.map((property) => (
                            <tr key={property.id}>
                                <td className="p-2">{property.id}</td>
                                <td className="p-2">{property.property_name}</td>
                                <td className="p-2">{property.property_address}</td>
                                <td className="p-2">₨ {property.property_price}</td>
                                <td className="p-2">{property.property_sq_feets_or_length}</td>
                                <td className="p-2">
                                    {property.is_available ? (
                                        <FaCheckCircle
                                            className="text-2xl text-green-500 cursor-pointer"
                                            title="ACTIVE"
                                            onClick={() => handleStatusToggle(property.id, property.is_available)}
                                        />
                                    ) : (
                                        <FaSquareXmark
                                            className="text-2xl text-red-500 cursor-pointer"
                                            title="INACTIVE"
                                            onClick={() => handleStatusToggle(property.id, property.is_available)}
                                        />
                                    )}
                                </td>
                                <td className="p-2">
                                    <button
                                        onClick={() => handleMoreClick(property.id)}
                                        className="bg-blue-500 px-3 py-1 rounded text-white"
                                    >
                                        More...
                                    </button>
                                </td>
                                <td className="p-2">
                                    <Link
                                        to={`/assign-property-details/${property.id}`}
                                        className="bg-green-500 my-2 px-3 py-1 rounded text-white"
                                        title="Publish this Property to Customer"
                                    >
                                        Publish
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="p-2 text-center">
                                No properties found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {selectedTypeId && (
                <div ref={detailsRef}>
                    <PropertyDetails typeId={selectedTypeId} />
                </div>
            )}
        </div>
    );
};

export default PropertyTable;
