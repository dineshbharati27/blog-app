import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getAllBlogs } from "../store/slices/blogSlice";
import { Calendar, User, ThumbsUp, MessageCircle, Share } from "lucide-react";

const BlogList = () => {
  const dispatch = useDispatch();
  const { blogs, isLoading } = useSelector((state) => state.blog);
  const useQuery = () => new URLSearchParams(useLocation().search);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5;

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">Loading blogs...</div>
      </div>
    );
  }
  
  const query = useQuery().get("search") || "";

  // Filter blogs based on the search query
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(query.toLowerCase()) ||
    blog.description.toLowerCase().includes(query.toLowerCase()) ||
    blog.category.some((category) =>
      category.toLowerCase().includes(query.toLowerCase())
    ) ||
    blog.userData.name.toLowerCase().includes(query.toLowerCase())
  );


  // Calculate indexes for pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">All Blogs</h1>
          <p className="mt-3 text-xl text-gray-500">Discover amazing stories and insights</p>
        </div>

        <div className="mt-10 px-4 sm:px-6 md:px-8 lg:px-12 max-w-2xl mx-auto flex flex-col gap-8">
          {currentBlogs.map((blog, index) => (
            <article key={index} className="bg-white rounded-lg shadow-lg overflow-hidden p-4">
              {/* User Info */}
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={blog.userData.avatar || "/default-profile.png"} // Replace with actual profile image source
                  alt={blog.userData.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{blog.userData.name}</h3>
                  <div className="text-xs text-gray-500 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{new Date(blog.createdAt).toLocaleDateString('en-GB')}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {blog.category.map((category, index) => (
                        <span key={index} className="text-blue-600 font-medium">
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Blog Content */}
              <h2 className="text-lg font-semibold text-gray-900 mb-1">{blog.title}</h2>
              <p className="text-gray-600 text-sm mb-2">{blog.description}</p>

              {/* Blog Image */}
              <img src={blog.image} alt={blog.title} className="w-full h-auto rounded-lg mt-2" />

              {/* Action Buttons */}
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


        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center space-x-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2">{currentPage} / {totalPages}</span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
