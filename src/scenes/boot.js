import Phaser from 'phaser';
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
import Rascador from '../../assets/sprites/Rascador.png';
import CatGrabbing from '../../assets/sprites/Cat_Grabbing.png';
import MonsterImg from '../../assets/sprites/Monster.png';
import BossImg from '../../assets/sprites/boss.png';
import BossPhaseImg from '../../assets/sprites/bossPhase.png';
import BossColoursImg from '../../assets/sprites/bossColours.png';
import healthbar from '../../assets/sprites/healthbar.png';

export default class Boot extends Phaser.Scene {
    constructor() {
        super({ key: 'boot' });
    }

    preload() {
        this.load.image('Muebles4', TopDownHouse_FurnitureState1);
        this.load.image('Muebles6', TopDownHouse_DoorsAndWindows);
        this.load.image('Paredes y suelos', TopDownHouse_FloorsAndWalls);
        this.load.image('Objetos pequeños', TopDownHouse_SmallItems);

        this.load.tilemapTiledJSON('tutorial', tutorial);
        this.load.image('Inventory', Inventory);
        this.load.image('gameover', GameOver);

        this.load.image('monster', MonsterImg);

        this.load.spritesheet('boss', BossImg, {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet('bossPhase', BossPhaseImg, {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet('bossColours', BossColoursImg, {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.image('healthbar', healthbar);

        this.load.spritesheet('cat_idle', CatIdle, {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet('cat_run', CatRun, {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet('cat_attack', CatAttack, {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet('rascador', Rascador, {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet('telefono', Phone, {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet('cat_grabbing', CatGrabbing, {
            frameWidth: 32,
            frameHeight: 32
        });
    }

    create() {
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

        this.scene.start('level');
    }
}