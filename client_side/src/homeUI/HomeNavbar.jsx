import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HomeNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/home-ui-navbar" className="text-white text-lg font-bold">
          Home
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white lg:hidden focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        <div className={`lg:flex items-center ${isOpen ? "block" : "hidden"}`}>
          <Link to="/home1" className="text-white px-4 py-2 block hover:bg-blue-700">
            Home 1
          </Link>
          <Link to="/home2" className="text-white px-4 py-2 block hover:bg-blue-700">
            Home 2
          </Link>
          <Link to="/home3" className="text-white px-4 py-2 block hover:bg-blue-700">
            Home 3
          </Link>
          <Link to="/home4" className="text-white px-4 py-2 block hover:bg-blue-700">
            Home 4
          </Link>
          <Link to="/home5" className="text-white px-4 py-2 block hover:bg-blue-700">
            Home 5
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;
