import Phaser from 'phaser';
import Player from '../../player.js';

// Dungeon
import Dungeon from '../../../assets/Dungeon/Dungeon_1.json';
import Ambulance from '../../../assets/Dungeon/Ambulance.png';
import Arbol from '../../../assets/Dungeon/arbol.png';
import Jeep from '../../../assets/Dungeon/BLACK_JEEP.png';
import Luxury from '../../../assets/Dungeon/BLACK_LUXURY.png';
import Blue_Civic from '../../../assets/Dungeon/BLUE_CIVIC.png';
import White_Civic from '../../../assets/Dungeon/WHITE_CIVIC.png';
import Brown_Coupe from '../../../assets/Dungeon/BROWN_COUPE.png';
import Yellow_Coupe from '../../../assets/Dungeon/Yellow_COUPE.png';
import Suv from '../../../assets/Dungeon/GREEN_SUV.png';
import Supercar from '../../../assets/Dungeon/RED_SUPERCAR.png';
import Police from '../../../assets/Dungeon/POLICE.png';
import Taxi from '../../../assets/Dungeon/TAXI.png';
import Bus from '../../../assets/Dungeon/BUS.png';
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
        this.load.spritesheet('ambulance', Ambulance, { frameWidth: 140, frameHeight: 140 });
        this.load.spritesheet('jeep', Jeep, { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('luxury', Luxury, { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('blue_civic', Blue_Civic, { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('white_civic', White_Civic, { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('brown_coupe', Brown_Coupe, { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('yellow_coupe', Yellow_Coupe, { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('suv', Suv, { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('supercar', Supercar, { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('police', Police, { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('taxi', Taxi, { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('bus', Bus, { frameWidth: 210, frameHeight: 210 });
        this.load.spritesheet('chest_idle', Chest_IDLE, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('chest_empty', Chest_EMPTY, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('chest_gold', Chest_GOLD, { frameWidth: 32, frameHeight: 32 });

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
    }

    create() {
        var map = this.make.tilemap({ key: 'dungeon_1' });

        var paredes = map.addTilesetImage('paredes', 'paredes');
        var arboles = map.addTilesetImage('arbol', 'arbol');
        var bus = map.addTilesetImage('bus', 'bus');
        var calle = map.addTilesetImage('Calle', 'calle');
        var lamp_down = map.addTilesetImage('calle_3', 'poste_dowm');
        var lamp_right = map.addTilesetImage('calle_2', 'poste_right');
        var suelo_disco = map.addTilesetImage('ciberpunk', 'suelo_disco');
        var supercar = map.addTilesetImage('Coche_10', 'supercar');
        var police = map.addTilesetImage('policia', 'police');
        var brown_coupe = map.addTilesetImage('coche_3', 'brown_coupe');
        var jeep = map.addTilesetImage('Coche_4', 'jeep');
        var ambulance = map.addTilesetImage('Coche_5', 'ambulance');
        var yellow_coupe = map.addTilesetImage('Coche_6', 'yellow_coupe');
        var taxi = map.addTilesetImage('coche_7', 'taxi');
        var suv = map.addTilesetImage('Coche_8', 'suv');
        var white_civic = map.addTilesetImage('coche2', 'white_civic');
        var blue_civic = map.addTilesetImage('coches', 'blue_civic');
        var luxury = map.addTilesetImage('cochre_6', 'luxury');
        var chest_idle = map.addTilesetImage('cofre', 'chest_idle');
        var suelo = map.addTilesetImage('disco_suelo', 'suelo');
        var suelo_exterior = map.addTilesetImage('tiles', 'suelo_exterior');
        var hierba = map.addTilesetImage('TX Tileset Grass', 'hierba');

        map.createLayer('Suelo', [calle, suelo, suelo_disco, suelo_exterior, hierba, chest_idle], 0, 0);
        map.createLayer('Vacio', paredes, 0, 0);
        map.createLayer('Cosmeticos_suelo', paredes, 0, 0);
        var colisiones_layer = map.createLayer('Colisiones', calle, 0, 0);
        var paredes_layer = map.createLayer('Paredes', [paredes, calle, bus, supercar, police, brown_coupe, jeep, ambulance, yellow_coupe, taxi, 
            suv, white_civic, blue_civic, luxury, arboles, lamp_down, lamp_right], 0, 0);

        paredes_layer.setCollisionByExclusion([-1],true);
        colisiones_layer.setCollisionByExclusion([-1],true);


        const startX = map.widthInPixels / 2;
        const startY = map.heightInPixels / 2;

        // this.player = new Player(this, 72, 171);

        // this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        // this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        // this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        // this.cameras.main.setRoundPixels(true);
        // this.cameras.main.setZoom(5);
        // this.cameras.main.centerOn(this.player.x, this.player.y);

        // this.anims.create({
        //     key: 'cat_idle',
        //     frames: this.anims.generateFrameNumbers('cat_idle', {
        //         start: 0,
        //         end: 7
        //     }),
        //     frameRate: 6,
        //     repeat: -1
        // });

        // // Run (10 frames)
        // this.anims.create({
        //     key: 'cat_run',
        //     frames: this.anims.generateFrameNumbers('cat_run', {
        //         start: 0,
        //         end: 9
        //     }),
        //     frameRate: 12,
        //     repeat: -1
        // });


        // this.anims.create({
        //     key: 'cat_attack',
        //     frames: [
        //         { key: 'cat_attack', frame: 0 },
        //         { key: 'cat_attack', frame: 1 },

                
        //         { key: 'cat_attack', frame: 2 },
        //         { key: 'cat_attack', frame: 2 },
        //         { key: 'cat_attack', frame: 2 },

        //         { key: 'cat_attack', frame: 3 },
        //         { key: 'cat_attack', frame: 4 },
        //         { key: 'cat_attack', frame: 5 }
        //     ],
        //     frameRate: 14,
        //     repeat: 0
        // });
    }

    update() {
        
    }
}