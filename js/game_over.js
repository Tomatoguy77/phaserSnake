var Game_Over = {

    preload : function() {
       // game.load.image('menu', './assets/images/menu.png');
    },

    create: function () {
      //create the simple menu texts
    	var text1;
    	var text2;

    	var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
    	text2 = game.add.text(game.camera.width/2, game.camera.height/2, "press any button to play", style);

    	text1 = game.add.text(game.camera.width/2, 0, "snake", style);
   	    text1.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
   	    text1.anchor.setTo(0.5,0);
   	    text2.anchor.setTo(0.5)
       // this.add.sprite(0, 0, 'menu');



    },
    update: function(){
      if (game.input.mousePointer.isDown) {
        this.state.start('Game');
              }
    },


    render: function(){

       //game.debug.pointer(game.input.mousePointer);

    }


};

