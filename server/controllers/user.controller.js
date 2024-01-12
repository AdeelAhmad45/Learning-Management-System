import User from "../models/user.model.js";
import AppError from "../utils/error.util.js";

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

export {
    register,
    login,
    logout,
    getProfile
}