const express = require("express");
const router = express.Router();
const coursesController = require('../controllers/courses.controllers');
const validationSchema = require("../middlewares/validationSchema");
const verifyToken = require("../middlewares/verifyToken");
const userRoles = require("../utils/userRoles");
const allowedTo = require("../middlewares/allowedTo")
router.route('/').get(coursesController.getAllCourses).post(verifyToken, allowedTo(userRoles.MANGER), validationSchema(), coursesController.createCourse)
router.route('/:courseID').get(coursesController.getCourse)
    .patch(coursesController.updateCourse).delete(verifyToken, allowedTo(userRoles.ADMIN, userRoles.MANGER), coursesController.deleteCourse)

module.exports = router;