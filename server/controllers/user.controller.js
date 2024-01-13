import User from "../models/user.model.js";
import AppError from "../utils/error.util.js";
import cloudinary from 'cloudinary';
import fs from 'fs/promises';
import sendEmail from "../utils/sendEmail.js";

const cookieOption = {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    secure: true
}

const register = async(req, res, next) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return next(new AppError("All field are required", 400));
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
        return next(new AppError("Email already existed", 400));
    }

    const user = await User.create({
        fullName,
        email,
        password,
        avatar: {
            public_id: email,
            secure_url: 'https://cloudinary-marketing-res.cloudinary.com/images/w_1000,c_scale/v1679921049/Image_URL_Example/Image_URL_Example-png?_i=AA'
        }
    });

    if (!user) {
        return next(new AppError("User registration failed, Please try again", 400));
    }

    // Todo file upload
    if (req.file) {
        console.log(req.file);
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'lms',
                width: 250,
                height: 250,
                gravity: 'face',
                crop: 'fill'
            })

            if (result) {
                user.avatar.public_id = result.public_id;
                user.avatar.secure_url = result.secure_url;
            }

            // Remove file from server
            fs.rm(`uploads/${req.file.filename}`)
            
        } catch (error) {
            return next(new AppError(error || 'File does not upload, please try again', 500))
        }
    }

    await user.save()

    user.password = undefined;

    const token = await user.generateJWTToken();
    res.cookie('token', token, cookieOption)

    return res.status(201).json({
        success: true,
        message: "User registered successfully",
        user 
    })
}

const login = async(req, res, next) => {
   try {
     const { email, password } = req.body;
 
     if (!email || !password) {
         return next(new AppError("All fields are required", 400));
     }
 
     const user = await User.findOne({ email }).select("+password")
     console.log(user);
 
     if (!user || !user.comparePassword(password)) {
         return next(new AppError("Email or password does not match", 400))
     }
 
     const token = await user.generateJWTToken();
 
     user.password = undefined;
 
     res.cookie('token', token, cookieOption)
 
     res.status(200).json({
         success: true,
         message: "User logged in successfully",
         user 
     })
   } catch (error) {
    return next(new AppError(error.message, 400))
    
   }

}

const logout = async(req, res) => {
    res.cookie('token', null, {
        secure: true,
        maxAge: 0,
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: "User logged out successfully"
    })
}

const getProfile = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
    
        res.status(200).json({
            success: true,
            message: "User details",
            user
        })
    } catch (error) {
        return next(new AppError("Failed to fetch profile", 500))
        
    }
}

const forgotPassword = async(req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return next(new AppError("Email is required", 400))
    }

    const user = await User.findOne({ email });

    if (!user) {
        return next(new AppError("Email not registered", 400)) 
    }
    
    const resetToken = await user.generatePasswordResetToken();

    await user.save();

    const resetPasswordURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const subject = 'Reset Password'
    const message = `You can reset your password by clicking <a href=${resetPasswordURL} target="_blank">Reset your password</a>\nIf the above link does not work for some reason then copy paste this link in new tab${resetPasswordURL}.\n If you have not requested this, kindly ignore.`;

    try {
        await sendEmail(email, subject, message);

        res.status(200).json({
            success: true,
            message: `Reset password token has been sent to ${email} successfully`
        })
    } catch (error) {
        user.forgotPasswordExpiry = undefined;
        user.forgotPasswordToken = undefined;
        await user.save();
        
        return next(new AppError(error.message, 500))
    }


}

export {
    register,
    login,
    logout,
    getProfile,
    forgotPassword
}