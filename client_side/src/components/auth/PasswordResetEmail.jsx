import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { baseURL } from '../config/baseURL';
import { Link } from 'react-router-dom';
import { Rings } from 'react-loader-spinner';

const PasswordResetEmail = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSendResetEmail = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${baseURL}/api/auth/sendPasswordResetEmail`, { email });
            toast.success(response.data.message || "Password reset email sent successfully!");
            setEmail('');
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
                <form onSubmit={handleSendResetEmail} className="mt-6">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full px-4 py-2 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                    >
                        {loading ? (
                            <Rings height={24} width={24} color="#ffffff" ariaLabel="loading" />
                        ) : (
                            "Send Reset Email"
                        )}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <Link to="/" className="text-sm text-blue-500 hover:underline">Remember your password? Sign In</Link>
                </div>
            </div>
        </div>
    );
};

export default PasswordResetEmail;
