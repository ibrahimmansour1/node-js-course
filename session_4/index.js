const http = require("node:http");
const fs = require('fs');
const homePage = fs.readFileSync("./views/index.html", 'utf-8');
const style = fs.readFileSync("./views/style.css", 'utf-8');

const server = http.createServer((req, res) => {
    console.log(req.url)
    if (req.url == "/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(homePage);
    } else if (req.url == "/about") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("<h1>About Page</h1>");
    }
    else if (req.url == "/style.css") {
        res.writeHead(200, { "Content-Type": "text/css" });
        res.write(style);
    }

    else {
        res.statusCode = 404
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write("<h1>404 Page Not Found</h1>");
    }
    // res.write("<h1>Hello, Ibrahim!</h1>");
    res.write(JSON.stringify({
        id: 1,
        name: "Ibrahim",
    }))
    res.end();
})

server.listen(5000, 'localhost', () => {
    console.log("listening on port 5000");
})