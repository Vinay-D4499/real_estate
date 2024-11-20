import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import './navbarCss.css';

const DropdownMenu = ({ title, links }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const handleMouseEnter = () => {
    // Clear any existing timeout and open the menu immediately
    if (timeoutId) clearTimeout(timeoutId);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    // Set a timeout to close the menu after a brief delay
    const newTimeoutId = setTimeout(() => {
      setIsOpen(false);
    }, 300); // Delay in milliseconds (adjust as needed)
    setTimeoutId(newTimeoutId);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}  // Open dropdown on hover
      onMouseLeave={handleMouseLeave}  // Close dropdown after delay when mouse leaves
    >
      <button className="flex items-center gap-1 text-sm hover:text-indigo-400">
        {title}
        <FaChevronDown size={12} />
      </button>
      {isOpen && (
        <div className="z-50 absolute bg-gray-700 shadow-lg mt-2 p-2 rounded-md max-h-60 text-white overflow-y-auto">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="block hover:bg-gray-600 px-4 py-2 text-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
