import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import DisplayProfilePicture from '../features/user/components/DisplayProfilePicture'; // Importing Profile Component
import AdminProfilePicture from '../features/user/components/AdminProfilePicture'; // Admin Profile Component

const MobileSidebar = ({ isOpen, toggleMenu, role, isLoggedIn, handleLogout, adminLinks, customerLinks, user }) => {
    const sidebarRef = useRef();

    // Close sidebar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                // Close the sidebar if the click is outside
                toggleMenu();           
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, toggleMenu]);

    return (
        <div
            ref={sidebarRef}
            className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
                } transition-transform duration-300 ease-in-out z-50`}
        >
            {/* Close Button */}
            <button onClick={toggleMenu} className="absolute top-4 right-4 text-white focus:outline-none">
                <FaTimes size={24} />
            </button>

            {/* Profile Section */}
            {isLoggedIn && (
                <div className="p-6 text-center">
                    {role === 'ADMIN' ? (
                        <AdminProfilePicture id={user.id} height="h-16 w-16" width="w-16" />
                    ) : (
                        <DisplayProfilePicture id={user.id} height="h-16 w-16" width="w-16" />
                    )}
                    <p className="text-white text-sm mt-2">{user.email}</p>
                </div>
            )}

            <div className="p-6 mt-10">
                <ul className="flex flex-col space-y-4">
                    {role === 'ADMIN' ? adminLinks : customerLinks}
                </ul>

                {isLoggedIn ? (
                    <button
                        onClick={() => { handleLogout(); toggleMenu(); }}
                        className="block w-full text-left text-red-500 hover:text-red-600 mt-6"
                    >
                        Logout
                    </button>
                ) : (
                    <Link to="/login" onClick={toggleMenu} className="block hover:text-blue-400 mt-6">
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default MobileSidebar;
