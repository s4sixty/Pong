// --- INIT DEPENDENCIES
let express = require('express'),
  app = express(),
  path = require('path');

// --
let http = require('http').Server(app);
let io = require('socket.io')(http);
let cors = require('cors');


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
var rooms = [[]];
var roomno = 1;
var player = 1;

// ------------------------
//
// ------------------------

// Routes
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/static/pong.html');
});

app.get('/pong', function (req, res) {
  res.sendFile(__dirname + '/static/pong.html');
})

// Gére la discussion chat du jeu
io.sockets.on('connection', function (socket) {
  io.emit('number users', socket.client.conn.server.clientsCount);
  console.log(socket.client.conn.server.clientsCount + " users connected");
  // Discussion chat
  socket.on('chat message', (msg) => {
    socket.broadcast.emit('chat message', msg);
    console.log(msg);
  });
  // Positions dans le jeu
  socket.on('remotePlayerData', (msg) => {
    socket.to(toString(socket.room)).emit('remotePlayerData', msg);
    //console.log(msg);
  });
  // Gére la synchronisation des joueurs
  socket.on('readyPlayer', (msg) => {
    console.log(msg);
    //Increase roomno 2 clients are present in a room.
    if(msg=="1v1") {
      console.log(roomno);
      if(!io.sockets.adapter.rooms[toString(roomno)] || io.sockets.adapter.rooms[toString(roomno)].length<=1) {
        io.in(toString(roomno)).emit('status', 'waiting');
        socket.join(toString(roomno));
        socket.room=roomno;
        socket.to(toString(socket.room)).emit('chat message', "a user just joined your room");
        if(io.sockets.adapter.rooms[toString(roomno)].length==2){
          //Démarrer l'ancienne queue
          io.in(toString(roomno)).emit('status', 'started');
          // Créer une nouvelle room
          ++roomno;
        } 
        console.log("new player joined the room : "+socket.room+io.sockets.adapter.rooms[toString(roomno)].length);
      }
      else if(io.sockets.adapter.rooms[toString(roomno)].length>=2) {
        io.of('/').in(toString(roomno)).clients((error, socketIds) => {
          if (error) throw error;
          socketIds.forEach(socketId => {
            io.sockets.sockets[socketId].leave(toString(roomno))
            console.log(socketId+'removed from room'+ roomno);
          });
        });
        socket.join(toString(roomno));
        socket.room=roomno;
        socket.to(toString(socket.room)).emit('chat message', "a user just joined your room");
        console.log("new player joined the new room : "+socket.room+io.sockets.adapter.rooms[toString(roomno)].length);
        console.log(io.sockets.adapter.rooms[toString(roomno)]);
      }
    }

    if(msg=="2v2") {
      console.log(roomno);
      if(!io.sockets.adapter.rooms[toString(roomno)] || io.sockets.adapter.rooms[toString(roomno)].length<=3) {
        io.in(toString(roomno)).emit('status', 'waiting');
        io.in(toString(roomno)).emit('player', toString(player));
        socket.join(toString(roomno));
        socket.room=roomno;
        socket.to(toString(socket.room)).emit('chat message', "a user just joined your 2v2 room");
        if(io.sockets.adapter.rooms[toString(roomno)].length==4){
          //Démarrer l'ancienne queue
          io.in(toString(roomno)).emit('status', 'started');
          // Créer une nouvelle room
          ++roomno;
          player=1;
        } 
        console.log("new player joined the room : "+socket.room+io.sockets.adapter.rooms[toString(roomno)].length);
      }
      else if(io.sockets.adapter.rooms[toString(roomno)].length>=4) {
        io.of('/').in(toString(roomno)).clients((error, socketIds) => {
          if (error) throw error;
          socketIds.forEach(socketId => {
            io.sockets.sockets[socketId].leave(toString(roomno));
            console.log(socketId+'removed from 2v2 room'+ roomno);
          });
        });
        socket.join(toString(roomno));
        socket.room=roomno;
        socket.to(toString(socket.room)).emit('chat message', "a user just joined your 2v2 room");
        console.log("new player joined the new 2v2 room : "+socket.room+io.sockets.adapter.rooms[toString(roomno)].length);
        console.log(io.sockets.adapter.rooms[toString(roomno)]);
      }
    }
  });
  //Gére la déconnexion
  socket.on('disconnect', function () {
    io.emit('number users', socket.client.conn.server.clientsCount);
    console.log(socket.client.conn.server.clientsCount + " users connected");
  });
});

// ------------------------
// START SERVER
// ------------------------
http.listen(3010, function () {
  console.info('HTTP server started on port 3010');
});