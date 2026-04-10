import Boot from './scenes/boot.js';
import End from './scenes/end.js';
import Level from './scenes/level.js';
import MenuTutorial from './scenes/menu-tutorial.js';
import Dungeon_1 from './scenes/Dungeons/mapa_dungeon_1.js';
import Phaser from 'phaser';

let config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 700,
    parent: 'juego',
    scale: {
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    pixelArt: true,
    scene: [Boot, MenuTutorial, Level, End, Dungeon_1],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }, // top-down, sin gravedad
            debug: true
        }
    }
};

new Phaser.Game(config);