import Boot from './scenes/boot.js';
import End from './scenes/end.js';
import Level from './scenes/level.js';
import AccionTutorial from './scenes/tutorial/accionTutorial.js';
import MenuTutorial from './scenes/tutorial/menu-tutorial.js';
import Phaser from 'phaser';
import TiendaTutorial from './scenes/tutorial/tiendaTutorial.js';
import DialogoTutorial from './scenes/tutorial/dialogoTutorial.js';
import Menu from './scenes/dia/menu-dia.js'
import AccionPrimera1 from './scenes/dia/accionPrimera1.js'
import Inventory from './scenes/inventory.js'
import StartMenu from './scenes/startMenu.js'
import Settings from './scenes/settings.js'

let config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 700,
    parent: 'juego',
    scale: {
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    pixelArt: true,
    scene: [Boot, MenuTutorial, Level, End, AccionTutorial, TiendaTutorial, DialogoTutorial, Menu, AccionPrimera1, Inventory, StartMenu, Settings],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }, // top-down, sin gravedad
            debug: false
        }
    }
};

new Phaser.Game(config);