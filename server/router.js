const http = require("http");
const {lexer, ComponentsJsLogic, MANIFEST} = require("./lexer.js"); 


// we are adding event lissener for http request:
const server = http.createServer(requestHandler);
const port = 3000;

// function wich will takecare for the request:
function requestHandler(req, res) {
    let data = {}

    const liveServerOrigin = "http://127.0.0.1:5500"
    const origin = 'http://127.0.0.1:5500' + req.url
    const reactAppOrigin =  "http://localhost:3001" + req.url

    console.log("server >>> origin:", origin, reactAppOrigin);

    if('http://127.0.0.1:5500/structure' == origin){
        const Lexer = lexer()
        const Manifest = MANIFEST
        data = {Lexer, Manifest}
    }
    else if ('http://127.0.0.1:5500/js-logic' == origin){
        data = ComponentsJsLogic
    }

    res.writeHead(200, { // Response Status Code
        'Access-Control-Allow-Origin': liveServerOrigin,
        'Access-Control-Allow-Methods': 'GET',
        'Content-Type': 'application/json'
    });

    console.log("server >>> data:", data);
    
    res.write(JSON.stringify(data));
    res.end();

};


// starting server:
server.listen(port, () => console.log("Working on port 3000:"));