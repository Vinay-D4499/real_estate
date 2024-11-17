import React, { useState } from 'react';
import PropertyDetails from './PropertyDetails';

const PropertyTable = ({ properties }) => {
    const [selectedTypeId, setSelectedTypeId] = useState(null); // State for selected property ID

    const handleShowDetails = (typeId) => {
        setSelectedTypeId(typeId); // Set the selected property type ID
    };

    return (
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md overflow-x-auto">
            <table className="w-full table-auto">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="p-2 text-sm font-semibold text-left">ID</th>
                        <th className="p-2 text-sm font-semibold text-left">Property Name</th>
                        <th className="p-2 text-sm font-semibold text-left">Location</th>
                        <th className="p-2 text-sm font-semibold text-left">Price</th>
                        <th className="p-2 text-sm font-semibold text-left">Square Feet</th>
                        <th className="p-2 text-sm font-semibold text-left">Status</th>
                        <th className="p-2 text-sm font-semibold text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {properties.length > 0 ? (
                        properties.map((property) => (
                            <tr key={property.id}>
                                <td className="p-2">{property.id}</td>
                                <td className="p-2">{property.property_name}</td>
                                <td className="p-2">{property.property_address}</td>
                                <td className="p-2">${property.property_price}</td>
                                <td className="p-2">{property.property_sq_feets_or_length}</td>
                                <td className="p-2">{property.is_available ? "true" : "false"}</td>
                                <td className="p-2">
                                    <button
                                        onClick={() => handleShowDetails(property.id)}
                                        className="bg-blue-500 text-white py-1 px-3 rounded"
                                    >
                                        Show More Information
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="p-2 text-center">No properties found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Render PropertyDetails component conditionally */}
            {selectedTypeId && (
                <div className="mt-4">
                    <PropertyDetails typeId={selectedTypeId} />
                </div>
            )}
        </div>
    );
};

export default PropertyTable;
