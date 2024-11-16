// PasswordResetEmail.js
import React, { useState } from 'react';
import PasswordResetEmailForm from './PasswordResetEmailForm';
import { passwordResetEmail } from '../authAPI';
import toast from 'react-hot-toast';

const PasswordResetEmail = () => {
    const [loading, setLoading] = useState(false);

    const handleSendResetEmail = async (email) => {
        setLoading(true);

        try {
            const response = await passwordResetEmail(email);
            toast.success(response.message || "Password reset email sent successfully!");
        } catch (error) {
            const errorMessage = error.response?.data?.message || "An error occurred while sending the reset email.";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center text-gray-700">Reset Password</h2>
                <PasswordResetEmailForm onSubmit={handleSendResetEmail} loading={loading} />
                <div className="mt-4 text-center">
                    <Link to="/" className="text-sm text-blue-500 hover:underline">
                        Remember your password? Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PasswordResetEmail;
