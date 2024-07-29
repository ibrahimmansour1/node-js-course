const express = require('express');
const app = express();
const mongoose = require('mongoose')
const url = "mongodb+srv://ibrahimjsdev:nodejs_123@cluster0.utn2w9i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(url).then(() => {
    console.log('MongoDB server Started')
});
app.listen(4000, () => {
    console.log('listening on port: 4000');
});

