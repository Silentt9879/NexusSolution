// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom'; 
import { HashLink } from 'react-router-hash-link';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'; 
import { ThemeToggle } from './ThemeToggle'; 

function Navbar() {
  return (
    <header className="bg-white shadow-sm relative dark:bg-gray-800 
                       border-b border-gray-100 dark:border-gray-700
                       transition-colors duration-300 ease-in-out"> 
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          Nexus Solutions
        </Link>

        {/* --- Desktop Navigation --- */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium">Home</Link>
          <Link to="/services" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium">
            Services
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium">About Us</Link>
          
          <Link to="/blog" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium">Blog</Link>

          <HashLink smooth to="/#contact" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium">
            Contact
          </HashLink>
          <HashLink 
            smooth 
            to="/#contact" 
            className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
          >
            Get Started
          </HashLink>

          <ThemeToggle />
        </div>
        {/* --- End Desktop Navigation --- */}


        {/* --- RADIX MOBILE MENU --- */}
        <div className="md:hidden flex items-center">
          <ThemeToggle />
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="text-gray-800 dark:text-gray-200 text-3xl focus:outline-none ml-3">
                ☰
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content
  className="
    absolute right-0 mt-2 w-48 z-[9999]
    bg-white shadow-md rounded-md
    dark:bg-gray-800 dark:border-gray-700
    border border-gray-200
    data-[side=top]:animate-slideDownAndFade
    data-[side=bottom]:animate-slideUpAndFade
  "
>

              <DropdownMenu.Item asChild>
                <Link to="/" className="block px-6 py-3 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 cursor-pointer outline-none">
                  Home
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <Link to="/services" className="block px-6 py-3 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 cursor-pointer outline-none">
                  Services
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <Link to="/about" className="block px-6 py-3 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 cursor-pointer outline-none">
                  About Us
                </Link>
              </DropdownMenu.Item>
              
              <DropdownMenu.Item asChild>
                <Link to="/blog" className="block px-6 py-3 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 cursor-pointer outline-none">
                  Blog
                </Link>
              </DropdownMenu.Item>

              <DropdownMenu.Item asChild>
                <HashLink smooth to="/#contact" className="block px-6 py-3 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 cursor-pointer outline-none">
                  Contact
                </HashLink>
              </DropdownMenu.Item>
              
              <DropdownMenu.Separator className="h-px bg-gray-200 dark:bg-gray-600" />
              
              <DropdownMenu.Item asChild>
                <HashLink 
                  smooth 
                  to="/#contact" 
                  className="block px-6 py-4 bg-blue-600 text-white text-center font-medium 
                             hover:bg-blue-700 cursor-pointer outline-none"
                >
                  Get Started
                </HashLink>
              </DropdownMenu.Item>

            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
        {/* --- END RADIX MOBILE MENU --- */}

      </nav>
    </header>
  );
}

export default Navbar;