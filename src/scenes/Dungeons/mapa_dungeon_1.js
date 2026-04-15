import Phaser from 'phaser';
import Player from '../../player.js';

import CatIdle from '../../../assets/sprites/Cat_Idle.png';
import CatRun from '../../../assets/sprites/Cat_Run.png';
import CatAttack from '../../../assets/sprites/Cat_Attack.png';

// Dungeon
import Dungeon from '../../../assets/Dungeon/Dungeon_1.json';
import Ambulance from '../../../assets/Dungeon/ambulance.png';
import Arbol from '../../../assets/Dungeon/arbol.png';
import Jeep from '../../../assets/Dungeon/black_jeep.png';
import Luxury from '../../../assets/Dungeon/black_luxury.png';
import Blue_Civic from '../../../assets/Dungeon/blue_civic.png';
import White_Civic from '../../../assets/Dungeon/white_civic.png';
import Brown_Coupe from '../../../assets/Dungeon/brown_coupe.png';
import Yellow_Coupe from '../../../assets/Dungeon/yellow_coupe.png';
import Suv from '../../../assets/Dungeon/green_suv.png';
import Supercar from '../../../assets/Dungeon/red_supercar.png';
import Police from '../../../assets/Dungeon/police.png';
import Taxi from '../../../assets/Dungeon/taxi.png';
import Bus from '../../../assets/Dungeon/bus.png';
import Chest_IDLE from '../../../assets/Dungeon/Chest_Idle.png';
import Chest_EMPTY from '../../../assets/Dungeon/Chest_Opening_Empty.png';
import Chest_GOLD from '../../../assets/Dungeon/Chest_Opening_Gold.png';
import Paredes from '../../../assets/Dungeon/dungeon.png';
import Suelo from '../../../assets/Dungeon/suelo1-0.png';
import Suelo_Exterior from '../../../assets/Dungeon/suelo1-1.png';
import Suelo_Disco from '../../../assets/Dungeon/suelo1-2.png';
import Hierba from '../../../assets/Dungeon/Grass.png';
import Calle from '../../../assets/Dungeon/street_tileset.png';
import Poste_Down from '../../../assets/Dungeon/lamp_down.png';
import Poste_Right from '../../../assets/Dungeon/lamp_right.png';

export default class mapa_dungeon_1 extends Phaser.Scene {
    constructor() {
        super({ key: 'dungeon_1' });
    }

    preload(){
        this.load.image('ambulance', Ambulance);
        this.load.image('jeep', Jeep);
        this.load.image('luxury', Luxury);
        this.load.image('blue_civic', Blue_Civic);
        this.load.image('white_civic', White_Civic);
        this.load.image('brown_coupe', Brown_Coupe);
        this.load.image('yellow_coupe', Yellow_Coupe);
        this.load.image('suv', Suv);
        this.load.image('supercar', Supercar);
        this.load.image('police', Police);
        this.load.image('taxi', Taxi);
        this.load.image('bus', Bus);
        this.load.image('chest_idle', Chest_IDLE);
        this.load.image('chest_empty', Chest_EMPTY);
        this.load.image('chest_gold', Chest_GOLD);

        this.load.image('arbol', Arbol);
        this.load.image('paredes', Paredes);
        this.load.image('suelo', Suelo);
        this.load.image('suelo_exterior', Suelo_Exterior);
        this.load.image('suelo_disco', Suelo_Disco);
        this.load.image('hierba', Hierba);
        this.load.image('calle', Calle);
        this.load.image('poste_down', Poste_Down);
        this.load.image('poste_right', Poste_Right);
        this.load.tilemapTiledJSON('dungeon_1', Dungeon);

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
    }

    create() {
        var map = this.make.tilemap({ key: 'dungeon_1' });

        var paredes = map.addTilesetImage('paredes', 'paredes');
        var arboles = map.addTilesetImage('arbol', 'arbol');
        var calle = map.addTilesetImage('Calle', 'calle');
        var lamp_down = map.addTilesetImage('calle_3', 'poste_down');
        var lamp_right = map.addTilesetImage('calle_2', 'poste_right');
        var suelo_disco = map.addTilesetImage('ciberpunk', 'suelo_disco');
        //var chest_idle = map.addTilesetImage('cofre', 'chest_idle');
        var suelo = map.addTilesetImage('disco_suelo', 'suelo');
        var suelo_exterior = map.addTilesetImage('tiles', 'suelo_exterior');
        var hierba = map.addTilesetImage('TX Tileset Grass', 'hierba');
        var taxi = map.addTilesetImage('taxi_tile', 'taxi');
        var ambulance = map.addTilesetImage('ambulance_tile', 'ambulance');
        var civic_1 = map.addTilesetImage('white_civic', 'civic_1');
        var civic_2 = map.addTilesetImage('blue_civic', 'civic_2');
        var brown_coupe = map.addTilesetImage('brown_coupe_tile', 'brown_coupe');
        var yellow_coupe = map.addTilesetImage('yellow_coupe_tile', 'yellow_coupe');
        var supercar = map.addTilesetImage('red_supercar_tile', 'supercar');
        var luxury = map.addTilesetImage('black_luxury_tile', 'luxury');
        var suv = map.addTilesetImage('green_suv_tile', 'suv');
        var jeep = map.addTilesetImage('black_jeep_tile', 'jeep');
        var bus = map.addTilesetImage('bus_tile', 'bus');

        map.createLayer('Suelo', [paredes, calle, suelo, suelo_disco, suelo_exterior, hierba], 0, 0);
        map.createLayer('Vacio', paredes, 0, 0);
        map.createLayer('Cosmeticos_suelo', [paredes, arboles, lamp_down, lamp_right], 0, 0);
        var paredes_layer = map.createLayer('Paredes', [paredes, calle, arboles, lamp_down, lamp_right, taxi, ambulance, civic_1, civic_2, brown_coupe, yellow_coupe, supercar, suv, jeep, bus, luxury], 0, 0);
        var colisiones_layer = map.createLayer('Colisiones', calle, 0, 0);
        colisiones_layer.setVisible(false);

        paredes_layer.setCollisionByExclusion([-1],true);
        colisiones_layer.setCollisionByExclusion([-1],true);

        const startX = map.widthInPixels / 2;
        const startY = map.heightInPixels / 2;

        this.player = new Player(this, startX, startY);
        this.player.speed = 300;

        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setRoundPixels(true);
        this.cameras.main.setZoom(2);
        this.cameras.main.centerOn(this.player.x, this.player.y);

        this.physics.add.collider(this.player, colisiones_layer);
        this.physics.add.collider(this.player, paredes_layer);

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

    }

    update() {
        
    }
}