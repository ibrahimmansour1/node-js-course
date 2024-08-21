require('dotenv').config()
const express = require('express');
const cors = require('cors')
const app = express();
const path = require('node:path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const mongoose = require('mongoose')
const httpStatusText = require('./utils/httpStatusText.js')
console.log('process', process.env.MY_NAME);
const url = process.env.MONGO_URL;
mongoose.connect(url).then(() => {
    console.log('MongoDB server Started')
});
app.use(cors())
app.use(express.json())
const coursesRouter = require("./routes/courses.route.js")
const usersRouter = require("./routes/users.route")
app.use('/api/courses', coursesRouter)
app.use('/api/users', usersRouter)
app.all('*', (req, res, next) => {
    res.status(404).json({ status: httpStatusText.ERROR, message: "Route not found" });
})

app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({ status: error.statusText || httpStatusText.ERROR, message: error.message, code: error.statusCode || 500, data: null });
})

app.listen(process.env.PORT || 4000, () => {
    console.log('listening on port: 4000');
});

