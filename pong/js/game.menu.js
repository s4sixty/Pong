
game.menu = {

    selectedMenu : "pvc",

    clickToPlay : function() {
        game.menuLayer = game.display.createLayer("menu", game.groundWidth, game.groundHeight, undefined, 0, "#000000", 0, 0); 
        game.display.drawTextInLayer(game.menuLayer, "Cliquez pour commencer !", "26px KarmaticArcade, Courier New, Courier, monospace", "#FFFFFF", 110, 200);
        game.menuLayer.canvas.addEventListener('click', function() {
            game.clearLayer(game.menuLayer);
            game.MenuMusic = new Audio("./music/menu.mp3");
            game.MenuMusic.play();
            game.MenuMusic.loop=true;
            game.menu.startMenu();
        }, false);

    },

    startMenu : function() {
        var logo = new Image;
        logo.src = "./img/logo.png";
        logo.addEventListener('load', function() {
          game.display.drawImageInLayer(game.menuLayer,logo , game.groundWidth/2-100, 10, 200, 100);
        }, false);
        game.display.drawTextInLayer(game.menuLayer, "Player vs Computer", "26px KarmaticArcade, Courier New, Courier, monospace", (this.selectedMenu=="pvc")?"green":"white", 170, 200);
        game.display.drawTextInLayer(game.menuLayer, "Player vs Player", "26px KarmaticArcade, Courier New, Courier, monospace", (this.selectedMenu=="pvp")?"green":"#FFFFFF", 195, 250);
        game.display.drawTextInLayer(game.menuLayer, "Utilisez les fleches haut et bas pour naviguer dans le menu", "11px Courier New, Courier, monospace", "#FFFFFF", 160, game.groundHeight-60);
        game.display.drawTextInLayer(game.menuLayer, "Appuyez sur Entrer pour choisir", "11px Courier New, Courier, monospace", "#FFFFFF", 250, game.groundHeight-40);
        game.display.drawTextInLayer(game.menuLayer, "Samir AMARA "+String.fromCharCode(169)+" 2020 ", "14px Courier New, Courier, monospace", "#FFFFFF", 275, game.groundHeight-10);
        window.addEventListener("keydown", e => {
            if(e.keyCode == game.keycode.KEYDOWN&&this.selectedMenu=="pvc") {
                this.selectedMenu = "pvp";
                game.clearLayer(game.menuLayer);
                game.menu.startMenu();
            };
            if(e.keyCode == game.keycode.KEYUP&&this.selectedMenu=="pvp") {
                this.selectedMenu = "pvc";
                game.clearLayer(game.menuLayer);
                game.menu.startMenu();
            };
            if(e.keyCode == game.keycode.KEYENTER&&this.selectedMenu!=null) {
                this.selectedMenu=null;
                game.MenuMusic.pause();
                if(this.selectedMenu=="pvc") {
                    game.pvc();
                }
                if(this.selectedMenu=="pvp") {

                }
                
            }
        });
    },
}