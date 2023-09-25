const http = require('http');
const hostname = '127.0.0.1';
const port = 4000;

const server = http.createServer((req,res)=>{
    
    const url = req.url;
    res.setHeader('Content-Type', 'text/html');
    if(url == '/')
    res.end(`<h3>Welcome home</h3>`)

    else if(url == '/about')
    res.end(`<h3>Welcome to About Us page</h3>`)

    else if(url == '/node')
    res.end(`<h3>Welcome to my NodeJs project</h3>`)
    
});

server.listen('4000','127.0.0.1',()=>{
    console.log("Listening on port 4000");
});