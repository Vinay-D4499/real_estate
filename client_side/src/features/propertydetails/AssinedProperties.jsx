import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { getUserById, updateUserById } from '../user/components/userAPI';
import { baseURL } from "../../../src/config/baseURL"; 


const AssignedProperties = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [propertyTypes, setPropertyTypes] = useState([]); // All property types
    const [assignedPropertyTypes, setAssignedPropertyTypes] = useState([]);
    const [unassignedPropertyTypes, setUnassignedPropertyTypes] = useState([]); // Unassigned property types
    const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]); // Selected for assignment
    const [userDetails, setUserDetails] = useState({
        name: '',
        phone: '',
        location: '',
        // budgetRange: { min: 0, max: 0 },
        email: '',
        address: '',
        referred_by: ''
    });
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch all property types
                const allPropertiesResponse = await axios.get(`${baseURL}/api/properties/getAllPropertyTypes`);
                const allProperties = allPropertiesResponse.data.properties;
                setPropertyTypes(allProperties);
                 
                // Fetch user details along with assigned properties
                const userResponse = await axios.get(
                    `${baseURL}/api/properties/assignedPropertyTypesbyuserid/${id}`
                );
                const user = userResponse.data;
                console.log(user,"---------------------------properties")
                const response = await getUserById(id);
               
                setUserDetails({
                    ...response,
                    budgetRange: response.budgetRange || { min: '', max: '' }
                });

               // Filter out assigned properties
               const assignedPropertyIds = new Set(user.propertyTypes?.map((property) => property.id) || []);
               setAssignedPropertyTypes(allProperties.filter(property => assignedPropertyIds.has(property.id))); // Initialize assigned property types

                // Filter unassigned properties (those not already assigned to the user)
                const unassigned = allProperties.filter((property) => !assignedPropertyIds.has(property.id));
                setUnassignedPropertyTypes(unassigned);
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error(error.message || 'Failed to load data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);
 
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleBudgetRangeChange = (range) => {
        setUserDetails(prevDetails => ({
            ...prevDetails,
            budgetRange: { min: range.min, max: range.max }
        }));
    };

    const budgetRanges = [
        { label: '₹50000-1 Lakh', min: 50000, max: 100000 },
        { label: '₹1-5 Lakhs', min: 100000, max: 500000 },
        { label: '₹5-10 Lakhs', min: 500000, max: 1000000 },
        { label: '₹10-20 Lakhs', min: 1000000, max: 2000000 },
        { label: '₹20-50 Lakhs', min: 2000000, max: 5000000 },
        { label: '₹50 Lakhs - ₹1 Crore', min: 5000000, max: 10000000 },
        { label: '₹5 Crore > ₹1 Crore', min: 10000000, max: 50000000 }
    ];

    
    const [loading, setLoading] = useState(true);

    const handleCheckboxChange = (e) => {
        const propertyId = e.target.value;
    if (e.target.checked) {
        setSelectedPropertyTypes((prev) => [...prev, propertyId]);
    } else {
        setSelectedPropertyTypes((prev) => prev.filter((id) => id !== propertyId));
    }
    };
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { budgetRange, ...updatedUserDetails } = userDetails;
    
        // Filter to get only new property assignments
        const propertyAssignments = selectedPropertyTypes
            .filter((propertyTypeId) =>
                unassignedPropertyTypes.some((property) => property.id === Number(propertyTypeId))
            )
            .map((propertyTypeId) => ({
                userId: id, // Use the id from useParams
                propertyTypeId: Number(propertyTypeId),
            }));
    
    
        // Handle invalid or duplicate property types
        const invalidPropertyTypes = selectedPropertyTypes.filter(
            (propertyTypeId) => !unassignedPropertyTypes.some((property) => property.id === Number(propertyTypeId))
        );
    
        if (invalidPropertyTypes.length > 0) {
            console.warn("These property types are already assigned or invalid:", invalidPropertyTypes);
            // Optionally display a message or show these invalid property types in the UI
        }
    
        try {
            // Assign new property types to the user
            for (const { userId, propertyTypeId } of propertyAssignments) {
                await axios.post(`${baseURL}/api/properties/assignedPropertyTypesbyuser`, {
                    userId,
                    propertyTypeId,
                });
            }
    
            // Update user details including budget range and selected property types
            await updateUserById(id, {
                ...updatedUserDetails,
                budget_min: budgetRange?.min || null,
                budget_max: budgetRange?.max || null,
                propertyTypes: selectedPropertyTypes, // Include all selected property types
            });
    
            toast.success('User updated successfully');
            navigate('/view-customers');
        } catch (error) {
            console.error("Error updating user details:", error);
            toast.error(error.message || 'Failed to update user details');
        }
    };
    

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
        <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Assign Properties</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    name="name"
                    value={userDetails.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                    type="tel"
                    name="phone"
                    value={userDetails.phone}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                    type="text"
                    name="location"
                    value={userDetails.location || ''}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
            </div>
                                    {/* <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Budget Range
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                            {budgetRanges.map((range, index) => (
                            <label
                                key={index}
                                className="flex items-center p-2 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-100"
                            >
                                <input
                                type="radio"
                                name="budgetRange"
                                value={range.label}
                                checked={
                                    userDetails.budgetRange.min === range.min &&
                                    userDetails.budgetRange.max === range.max
                                }
                                onChange={() => handleBudgetRangeChange(range)}
                                className="mr-2 w-4 h-4 text-blue-600 focus:ring-blue-500"
                                required
                                />
                                <span className="text-sm text-gray-700">{range.label}</span>
                            </label>
                            ))}
                        </div>
                        </div>; */}

                            {/* Display Assigned Properties */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Assigned Properties</label>
                <div className="grid grid-cols-2 gap-2">
                    {assignedPropertyTypes.length > 0 ? (
                        assignedPropertyTypes.map((property) => (
                            <label key={property.id} className="flex items-center uppercase">
                                <input
                                    type="checkbox"
                                    value={property.id}
                                    checked={selectedPropertyTypes.includes(property.id.toString())}
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                    disabled // Disable checkbox for already assigned properties
                                />
                                {property.name}
                            </label>
                        ))
                    ) : (
                        <p>No assigned properties</p>
                    )}
                </div>
            </div>

            {/* Display Unassigned Properties */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">unassigned Properties</label>
                <div className="grid grid-cols-2 gap-2">
                    {unassignedPropertyTypes.length > 0 ? (
                        unassignedPropertyTypes.map((property) => (
                            <label key={property.id} className="flex items-center uppercase">
                                <input
                                    type="checkbox"
                                    value={property.id}
                                    checked={selectedPropertyTypes.includes(property.id.toString())}
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                />
                                {property.name}
                            </label>
                        ))
                    ) : (
                        <p>No unassigned properties available</p>
                    )}
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    name="email"
                    value={userDetails.email}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                    type="text"
                    name="address"
                    value={userDetails.address}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Referred By</label>
                <input
                    type="text"
                    name="referred_by"
                    value={userDetails.referred_by}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
                Save
            </button>
        </div>
        </form>
    );
};

export default AssignedProperties;
