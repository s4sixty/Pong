
// --- INIT DEPENDENCIES
let express = require('express'),
    app = express(),
    path = require('path');

// --
let http = require('http').Server(app);
let io = require('socket.io')(http);
let cors= require('cors');


//fichier statiques
app.use(express.static('static'));


// Autoriser des requetes de plusieurs domaines
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    // authorized headers for preflight requests
    // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();

    app.options('*', (req, res) => {
        // allowed XHR methods  
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});

// --- Variables
var players = new Array();

// ------------------------
//
// ------------------------

// Routes
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/static/pong.html');
});

app.get('/pong', function(req, res) {
  res.sendFile(__dirname + '/static/pong.html');
})

// Gére la discussion chat du jeu
io.sockets.on('connection', function (socket) {
    socket.on('chat message', (msg) => {
      socket.broadcast.emit('chat message', msg);
      console.log(msg);
    });
    socket.on('remotePlayerData', (msg) => {
      socket.broadcast.emit('remotePlayerData', msg);
      console.log(msg);
    });
  console.log("new client !");
});

// Gére la synchronisation des joueurs


// Retourne le nombre d'utilisateurs connectés après chaque événement
io.sockets.on('connection', function (socket) {
  io.emit('number users', socket.client.conn.server.clientsCount);
  console.log( socket.client.conn.server.clientsCount + " users connected" );
  socket.on('disconnect', function () {
    io.emit('number users', socket.client.conn.server.clientsCount);
    console.log( socket.client.conn.server.clientsCount + " users connected" );
  });
  console.log(socket.id);
});

// Gére la discussion chat du jeu
io.sockets.on('connection', function (socket) {
  socket.on('readyPlayer', (msg) => {
    if(msg) players.push(socket.id);
    if(players.length==2) {
      io.to(players[0]).emit('gametstart', "1v1");
      io.to(players[1]).emit('gametstart', "1v1");
    }
  });
  console.log(players);
});

// ------------------------
// START SERVER
// ------------------------
http.listen(3010,function(){
    console.info('HTTP server started on port 3010');
});