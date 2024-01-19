import Course from "../models/course.model.js";
import AppError from "../utils/error.util.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";

const getAllCourses = async(req, res, next) => {
    try {
        const courses = await Course.find({}).select('-lecture')
    
        res.status(200).json({
            success: true,
            message: 'All courses',
            courses
        })
    } catch (e) {
      return next(
        new AppError(e.message, 500)
      )  
    }
}

const getLecturesByCourseId = async(req, res, next) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id);

        if (!course) {
            return next(
                new AppError("Invalid course Id", 400)
              ) 
        }

        res.status(200).json({
            success: true,
            message: 'Course lectures fetch successfully',
            lecture: course.lecture
        })
    } catch (e) {
        return next(
            new AppError(e.message, 500)
          )  
    }
}

const createCourse = async(req, res, next) => {
    const { title, description, category, createdBy } = req.body;

    if (!title || !description || !category || !createdBy) {
        return next(
            new AppError("Every fields are required", 400)
        )
    }

    const course = await Course.create({
        title,
        description,
        category,
        createdBy,
        thumbnail: {
            public_id: 'Dummy',
            secure_url: 'Dummy'
        }
    });

    if (!course) {
        return next(
            new AppError("Course could not created, please try again", 500)
        )
    }

    if (req.file) {
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'lms'
            });
    
            if (result) {
                course.thumbnail.public_id = result.public_id;
                course.thumbnail.secure_url = result.secure_url;
            }
    
            fs.rm(`uploads/${req.file.filename}`);
        } catch (error) {
            return next(
                new AppError(error.message, 500)
            )
        }
    }

    await course.save();

    res.status(200).json({
        success: true,
        message: "Course created successfully",
        course
    })
}

export {
    getAllCourses,
    getLecturesByCourseId,
    createCourse
}