var game = {
    groundWidth : 700,
    groundHeight : 400,
    groundColor: "#000000",
    netWidth : 6,
    netColor: "#FFFFFF",
    groundLayer : null,  
    scoreLayer : null,
    startMenuLayer: null,
    menuLayer : null,
    playersBallLayer : null,
    scorePosPlayer1 : 270,
    scorePosPlayer2 : 375,
    wallSound: null,
    playerSound : null,
    backgroundMusic : null,
    paused : false,
    pauseLayer : null,
    winner : null,
    mode: null,
    ball : {
      width : 10,
      height : 10,
      color : "#FFFFFF",
      posX : 350,
      posY : 200,
      speed : 3,
      directionX: 1,
      directionY: 1,
      move : function() {
        this.posX += this.directionX * this.speed;
        this.posY += this.directionY * this.speed;
      },
      bounce : function(soundToPlay) {
        if (game.playerOne.score==10) {
          game.winner="p1";
          game.end();
          return;
        }
        if (game.playerTwo.score==10) {
          game.winner="p2";
          game.end();
          return;
        }
        if ( this.posX > game.groundWidth-this.width ) {
          game.playerOne.score++;
          this.resetPosition();
        }
        if( this.posX <= 0 ) {
          game.playerTwo.score++;
          this.resetPosition();
        }
        if ( this.posY > game.groundHeight-this.height || this.posY < 0  ) {
          this.directionY = -this.directionY;
          soundToPlay.play();
        }
      },
      collide : function(anotherItem) {
        if ( !( this.posX >= anotherItem.posX + anotherItem.width || this.posX <= anotherItem.posX - this.width
        || this.posY >= anotherItem.posY + anotherItem.height || this.posY <= anotherItem.posY - this.height ) ) {
          // Collision
          return true;
        } 
        return false;
      },
      resetPosition : function() {
        this.directionX=-this.directionX;
        this.directionY=-this.directionY;
        this.posX=350;
        this.posY=200;
      }
    },
    playerOne : {
      width : 10,
      height : 50,
      color : "#FFFFFF",
      posX : 10,
      posY : 200,
      goUp : false,
      goDown : false,
      originalPosition : "left",
      score : 0
    },
     
    playerTwo : {
      width : 10,
      height : 50,
      color : "#FFFFFF",
      posX : 680,
      posY : 200,
      goUp : false,
      goDown : false,
      originalPosition : "right",
      score : 0
    },

    displayPlayers : function() {
      game.display.drawRectangleInLayer(this.playersBallLayer, this.playerOne.width, this.playerOne.height, this.playerOne.color, this.playerOne.posX, this.playerOne.posY);
      game.display.drawRectangleInLayer(this.playersBallLayer, this.playerTwo.width, this.playerTwo.height, this.playerTwo.color, this.playerTwo.posX, this.playerTwo.posY);
    },

    pause : function (){
        if(!game.paused) {
          game.pauseLayer = game.display.createLayer("pause", this.groundWidth, this.groundHeight, undefined, 0, "#000000", 0, 0); 
          game.display.drawTextInLayer(game.menuLayer, "PAUSE", "26px KarmaticArcade, Courier New, Courier, monospace", "#FFFFFF", 285, 200);
          game.playersBallLayer.canvas.style.display="none";
          game.groundLayer.canvas.style.display="none";
          game.scoreLayer.canvas.style.display="none";
          game.control.pausePositions.ballDirectionX = game.ball.directionX;
          game.control.pausePositions.ballDirectionY = game.ball.directionY;
          game.control.pausePositions.playerOneX = game.playerOne.posX;
          game.control.pausePositions.playerOneY = game.playerOne.posY;
          game.control.pausePositions.playerTwoX = game.playerTwo.posX;
          game.control.pausePositions.playerTwoY = game.playerTwo.posY;
          game.ball.directionX=0;
          game.ball.directionY=0;
        }
        game.paused=true;
    },

    unpause:function() {
      if(game.paused) {
        game.paused=false;
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
    },

    movePlayers : function() {
      if ( game.control.controlSystem == "KEYBOARD" ) {
        // keyboard control
        if ( game.playerOne.goUp ) {
          (this.playerOne.posY>0)?game.playerOne.posY-=5:game.playerOne.posY=0;
        } else if ( game.playerOne.goDown ) {
          (this.playerOne.posY<this.groundHeight-this.playerOne.height)?game.playerOne.posY+=5:game.playerOne.posY=this.groundHeight-game.playerOne.height;
        }
      } else if ( game.control.controlSystem == "MOUSE" ) {
        // mouse control
        if (game.playerOne.goUp && game.playerOne.posY > game.control.mousePointer)
        (this.playerOne.posY>0)?game.playerOne.posY-=5:game.playerOne.posY=0;
        else if (game.playerOne.goDown && game.playerOne.posY < game.control.mousePointer)
        (this.playerOne.posY<this.groundHeight-this.playerOne.height)?game.playerOne.posY+=5:game.playerOne.posY=this.groundHeight-game.playerOne.height;
      }
    },

    displayBall : function() {
      game.display.drawRectangleInLayer(this.playersBallLayer, this.ball.width, this.ball.height, this.ball.color, this.ball.posX, this.ball.posY);
    },

    moveBall : function() { 
      this.ball.move();
      this.ball.bounce(this.wallSound);
      this.displayBall();
    },

    collideBallWithPlayersAndAction : function() { 
      if ( this.ball.collide(game.playerOne) ) {
        game.ball.directionX = -game.ball.directionX;
        this.playerSound.play();
      }
      if ( this.ball.collide(game.playerTwo) ) {
        game.ball.directionX = -game.ball.directionX;
        this.playerSound.play();
      }
    },

    displayScore : function() {
      game.display.drawTextInLayer(this.scoreLayer, this.playerOne.score, "60px KarmaticArcade, Courier New, Courier, monospace", "#FFFFFF", this.scorePosPlayer1, 55);
      game.display.drawTextInLayer(this.scoreLayer, this.playerTwo.score, "60px KarmaticArcade, Courier New, Courier, monospace", "#FFFFFF", this.scorePosPlayer2, 55);
    },

    clearLayer : function(targetLayer) {
      targetLayer.clear();
    },

    initKeyboard : function(onKeyDownFunction, onKeyUpFunction) {
      window.onkeydown = onKeyDownFunction;
      window.onkeyup = onKeyUpFunction;
    },

    initMouse : function(onMouseMoveFunction) {
      window.onmousemove = onMouseMoveFunction;
    },
    
   
    pvc : function() {
      this.mode="pvc";
      this.clearLayer(this.menuLayer);
      this.groundLayer = game.display.createLayer("terrain", this.groundWidth, this.groundHeight, undefined, 0, "#000000", 0, 0); 
      game.display.drawRectangleInLayer(this.groundLayer, this.netWidth, this.groundHeight, this.netColor, this.groundWidth/2 - this.netWidth/2, 0);
      this.scoreLayer = game.display.createLayer("score", this.groundWidth, this.groundHeight, undefined, 1, undefined, 0, 0);
      this.playersBallLayer = game.display.createLayer("joueursetballe", this.groundWidth, this.groundHeight, undefined, 2, undefined, 0, 0);

      game.display.drawTextInLayer(this.groundLayer, "SCORE", "10px KarmaticArcade, Courier New, Courier, monospace", "#FF0000", 10, 10);
      this.playersBallLayer = game.display.createLayer("joueursetballe", this.groundWidth, this.groundHeight, undefined, 2, undefined, 0, 0);  
      this.displayScore();
      this.displayBall(200,200);
      this.displayPlayers();

      this.initKeyboard(game.control.onKeyDown, game.control.onKeyUp);
      game.initMouse(game.control.onMouseMove);

      this.wallSound = new Audio("./sound/wall.ogg");
      this.playerSound = new Audio("./sound/player.ogg");
      this.backgroundMusic = new Audio("./music/background.ogg");
      this.backgroundMusic.play();

      game.ai.setPlayerAndBall(this.playerTwo, this.ball);
    },

    end : function() {
      this.clearLayer(this.groundLayer);
      this.clearLayer(this.scoreLayer);
      this.clearLayer(this.playersBallLayer);
      this.endLayer = game.display.createLayer("terrain", this.groundWidth, this.groundHeight, undefined, 0, "#000000", 0, 0); 
      if(this.winner=="p1") {
        game.display.drawTextInLayer(game.endLayer, "YOU WIN !", "26px KarmaticArcade, Courier New, Courier, monospace", "#FFFFFF", 270, 200);
      }
      if(this.winner=="p2") {
        game.display.drawTextInLayer(game.endLayer, "YOU LOSE !", "26px KarmaticArcade, Courier New, Courier, monospace", "#FFFFFF", 265, 200);
      }
      game.display.drawTextInLayer(game.endLayer, "Cliquez sur Espace pour revenir au menu principal", "11px Courier New, Courier, monospace", "#FFFFFF", 185, game.groundHeight-40);
      window.addEventListener("keydown", e => {
        if(e.keyCode == game.keycode.KEYSPACE) {
          window.location.reload();
        };
    });
    }
   
  };