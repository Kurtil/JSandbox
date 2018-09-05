let http = require('http');

let server = http.createServer();
server.on('request', (req, res) => {
    console.log('there was a request ;)');
    res.writeHead(200);
    res.end(JSON.stringify({"coucou": "hey"}));
});

server.listen(8080, () => console.log("port listening"));