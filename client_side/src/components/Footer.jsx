import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import logo from '../assets/logo/tot.png'

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:justify-between space-y-8 md:space-y-0">
                    
                    {/* Logo and Description */}
                    <div className="space-y-4">
                        <img src={logo} alt="TOT FD" style={{height:'70px', width:'70px'}} />
                        <h2 className="text-2xl font-semibold">TOT FD</h2>
                        <p className="text-gray-400">
                            Enhancing your experience with top-notch services. Connect with us for all your needs.
                        </p>
                    </div>
                    
                    {/* Important Links */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-white">Home</Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-400 hover:text-white">About Us</Link>
                            </li>
                            <li>
                                <Link to="/services" className="text-gray-400 hover:text-white">Services</Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Contact Information */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                        <p className="text-gray-400">BTM Layout, Bengaluru , Karnataka</p>
                        <p className="text-gray-400">Email: ramesh@totfd.com</p>
                        <p className="text-gray-400">Phone: 000000-00000</p>
                    </div>
                    
                    {/* Social Media Links */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" className="text-gray-400 hover:text-white">
                                <FaFacebook size={24} />
                            </a>
                            <a href="https://twitter.com" className="text-gray-400 hover:text-white">
                                <FaTwitter size={24} />
                            </a>
                            <a href="https://instagram.com" className="text-gray-400 hover:text-white">
                                <FaInstagram size={24} />
                            </a>
                            <a href="https://linkedin.com" className="text-gray-400 hover:text-white">
                                <FaLinkedin size={24} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500">
                    <p>&copy; 2024 Company Name. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
