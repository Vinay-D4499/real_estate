import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import DisplayProfilePicture from '../features/user/components/DisplayProfilePicture'; // Importing Profile Component
import AdminProfilePicture from '../features/user/components/AdminProfilePicture'; // Admin Profile Component
import './navbarCss.css';

const MobileSidebar = ({
  isOpen,
  toggleMenu,
  role,
  isLoggedIn,
  handleLogout,
  adminLinks,
  customerLinks,
  user,
}) => {
  const sidebarRef = useRef();

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggleMenu(); // Close the sidebar if the click is outside
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

  // Prevent event propagation for the close button
  const handleCloseClick = (event) => {
    event.stopPropagation();
    toggleMenu();
  };

  // Render links by mapping over grouped data
  const renderLinks = (links) =>
    links.map((group, groupIndex) => (
      <div key={groupIndex} className="mb-4">
        <h3 className="mb-2 font-semibold text-gray-300 text-sm uppercase">
          {group.title}
        </h3>
        <ul className="space-y-2">
          {group.links.map((link, linkIndex) => (
            <li key={linkIndex}>
              <Link
                to={link.path}
                onClick={toggleMenu} // Close menu on link click
                className="block ml-2 text-white hover:text-indigo-40"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    ));

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform overflow-y-auto ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out z-50`}
    >
      {/* Close Button */}
      {/* <button
        onClick={handleCloseClick}
        className="top-4 right-4 absolute text-white focus:outline-none"
      >
        <FaTimes size={24} />
      </button> */}

      {/* Profile Section */}
      {isLoggedIn && (
        <div className="p-2 text-center">
          {role === 'ADMIN' ? (
            <AdminProfilePicture id={user.id} height="h-16" width="w-16" />
          ) : (
            <DisplayProfilePicture id={user.id} height="h-16" width="w-16" />
          )}
          <p className="mt-2 text-sm text-white">{user.email || 'User'}</p>
        </div>
      )}

      {/* Links Section */}
      <div className="mt-10 p-6">
        {renderLinks(role === 'ADMIN' ? adminLinks : customerLinks)}

        {/* Logout or Login Button */}
        {isLoggedIn ? (
          <button
            onClick={() => {
              handleLogout();
              toggleMenu();
            }}
            className="block mt-6 w-full text-left text-red-500 hover:text-red-600"
          >
            Logout
          </button>
        ) : (
          <Link to="/login" onClick={toggleMenu} className="block mt-6 hover:text-blue-400">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default MobileSidebar;
