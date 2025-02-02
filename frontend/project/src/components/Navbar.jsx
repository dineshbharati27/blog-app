import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { Home, Search, BookOpen, PenSquare, User, LogOut, Menu } from 'lucide-react';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleSearch = (e) => {
    navigate(`/?search=${encodeURIComponent(e.target.value)}`);
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Left Side: Logo & Search */}
          <div className="flex gap-2">
            <Link to="/" className="flex items-center px-2 py-2 text-gray-700 hover:text-gray-900">
              <Home className="h-5 w-5 mr-1" />
              <span className="font-medium">Home</span>
            </Link>
            {/* Search Bar (Hidden on Small Screens) */}
            <div className="relative hidden md:flex items-center">
              <Search className="absolute left-3 text-gray-500 w-5 h-5" />
              <input
                type="text"
                onChange={handleSearch}
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
            </div>
          </div>

          {/* Right Side: User Links & Menu Button */}
          <div className="flex items-center">
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-700 hover:text-gray-900 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
              {user ? (
                <>
                  <Link to="/profile" className="flex items-center px-2 py-2 text-gray-700 hover:text-gray-900">
                    <User className="h-5 w-5 mr-1" />
                    <span className="font-medium">Profile</span>
                  </Link>
                  <Link to="/blogs/my" className="flex items-center px-2 py-2 text-gray-700 hover:text-gray-900">
                    <PenSquare className="h-5 w-5 mr-1" />
                    <span className="font-medium">My Blogs</span>
                  </Link>
                  <button onClick={handleLogout} className="flex items-center px-4 py-2 text-gray-700 hover:text-gray-900">
                    <LogOut className="h-5 w-5 mr-1" />
                    <span className="font-medium">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium">
                    Login
                  </Link>
                  <Link to="/register" className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col gap-2 py-4">
            <div className="relative flex items-center px-4">
              <Search className="absolute left-6 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
            </div>
            {user ? (
              <>
                <Link to="/profile" className="px-4 py-2 text-gray-700 hover:text-gray-900">
                  Profile
                </Link>
                <Link to="/blogs/my" className="px-4 py-2 text-gray-700 hover:text-gray-900">
                  My Blogs
                </Link>
                <button onClick={handleLogout} className="px-4 py-2 text-gray-700 hover:text-gray-900">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-gray-700 hover:text-gray-900">
                  Login
                </Link>
                <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;