const http = require("node:http");

const server = http.createServer((req, res)=>{
    console.log("Request", req.url);
    if(req.url =='/'){
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end("<h1>Home Page</h1>");
    }else if(req.url == "/about"){
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end("<h1>About Page</h1>");
    }else{
        res.writeHead(404, {"Content-Type": "text/html"});
        res.end("<h1>404 Page Not Found</h1>");
    }
    res.end("hello world!"); 
})

server.listen(3000, ()=>{
    console.log("listening on port 3000")
});