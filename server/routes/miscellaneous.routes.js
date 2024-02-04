import { Router } from "express";
import { contactUs, userStats } from "../controllers/miscellaneous.controller.js";
import { isLoggedIn, autorizedRoles } from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/contact').post(contactUs);

router
  .route('/admin/stats/users')
  .get(isLoggedIn, autorizedRoles('ADMIN'), userStats);

export default router;