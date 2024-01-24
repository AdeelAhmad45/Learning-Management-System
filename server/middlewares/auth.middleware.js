import AppError from "../utils/error.util.js";
import jwt from "jsonwebtoken";

const isLoggedIn = (req, res, next) => {
    const { token } = req.cookies;
    
    if (!token) {
        return next(new AppError('Unauthenticated, please login again', 401))
    }

    const userDetails = jwt.verify(token, process.env.JWT_SECRET);

    req.user = userDetails;
    next();
}

const autorizedRoles = (...roles) => async(req, res, next) => {
    const currentUserRoles = req.user.role;
    if (!roles.includes(currentUserRoles)) {
        return next(
            new AppError("You dont have to permission to access this route", 403)
        )
    }
    next();
}

const authorizedSubscriber = async(req, res, next) => {
    const subscription = req.user.subscription;
    const currentUserRoles = req.user.role;

    if (currentUserRoles !== "ADMIN" && subscription.status !== "active") {
        return next(
            new AppError("Please subscribe access this route!", 403)
        )
    }

    next();
}

export {
    isLoggedIn,
    autorizedRoles,
    authorizedSubscriber
}