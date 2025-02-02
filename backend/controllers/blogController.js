const Blog = require('../models/Blog');
const User = require('../models/User')


exports.createBlog = async (req, res) => {
    try {
        // Check if the image file is present
        if (!req.file) {
            return res.status(400).json({ message: 'Image is required' });
        }
        const { title, description, category } = req.body;
        const userId = req.userId;
        if(!userId || !title || !description || !category){
            return res.json({ success: false, message: "Missing Details"})
        }

        const image = req.file.path;

        const userData = await User.findById(userId).select("-password")
        
        const blog = new Blog({
            title,
            description,
            image,
            category,
            userData,
            userId,
        });
        await blog.save();
        res.json({success: true, blog});
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
};

exports.getUserBlogs = async (req, res) => {
    try {
        const userId = req.userId;
        const blogs = await Blog.find({ userId: userId }).sort({ createdAt: -1 })
        res.json({success: true, blogs});
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
    
};

exports.deleteBlog = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.userId;
        const blog = await Blog.findOne({ _id: id, userId: userId });

        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found or unauthorized" });
        }

        await Blog.deleteOne({ _id: id });
        res.json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};



exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({ createdAt: -1 });
        if (!blogs.length) {
            return res.status(404).json({ success: false, message: "No blogs found" });
        }
        res.json({success: true, blogs});
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
};