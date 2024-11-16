import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Rings } from 'react-loader-spinner'; 
import toast from 'react-hot-toast';
import { baseURL } from '../../config/baseURL';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false); 

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true); 

        try {
            const response = await axios.post(`${baseURL}/api/auth/signin`, {
                email,
                password,
            });

            console.log("Response:", response);
            toast.success(response.data.message || "Sign in successful!");

        } catch (error) {
            console.error("Error details:", error);
            const errorMessage = error.response?.data?.message || "An error occurred!";
            toast.error(errorMessage);
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center text-gray-700">Sign In</h2>
                <form onSubmit={handleSignIn} className="mt-6">
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
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-2 text-gray-500"
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading} 
                        className={`w-full px-4 py-2 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                            loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {loading ? (
                            <Rings height={24} width={24} color="#ffffff" ariaLabel="loading" /> 
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <Link to="/reset-password" className="text-sm text-blue-500 hover:underline">Forgot Password?</Link>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
