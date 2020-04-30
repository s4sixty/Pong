
game.menu = {

    selectedMenu : "pvc",
    multiplayerMenu : "1v1",
    currentMenu : "clickToPlay",

    clickToPlay : function() {
        game.startMenuLayer = game.display.createLayer("startmenu", game.groundWidth, game.groundHeight, undefined, 0, "#000000", 0, 0); 
        game.display.drawTextInLayer(game.startMenuLayer, "Cliquez pour commencer !", "26px KarmaticArcade, Courier New, Courier, monospace", "#FFFFFF", 110, 200);
        game.startMenuLayer.canvas.addEventListener('click', function() {
            game.menu.currentMenu="startMenu";
            game.clearLayer(game.startMenuLayer);
            game.MenuMusic = new Audio("./music/menu.mp3");
            game.MenuMusic.play();
            game.MenuMusic.loop=true;
            game.menu.startMenu();
        }, false);
    },

    startMenu : function() {
        //console.log(game.menu.currentMenu);
        var logo = new Image;
        logo.src = "./img/logo.png";
        game.menuLayer = game.display.createLayer("menu", game.groundWidth, game.groundHeight, undefined, 0, "#000000", 0, 0); 
        logo.addEventListener('load', function() {
          game.display.drawImageInLayer(game.menuLayer,logo , game.groundWidth/2-100, 10, 200, 100);
        }, false);
        game.display.drawTextInLayer(game.menuLayer, "Player vs Computer", "26px KarmaticArcade, Courier New, Courier, monospace", (this.selectedMenu=="pvc")?"green":"white", 170, 200);
        game.display.drawTextInLayer(game.menuLayer, "Player vs Player", "26px KarmaticArcade, Courier New, Courier, monospace", (this.selectedMenu=="pvp")?"green":"#FFFFFF", 195, 250);
        game.display.drawTextInLayer(game.menuLayer, "Utilisez les fleches haut et bas pour naviguer dans le menu", "11px Courier New, Courier, monospace", "#FFFFFF", 160, game.groundHeight-60);
        game.display.drawTextInLayer(game.menuLayer, "Appuyez sur Entrer pour choisir", "11px Courier New, Courier, monospace", "#FFFFFF", 250, game.groundHeight-40);
        game.display.drawTextInLayer(game.menuLayer, "Samir AMARA "+String.fromCharCode(169)+" 2020 ", "14px Courier New, Courier, monospace", "#FFFFFF", 275, game.groundHeight-10);
        window.addEventListener("keydown", e => {
            console.log(game.menu.currentMenu);
            if(e.keyCode == game.keycode.KEYDOWN&&this.selectedMenu=="pvc"&&game.menu.currentMenu=="startMenu") {
                this.selectedMenu = "pvp";
                game.clearLayer(game.menuLayer);
                game.menu.startMenu();
            };
            if(e.keyCode == game.keycode.KEYUP&&this.selectedMenu=="pvp"&&game.menu.currentMenu=="startMenu") {
                this.selectedMenu = "pvc";
                game.clearLayer(game.menuLayer);
                game.menu.startMenu();
            };
            if(e.keyCode == game.keycode.KEYENTER&&this.selectedMenu!=null&&game.menu.currentMenu=="startMenu") {
                //game.MenuMusic.pause();
                if(this.selectedMenu=="pvc") {
                    game.MenuMusic.pause();
                    game.mode="pvc";
                    game.pvc();
                }
                if(this.selectedMenu=="pvp") {
                    game.clearLayer(game.menuLayer);
                    game.menu.multiplayer();
                    game.menu.currentMenu=="multiplayer";
                    /*
                    game.mode="pvp";
                    game.socket.emit("readyPlayer", "1v1");
                    game.pvp.waiting=true;
                    */
                }
                console.log(this.selectedMenu);
                this.selectedMenu=null;
            }
        });
    },

    multiplayer : function() {
        //console.log("multiplayer");
        var logo = new Image;
        logo.src = "./img/logo.png";
        game.menuLayer = game.display.createLayer("menu", game.groundWidth, game.groundHeight, undefined, 0, "#000000", 0, 0); 
        logo.addEventListener('load', function() {
          game.display.drawImageInLayer(game.menuLayer,logo , game.groundWidth/2-100, 10, 200, 100);
        }, false);
        game.display.drawTextInLayer(game.menuLayer, "1 vs 1", "26px KarmaticArcade, Courier New, Courier, monospace", (this.multiplayerMenu=="1v1")?"green":"white", 300, 200);
        game.display.drawTextInLayer(game.menuLayer, "2 vs 2", "26px KarmaticArcade, Courier New, Courier, monospace", (this.multiplayerMenu=="2v2")?"green":"#FFFFFF", 300, 250);
        game.display.drawTextInLayer(game.menuLayer, "Utilisez les fleches haut et bas pour naviguer dans le menu", "11px Courier New, Courier, monospace", "#FFFFFF", 160, game.groundHeight-60);
        game.display.drawTextInLayer(game.menuLayer, "Appuyez sur Entrer pour choisir", "11px Courier New, Courier, monospace", "#FFFFFF", 250, game.groundHeight-40);
        game.display.drawTextInLayer(game.menuLayer, "Samir AMARA "+String.fromCharCode(169)+" 2020 ", "14px Courier New, Courier, monospace", "#FFFFFF", 275, game.groundHeight-10);
        window.addEventListener("keydown", e => {
            
            //console.log(this.multiplayerMenu);
            if(e.keyCode == game.keycode.KEYDOWN&&this.multiplayerMenu=="1v1"&&this.multiplayerMenu!=null) {
                this.multiplayerMenu = "2v2";
                game.clearLayer(game.menuLayer);
                game.menu.multiplayer();
                console.log(this.multiplayerMenu);
            };
            if(e.keyCode == game.keycode.KEYUP&&this.multiplayerMenu=="2v2"&&this.multiplayerMenu!=null) {
                this.multiplayerMenu = "1v1";
                game.clearLayer(game.menuLayer);
                game.menu.multiplayer();
            };
            if(e.keyCode == game.keycode.KEYENTER&&this.multiplayerMenu!=null) {
                game.MenuMusic.pause();
                console.log(game.mode);
                game.MenuMusic.pause();
                if(this.multiplayerMenu=="1v1") {
                    game.mode="1v1";
                    game.socket.emit("readyPlayer", "1v1");
                    console.log("emit 1v1");
                    game.pvp.waiting=true;
                }
                if(this.multiplayerMenu=="2v2") {
                    game.mode="2v2";
                    game.socket.emit("readyPlayer", "2v2");
                    console.log('emit 2v2');
                    game.pvp.waiting=true;
                    //game.pvp.pvp();
                }
                console.log(this.selectedMenu);
                this.multiplayerMenu=null;
            }
        });
    },
}