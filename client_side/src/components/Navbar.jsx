import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import logo from '../assets/logo/tot.png';
import DisplayProfilePicture from '../features/user/components/DisplayProfilePicture';
import AdminProfilePicture from '../features/user/components/AdminProfilePicture';
import MobileSidebar from './MobileSidebar'; // Import the new sidebar component
import { fetchUserData, fetchAdminData } from '../features/user/components/userAPI';

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
            <Link to="/add-customer" className="hover:text-indigo-400 text-sm">Add Customer</Link>
            <Link to="/chats" className="hover:text-indigo-400 text-sm">Chats</Link>
            <Link to="/view-customers" className="hover:text-indigo-400 text-sm">Customers</Link>
            <Link to="/inactive-customers" className="hover:text-indigo-400 text-sm">Inactive Customers</Link>
            <Link to="/update-password" className="hover:text-indigo-400 text-sm">Update Password</Link>
        </>
    );

    const customerLinks = (
        <>
            <Link to="/user" className="hover:text-indigo-400 text-sm">Dashboard</Link>
            <Link to="/explore" className="hover:text-indigo-400 text-sm">Explore</Link>
            <Link to="/about" className="hover:text-indigo-400 text-sm">About</Link>
            <Link to="/update-password" className="hover:text-indigo-400 text-sm">Update Password</Link>
        </>
    );

    return (
        <nav className="bg-gray-800 text-white shadow-md">
            <div className="container mx-auto flex justify-between items-center p-4">
                {/* Logo */}
                <Link to="/" className="text-2xl font-semibold flex-shrink-0">
                    <img src={logo} alt="TOT FD" className="w-10 h-10" />
                </Link>
                <Link to="/home-ui-navbar" className="hover:text-indigo-400 text-sm">Home </Link>


                {/* Hamburger Menu Button */}
                <button onClick={toggleMenu} className="md:hidden text-white focus:outline-none">
                    <FaBars size={24} />
                </button>

                {/* Desktop Menu */}
                <ul className="hidden md:flex md:flex-row md:space-x-6 md:items-center">
                    {role === 'ADMIN' ? adminLinks : customerLinks}
                </ul>

                {/* Desktop Auth Buttons */}
                <div className="hidden md:flex items-center space-x-4">
                    {isLoggedIn ? (
                        <>
                            {role === 'ADMIN' ? (
                                <AdminProfilePicture id={user.id} height="h-8" width="w-8" />
                            ) : (
                                <DisplayProfilePicture id={user.id} height="h-8" width="w-8" />
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

            {/* Mobile Sidebar */}
            <MobileSidebar
                isOpen={menuOpen}
                toggleMenu={toggleMenu}
                role={role}
                isLoggedIn={isLoggedIn}
                handleLogout={handleLogout}
                adminLinks={adminLinks}
                customerLinks={customerLinks}
                user={user}
            />

        </nav>
    );
};

export default Navbar;
