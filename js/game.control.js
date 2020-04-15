game.control = {

    controlSystem : null,
    mousePointer : null,
    pausePositions : {
        ballDirectionX : null,
        ballDirectionY: null,
        playerOneX : null,
        playerOneY : null,
        playerTwoX : null,
        playerTwoY : null,
    },
   
    onKeyDown : function(event) {
     
      game.control.controlSystem = "KEYBOARD";
   
      if ( event.keyCode == game.keycode.KEYDOWN ) { 
      game.playerOne.goDown = true;
      } else if ( event.keyCode == game.keycode.KEYUP ) { 
      game.playerOne.goUp = true;
      } else if ( event.keyCode == game.keycode.KEYSPACE) {
          if(game.paused==false) {
            game.pauseLayer = game.display.createLayer("pause", this.groundWidth, this.groundHeight, undefined, 0, "#000000", 0, 0); 
            game.display.drawTextInLayer(game.menuLayer, "PAUSE", "26px KarmaticArcade, Courier New, Courier, monospace", "#FFFFFF", 285, 200);
            game.playersBallLayer.canvas.style.display="none";
            game.groundLayer.canvas.style.display="none";
            game.control.pausePositions.ballDirectionX = game.ball.directionX;
            game.control.pausePositions.ballDirectionY = game.ball.directionY;
            game.control.pausePositions.playerOneX = game.playerOne.posX;
            game.control.pausePositions.playerOneY = game.playerOne.posY;
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
            game.playerOne.posX = game.control.pausePositions.playerOneX;
            game.playerOne.posY = game.control.pausePositions.playerOneY;
            game.playerTwo.posX = game.control.pausePositions.playerTwoX;
            game.playerTwo.posY = game.control.pausePositions.playerTwoY;
            game.groundLayer.canvas.style.display = "inline";
            game.playersBallLayer.canvas.style.display="inline";
        }
      }
    },
   
    onKeyUp : function(event) {
      if ( event.keyCode == game.keycode.KEYDOWN ) {
        game.playerOne.goDown = false;
      } else if ( event.keyCode == game.keycode.KEYUP ) {
        game.playerOne.goUp = false;
      }
    },

    onMouseMove : function(event) {
        
        game.control.controlSystem = "MOUSE";
    
        if ( event ) {
        game.control.mousePointer = event.clientY;
        }
    
        if ( game.control.mousePointer > game.playerOne.posY ) {
        game.playerOne.goDown = true;
        game.playerOne.goUp = false;
        } else if ( game.control.mousePointer < game.playerOne.posY ) {
        game.playerOne.goDown = false;
        game.playerOne.goUp = true;
        } else {
        game.playerOne.goDown = false;
        game.playerOne.goUp = false;
        }
    }
}