const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: {type: Array, required: true},
    userId: {type: String, required: true},
    userData: { type: Object, required: true }
}, { timestamps: true });
module.exports = mongoose.model('Blog', blogSchema);