import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaDownload } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinkStyles = "text-neutral hover:text-primary transition duration-300";
  const activeStyle = "text-primary";

  return (
    <nav className="bg-base-100 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center">
                <img src="../logos/logo2.png" alt="logo" className="w-20 h-20" />
                <span className='text-primary font-bold text-2xl'>AMC Connect</span>
          </NavLink>




          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive ? activeStyle : navLinkStyles
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/about"
              className={({ isActive }) => 
                isActive ? activeStyle : navLinkStyles
              }
            >
              About
            </NavLink>
            <NavLink 
              to="/contact"
              className={({ isActive }) => 
                isActive ? activeStyle : navLinkStyles
              }
            >
              Contact
            </NavLink>
            <NavLink 
              to="/download" 
              className="bg-primary text-base-100 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-secondary transition duration-300"
            >
              <FaDownload className="text-sm" />
              <span>Download App</span>
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-neutral hover:text-primary focus:outline-none"
            >
              {isOpen ? (
                <HiX className="h-6 w-6" />
              ) : (
                <HiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <NavLink
                to="/"
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md ${isActive ? 'text-primary bg-gray-100' : 'text-neutral hover:text-primary hover:bg-gray-100'}`
                }
                onClick={toggleMenu}
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md ${isActive ? 'text-primary bg-gray-100' : 'text-neutral hover:text-primary hover:bg-gray-100'}`
                }
                onClick={toggleMenu}
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md ${isActive ? 'text-primary bg-gray-100' : 'text-neutral hover:text-primary hover:bg-gray-100'}`
                }
                onClick={toggleMenu}
              >
                Contact
              </NavLink>
              <NavLink
                to="/download"
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md ${isActive ? 'text-primary bg-gray-100' : 'text-neutral hover:text-primary hover:bg-gray-100'}`
                }
                onClick={toggleMenu}
              >
                Download App
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
