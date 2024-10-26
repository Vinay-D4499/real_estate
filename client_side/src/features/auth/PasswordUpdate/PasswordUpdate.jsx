// PasswordUpdate.js
import React, { useState } from 'react';
import PasswordUpdateForm from './PasswordUpdateForm';
import { updatePassword } from '../authAPI';
import toast from 'react-hot-toast';

const PasswordUpdate = () => {
    const [loading, setLoading] = useState(false);

    const handleUpdatePassword = async ({ oldPassword, newPassword }) => {
        setLoading(true);
        // console.log("Old Password:", oldPassword, "New Password:", newPassword); 
    
        try {
            const response = await updatePassword(oldPassword, newPassword); 
            toast.success(response.message || "Password updated successfully!");
        } catch (error) {
            console.error("Error updating password:", error);
            toast.error(error.message || "An error occurred!");
        } finally {
            setLoading(false);
        }
    };    
    

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center text-gray-700">Update Password</h2>
                <PasswordUpdateForm onSubmit={handleUpdatePassword} loading={loading} />
            </div>
        </div>
    );
};

export default PasswordUpdate;
