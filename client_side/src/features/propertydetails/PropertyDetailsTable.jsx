import React, { useState } from 'react';
import PropertyDetails from './PropertyDetails';
import { Link } from 'react-router-dom';

const PropertyTable = ({ properties }) => {
    console.log("properties :::>>>>>", properties)
    const [selectedTypeId, setSelectedTypeId] = useState(null);

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
                                <td className="p-2">{property.is_available ? "true" : "false"}</td>
                                <td className="p-2">
                                    <button
                                        onClick={() => setSelectedTypeId(property.id)}
                                        className="bg-blue-500 px-3 py-1 rounded text-white"
                                    >
                                        Show More Information
                                    </button>
                                </td>
                                <td>
                                    <Link to={`/assign-property-details/${property.id}`}
                                     className="bg-green-500 px-3 py-1 rounded text-white"
                                     >Assign To User</Link>
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

            {selectedTypeId && <PropertyDetails typeId={selectedTypeId} />}
        </div>
    );
};

export default PropertyTable;
