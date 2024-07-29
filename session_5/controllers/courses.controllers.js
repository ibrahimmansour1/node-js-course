const { validationResult } = require("express-validator")
const Course = require('../models/course.model');
const httpStatusText = require('../utils/httpStatusText.js')
const getAllCourses = async (req, res) => {
    // get all courses from db using course model
    const courses = await Course.find();
    res.json({ status: httpStatusText.SUCCESS, data: { courses } })
}

const getCourse = async (req, res) => {
    try {
        console.log("req.param", req.params.courseID)
        const course = await Course.findById(req.params.courseID)
        if (!course) {
            return res.status(404).json({ status: httpStatusText.FAIL, data: { course: "Course not found" } });
        }
        res.json({ status: httpStatusText.SUCCESS, data: { course } })
    } catch (error) {
        return res.status(400).json({ status: httpStatusText.ERROR, data: null, message: "Invalid Object Id", code: 400, });
    }
}

const createCourse = async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    console.log("errors", errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: httpStatusText.FAIL, data: errors.array() })

    }
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(201).json({ status: httpStatusText.SUCCESS, data: { course: newCourse } });
}

const updateCourse = async (req, res) => {
    const courseID = req.params.courseID;
    try {
        const updatedCourse = await Course.updateOne({ _id: courseID }, { $set: { ...req.body } });
        res.status(200).json(updatedCourse);
    } catch (error) {
        return res.status(400).json({ error: error });
    }
}

const deleteCourse = async (req, res) => {
    const courseID = req.params.courseID;
    const course = await Course.deleteOne({ _id: courseID });
    res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
}

module.exports = {
    getAllCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse
}