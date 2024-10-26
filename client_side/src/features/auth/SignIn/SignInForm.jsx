import React, { useState } from 'react';
import { Rings } from 'react-loader-spinner';

const SignInForm = ({ onSubmit, loading }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(email, password);
    };

    return (
        <form onSubmit={handleSubmit} className="divide-y divide-gray-200 mt-6">
            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                    <input
                        type="email"
                        id="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                        placeholder="Email address"
                    />
                    <label
                        htmlFor="email"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base 
                                   peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all 
                                   peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                        Email Address
                    </label>
                </div>
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
