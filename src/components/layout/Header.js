import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-100 shadow-md">
      <div className="container mx-auto px-4 py-3 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Library</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
            </li>
            <li>
              <Link to="/employee" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
                Employee
              </Link>
            </li>
            <li>
              <Link to="/books" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
                Books
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
