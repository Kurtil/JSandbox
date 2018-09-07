let http = require('http');

let server = http.createServer();

const serverOn = () => {
    return new Promise(resolve => {
        server.on('request', (req, res) => resolve({req, res}));
    })
}

const serverListen = port => {
    return new Promise(resolve => {
        server.listen(port, resolve);
    });
}

serverOn().then(({req, res}) => {
    console.log('there was a request ;)');
    res.writeHead(200);
    res.end(JSON.stringify({"coucou": "hey"}));
});

serverListen(8080).then(() => console.log('Server listenning'));

