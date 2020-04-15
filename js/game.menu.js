game.menu = {
    clickToPlay : function() {
        game.groundLayer = game.display.createLayer("terrain", game.groundWidth, game.groundHeight, undefined, 0, "#000000", 0, 0); 
        var logo = new Image;
        logo.src = "./img/logo.png";
        logo.addEventListener('load', function() {
          game.display.drawImageInLayer(game.groundLayer,logo , game.groundWidth/2-100, 10, 200, 100);
        }, false);
        game.display.drawTextInLayer(game.groundLayer, "Player vs Computer", "26px KarmaticArcade, Courier New, Courier, monospace", "#FFFFFF", 200, 200);
        game.display.drawTextInLayer(game.groundLayer, "Player vs Player", "26px KarmaticArcade, Courier New, Courier, monospace", "#FFFFFF", 215, 250);
        game.display.drawTextInLayer(game.groundLayer, "Samir AMARA "+String.fromCharCode(169)+" 2020 ", "14px Courier New, Courier, monospace", "#FFFFFF", 265, game.groundHeight-10);
        game.MenuMusic = new Audio("./music/menu.mp3");
        game.MenuMusic.play();
        game.MenuMusic.loop=true;
    },

    startMenu : function() {
        game.groundLayer = game.display.createLayer("terrain", game.groundWidth, game.groundHeight, undefined, 0, "#000000", 0, 0); 
        var logo = new Image;
        logo.src = "./img/logo.png";
        logo.addEventListener('load', function() {
          game.display.drawImageInLayer(game.groundLayer,logo , game.groundWidth/2-100, 10, 200, 100);
        }, false);
        game.display.drawTextInLayer(game.groundLayer, "Player vs Computer", "26px Courier New, Courier, monospace", "#FFFFFF", 200, 200);
        game.display.drawTextInLayer(game.groundLayer, "Player vs Player", "26px Courier New, Courier, monospace", "#FFFFFF", 215, 250);
        game.display.drawTextInLayer(game.groundLayer, "Samir AMARA "+String.fromCharCode(169)+" 2020 ", "14px Courier New, Courier, monospace", "#FFFFFF", 265, game.groundHeight-10);
        game.MenuMusic = new Audio("./music/menu.mp3");
        game.MenuMusic.play();
        game.MenuMusic.loop=true;
    },
}