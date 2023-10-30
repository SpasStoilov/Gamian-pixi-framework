const http = require("http");
const lexer = require("./lexer.js"); 

// we are adding event lissener for http request:
const server = http.createServer(requestHandler);
const port = 3000;


// function wich will takecare for the request:
function requestHandler(req, res) {
    console.log("server >>> req:", req);
    const data = lexer()

    console.log("server >>> data:", data);

    res.writeHead(200, { // Response Status Code
        'Access-Control-Allow-Origin': 'http://127.0.0.1:5500',
        'Access-Control-Allow-Methods': 'GET',
        'Content-Type': 'application/json'
    });
    
    res.write(JSON.stringify(data));
    res.end();
};


// starting server:
server.listen(port, () => console.log("Working on port 3000:"));