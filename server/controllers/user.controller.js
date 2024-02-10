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

const resetPassword = async(req, res, next) => {
    // Extracting resetToken from req.params object
    const { resetToken } = req.params;
  
    // Extracting password from req.body object
    const { password } = req.body;
  
    // We are again hashing the resetToken using sha256 since we have stored our resetToken in DB using the same algorithm
    const forgotPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
  
    // Check if password is not there then send response saying password is required
    if (!password) {
      return next(new AppError('Password is required', 400));
    }
  
    console.log(forgotPasswordToken);
  
    // Checking if token matches in DB and if it is still valid(Not expired)
    const user = await User.findOne({
      forgotPasswordToken,
      forgotPasswordExpiry: { $gt: Date.now() }, // $gt will help us check for greater than value, with this we can check if token is valid or expired
    });
  
    // If not found or expired send the response
    if (!user) {
      return next(
        new AppError('Token is invalid or expired, please try again', 400)
      );
    }
  
    // Update the password if token is valid and not expired
    user.password = password;
  
    // making forgotPassword* valus undefined in the DB
    user.forgotPasswordExpiry = undefined;
    user.forgotPasswordToken = undefined;
  
    // Saving the updated user values
    await user.save();
  
    // Sending the response when everything goes good
    res.status(200).json({
      success: true,
      message: 'Password changed successfully',
    });
}

const changePassword = async(req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    const { id } = req.user;

    if (!oldPassword || !newPassword) {
        return next(new AppError("Every fields are required"));
    }

    const user = User.findById(id).select('+password');

    if (!user) {
        return next(
            new AppError("User does not exist", 400)
        )
    }

    const isPasswordValid = await user.comparePassword(oldPassword);

    if (!isPasswordValid) {
        return next(
            new AppError("old password is invalid", 400)
        )
    }

    user.password = newPassword;

    await user.save();

    user.password = undefined;

    res.status(200).json({
        success: true,
        message: 'Password changed successfully'
    })
}

const updateUser = async(req, res, next) => {
    const { fullName } = req.body;
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
        return next(
            new AppError("User does not exist", 400)
        )
    }

    if(fullName){
        user.fullName = fullName;
    }

    if (req.file) {
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);
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

    await user.save();

    res.status(200).json({
        success: true,
        message: "User updated successfully"
    })
}

export {
    register,
    login,
    logout,
    getProfile,
    forgotPassword,
    resetPassword,
    changePassword,
    updateUser
}