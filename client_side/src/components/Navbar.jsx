import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaChevronDown } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import logo from '../assets/logo/tot.png';
import DisplayProfilePicture from '../features/user/components/DisplayProfilePicture';
import AdminProfilePicture from '../features/user/components/AdminProfilePicture';
import MobileSidebar from './MobileSidebar';
import { fetchUserData, fetchAdminData } from '../features/user/components/userAPI';
import DropdownMenu from './DropdownMenu';
import './navbarCss.css';

  

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
          const userData =
            role === 'ADMIN' ? await fetchAdminData() : await fetchUserData();
          setUser(userData);
        } catch (error) {
          toast.error(error.message || 'Failed to fetch user data');
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
    toast.success('Logged out successfully!');
    navigate('/');
  };

  // Grouped Links
  const adminLinkGroups = [
    {
      title: 'Customer Management',
      links: [
        { label: 'Add Customer', path: '/add-customer' },
        { label: 'View Customers', path: '/view-customers' },
        
      ],
    },
    {
      title: 'Property Management',
      links: [
        { label: 'Add Property', path: '/property-type' },
        { label: 'Property Details', path: '/property-details' },
      ],
    },
    {
      title: 'Other',
      links: [
        { label: 'Chats', path: '/chats' },
        { label: 'Groups', path: '/groups' },
        { label: 'Customer Reviews', path: '/customer-reviews' },
        { label: 'Update Password', path: '/update-password' },
        { label: 'Inactive Customers', path: '/inactive-customers' },
      ],
    },
  ];
  

  const customerLinkGroups = [
    {
      title: 'Explore',
      links: [
        { label: 'Dashboard', path: '/user' },
        { label: 'Explore Properties', path: '/explore-properties' },
      ],
    },
    {
      title: 'Account',
      links: [
        // { label: 'About', path: '/about' },
        { label: 'Update Password', path: '/update-password' },
        { label: 'Reviews', path: '/review' },
      ],
    },
  ];

  return (
    <nav className="bg-gray-800 shadow-md text-white">
      <div className="flex justify-between items-center mx-auto p-4 container">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0 font-semibold text-2xl">
          <img src={logo} alt="TOT FD" className="w-10 h-10" />
        </Link>

        {/* Hamburger Menu Button */}
        <button onClick={toggleMenu} className="md:hidden text-white focus:outline-none">
          <FaBars size={24} />
        </button>

        {/* Desktop Menu */}
        <ul className="md:flex md:flex-row md:items-center md:space-x-6 hidden">
          {(role === 'ADMIN' ? adminLinkGroups : customerLinkGroups).map(
            (group, index) => (
              <DropdownMenu key={index} title={group.title} links={group.links} />
            )
          )}
        </ul>

        {/* Desktop Auth Buttons */}
        <div className="md:flex items-center space-x-4 hidden">
          {isLoggedIn ? (
            <>
              {role === 'ADMIN' ? (
                <AdminProfilePicture id={user.id} height="h-8" width="w-8" />
              ) : (
                <DisplayProfilePicture id={user.id} height="h-8" width="w-8" />
              )}
              <span className="text-sm">{user.email || 'User'}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded text-sm text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded text-sm text-white"
            >
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
        adminLinks={adminLinkGroups}
        customerLinks={customerLinkGroups}
        user={user}
      />
    </nav>
  );
};

export default Navbar;
