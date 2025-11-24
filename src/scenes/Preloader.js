// "Every great game begins with a single scene. Let's make this one unforgettable!"
export class Preloader extends Phaser.Scene {
    constructor() {
        super('Preloader');
    }

    preload(){
        this.load.setPath('assets');
        this.load.image('logo', 'logo.png');
        this.load.image('back', 'back.png');
        this.load.image('cat', 'cat.png');
        this.load.image('elephant', 'elephant.png');
        this.load.image('frog', 'frog.png');
        this.load.image('lion', 'lion.png');
        this.load.image('pig', 'pig.png');
        this.load.image('rabbit', 'rabbit.png');
        console.log("Loaded all assets");
    }

    create() {
        console.log("Start Game");
        this.scene.start('Game');
    }

}
