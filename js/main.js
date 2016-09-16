var game;

game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS, 'gameArea');

game.state.add('Menu', Menu);
game.state.add('Game', Game);
game.state.add("Game_Over",Game_Over);
game.state.start('Game');
                                                                                                            