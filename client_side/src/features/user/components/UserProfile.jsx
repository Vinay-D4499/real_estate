import React, { useEffect, useState } from 'react';
import { fetchAdminData, fetchUserData } from './userAPI';
import toast from 'react-hot-toast';
import DisplayProfilePicture from './DisplayProfilePicture';
import AdminProfilePicture from './AdminProfilePicture';

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

    if (loading) return <p className="text-center mt-4 text-gray-500">Loading...</p>;

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Profile</h1>
            <div className="flex flex-col items-center space-y-4">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-3xl font-bold">
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
                    <p className="text-lg font-semibold text-gray-700">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <p className="text-sm text-gray-500">{user.phone}</p>
                </div>
            </div>
            {/* <div className="mt-6 flex justify-center">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition">
                    Edit Profile
                </button>
            </div> */}
        </div>
    );
};

export default UserProfile;
