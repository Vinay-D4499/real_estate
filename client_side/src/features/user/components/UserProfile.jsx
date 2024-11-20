import React, { useEffect, useState } from 'react';
import { fetchAdminData, fetchUserData } from './userAPI';
import toast from 'react-hot-toast';
import DisplayProfilePicture from './DisplayProfilePicture';
import AdminProfilePicture from './AdminProfilePicture';
import AssignedProperties from '../properties_assigned/AssignedProperties';

const UserProfile = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const role = localStorage.getItem('role');
    useEffect(() => {
        const getUserData = async () => {
            try {
                const userData = role === 'ADMIN' ? await fetchAdminData() : await fetchUserData();
                setUser(userData);
            } catch (error) {
                toast.error(error.message || "Failed to fetch user data");
            } finally {
                setLoading(false);
            }
        };
        getUserData();
    }, []);

    if (loading) return <p className="mt-4 text-center text-gray-500">Loading...</p>;

    return (
        <div className="bg-white shadow-lg mx-auto mt-10 p-6 rounded-lg max-w-md">
            <h1 className="mb-4 font-semibold text-2xl text-center text-gray-800">Profile</h1>
            <div className="flex flex-col items-center space-y-4">
                <div className="flex justify-center items-center bg-gray-200 rounded-full w-24 h-24 font-bold text-3xl text-gray-500">
                    {/* {user.name?.charAt(0)} */}
                    {/* <DisplayProfilePicture id={user.id} height='24' width='24'/> */}
                    {role === 'ADMIN' ? (
                        <>
                            <AdminProfilePicture id={user.id} height="h-24" width="w-24" />
                        </>
                    ) : (
                        <>
                            <DisplayProfilePicture id={user.id} height="h-24" width="w-24" />
                        </>
                    )}
                </div>
                <div className="text-center">
                    <p className="font-semibold text-gray-700 text-lg">{user.name}</p>
                    <p className="text-gray-500 text-sm">{user.email}</p>
                    <p className="text-gray-500 text-sm">{user.phone}</p>
                </div>
            </div>
            <AssignedProperties />
            {/* <div className="flex justify-center mt-6">
                <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-white transition">
                    Edit Profile
                </button>
            </div> */}
        </div>
    );
};

export default UserProfile;
