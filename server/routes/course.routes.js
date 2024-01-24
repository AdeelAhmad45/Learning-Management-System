import { Router } from "express";
import { addLectureToCourseById, createCourse, getAllCourses, getLecturesByCourseId, removeCourse, updateCourse } from "../controllers/course.controller.js";
import { authorizedSubscriber, autorizedRoles, isLoggedIn } from "../middlewares/auth.middleware.js";
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
    .get(isLoggedIn, authorizedSubscriber, getLecturesByCourseId)
    .put(
        isLoggedIn, 
        autorizedRoles('ADMIN'),
        updateCourse
        )
    .delete(
        isLoggedIn, 
        autorizedRoles('ADMIN'),
        removeCourse
        )
        .post(
            isLoggedIn, 
            autorizedRoles('ADMIN'),
            upload.single('lecture'),
            addLectureToCourseById
        );

export default router;