

game.control = {

    controlSystem : null,
    mousePointer : null,
    player : game.playerOne,
    role:null,
    pausePositions : {
        ballDirectionX : null,
        ballDirectionY: null,
        playerOneX : null,
        playerOneY : null,
        playerTwoX : null,
        playerTwoY : null,
    },
   
    
    onKeyDown : function(event) {

      //console.log(game.control.player.posX);
      game.control.controlSystem = "KEYBOARD";
      if ( event.keyCode == game.keycode.KEYDOWN ) { 
      game.control.player.goDown = true;
      } else if ( event.keyCode == game.keycode.KEYUP ) { 
      game.control.player.goUp = true;
      } else if ( event.keyCode == game.keycode.KEYSPACE) {
          if(game.paused==false) {
            game.pauseLayer = game.display.createLayer("pause", this.groundWidth, this.groundHeight, undefined, 0, "#000000", 0, 0); 
            game.display.drawTextInLayer(game.menuLayer, "PAUSE", "26px KarmaticArcade, Courier New, Courier, monospace", "#FFFFFF", 285, 200);
            game.playersBallLayer.canvas.style.display="none";
            game.groundLayer.canvas.style.display="none";
            game.control.pausePositions.ballDirectionX = game.ball.directionX;
            game.control.pausePositions.ballDirectionY = game.ball.directionY;
            game.control.pausePositions.playerOneX = game.control.player.posX;
            game.control.pausePositions.playerOneY = game.control.player.posY;
            game.control.pausePositions.playerTwoX = game.playerTwo.posX;
            game.control.pausePositions.playerTwoY = game.playerTwo.posY;
            game.ball.directionX=0;
            game.ball.directionY=0;
            game.paused = true;
        } else {
            game.clearLayer(game.pauseLayer);
            game.paused = false;
            game.ball.directionX = game.control.pausePositions.ballDirectionX;
            game.ball.directionY = game.control.pausePositions.ballDirectionY;
            game.control.player.posX = game.control.pausePositions.playerOneX;
            game.control.player.posY = game.control.pausePositions.playerOneY;
            game.playerTwo.posX = game.control.pausePositions.playerTwoX;
            game.playerTwo.posY = game.control.pausePositions.playerTwoY;
            game.groundLayer.canvas.style.display = "inline";
            game.playersBallLayer.canvas.style.display="inline";
        }
      }
    },
   
    onKeyUp : function(event) {
      //console.log(game.control.player.posX);
     
      if ( event.keyCode == game.keycode.KEYDOWN ) {
        game.control.player.goDown = false;
      } else if ( event.keyCode == game.keycode.KEYUP ) {
        game.control.player.goUp = false;
      }
    },

    onMouseMove : function(event) {
      //console.log(game.control.player.posX);
        game.control.controlSystem = "MOUSE";
    
        if ( event ) {
        game.control.mousePointer = event.clientY;
        }
    
        if ( game.control.mousePointer > game.control.player.posY ) {
        game.control.player.goDown = true;
        game.control.player.goUp = false;
        } else if ( game.control.mousePointer < game.control.player.posY ) {
        game.control.player.goDown = false;
        game.control.player.goUp = true;
        } else {
        game.control.player.goDown = false;
        game.control.player.goUp = false;
        }
        //console.log(game.control.player.posX);
    }
}