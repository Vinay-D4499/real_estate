import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from "../../../src/config/baseURL"; 

const PropertySelector = ({ assignedProperties }) => {
    const [selectedPropertyId, setSelectedPropertyId] = useState('');
    const [propertyDetails, setPropertyDetails] = useState([]);

    // Access propertyTypes directly from assignedProperties
    const propertyTypesList = assignedProperties?.propertyTypes || [];

    // Fetch property details when the selected property ID or property types change
    useEffect(() => {
        const fetchPropertyDetails = async () => {
            try {
                if (!selectedPropertyId) {
                    // Fetch property details for all property types by default
                    const responses = await Promise.all(
                        propertyTypesList.map(propertyType =>
                            axios.get(`${baseURL}/api/propertyDetails/properties/${propertyType.id}`)
                        )
                    );
                    // Combine all property details from different types into a single array
                    const allPropertyDetails = responses.flatMap(response => response.data.property.propertyDetails);
                    setPropertyDetails(allPropertyDetails); // Set all property details
                } else {
                    // Fetch property details for the selected property type
                    const response = await axios.get(`${baseURL}/api/propertyDetails/properties/${selectedPropertyId}`);
                    setPropertyDetails(response.data.property.propertyDetails); // Store all properties for the selected type
                }
            } catch (error) {
                console.error('Error fetching property details:', error);
            }
        };

        fetchPropertyDetails();
    }, [selectedPropertyId, propertyTypesList]);

    const handleChange = (e) => {
        setSelectedPropertyId(e.target.value); // Set selected property type ID
    };

    return (
        <div className="flex">
            {/* Left side: Radio Buttons */}
            <div className="bg-gray-100 rounded-lg shadow-md">
                <div className="mb-4">
                    <label htmlFor="propertyType" className="block text-gray-700 text-sm font-medium mb-2">
                        Select Property Type
                    </label>
                    <div className="flex flex-col space-y-2">
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="all"
                                name="propertyType"
                                value=""
                                checked={selectedPropertyId === ''}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            <label htmlFor="all" className="text-gray-700 font-semibold">All</label>
                        </div>
                        {propertyTypesList.map((propertyType) => (
                            <div key={propertyType.id} className="flex items-center">
                                <input
                                    type="radio"
                                    id={`propertyType-${propertyType.id}`}
                                    name="propertyType"
                                    value={propertyType.id}
                                    checked={selectedPropertyId === propertyType.id}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                <label htmlFor={`propertyType-${propertyType.id}`} className="text-gray-700 font-semibold">
                                    {propertyType.name || "Property Type Name"}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right side: Property Details */}
            <div className="w-3/4 p-4">
                {/* Display property details if available */}
                {propertyDetails.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {propertyDetails.map((propertyDetail, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-lg p-4">
                                <h3 className="text-xl font-semibold text-gray-800">{propertyDetail.property_name}</h3>
                                <p className="text-gray-600 mt-2"><strong>Description:</strong> {propertyDetail.property_description}</p>
                                <p className="text-gray-600"><strong>Price:</strong> ${propertyDetail.property_price}</p>
                                <p className="text-gray-600"><strong>Location:</strong> {propertyDetail.property_address || 'N/A'}</p>
                                <p className="text-gray-600"><strong>Size:</strong> {propertyDetail.property_sq_feets_or_length} sq.ft</p>

                                {/* Display Media (Images and Videos) */}
                                {propertyDetail.media && propertyDetail.media.length > 0 ? (
                                    <div className="mt-4">
                                        <h4 className="font-semibold text-gray-800">Media</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                                            {propertyDetail.media.map((mediaItem) => (
                                                <div key={mediaItem.propertymedia_id} className="media-item bg-gray-100 p-2 rounded-md">
                                                    {mediaItem.propertymedia_img && (
                                                        <img
                                                            src={mediaItem.propertymedia_img}
                                                            alt="Property Media"
                                                            className="object-cover rounded-md w-full h-48"
                                                        />
                                                    )}
                                                    {mediaItem.propertymedia_video && (
                                                        <video
                                                            src={mediaItem.propertymedia_video}
                                                            controls
                                                            className="object-cover rounded-md w-full h-48"
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mt-4 text-gray-500">No media available.</div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="mt-6 text-gray-500">Select a property type to view details.</div>
                )}
            </div>
        </div>
    );
};

export default PropertySelector;
