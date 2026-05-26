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
import DialogoPrimero1 from './scenes/dia/dialogoPrimero1.js'
import DialogoSegundo1 from './scenes/dia/dialogoSegundo1.js'
import StartMenu from './scenes/startMenu.js'
import Settings from './scenes/settings.js'
import DialogoTercera1 from './scenes/dia/dialogoTercera1';
import AccionCuarta1 from './scenes/dia/accionCuarta1';
import DialogoCuarta1 from './scenes/dia/dialogoCuarta1.js';
import TiendaTercera1 from './scenes/dia/tiendaTercera1';
import TiendaTercera2 from './scenes/dia/tiendaTercera2.js';
import TiendaCuarta1 from './scenes/dia/tiendaCuarta1';
import InventoryScene from './scenes/inventory.js';
import Comic_2 from './scenes/comic_2.js';
import Comic_1 from './scenes/comic_1.js';
import AudioScene from './scenes/audioScene.js';
import MazmorraAudio from './scenes/mazmorraAudio.js';
import BossAudio from './scenes/bossAudio.js';

let config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 700,
    parent: 'juego',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        fullscreenTarget: 'juego' 
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
        DialogoPrimero1,
        DialogoSegundo1,
        DialogoTercera1,
        DialogoCuarta1,
        TiendaTercera1,
        TiendaTercera2,
        TiendaCuarta1,
        InventoryScene,
        StartMenu,
        Settings,
        Dungeon_1,
        Comic_1,
        Comic_2,
        AudioScene,
        MazmorraAudio,
        BossAudio
    ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }, 
            debug: false
        }
    }
};

// Parche CSS corregido: El uso estricto de pseudo-clases :fullscreen 
// evita que las propiedades alteren las dimensiones del div en modo ventana.
const style = document.createElement('style');
style.innerHTML = `
    #juego {
        max-width: 1000px;
        max-height: 700px;
    }
    #juego:fullscreen {
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        background-color: #000000 !important;
        width: 100vw !important;
        max-width: 100vw !important;
        height: 100vh !important;
        max-height: 100vh !important;
    }
    #juego:fullscreen canvas {
        margin: auto !important;
    }
`;
document.head.appendChild(style);

new Phaser.Game(config);