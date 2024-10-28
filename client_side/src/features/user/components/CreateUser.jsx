import React, { useState, useEffect } from 'react';
import { createUser } from './userAPI';
import { getAllPropertyTypes } from './propertyAPI'; 
import toast from 'react-hot-toast';
import AllCustomerDetails from './AllCustomerDetails';

const CreateUser = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '', // Email is optional
        phone: ''
    });
    const [propertyTypes, setPropertyTypes] = useState([]); // State for property types
    const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]); // State for selected property types

    useEffect(() => {
        const fetchPropertyTypes = async () => {
            try {
                const response = await getAllPropertyTypes();
                setPropertyTypes(response.properties); // Set the fetched property types
            } catch (error) {
                console.error('Failed to fetch property types:', error);
                toast.error('Failed to fetch property types');
            }
        };

        fetchPropertyTypes();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        const { value } = e.target;
        if (selectedPropertyTypes.includes(value)) {
            setSelectedPropertyTypes(selectedPropertyTypes.filter(id => id !== value)); // Remove from selection
        } else {
            setSelectedPropertyTypes([...selectedPropertyTypes, value]); // Add to selection
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createUser({ ...userData, propertyTypeIds: selectedPropertyTypes });
            toast.success(response.message);
        } catch (error) {
            console.log(error);
            toast.error(error.message || 'Failed to create user');
        }
    };

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <form onSubmit={handleSubmit} className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add Customer</h2>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={userData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Email <span className="text-gray-500">(optional)</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={userData.phone}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Property Types</label>
                        <div className="flex flex-col">
                            {propertyTypes.map(property => (
                                <label key={property.id} className="flex items-center mb-2 uppercase">
                                    <input
                                        type="checkbox"
                                        value={property.id}
                                        checked={selectedPropertyTypes.includes(property.id.toString())}
                                        onChange={handleCheckboxChange}
                                        className="mr-2"
                                    />
                                    {property.name}
                                </label>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Create User
                    </button>
                </form>
            </div>
            <AllCustomerDetails />
        </>
    );
};

export default CreateUser;
