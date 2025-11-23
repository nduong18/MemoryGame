import { Game } from './scenes/Game.js';

const config = {
    type: Phaser.AUTO,
    title: 'MemoryGame',
    description: '',
    parent: 'game-container',
    width: 800,
    height: 1200,
    backgroundColor: '#000000',
    pixelArt: false,
    scene: [
        Game
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
}

new Phaser.Game(config);
            