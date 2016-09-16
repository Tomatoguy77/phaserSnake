var snake,apple,speed,direction,cursors,bodysize, applesize,updatedelay,newDir,AddBody,canvas_height,canvas_width;

var Game = {
    preload: function(){
        game.load.image("body", "./assets/body.png");
        game.load.image("apple", "./assets/body.png");

       // this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
//this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
//this.game.scale.refresh();

game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;






    },

    create: function(){
     //change the background to something more pleasant
     game.stage.backgroundColor = '#061f27';


        snake = []; //the snake is an array so its length can be changed
        apple = {}; // the apple is an object
        speed = 0; //game speed
        direction = "right"; //the direction the snake is moving;
        bodysize = 32;
        applesize = 26
        updatedelay = 0; //this is for a trick where code only get excecuted in certain frames of the update
        //set up the controls, need to find out how phone controls work in phaser
        cursors = game.input.keyboard.createCursorKeys();
        newDir = null;  //the new direction the player is going to be headed
        AddBody = false; // use this as a boolean, if the var is true run a fucntion that adds an extra bodypart to the snake.
        //drawing the initial snake
        for (var i = 0; i < 10; i++) {
            // draw a snake starting at 150 and keep placing it next to eachother with i * bodysize
           snake[i] = game.add.sprite(0+i*bodysize,0,'body');
        }

        //spawn the first apple
        this.spawnApple();
    },
   update: function() {;
    if (AddBody) {
        snake.unshift(game.add.sprite(oldtailx,oldtaily,"body"));
        AddBody = false;    
    }

    // Handle arrow key presses, while not allowing illegal direction changes that will kill the player.

    if (cursors.right.isDown && direction!='left')
    {
        newDir = 'right';
    }
    else if (cursors.left.isDown && direction!='right')
    {
        newDir = 'left';
    }
    else if (cursors.up.isDown && direction!='down')
    {
        newDir = 'up';
    }

    else if (cursors.down.isDown && direction!='up')
    {
        newDir = 'down';
    }



    
    updatedelay++;

    // Do game stuff only if the counter is aliquot to (10 - the game speed).
    // The higher the speed, the more frequently this is fulfilled,
    // making the snake move faster.
    if (updatedelay % (10 - speed) == 0) {

        // Snake movement

        var head = snake[snake.length - 1],
            tail = snake.shift(),
            oldtailx = tail.x,
            oldtaily = tail.y;
            //give the head a color so the player knows where the snake is headed
            head.tint = 0xe67e22;
            tail.tint = 0x0000ff;


        // If a new direction has been chosen from the keyboard, make it the direction of the snake now.
        if(newDir){
            direction = newDir;
            newDir = null;
        }


        // Change the last cell's coordinates relative to the head of the snake, according to the direction.

        if(direction == 'right'){

            tail.x = head.x + bodysize;
            tail.y = head.y;
        }
        else if(direction == 'left'){
            tail.x = head.x - bodysize;
            tail.y = head.y;
        }
        else if(direction == 'up'){
            tail.x = head.x;
            tail.y = head.y - bodysize;
        }
        else if(direction == 'down'){
            tail.x = head.x;
            tail.y = head.y + bodysize;
        }
           this.collisionApple();
           this.collisionSelf(head);
 

        // Place the last cell in the front of the stack.
        // Mark it the first cell.

        snake.push(tail);
        head = tail;

    }
},
    collisionApple: function() {
    // Check if any part of the snake is overlapping the apple.
    // This is needed if the apple spawns inside of the snake.
    for(var i = 0; i < snake.length; i++){
      //  console.log(snake[i].y);
        if(snake[i].x == apple.x && snake[i].y == apple.y){

            // Next time the snake moves, a new block will be added to its length.
            AddBody = true;

            // Destroy the old apple.
            apple.destroy();

            // Make a new one.
            this.spawnApple();


        }
    }

},

    collisionSelf: function(head){
        for (var i = 0; i < snake.length - 1; i++) {
            if (head.x >= game.world.width || head.x < 0 || head.y >= game.world.height || head.y < 0 ) {
                this.state.start('Menu');

            }
            if (head.x == snake[i].x && head.y == snake[i].y) {
                this.state.start('Menu');

            }
        }
 
    },


    //spawnApple spawns an apple at a random location on screen
    spawnApple: function(){
        //spawn the apple on a random location
        //x is between 0 and 572
        //y is between 0 and 442


        var randomX = Math.floor(Math.random() * 60 ) * 32,
            randomY = Math.floor(Math.random() * 33 ) * 32;


        //add the apple to the game
        apple = game.add.sprite(randomX, randomY, 'apple');
   //    console.log(apple);

    },

}