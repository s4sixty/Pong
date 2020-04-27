game.pvp = {

    readyPlayer : false,
    remotePlayerReady : false,
    gamestarted : null,
    waiting: null,


    receiveRemoteData : function(){
        game.socket.on('remotePlayerData', function(data) {
            game.playerTwo.posY=data;
        });
    },

    sendLocalData : function() {
        game.socket.emit('remotePlayerData', game.playerOne.posY);
    },

    pvp : function() {
        game.mode="pvp";
        console.log("ready")
        game.socket.emit('remotePlayerData', game.playerOne);
        game.clearLayer(game.menuLayer);
        game.groundLayer = game.display.createLayer("terrain", game.groundWidth, game.groundHeight, undefined, 0, "#000000", 0, 0); 
        game.display.drawRectangleInLayer(game.groundLayer, game.netWidth, game.groundHeight, game.netColor, game.groundWidth/2 - game.netWidth/2, 0);
        game.scoreLayer = game.display.createLayer("score", game.groundWidth, game.groundHeight, undefined, 1, undefined, 0, 0);
        game.playersBallLayer = game.display.createLayer("joueursetballe", game.groundWidth, game.groundHeight, undefined, 2, undefined, 0, 0);

        game.display.drawTextInLayer(game.groundLayer, "SCORE", "10px KarmaticArcade, Courier New, Courier, monospace", "#FF0000", 10, 10);
        game.playersBallLayer = game.display.createLayer("joueursetballe", game.groundWidth, game.groundHeight, undefined, 2, undefined, 0, 0);  
        game.displayScore();
        game.displayBall(200,200);
        game.displayPlayers();

        game.initKeyboard(game.control.onKeyDown, game.control.onKeyUp);
        game.initMouse(game.control.onMouseMove);

        game.wallSound = new Audio("./sound/wall.ogg");
        game.playerSound = new Audio("./sound/player.ogg");
        game.backgroundMusic = new Audio("./music/background.ogg");
        game.backgroundMusic.play();

        
    },

    pvpdouble : function() {
        game.mode="2v2";
        console.log("ready")
        game.socket.emit('remotePlayerData', game.playerOne);
        game.clearLayer(game.menuLayer);
        game.groundLayer = game.display.createLayer("terrain", game.groundWidth, game.groundHeight, undefined, 0, "#000000", 0, 0); 
        game.display.drawRectangleInLayer(game.groundLayer, game.netWidth, game.groundHeight, game.netColor, game.groundWidth/2 - game.netWidth/2, 0);
        game.scoreLayer = game.display.createLayer("score", game.groundWidth, game.groundHeight, undefined, 1, undefined, 0, 0);
        game.playersBallLayer = game.display.createLayer("joueursetballe", game.groundWidth, game.groundHeight, undefined, 2, undefined, 0, 0);

        game.display.drawTextInLayer(game.groundLayer, "SCORE", "10px KarmaticArcade, Courier New, Courier, monospace", "#FF0000", 10, 10);
        game.playersBallLayer = game.display.createLayer("joueursetballe", game.groundWidth, game.groundHeight, undefined, 2, undefined, 0, 0);  
        game.displayScore();
        game.displayBall(200,200);
        game.displayPlayers();

        game.initKeyboard(game.control.onKeyDown, game.control.onKeyUp);
        game.initMouse(game.control.onMouseMove);

        game.wallSound = new Audio("./sound/wall.ogg");
        game.playerSound = new Audio("./sound/player.ogg");
        game.backgroundMusic = new Audio("./music/background.ogg");
        game.backgroundMusic.play();

        
    },
}