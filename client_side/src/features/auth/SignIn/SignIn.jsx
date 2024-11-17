import React, { useState } from 'react';
import toast from 'react-hot-toast';
import SignInForm from './SignInForm';
import { signInUser } from '../authAPI';
import { Link, useNavigate } from 'react-router-dom';


const SignIn = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSignIn = async ({ email, password, phone }) => {
        setLoading(true);
        console.log(email,"----------email");
        console.log(password,"----------password");
        console.log(phone,"----------phone");

        try {
            const response = await signInUser(email, password, phone);
    
            // Save token and role in localStorage for future queries
            localStorage.setItem("token", response.token);
            localStorage.setItem("role", response.user.role);
    
            toast.success(response.message || "Sign in successful!");
            const role = response.user.role;
            if (role === 'ADMIN' || role === 'CUSTOMER') {
                setTimeout(() => {
                    window.location.href = '/user'; // or navigate('/user')
                }, 2000);
            } else {
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message || "An error occurred!");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center text-gray-700">Sign In</h2>
                <SignInForm onSubmit={handleSignIn} loading={loading} />
                <div className="mt-4 text-center">
                    <Link to="/reset-password" className="text-sm text-blue-500 hover:underline">
                        Forgot password? Click Here
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
