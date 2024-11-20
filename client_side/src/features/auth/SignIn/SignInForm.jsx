import React, { useState } from 'react';
import { Rings } from 'react-loader-spinner';

const SignInForm = ({ onSubmit, loading }) => {
    const [inputValue, setInputValue] = useState("admin@admin.com");  // For email or phone number
    const [password, setPassword] = useState('Admin@1234');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if inputValue is an email or phone number based on a simple regex pattern
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const payload = { password };

        if (emailPattern.test(inputValue)) {
            payload.email = inputValue; // Send email if valid
        } else {
            payload.phone = inputValue; // Send phone if not an email
        }

        onSubmit(payload);  // Pass the payload object with either email or phone to the backend
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit} className="divide-y divide-gray-200 mt-6">
            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                
                {/* Email or Phone Number Input */}
                <div className="relative">
                    <input
                        type="text"
                        id="emailOrPhone"
                        required
                        value={inputValue}
                        onChange={handleInputChange}
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                        placeholder="Email or Phone Number"
                    />
                    <label
                        htmlFor="emailOrPhone"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base 
                                   peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all 
                                   peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                        Email or Phone Number
                    </label>
                </div>

                {/* Password Input */}
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                        placeholder="Password"
                    />
                    <label
                        htmlFor="password"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base 
                                   peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all 
                                   peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                        Password
                    </label>
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-2 text-gray-500"
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                </div>

                {/* Submit Button */}
                <div className="relative">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`bg-blue-500 text-white rounded-md w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                            loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {loading ? (
                            <Rings height={24} width={24} color="#ffffff" ariaLabel="loading" />
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default SignInForm;
