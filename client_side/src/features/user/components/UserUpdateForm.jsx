import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById, updateUserById } from './userAPI';
import toast from 'react-hot-toast';

const UserUpdateForm = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState({
        name: '',
        phone: '',
        location: '',
        budget_min: '',
        budget_max: '',
        email: '',
        address: '',
        referred_by: ''
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await getUserById(id);
                setUserDetails(response);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { role, ...updatedUserDetails } = userDetails;
            await updateUserById(id, updatedUserDetails);
            toast.success('User updated successfully');
            navigate('/view-customers'); 
        } catch (error) {
            toast.error(error.message || 'Failed to update user details');
        }
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
            {/* <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <input
                    type="text"
                    name="role"
                    value={userDetails.role}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
            </div> */}
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
                    value={userDetails.location}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
            </div>
            {/* <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Profile Picture URL</label>
                <input
                    type="text"
                    name="profile_picture_url"
                    value={userDetails.profile_picture_url}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
            </div> */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Minimum Budget</label>
                <input
                    type="number"
                    name="budget_min"
                    value={userDetails.budget_min}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Maximum Budget</label>
                <input
                    type="number"
                    name="budget_max"
                    value={userDetails.budget_max}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
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
