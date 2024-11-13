import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="w-full bg-gray-800 text-white py-4 flex justify-between items-center px-6">
            {/* About Us Link */}
            <div>
                <Link to="/about" className="text-white hover:text-gray-400">
                    About Us
                </Link>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
                    <FontAwesomeIcon icon={faFacebook} size="lg" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
                    <FontAwesomeIcon icon={faTwitter} size="lg" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
                    <FontAwesomeIcon icon={faInstagram} size="lg" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
                    <FontAwesomeIcon icon={faLinkedin} size="lg" />
                </a>
            </div>
        </footer>
    );
};

export default Footer;