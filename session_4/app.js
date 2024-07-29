const express = require('express');
const morgan = require('morgan')
const app = express();
// app.use(express.static('./views'))
function logger(req) {
}
app.use('/about', (req, res, next) => {
    console.log("METHOD", req.method, "URL", req.url);
    next();
})
app.get('/', (req, res) => {
    res.send("Welcome from exress");
});
app.use(morgan('dev'))
app.get('/about', (req, res) => {
    res.send("About page")
})
app.get('/products', (req, res) => {
    res.send([
        {
            id: 1, title: 'Bag',
            price: 100,
        },
        {
            id: 2, title: 'Shoe',
            price: 200,
        }
    ])
})
app.listen('5000', () => {
    console.log("listening on port 5000")
})