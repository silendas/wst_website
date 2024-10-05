import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FiLogOut } from 'react-icons/fi';

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-200 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <ul className="flex space-x-4">
          <li>
            <Link
              to="/courses"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/courses' ? 'bg-blue-200 text-black' : 'text-gray-600 hover:bg-gray-300'
              }`}
              style={{ display: 'block', border: '1px solid transparent', borderRadius: '4px' }}
            >
              Courses
            </Link>
          </li>
          <li>
            <Link
              to="/lecturer"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/lecturer' ? 'bg-blue-200 text-black' : 'text-gray-600 hover:bg-gray-300'
              }`}
              style={{ display: 'block', border: '1px solid transparent', borderRadius: '4px' }}
            >
              Lecturers
            </Link>
          </li>
          <li>
            <Link
              to="/students"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/students' ? 'bg-blue-200 text-black' : 'text-gray-600 hover:bg-gray-300'
              }`}
              style={{ display: 'block', border: '1px solid transparent', borderRadius: '4px' }}
            >
              Students
            </Link>
          </li>
          <li>
            <Link
              to="/rooms"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/rooms' ? 'bg-blue-200 text-black' : 'text-gray-600 hover:bg-gray-300'
              }`}
              style={{ display: 'block', border: '1px solid transparent', borderRadius: '4px' }}
            >
              Rooms
            </Link>
          </li>
        </ul>
        <button
          onClick={handleLogout}
          className="text-gray-600 hover:bg-gray-300 px-3 py-2 rounded-md text-sm font-medium flex items-center"
          style={{ border: '1px solid transparent', borderRadius: '4px' }}
        >
          <FiLogOut className="mr-2" />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;