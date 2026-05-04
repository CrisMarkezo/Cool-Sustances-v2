import Boot from './scenes/boot.js';
import End from './scenes/end.js';
import Level from './scenes/level.js';
import Dungeon_1 from './scenes/mapa_dungeon_1.js';
import AccionTutorial from './scenes/tutorial/accionTutorial.js';
import MenuTutorial from './scenes/tutorial/menu-tutorial.js';
import Phaser from 'phaser';
import TiendaTutorial from './scenes/tutorial/tiendaTutorial.js';
import DialogoTutorial from './scenes/tutorial/dialogoTutorial.js';
import Menu from './scenes/dia/menu-dia.js'
import AccionPrimera1 from './scenes/dia/accionPrimera1.js'
import AccionPrimera2 from './scenes/dia/accionPrimera2.js'
import AccionSegunda1 from './scenes/dia/accionSegunda1.js'
import AccionSegunda2 from './scenes/dia/accionSegunda2.js'
import DialogoPrimero1 from './scenes/dia/dialogoPrimero1'
import DialogoSegundo1 from './scenes/dia/dialogoSegundo1'
import StartMenu from './scenes/startMenu.js'
import Settings from './scenes/settings.js'
import DialogoTercera1 from './scenes/dia/dialogoTercera1';
import AccionCuarta1 from './scenes/dia/accionCuarta1';
import AccionQuinta1 from './scenes/dia/accionQuinta1.js';
import DialogoCuarta1 from './scenes/dia/dialogoCuarta1.js';
import DialogoQuinta1 from './scenes/dia/dialogoQuinta1';
import DialogoQuinta2 from './scenes/dia/dialogoQuinta2.js';
import TiendaTercera1 from './scenes/dia/tiendaTercera1';
import TiendaTercera2 from './scenes/dia/tiendaTercera2.js';
import TiendaCuarta1 from './scenes/dia/tiendaCuarta1';
import InventoryScene from './scenes/inventory.js';

let config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 700,
    parent: 'juego',
    scale: {
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    pixelArt: true,
    scene: [
        Boot,
        MenuTutorial,
        Level,
        End,
        AccionTutorial,
        TiendaTutorial,
        DialogoTutorial,
        Menu,
        AccionPrimera1,
        AccionPrimera2,
        AccionSegunda1,
        AccionSegunda2,
        AccionCuarta1,
        AccionQuinta1,
        DialogoPrimero1,
        DialogoSegundo1,
        DialogoTercera1,
        DialogoCuarta1,
        DialogoQuinta1,
        DialogoQuinta2,
        TiendaTercera1,
        TiendaTercera2,
        TiendaCuarta1,
        InventoryScene,
        StartMenu,
        Settings,
      Dungeon_01,
      Inventory
    ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }, // top-down, sin gravedad
            debug: true
        }
    }
};

new Phaser.Game(config);