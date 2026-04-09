import Phaser from 'phaser';
import tutorial from '../../assets/sprites/tutorial/tutorial.json';
import TopDownHouse_DoorsAndWindows from '../../assets/sprites/tutorial/TopDownHouse_DoorsAndWindows.png';
import TopDownHouse_FloorsAndWalls from '../../assets/sprites/tutorial/TopDownHouse_FloorsAndWalls.png';
import TopDownHouse_FurnitureState1 from '../../assets/sprites/tutorial/TopDownHouse_FurnitureState1.png';
import TopDownHouse_SmallItems from '../../assets/sprites/tutorial/TopDownHouse_SmallItems.png';
import Inventory from '../../assets/sprites/Inventory.png'

import CatIdle from '../../assets/sprites/Cat_Idle.png';
import CatRun from '../../assets/sprites/Cat_Run.png';
import CatAttack from '../../assets/sprites/Cat_Attack.png';
import Phone from '../../assets/sprites/phone.png';
import Rascador from '../../assets/sprites/Rascador.png';
import CatGrabbing from '../../assets/sprites/Cat_Grabbing.png';
import MonsterImg from '../../assets/sprites/Monster.png';
import healthbar from '../../assets/sprites/healthbar.png';
import Star from '../../assets/sprites/star.png';

// Dungeon
import Dungeon from '../../assets/Dungeon/Dungeon_1.json';
import Ambulance from '../../assets/Dungeon/Ambulance.png';
import Arbol from '../../assets/Dungeon/arbol.png';
import Jeep from '../../assets/Dungeon/BLACK_JEEP.png';
import Luxury from '../../assets/Dungeon/BLACK_LUXURY.png';
import Blue_Civic from '../../assets/Dungeon/BLUE_CIVIC.png';
import White_Civic from '../../assets/Dungeon/WHITE_CIVIC.png';
import Brown_Coupe from '../../assets/Dungeon/BROWN_COUPE.png';
import Yellow_Coupe from '../../assets/Dungeon/Yellow_COUPE.png';
import Suv from '../../assets/Dungeon/GREEN_SUV.png';
import Supercar from '../../assets/Dungeon/RED_SUPERCAR.png';
import Police from '../../assets/Dungeon/POLICE.png';
import Taxi from '../../assets/Dungeon/TAXI.png';
import Bus from '../../assets/Dungeon/BUS.png';
import Chest_IDLE from '../../assets/Dungeon/Chest_Idle.png';
import Chest_EMPTY from '../../assets/Dungeon/Chest_Opening_Empty.png';
import Chest_GOLD from '../../assets/Dungeon/Chest_Opening_Gold.png';
import Paredes from '../../assets/Dungeon/dungeon.png';
import Suelo from '../../assets/Dungeon/suelo1-0.png';
import Suelo_Exterior from '../../assets/Dungeon/suelo1-1.png';
import Suelo_Disco from '../../assets/Dungeon/suelo1-2.png';
import Hierba from '../../assets/Dungeon/Grass.png';
import Calle from '../../assets/Dungeon/street_tileset.png';
import Poste_Down from '../../assets/Dungeon/lamp_down.png';
import Poste_Right from '../../assets/Dungeon/lamp_right.png';

export default class Boot extends Phaser.Scene {

constructor() {
super({ key: 'boot' });
}

preload() {

    this.load('ambulance', Ambulance);
    this.load('arbol', Arbol);
    this.load('jeep', Jeep);
    this.load('luxury', Luxury);
    this.load('blue_civic', Blue_Civic);
    this.load('white_civic', White_Civic);
    this.load('brown_coupe', Brown_Coupe);
    this.load('yellow_coupe', Yellow_Coupe);
    this.load('suv', Suv);
    this.load('supercar', Supercar);
    this.load('police', Police);
    this.load('taxi', Taxi);
    this.load('bus', Bus);
    this.load('chest_idle', Chest_IDLE);
    this.load('chest_empty', Chest_EMPTY);
    this.load('chest_gold', Chest_GOLD);
    this.load('paredes', Paredes);
    this.load('suelo', Suelo);
    this.load('suelo_exterior', Suelo_Exterior);
    this.load('suelo_disco', Suelo_Disco);
    this.load('hierba', Hierba);
    this.load('calle', Calle);
    this.load('poste_down', Poste_Down);
    this.load('poste_right', Poste_Right);
    this.load.tilemapTiledJSON('dungeon_1', Dungeon);

/*
this.load.image('Muebles4', TopDownHouse_FurnitureState1);
this.load.image('Muebles6', TopDownHouse_DoorsAndWindows);
this.load.image('Paredes y suelos', TopDownHouse_FloorsAndWalls);
this.load.image('Objetos pequeños', TopDownHouse_SmallItems);

this.load.tilemapTiledJSON('tutorial', tutorial);
this.load.image('Inventory', Inventory);
this.load.image('monster', MonsterImg);
this.load.image('healthbar', healthbar);
this.load.image('star', Star);


// Idle
this.load.spritesheet('cat_idle', CatIdle, {
frameWidth: 32,
frameHeight: 32
});


// Run
this.load.spritesheet('cat_run', CatRun, {
frameWidth: 32,
frameHeight: 32
});


//Attack gato
this.load.spritesheet('cat_attack', CatAttack, {
    frameWidth: 32,
    frameHeight: 32
});

this.load.spritesheet('rascador', Rascador, {
    frameWidth: 32,
    frameHeight: 32
});


this.load.spritesheet('phone', Phone, {
frameWidth: 32,
frameHeight: 32
});

this.load.spritesheet('star', Star, {
frameWidth: 32,
frameHeight: 32
});


this.load.spritesheet('cat_grabbing', CatGrabbing, {
    frameWidth: 32,
    frameHeight: 32
});

}



create() {


// Animación idle
this.anims.create({
    key: 'cat_idle',
    frames: this.anims.generateFrameNumbers('cat_idle', {
        start: 0,
        end: 7
    }),
    frameRate: 6,
    repeat: -1
});


// Run (10 frames)
this.anims.create({
    key: 'cat_run',
    frames: this.anims.generateFrameNumbers('cat_run', {
        start: 0,
        end: 9
    }),
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
    frames: this.anims.generateFrameNumbers('rascador', { start: 1, end: 4 }), // frames que loopearán
    frameRate: 6,
    repeat: 0 // loop infinito hasta que la pares
});


this.anims.create({
    key: 'cat_grabbing',
    frames: this.anims.generateFrameNumbers('cat_grabbing', { start: 0, end: 2 }),
    frameRate: 6,   // 6 fps, ajusta para que dure como quieras
    repeat: 0        // se reproduce una vez
});
*/

this.scene.start('level');

}

}