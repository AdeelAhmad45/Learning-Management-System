import { Router } from "express";
import { createCourse, getAllCourses, getLecturesByCourseId, removeCourse, updateCourse } from "../controllers/course.controller.js";
import { autorizedRoles, isLoggedIn } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

router.route('/')
    .get(getAllCourses)
    .post(
        isLoggedIn, 
        autorizedRoles('ADMIN'),
        upload.single('thumbnail'), 
        createCourse
        );

router.route('/:id')
    .get(isLoggedIn, getLecturesByCourseId)
    .put(
        isLoggedIn, 
        autorizedRoles('ADMIN'),
        updateCourse
        )
    .delete(
        isLoggedIn, 
        autorizedRoles('ADMIN'),
        removeCourse
        );

export default router;