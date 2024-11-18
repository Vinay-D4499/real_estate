import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById, updateUserById } from './userAPI';
import { getAllPropertyTypes } from './propertyAPI';
import toast from 'react-hot-toast';

const UserUpdateForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [propertyTypes, setPropertyTypes] = useState([]);
    const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
    const [userDetails, setUserDetails] = useState({
        name: '',
        phone: '',
        location: '',
        budgetRange: { min: '', max: '' },
        email: '',
        address: '',
        referred_by: ''
    });

    useEffect(() => {
        const fetchPropertyTypes = async () => {
            try {
                const response = await getAllPropertyTypes();
                setPropertyTypes(response.properties);
            } catch (error) {
                console.error('Failed to fetch property types:', error);
                toast.error('Failed to fetch property types');
            }
        };

        fetchPropertyTypes();
    }, []);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await getUserById(id);
                setUserDetails({
                    ...response,
                    budgetRange: response.budgetRange || { min: '', max: '' }
                });

                // Initialize selected property types based on user data
                setSelectedPropertyTypes(response.propertyTypes || []); // Assuming `propertyTypes` is an array of ids
            } catch (error) {
                toast.error(error.message || 'Failed to fetch user details');
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { budgetRange, ...updatedUserDetails } = userDetails;
        try {
            await updateUserById(id, {
                ...updatedUserDetails,
                budget_min: budgetRange?.min || null,
                budget_max: budgetRange?.max || null,
                propertyTypes: selectedPropertyTypes // Include selected property types in the update
            });
            toast.success('User updated successfully');
            navigate('/view-customers');
        } catch (error) {
            toast.error(error.message || 'Failed to update user details');
        }
    };

    const budgetRanges = [
        { label: '₹50000-1 Lakh', min: 50000, max: 100000 },
        { label: '₹1-5 Lakhs', min: 100000, max: 500000 },
        { label: '₹5-10 Lakhs', min: 500000, max: 1000000 },
        { label: '₹10-20 Lakhs', min: 1000000, max: 2000000 },
        { label: '₹20-50 Lakhs', min: 2000000, max: 5000000 },
        { label: '₹50 Lakhs - ₹1 Crore', min: 5000000, max: 10000000 },
        { label: '₹1 Crore > ₹5 Crore', min: 10000000, max: 50000000 }
    ];

    const handleCheckboxChange = (e) => {
        const { value } = e.target;
        setSelectedPropertyTypes((prevTypes) =>
            prevTypes.includes(value)
                ? prevTypes.filter((id) => id !== value)
                : [...prevTypes, value]
        );
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Update User Details</h2>
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

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Budget Range</label>
                <div className="grid grid-cols-2 gap-2">
                    {budgetRanges.map((range, index) => (
                        <label key={index} className="flex items-center">
                            <input
                                type="radio"
                                name="budgetRange"
                                value={range.label}
                                checked={userDetails.budgetRange.min === range.min && userDetails.budgetRange.max === range.max}
                                onChange={() => handleBudgetRangeChange(range)}
                                className="mr-2"
                                required
                            />
                            {range.label}
                        </label>
                    ))}
                </div>
            </div>
            
            {/* Property Types */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Property Types</label>
                <div className="grid grid-cols-2 gap-2">
                    {propertyTypes.map(property => (
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
                    ))}
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
                Update User
            </button>
        </form>
    );
};

export default UserUpdateForm;
