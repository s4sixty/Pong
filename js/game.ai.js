game.ai = {
    player : null,
    ball : null,
    difficulty: 4,
   
    setPlayerAndBall : function(player, ball) {
      this.player = player;
      this.ball = ball;
    },

    move : function() {
        if ( this.ball.directionX == 1 ) {
          if ( this.player.originalPosition == "right" ) {
            // follow
            this.followBall();
          }
          if ( this.player.originalPosition == "left" ) {
            // center
            this.goCenter();
          }    
        } else {
          if ( this.player.originalPosition == "right" ) {
            // center
            this.goCenter();
          }
          if ( this.player.originalPosition == "left" ) {
            // follow
            this.followBall();
          }  
        }
      },

      followBall : function() {
        if ( this.ball.posY < this.player.posY ) {
          // la position de la balle est sur l'écran, au dessus de celle de la raquette
          this.player.posY=this.player.posY+((-1)*this.difficulty);
        } else if ( this.ball.posY > this.player.posY + this.player.height ) {
          // la position de la balle est sur l'écran, en dessous de celle de la raquette
          this.player.posY=this.player.posY+(1*this.difficulty);
        }
      },

      goCenter : function() {
        if ( this.player.posY + this.player.height/2 > game.groundHeight / 2 ) {
          this.player.posY--;
        } else if ( this.player.posY + this.player.height/2 < game.groundHeight / 2 ) {
          this.player.posY++;
        }
      }
  }