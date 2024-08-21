const { default: mongoose } = require("mongoose");

const courseScheme = new mongoose.Schema({
    
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Course', courseScheme);