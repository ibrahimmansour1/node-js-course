const express = require("express");
const router = express.Router();
const coursesController = require('../controllers/courses.controllers');
const validationSchema = require("../middlewares/validationSchema");

router.route('/').get(coursesController.getAllCourses).post(validationSchema(), coursesController.createCourse)
router.route('/:courseID').get(coursesController.getCourse)
    .patch(coursesController.updateCourse).delete(coursesController.deleteCourse)

module.exports = router;