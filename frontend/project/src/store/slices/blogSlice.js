import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { blogs } from '../../services/api';
import toast from 'react-hot-toast';

const initialState = {
  blogs: [],
  userBlogs: [],
  isLoading: false,
  error: null,
};

export const getAllBlogs = createAsyncThunk(
  'blog/All',
  async (_, { rejectWithValue }) => {
    try {
      const response = await blogs.getAll();
      if (response.data.success) {
        return response.data.blogs
      } else {
       toast.error("error in the server to fetch blogs") 
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getMyBlogs = createAsyncThunk(
  'blog/getMyBlogs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await blogs.getMyBlogs();
      return response.data.blogs;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const createBlog = createAsyncThunk(
  'blog/create',
  async ({ title, description, category, image }, { rejectWithValue }) => {
    try {
      category = category.split(",");
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('image', image);
      const response = await blogs.create(formData);
      if(response.data.success){
        toast.success('Blog created successfully!');
      } else {
        toast.error(response.message)
      }
      return response.data.blogs;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create blog');
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  'blog/delete',
  async (id, { rejectWithValue }) => {
    try {
      await blogs.delete(id);
      toast.success('Blog deleted successfully!');
      return id;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete blog');
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogs = action.payload;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getMyBlogs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMyBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userBlogs = action.payload;
      })
      .addCase(getMyBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createBlog.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.userBlogs = [...state.userBlogs, action.payload];
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteBlog.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userBlogs = state.userBlogs.filter(blog => blog._id !== action.payload);
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default blogSlice.reducer;
