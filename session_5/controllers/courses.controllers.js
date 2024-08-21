const { validationResult } = require("express-validator")
const Course = require('../models/course.model');
const httpStatusText = require('../utils/httpStatusText.js');
const asyncWrapper = require("../middlewares/asyncWrapper.js");
const appError = require("../utils/appError.js")
const mongoose = require('mongoose')

const getAllCourses = asyncWrapper(async (req, res, next) => {
    const query = req.query;
    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit
    // get all courses from db using course model
    const courses = await Course.find({}, { "__v": false }).limit(limit).skip(skip);
    res.json({ status: httpStatusText.SUCCESS, data: { courses } })
});

const getCourse =
    asyncWrapper(
        async (req, res, next) => {
            const courseID = req.params.courseID;
            if (!mongoose.Types.ObjectId.isValid(courseID)) {
                const error = appError.create('Invalid course ID', 400, httpStatusText.FAIL);
                return next(error);
            }
            const course = await Course.findById(req.params.courseID);
            if (!course) {
                const error = appError.create('Course not found', 404, httpStatusText.FAIL);
                return next(error);
            }
            res.json({ status: httpStatusText.SUCCESS, data: { course } })
        }
    )


const createCourse = asyncWrapper(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = appError.create(errors.array(), 400, httpStatusText.FAIL)
        return next(error)

    }
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(201).json({ status: httpStatusText.SUCCESS, data: { course: newCourse } });
})

const updateCourse = asyncWrapper(async (req, res, next) => {
    const courseID = req.params.courseID;
    if (!mongoose.Types.ObjectId.isValid(courseID)) {
        const error = appError.create('Invalid course ID', 400, httpStatusText.FAIL);
        return next(error);
    }
    const updatedCourse = await Course.updateOne({ _id: courseID }, { $set: { ...req.body } });
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { course: updatedCourse } });
})

const deleteCourse = asyncWrapper(async (req, res, next) => {
    const courseID = req.params.courseID;
    if (!mongoose.Types.ObjectId.isValid(courseID)) {
        const error = appError.create('Invalid course ID', 400, httpStatusText.FAIL);
        return next(error);
    }
    await Course.deleteOne({ _id: req.params.courseID });
    res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
})

module.exports = {
    getAllCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse
}