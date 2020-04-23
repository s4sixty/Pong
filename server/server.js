const express = require('express');
const app = express();
var http = require('http').createServer(app);
var cors = require('cors');
// Chargement de socket.io
var io = require('socket.io')(http);
io.set('origins', '*:*');

// Allow cors
app.use(cors());
// Autoriser des requetes de plusieurs domaines

// Routes
app.get('/', function (req, res) {
  res.send('Hello World!')
})

var server = app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

// Quand un client se connecte, on le note dans la console
io.on('connection', (socket) => {
    res.writeHead(200, {
        'Access-Control-Allow-Origin' : '*'
    });
});