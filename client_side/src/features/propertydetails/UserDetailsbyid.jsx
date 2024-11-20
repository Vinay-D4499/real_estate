import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import PropertySelector from './PropertySelector'; // Import PropertySelector
import { baseURL } from '../../config/baseURL';

const UserDetailsById = () => {
    const { id } = useParams(); // Get the user ID from the URL params
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [assignedProperties, setAssignedProperties] = useState(null);


    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                setLoading(true);

                // Fetch user details first
                const response = await axios.get(`${baseURL}/api/user/findUserById`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                setUserDetails(response.data);

                // Now fetch assigned properties once user details are fetched
                const propertyResponse = await axios.get(`${baseURL}/api/properties/assignedPropertyTypesbyuserid/${response.data.id}`);
                setAssignedProperties(propertyResponse.data);
            } catch (error) {
                console.error("Error fetching user details:", error);
                toast.error('Failed to load user details');
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!userDetails) return <div>No user found!</div>;

    return (
        <>
            <div className="bg-gray-100 shadow-lg mx-auto p-6 rounded-lg container">
                <h2 className="mb-6 font-semibold text-2xl text-gray-800">User Details</h2>
                <form>
                    {/* Name */}
                    <div className="mb-4">
                        <label htmlFor="userName" className="block mb-2 font-medium text-gray-700 text-sm">Name</label>
                        <input
                            type="text"
                            id="userName"
                            className="border-gray-300 p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={userDetails.name || ''}
                            readOnly
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label htmlFor="userEmail" className="block mb-2 font-medium text-gray-700 text-sm">Email</label>
                        <input
                            type="email"
                            id="userEmail"
                            className="border-gray-300 p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={userDetails.email || ''}
                            readOnly
                        />
                    </div>

                    {/* Phone */}
                    <div className="mb-4">
                        <label htmlFor="userPhone" className="block mb-2 font-medium text-gray-700 text-sm">Phone</label>
                        <input
                            type="text"
                            id="userPhone"
                            className="border-gray-300 p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={userDetails.phone || ''}
                            readOnly
                        />
                    </div>

                    {/* Address */}
                    <div className="mb-4">
                        <label htmlFor="userAddress" className="block mb-2 font-medium text-gray-700 text-sm">Address</label>
                        <input
                            type="text"
                            id="userAddress"
                            className="border-gray-300 p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={userDetails.address || ''}
                            readOnly
                        />
                    </div>

                    {/* Budget Range */}
                    <div className="mb-4">
                        <label htmlFor="userBudget" className="block mb-2 font-medium text-gray-700 text-sm">Budget Range</label>
                        <div className="flex space-x-2">
                            <input
                                type="number"
                                id="userBudgetMin"
                                className="border-gray-300 p-3 border rounded-md w-1/2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                value={userDetails.budgetRange?.min || ''}
                                readOnly
                            />
                            <span className="text-gray-600 self-center">to</span>
                            <input
                                type="number"
                                id="userBudgetMax"
                                className="border-gray-300 p-3 border rounded-md w-1/2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                value={userDetails.budgetRange?.max || ''}
                                readOnly
                            />
                        </div>
                    </div>
                </form>
            </div>
            {/* Property Types (optional section) */}
            <div className="mb-6">
                <label htmlFor="userPropertyTypes" className="block mb-2 font-medium text-gray-800 text-lg">Property Types</label>
                <PropertySelector assignedProperties={assignedProperties} />
            </div>
        </>
    );
};

export default UserDetailsById;
