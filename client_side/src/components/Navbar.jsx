import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { fetchUserData, fetchAdminData } from '../features/user/components/userAPI';
import { toast } from 'react-hot-toast';
import logo from '../assets/logo/tot.png';
import DisplayProfilePicture from '../features/user/components/DisplayProfilePicture';
import AdminProfilePicture from '../features/user/components/AdminProfilePicture';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const role = localStorage.getItem('role');
    const navigate = useNavigate();

    const toggleMenu = () => setMenuOpen((prevState) => !prevState);

    useEffect(() => {
        if (isLoggedIn) {
            const getUserData = async () => {
                try {
                    const userData = role === 'ADMIN' ? await fetchAdminData() : await fetchUserData();
                    setUser(userData);
                } catch (error) {
                    toast.error(error.message || "Failed to fetch user data");
                }
            };
            getUserData();
        }
    }, [isLoggedIn, role]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setIsLoggedIn(false);
        setUser({});
        toast.success("Logged out successfully!");
        navigate('/');
    };

    const adminLinks = (
        <>
            <Link to="/add-customer" className="hover:text-indigo-400">Add Customer</Link>
            <Link to="/view-customers" className="hover:text-indigo-400">Customers</Link>
            <Link to="/inactive-customers" className="hover:text-indigo-400">Inactive Customers</Link>
            <Link to="/update-password" className="hover:text-indigo-400">Update Password</Link>
            <Link to="/property-type" className="hover:text-indigo-400">Add-Property</Link>
            <Link to="/customer-reviews" className="hover:text-indigo-400">Customer-Reviews</Link>
          
        </>
    );

    const customerLinks = (
        <>
            <Link to="/user" className="hover:text-indigo-400">Dashboard</Link>
            <Link to="/explore" className="hover:text-indigo-400">Explore</Link>
            <Link to="/about" className="hover:text-indigo-400">About</Link>
            <Link to="/update-password" className="hover:text-indigo-400">Update Password</Link>
            <Link to="/review" className="hover:text-indigo-400">Reviews</Link>
            <Link to="/customer-reviews" className="hover:text-indigo-400">Customer-Reviews</Link>
          
        </>
    );

    const commonLinks = (
        <>
        
         
        </>
    );

    return (
        <nav className="bg-gray-800 text-white shadow-md">
            <div className="container mx-auto flex justify-between items-center p-4">
                <Link to="/" className="text-2xl font-semibold">
                    <img src={logo} alt="TOT FD" style={{ width: '40px', height: '40px' }} />
                </Link>

                <button onClick={toggleMenu} className="md:hidden text-white focus:outline-none">
                    {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>

                <ul className="hidden md:flex md:flex-row md:space-x-6 md:items-center">
                    {commonLinks}
                    {role === 'ADMIN' ? adminLinks : customerLinks}
                </ul>

                <div className="hidden md:flex items-center space-x-4">
                    {isLoggedIn ? (
                        <>
                            {role === 'ADMIN' ? (
                                <>
                                    <AdminProfilePicture id={user.id} height="h-8" width="w-8" />
                                </>
                            ) : (
                                <>
                                    <DisplayProfilePicture id={user.id} height="h-8" width="w-8" />
                                </>
                            )}
                            <span className="text-sm">{user.email || "User"}</span>
                            <button
                                onClick={handleLogout}
                                className="text-sm bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/" className="text-sm bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded">
                            Login
                        </Link>
                    )}
                </div>
            </div>

            {menuOpen && (
                <div className="md:hidden bg-gray-800 text-white py-2 px-4 space-y-2">
                    {commonLinks}
                    {role === 'ADMIN' ? adminLinks : customerLinks}
                    {isLoggedIn ? (
                        <button
                            onClick={() => { handleLogout(); toggleMenu(); }}
                            className="block w-full text-left text-red-500 hover:text-red-600 mt-4"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link to="/login" onClick={toggleMenu} className="block hover:text-blue-400 mt-4">
                            Login
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
