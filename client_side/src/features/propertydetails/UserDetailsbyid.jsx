import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import PropertySelector from './PropertySelector'; // Import PropertySelector

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
                const response = await axios.get('http://localhost:3000/api/user/findUserById', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                
                setUserDetails(response.data);
                
                // Now fetch assigned properties once user details are fetched
                const propertyResponse = await axios.get(`http://localhost:3000/api/properties/assignedPropertyTypesbyuserid/${response.data.id}`);
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
        <div className="container mx-auto p-6 bg-gray-100 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">User Details</h2>
            <form>
                {/* Name */}
                <div className="mb-4">
                    <label htmlFor="userName" className="block text-gray-700 text-sm font-medium mb-2">Name</label>
                    <input
                        type="text"
                        id="userName"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={userDetails.name || ''}
                        readOnly
                    />
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label htmlFor="userEmail" className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                    <input
                        type="email"
                        id="userEmail"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={userDetails.email || ''}
                        readOnly
                    />
                </div>

                {/* Phone */}
                <div className="mb-4">
                    <label htmlFor="userPhone" className="block text-gray-700 text-sm font-medium mb-2">Phone</label>
                    <input
                        type="text"
                        id="userPhone"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={userDetails.phone || ''}
                        readOnly
                    />
                </div>

                {/* Address */}
                <div className="mb-4">
                    <label htmlFor="userAddress" className="block text-gray-700 text-sm font-medium mb-2">Address</label>
                    <input
                        type="text"
                        id="userAddress"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={userDetails.address || ''}
                        readOnly
                    />
                </div>

                {/* Budget Range */}
                <div className="mb-4">
                    <label htmlFor="userBudget" className="block text-gray-700 text-sm font-medium mb-2">Budget Range</label>
                    <div className="flex space-x-2">
                        <input
                            type="number"
                            id="userBudgetMin"
                            className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={userDetails.budgetRange?.min || ''}
                            readOnly
                        />
                        <span className="self-center text-gray-600">to</span>
                        <input
                            type="number"
                            id="userBudgetMax"
                            className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={userDetails.budgetRange?.max || ''}
                            readOnly
                        />
                    </div>
                </div>
            </form>
        </div>
          {/* Property Types (optional section) */}
          <div className="mb-6">
                    <label htmlFor="userPropertyTypes" className="block text-lg font-medium text-gray-800 mb-2">Property Types</label>
                    <PropertySelector assignedProperties={assignedProperties} />
                </div>
        </>
    );
};

export default UserDetailsById;
