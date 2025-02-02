import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../store/slices/authSlice';
import { Home, BookOpen, PenSquare, User, LogOut } from 'lucide-react';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center px-2 py-2 text-gray-700 hover:text-gray-900">
              <Home className="h-5 w-5 mr-1" />
              <span className="font-medium">Home</span>
            </Link>
            <Link to="/blogs" className="flex items-center px-2 py-2 text-gray-700 hover:text-gray-900">
              <BookOpen className="h-5 w-5 mr-1" />
              <span className="font-medium">All Blogs</span>
            </Link>
            {user && (
              <>
                <Link to="/blogs/my" className="flex items-center px-2 py-2 text-gray-700 hover:text-gray-900">
                  <PenSquare className="h-5 w-5 mr-1" />
                  <span className="font-medium">My Blogs</span>
                </Link>
                <Link to="/profile" className="flex items-center px-2 py-2 text-gray-700 hover:text-gray-900">
                  <User className="h-5 w-5 mr-1" />
                  <span className="font-medium">Profile</span>
                </Link>
              </>
            )}
          </div>
          <div className="flex items-center">
            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                <LogOut className="h-5 w-5 mr-1" />
                <span className="font-medium">Logout</span>
              </button>
            ) : (
              <div className="flex items-center">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;