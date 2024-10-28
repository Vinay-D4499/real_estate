import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { fetchUserData } from '../features/user/components/userAPI';
import { toast } from 'react-hot-toast';
import logo from '../assets/logo/tot.png';
import DisplayProfilePicture from '../features/user/components/DisplayProfilePicture';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const navigate = useNavigate();

    const toggleMenu = () => setMenuOpen((prevState) => !prevState);

    useEffect(() => {
        if (isLoggedIn) {
            const getUserData = async () => {
                try {
                    const userData = await fetchUserData();
                    setUser(userData);
                } catch (error) {
                    toast.error(error.message || "Failed to fetch user data");
                }
            };
            getUserData();
        }
    }, [isLoggedIn]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUser({});
        toast.success("Logged out successfully!");
        navigate('/');
    };

    return (
        <nav className="bg-gray-800 text-white shadow-md">
            <div className="container mx-auto flex justify-between items-center p-4">
                {/* Logo */}
                <Link to="/" className="text-2xl font-semibold">
                    <img src={logo} alt="TOT FD" style={{ width: '40px', height: '40px' }} />
                </Link>

                {/* Toggle Button for Mobile */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden text-white focus:outline-none"
                >
                    {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>

                {/* Navigation Links */}
                <ul className={`flex-col md:flex md:flex-row md:space-x-6 md:items-center ${menuOpen ? 'flex' : 'hidden'} md:flex`}>
                    <li>
                        <Link to="/user" className="hover:text-indigo-400">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/update-password" className="hover:text-indigo-400">Update Password</Link>
                    </li>
                    <li>
                        <Link to="/explore" className="hover:text-indigo-400">Explore</Link>
                    </li>
                    <li>
                        <Link to="/about" className="hover:text-indigo-400">About</Link>
                    </li>
                    <li>
                        <Link to="/add-customer" className="hover:text-indigo-400">Add Customer</Link>
                    </li>
                    <li>
                        <Link to="/view-customers" className="hover:text-indigo-400">Customers</Link>
                    </li>
                </ul>

                {/* Profile & Auth Buttons */}
                <div className="hidden md:flex items-center space-x-4">
                    {isLoggedIn ? (
                        <>
                            {/* Profile Section */}
                            {/* <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                                {user.name?.charAt(0) || "U"}
                            </div> */}
                            <DisplayProfilePicture id={user.id} height="h-8" width="w-8"/>  
                            <span className="text-sm">{user.email || "User"}</span>

                            {/* Logout Button */}
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

            {/* Mobile Menu Dropdown */}
            {menuOpen && (
                <div className="md:hidden bg-gray-800 text-white py-2 px-4 space-y-2">
                    <Link to="/user" onClick={toggleMenu} className="block hover:text-indigo-400">Dashboard</Link>
                    <Link to="/update-password" onClick={toggleMenu} className="block hover:text-indigo-400">Update Password</Link>
                    <Link to="/explore" onClick={toggleMenu} className="block hover:text-indigo-400">Explore</Link>
                    <Link to="/about" onClick={toggleMenu} className="block hover:text-indigo-400">About</Link>
                    <Link to="/contact" onClick={toggleMenu} className="block hover:text-indigo-400">Contact</Link>
                    <Link to="/add-customer" onClick={toggleMenu} className="block hover:text-indigo-400">Add Customer</Link>

                    {/* Auth Button for Mobile */}
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
