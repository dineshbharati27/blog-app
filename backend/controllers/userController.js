const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const validator = require('validator')


const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, bio } = req.body;
        let avatar = '';
        // if (req.file) {
        //     const result = await cloudinary.uploader.upload_stream({ folder: 'avatars' }, (error, result) => {
        //         if (error) return res.status(500).json({ message: 'Cloudinary upload failed' });
        //         avatar = result.secure_url;
        //     }).end(req.file.buffer);
        // }

        const exists = await User.findOne({email});
        if(exists){
            return res.json({success: false, message: "user already exists."})
        }
    
        //validating email format and strong password
        if(!validator.isEmail(email)){
            return res.json({success: false, message: "Please enter the valid email."})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, avatar, bio });
        await user.save();
        res.json({sucess: true, message: 'User registered successfully' });
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
};

exports.loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        
        const user = await User.findOne({email})

        if (!user) {
            return res.json({success: false, message: "user does not exists."})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = createToken(user._id);
            res.json({
                success: true, 
                user: { 
                        id: user._id, 
                        name: user.name, 
                        email: user.email 
                    },  
                token
            })
        } else {
            res.json({success: false, message: "invalid credentials"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
};


exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({ success: false, message: 'User ID is required' });
        }
        const profileData = await User.findById(userId).select('-password');
        res.json({ success: true, profileData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
};
