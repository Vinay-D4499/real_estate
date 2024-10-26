// PasswordUpdateForm.js
import React, { useState } from 'react';
import { Rings } from 'react-loader-spinner';

const PasswordUpdateForm = ({ onSubmit, loading }) => {
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});

    const validatePassword = (password) => {
        const minLength = 8;
        const hasNumber = /\d/;
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

        if (password.length < minLength) {
            return "Password must be at least 8 characters long";
        }
        if (!hasNumber.test(password)) {
            return "Password must include at least one number";
        }
        if (!hasSpecialChar.test(password)) {
            return "Password must include at least one special character";
        }
        return null;
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { oldPassword, newPassword, confirmPassword } = formData;
        
        // Clear previous errors
        setErrors({});
        
        // Validate new password
        const newPasswordError = validatePassword(newPassword);
        if (newPasswordError) {
            setErrors({ newPassword: newPasswordError });
            return;
        }

        // Check if passwords match
        if (newPassword !== confirmPassword) {
            setErrors({ confirmPassword: "Passwords do not match" });
            return;
        }

        onSubmit({ oldPassword, newPassword });
    };

    return (
        <form onSubmit={handleSubmit} className="mt-6 divide-y divide-gray-200">
            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                
                {/* Old Password */}
                <div className="relative">
                    <input
                        type="password"
                        name="oldPassword"
                        required
                        value={formData.oldPassword}
                        onChange={handleChange}
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                        placeholder="Old Password"
                    />
                    <label
                        htmlFor="oldPassword"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base 
                                   peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all 
                                   peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                        Old Password
                    </label>
                </div>

                {/* New Password */}
                <div className="relative">
                    <input
                        type="password"
                        name="newPassword"
                        required
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                        placeholder="New Password"
                    />
                    <label
                        htmlFor="newPassword"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base 
                                   peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all 
                                   peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                        New Password
                    </label>
                    {errors.newPassword && (
                        <p className="text-sm text-red-500 mt-1">{errors.newPassword}</p>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="relative">
                    <input
                        type="password"
                        name="confirmPassword"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                        placeholder="Confirm Password"
                    />
                    <label
                        htmlFor="confirmPassword"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base 
                                   peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all 
                                   peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                        Confirm Password
                    </label>
                    {errors.confirmPassword && (
                        <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
                    )}
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
                            "Update Password"
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default PasswordUpdateForm;
