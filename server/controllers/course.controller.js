import Course from "../models/course.model.js";
import AppError from "../utils/error.util.js";

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

export {
    getAllCourses,
    getLecturesByCourseId
}