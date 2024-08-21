const asyncWrapper = require("../middlewares/asyncWrapper")
const User = require('../models/user.model');
const appError = require("../utils/appError");
const httpStatusText = require('../utils/httpStatusText')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const generateJWT = require('../utils/generateJWT')

const getAllUsers = asyncWrapper(async (req, res, next) => {
    console.log(req.headers);
    const query = req.query;
    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit
    // get all courses from db using course model
    const users = await User.find({}, { "__v": false, password: false }).limit(limit).skip(skip);
    res.json({ status: httpStatusText.SUCCESS, data: { users } })
});
const register = asyncWrapper(async (req, res, next) => {
    const { firstName, lastName, email, password, role } = req.body;
    console.log("req.file -#####>", req.file);


    const oldUser = await User.findOne({ email: email })
    if (oldUser) {
        const error = appError.create('User already exists', 400, httpStatusText.FAIL)
        return next(error)
    }

    // password hashing
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("before new user");

    const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
        avatar: req.file.fileName
    })
    console.log("after new user");

    // generate jwt token
    const token = await generateJWT({ email: newUser.email, id: newUser._id, role: newUser.role })
    console.log("token", token);
    newUser.token = token;
    await newUser.save();
    res.status(201).json({ status: httpStatusText.SUCCESS, data: { user: newUser } })
})

const login = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email && !password) {
        const error = appError.create('Please provide email and password', 400, httpStatusText.FAIL)
        return next(error)
    }

    const user = await User.findOne({ email: email })
    if (!user) {
        const error = appError.create('User not found', 400, httpStatusText.FAIL)
        return next(error)
    }
    const matchedPassword = await bcrypt.compare(password, user.password);

    if (user && matchedPassword) {
        // logged in successfully
        const token = await generateJWT({ email: user.email, id: user._id, role: user.role })
        return res.json({ status: httpStatusText.SUCCESS, data: { token } });
    } else {
        const error = appError.create('Something wrong', 500, httpStatusText.FAIL)
        return next(error)
    }
})

module.exports = {
    getAllUsers,
    register,
    login
}