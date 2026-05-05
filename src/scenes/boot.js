import Phaser from 'phaser'

import InventoryData from '../Inventory.js';

import inventario from '../../assets/sprites/UIinventario.png'
import phoneItem from '../../assets/sprites/objetos/phoneItem.png'

import settingsOn from '../../assets/sprites/settingsButton.png'
import settingsOff from '../../assets/sprites/settingsButtonOff.png'
import settingsPanel from '../../assets/sprites/inventarioPrueba.jpeg'

import startMenu from '../../assets/sprites/startPrueba.jpeg'

import dia from '../../assets/sprites/dia/UIDaySinRueda.png'
import tiendaDia from '../../assets/sprites/dia/UITiendaSinRueda.png'
import ruedaSprite from '../../assets/sprites/dia/UIrueda.png'
import ruedaSprite2 from '../../assets/sprites/dia/UIruedatienda.png'
import patas from '../../assets/sprites/dia/patas.png'
import bin from '../../assets/sprites/binAccionTutorial.png'


import dialogoMenuImg from '../../assets/sprites/menu/dialogoMenu_50.png'
import tiendaMenuImg from '../../assets/sprites/menu/tiendaMenu_50.png'
import accionMenuImg from '../../assets/sprites/menu/accionMenu_50.png'
import pezImg from '../../assets/sprites/menu/pez.png'



import onlyMenuImg1 from '../../assets/sprites/menu/onlyMenu1.png'
import onlyMenuImg12 from '../../assets/sprites/menu/onlyMenu1.2.png'
import onlyMenuImg13 from '../../assets/sprites/menu/onlyMenu1.3.png'
import onlyMenuImg14 from '../../assets/sprites/menu/onlyMenu1.4.png'
import onlyMenuImg15 from '../../assets/sprites/menu/onlyMenu1.5.png'
import onlyMenuImg16 from '../../assets/sprites/menu/onlyMenu1.6.png'
import onlyMenuImg17 from '../../assets/sprites/menu/onlyMenu1.7.png'
import onlyMenuImg18 from '../../assets/sprites/menu/onlyMenu1.8.png'
import onlyMenuImg2 from '../../assets/sprites/menu/onlyMenu2.png'

import catBox from '../../assets/sprites/dia/Box3.png'


import WidgetSpriteImg1 from '../../assets/sprites/menu/widget1Menu.png'
import WidgetSpriteImg2 from '../../assets/sprites/menu/widget2Menu.png'

import accionIcon1 from '../../assets/sprites/dia/accionIconAnimation1.png'
import accionIcon2 from '../../assets/sprites/dia/accionIconAnimation2.png'
import accionIcon3 from '../../assets/sprites/dia/accionIconAnimation3.png'
import accionIcon4 from '../../assets/sprites/dia/accionIconAnimation4.png'

import dialogoIcon1 from '../../assets/sprites/dia/dialogoIconAnimation1.png'
import dialogoIcon2 from '../../assets/sprites/dia/dialogoIconAnimation2.png'
import dialogoIcon3 from '../../assets/sprites/dia/dialogoAnimation3.png'
import laliNeutro from '../../assets/sprites/dia/characters/laliNeutro.png'
import laliFeliz from '../../assets/sprites/dia/characters/laliFeliz.png'
import laliTriste from '../../assets/sprites/dia/characters/laliTriste.png'
import laliEnfadada from '../../assets/sprites/dia/characters/laliEnfadada.png'
import mikelNeutro from '../../assets/sprites/dia/characters/mikelNeutro.png'
import mikelFeliz from '../../assets/sprites/dia/characters/mikelFeliz.png'
import mikelTriste from '../../assets/sprites/dia/characters/mikelTriste.png'
import mikelEnfadado from '../../assets/sprites/dia/characters/mikelEnfadado.png'
import ikerNeutro from '../../assets/sprites/dia/characters/ikerNeutro.png'
import ikerFeliz from '../../assets/sprites/dia/characters/ikerFeliz.png'
import ikerTriste from '../../assets/sprites/dia/characters/ikerTriste.png'
import ikerEnfadado from '../../assets/sprites/dia/characters/ikerEnfadado.png'
import anaNeutro from '../../assets/sprites/dia/characters/anaNeutro.png'
import anaFeliz from '../../assets/sprites/dia/characters/anaFeliz.png'
import anaTriste from '../../assets/sprites/dia/characters/anaTriste.png'
import anaHorny from '../../assets/sprites/dia/characters/anaHorny.png'
import anaEnfadada from '../../assets/sprites/dia/characters/anaEnfadada.png'


import tiendaIcon from '../../assets/sprites/dia/tiendaIconScene.png'
import haoNeutro from '../../assets/sprites/dia/characters/haoNeutro.png'
import haoFeliz from '../../assets/sprites/dia/characters/haoFeliz.png'
import haoTriste from '../../assets/sprites/dia/characters/haoTriste.png'
import haoEnfadado from '../../assets/sprites/dia/characters/haoEnfadado.png'
import haoHorny from '../../assets/sprites/dia/characters/haoHorny.png'

/*
 * Escena para la precarga de los assets que se usarán en el juego.
 * Esta escena se puede mejorar añadiendo una imagen del juego y una 
 * barra de progreso de carga de los assets
 * @see {@link https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/} como ejemplo
 * sobre cómo hacer una barra de progreso.
 */
import tutorial from '../../assets/sprites/tutorial/tutorial.json';
import TopDownHouse_DoorsAndWindows from '../../assets/sprites/tutorial/TopDownHouse_DoorsAndWindows.png';
import TopDownHouse_FloorsAndWalls from '../../assets/sprites/tutorial/TopDownHouse_FloorsAndWalls.png';
import TopDownHouse_FurnitureState1 from '../../assets/sprites/tutorial/TopDownHouse_FurnitureState1.png';
import TopDownHouse_SmallItems from '../../assets/sprites/tutorial/TopDownHouse_SmallItems.png';
import Inventory from '../../assets/sprites/Inventory.png';
import GameOver from '../../assets/sprites/game_over.png';

import CatIdle from '../../assets/sprites/Cat_Idle.png';
import CatRun from '../../assets/sprites/Cat_Run.png';
import CatAttack from '../../assets/sprites/Cat_Attack.png';
import Phone from '../../assets/sprites/telefono.png';
import Disc from '../../assets/sprites/phone.png';
import Rascador from '../../assets/sprites/Rascador.png';
import RatImg from '../../assets/sprites/rat.png';
import Rat1Img from '../../assets/sprites/rat1.png';
import Rat2Img from '../../assets/sprites/rat2.png';
import CatGrabbing from '../../assets/sprites/Cat_Grabbing.png';
import MonsterImg from '../../assets/sprites/Monster.png';
import BossImg from '../../assets/sprites/boss.png';
import BossPhaseImg from '../../assets/sprites/bossPhase.png';
import BossColoursImg from '../../assets/sprites/bossColours.png';
import healthbar from '../../assets/sprites/healthbar.png';
import star from '../../assets/sprites/star.png';

import yanotekomo from '../../assets/sprites/objetos/yanotekomo.png';
import halcon from '../../assets/sprites/objetos/halcon.png';
import vaper from '../../assets/sprites/objetos/vaper.png';
import redbull from '../../assets/sprites/objetos/monster.png';
import kebad from '../../assets/sprites/objetos/kebab.png';
import catnip from '../../assets/sprites/objetos/catnip.png';

import Llave_Boss from '../../assets/dungeon/llave_boss.png';

export default class Boot extends Phaser.Scene {
    constructor() {
        super({ key: 'boot' });
    }

    preload() {
        // Con setPath podemos establecer el prefijo que se añadirá a todos los load que aparecen a continuación
        //this.load.setPath('assets/sprites/');
        this.load.image('dia', dia)
        this.load.image('tienda_dia', tiendaDia)

        this.load.image('startMenu', startMenu);

        this.load.image('inventario', inventario);
        this.load.image('settingsPanel', settingsPanel);
        this.load.image('settings', settingsOn);
        this.load.image('settings2', settingsOff);

        this.load.image('bin', bin);
        this.load.image('dialogoMenu', dialogoMenuImg);
        this.load.image('tiendaMenu', tiendaMenuImg);
        this.load.image('accionMenu', accionMenuImg);
        this.load.image('pez', pezImg);

        this.load.image('rueda', ruedaSprite);
        this.load.image('rueda_tienda', ruedaSprite2);
        this.load.image('patas', patas);

        this.load.image("onlyMenu1", onlyMenuImg1);
        this.load.image("onlyMenu1.2", onlyMenuImg12);
        this.load.image("onlyMenu1.3", onlyMenuImg13);
        this.load.image("onlyMenu1.4", onlyMenuImg14);
        this.load.image("onlyMenu1.5", onlyMenuImg15);
        this.load.image("onlyMenu1.6", onlyMenuImg16);
        this.load.image("onlyMenu1.7", onlyMenuImg17);
        this.load.image("onlyMenu1.8", onlyMenuImg18);
        this.load.image("onlyMenu2", onlyMenuImg2);

        this.load.spritesheet('catBox', catBox, { frameWidth: 90, frameHeight: 90 });

        this.load.image("widget1", WidgetSpriteImg1);
        this.load.image("widget2", WidgetSpriteImg2);

        this.load.image('accionIcon1', accionIcon1);
        this.load.image('accionIcon2', accionIcon2);
        this.load.image('accionIcon3', accionIcon3);
        this.load.image('accionIcon4', accionIcon4);

        this.load.image('dialogoIcon1', dialogoIcon1);
        this.load.image('dialogoIcon2', dialogoIcon2);
        this.load.image('dialogoIcon3', dialogoIcon3);

        this.load.image('tiendaIcon', tiendaIcon);

        this.load.image('laliNeutro', laliNeutro);
        this.load.image('laliFeliz', laliFeliz);
        this.load.image('laliTriste', laliTriste);
        this.load.image('laliEnfadada', laliEnfadada);

        this.load.image('haoNeutro', haoNeutro);
        this.load.image('haoFeliz', haoFeliz);
        this.load.image('haoTriste', haoTriste);
        this.load.image('haoEnfadado', haoEnfadado);
        this.load.image('haoHorny', haoHorny);

        this.load.image('mikelNeutro', mikelNeutro);
        this.load.image('mikelFeliz', mikelFeliz);
        this.load.image('mikelTriste', mikelTriste);
        this.load.image('mikelEnfadado', mikelEnfadado);

        this.load.image('ikerNeutro', ikerNeutro);
        this.load.image('ikerFeliz', ikerFeliz);
        this.load.image('ikerTriste', ikerTriste);
        this.load.image('ikerEnfadado', ikerEnfadado);

        this.load.image('anaNeutro', anaNeutro);
        this.load.image('anaFeliz', anaFeliz);
        this.load.image('anaTriste', anaTriste);
        this.load.image('anaHorny', anaHorny);
        this.load.image('anaEnfadada', anaEnfadada);

        this.load.image('Muebles4', TopDownHouse_FurnitureState1);
        this.load.image('Muebles6', TopDownHouse_DoorsAndWindows);
        this.load.image('Paredes y suelos', TopDownHouse_FloorsAndWalls);
        this.load.image('Objetos pequeños', TopDownHouse_SmallItems);

        this.load.tilemapTiledJSON('tutorial', tutorial);
        this.load.image('Inventory', Inventory);
        this.load.image('gameover', GameOver);
        this.load.image('monster', MonsterImg);
        this.load.image('healthbar', healthbar);

        this.load.image('star', star);
        this.load.image('yanotekomo', yanotekomo);
        this.load.image('halcon', halcon);
        this.load.image('vaper', vaper);
        this.load.image('redbull', redbull);
        this.load.image('kebab', kebad);
        this.load.image('catnip', catnip);

        this.load.image('disc', Disc);

        this.load.spritesheet('bossPhase', BossPhaseImg, {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet('bossColours', BossColoursImg, {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet('cat_idle', CatIdle, {
        frameWidth: 32,
        frameHeight: 32
        });

        // Run
        this.load.spritesheet('cat_run', CatRun, {
        frameWidth: 32,
        frameHeight: 32
        });

        this.load.spritesheet('cat_attack', CatAttack, {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet('cat_grabbing', CatGrabbing, {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet('rascador', Rascador, {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet('telefono', phoneItem, {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet('boss', BossImg, {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet('rat', RatImg, {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet('rat1', Rat1Img, {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet('rat2', Rat2Img, {
            frameWidth: 32,
            frameHeight: 32
        });
    }

    create() {
        if (!this.registry.has('money')) {
            this.registry.set('money', 0);
        }

        if (!this.registry.has('inventory')) {
            this.registry.set('inventory', new InventoryData(2, 2));
        }

        let sceneStarted = false;
        const startMenuSafely = () => {
            if (sceneStarted) {
                return;
            }
            sceneStarted = true;
            this.scene.start('dungeon_1'); // 'start-menu'
        };

        const hasFontLoader =
            typeof document !== 'undefined' &&
            document.fonts &&
            typeof document.fonts.load === 'function';

        const fontLoads = hasFontLoader
        ? [
            document.fonts.load('16px "Toonway"'),
            document.fonts.load('16px "Keneric"'),
            document.fonts.load('16px "PixelAE-Regular"'),
            document.fonts.load('16px "PixelAE-Bold"'),
            document.fonts.load('16px "ToonwayEmpty"'),
            document.fonts.load('16px "BKFreakyHand"')
            ]
        : [];

        const fallbackTimer = this.time.delayedCall(1500, startMenuSafely);

        Promise.allSettled(fontLoads)
            .catch(() => {})
            .finally(() => {
                fallbackTimer.remove(false);
                startMenuSafely();
        });

        this.anims.create({
            key: 'cat_idle',
            frames: this.anims.generateFrameNumbers('cat_idle', { start: 0, end: 7 }),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: 'cat_run',
            frames: this.anims.generateFrameNumbers('cat_run', { start: 0, end: 9 }),
            frameRate: 12,
            repeat: -1
        });

        this.anims.create({
            key: 'cat_attack',
            frames: [
                { key: 'cat_attack', frame: 0 },
                { key: 'cat_attack', frame: 1 },
                { key: 'cat_attack', frame: 2 },
                { key: 'cat_attack', frame: 2 },
                { key: 'cat_attack', frame: 2 },
                { key: 'cat_attack', frame: 3 },
                { key: 'cat_attack', frame: 4 },
                { key: 'cat_attack', frame: 5 }
            ],
            frameRate: 14,
            repeat: 0
        });

        this.anims.create({
            key: 'rascador_scratch',
            frames: this.anims.generateFrameNumbers('rascador', { start: 1, end: 4 }),
            frameRate: 6,
            repeat: 0
        });

        this.anims.create({
            key: 'cat_grabbing',
            frames: this.anims.generateFrameNumbers('cat_grabbing', { start: 0, end: 2 }),
            frameRate: 6,
            repeat: 0
        });

        this.anims.create({
            key: 'boss_move',
            frames: this.anims.generateFrameNumbers('boss', { start: 0, end: 2 }),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: 'rat_move',
            frames: this.anims.generateFrameNumbers('rat', { start: 0, end: 2 }),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: 'rat1_move',
            frames: this.anims.generateFrameNumbers('rat1', { start: 0, end: 2 }),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: 'rat2_move',
            frames: this.anims.generateFrameNumbers('rat2', { start: 0, end: 2 }),
            frameRate: 6,
            repeat: -1
        });
    }
}