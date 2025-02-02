import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMyBlogs, deleteBlog } from '../store/slices/blogSlice';
import { PlusCircle, Calendar, ThumbsUp, MessageCircle, Share, XCircle, Edit } from 'lucide-react';

const MyBlogs = () => {
  const dispatch = useDispatch();
  const { userBlogs, isLoading } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getMyBlogs());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
        await dispatch(deleteBlog(id));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">Loading your blogs...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between px-20 items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Blogs</h1>
          <Link
            to="/blogs/create"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Create New Blog
          </Link>
        </div>

        {userBlogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">You haven't created any blogs yet.</p>
            <Link
              to="/blogs/create"
              className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-500"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Create your first blog
            </Link>
          </div>
        ) : ( 
          <div className="mt-12 px-4 sm:px-6 md:px-8 lg:px-12 max-w-2xl mx-auto flex flex-col gap-8">
            {userBlogs.map((blog, index) => (
              <article key={index} className="bg-white rounded-lg shadow-lg overflow-hidden p-4 relative">
                
                {/* Edit & Delete Buttons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  {/* Edit Button */}
                  <button 
                    className="text-gray-500 hover:text-blue-600"
                    onClick={() => handleEdit(blog._id)}
                  >
                    <Edit className="h-9 w-9 pt-2" />
                  </button>

                  {/* Delete Button */}
                  <button 
                    className="text-gray-500 hover:text-red-600"
                    onClick={() => handleDelete(blog._id)}
                  >
                    <XCircle className="h-9 w-9 pt-2" />
                  </button>
                </div>

                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={blog.userData.avatar || "/default-profile.png"}
                    alt={blog.userData.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{blog.userData.name}</h3>
                    {/* Date & Category Section */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      {/* Date */}
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{new Date(blog.createdAt).toLocaleDateString('en-GB')}</span>
                      </div>
                      {/* Category (appears below date on small screens) */}
                      <div className="flex flex-wrap gap-1 text-xs text-blue-600 font-medium">
                        {blog.category.map((category, index) => (
                          <span key={index}>{category}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <h2 className="text-lg font-semibold text-gray-900 mb-1">{blog.title}</h2>
                <p className="text-gray-600 text-sm mb-2">{blog.description}</p>

                <img src={blog.image} alt={blog.title} className="w-full h-auto rounded-lg mt-2" />

                <div className="mt-3 flex items-center justify-between text-gray-500 text-sm">
                  <button className="flex items-center gap-1 hover:text-blue-600">
                    <ThumbsUp className="h-4 w-4" />
                    <span>Like</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-blue-600">
                    <MessageCircle className="h-4 w-4" />
                    <span>Comment</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-blue-600">
                    <Share className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                </div>
              </article>
            ))}
          </div>

        

        )} 
      </div>
    </div>
  );
};

export default MyBlogs;