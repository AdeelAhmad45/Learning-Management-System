import { Router } from "express";
import { autorizedRoles, isLoggedIn } from "../middlewares/auth.middleware.js";
import { buySubscription, getRazorpayApiKey } from "../controllers/payment.controller.js";

const router = Router();

router
    .route('/razorpay-key')
    .get(
        isLoggedIn,
        getRazorpayApiKey
    );

router
    .route('/subscribe')    
    .post(
        isLoggedIn,
        buySubscription
    );

export default router;