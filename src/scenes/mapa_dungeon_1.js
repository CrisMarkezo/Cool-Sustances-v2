import Phaser from 'phaser';
import Player from '../player.js';

// Dungeon (Mapa)
import Dungeon from '../../assets/dungeon/Dungeon_1.json';
import Ambulance from '../../assets/dungeon/Ambulance.png';
import Arbol from '../../assets/dungeon/arbol.png';
import Jeep from '../../assets/dungeon/BLACK_JEEP.png';
import Luxury from '../../assets/dungeon/black_luxury.png';
import Blue_Civic from '../../assets/dungeon/BLUE_CIVIC.png';
import White_Civic from '../../assets/dungeon/WHITE_CIVIC.png';
import Brown_Coupe from '../../assets/dungeon/BROWN_COUPE.png';
import Yellow_Coupe from '../../assets/dungeon/YELLOW_COUPE.png';
import Suv from '../../assets/dungeon/GREEN_SUV.png';
import Supercar from '../../assets/dungeon/RED_SUPERCAR.png';
import Police from '../../assets/dungeon/POLICE.png';
import Taxi from '../../assets/dungeon/TAXI.png';
import Bus from '../../assets/dungeon/BUS.png';
import Paredes from '../../assets/dungeon/dungeon.png';
import Suelo from '../../assets/dungeon/suelo1-0.png';
import Suelo_Exterior from '../../assets/dungeon/suelo1-1.png';
import Suelo_Disco from '../../assets/dungeon/suelo1-2.png';
import Hierba from '../../assets/dungeon/Grass.png';
import Calle from '../../assets/dungeon/street_tileset.png';
import Poste_Down from '../../assets/dungeon/lamp_down.png';
import Poste_Right from '../../assets/dungeon/lamp_right.png';

// Objetos
import Chest_IDLE from '../../assets/dungeon/Chest_Idle.png';
import Chest_EMPTY from '../../assets/dungeon/Chest_Opening_Empty.png';
import Chest_GOLD from '../../assets/dungeon/Chest_Opening_Gold.png';
import Chest from '../chest.js';

export default class mapa_dungeon_1 extends Phaser.Scene {
    constructor() {
        super({ key: 'mazmorra' });
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

        this.load.spritesheet('chest_idle', Chest_IDLE, {
            frameWidth: 64,
            frameHeight: 64
        });
         this.load.spritesheet('chest_empty', Chest_EMPTY, {
            frameWidth: 32,
            frameHeight: 32
        });
         this.load.spritesheet('chest_gold', Chest_GOLD, {
            frameWidth: 32,
            frameHeight: 32
        });

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
        var calle = map.addTilesetImage('Calle', 'calle');
        var lamp_down = map.addTilesetImage('calle_3', 'poste_down');
        var lamp_right = map.addTilesetImage('calle_2', 'poste_right');
        var suelo_disco = map.addTilesetImage('ciberpunk', 'suelo_disco');
        var chest_idle = map.addTilesetImage('cofre_idle_tile', 'chest_idle');
        var suelo = map.addTilesetImage('disco_suelo', 'suelo');
        var suelo_exterior = map.addTilesetImage('tiles', 'suelo_exterior');
        var hierba = map.addTilesetImage('TX Tileset Grass', 'hierba');
        var taxi = map.addTilesetImage('taxi_tile', 'taxi');
        var ambulance = map.addTilesetImage('ambulance_tile', 'ambulance');
        var civic_1 = map.addTilesetImage('white_civic_tile', 'white_civic');
        var civic_2 = map.addTilesetImage('blue_civic_tile', 'blue_civic');
        var brown_coupe = map.addTilesetImage('brown_coupe_tile', 'brown_coupe');
        var yellow_coupe = map.addTilesetImage('yellow_coupe_tile', 'yellow_coupe');
        var supercar = map.addTilesetImage('red_supercar_tile', 'supercar');
        var luxury = map.addTilesetImage('black_luxury_tile', 'luxury');
        var suv = map.addTilesetImage('green_suv_tile', 'suv');
        var jeep = map.addTilesetImage('black_jeep_tile', 'jeep');
        var bus = map.addTilesetImage('bus_tile', 'bus');
        var police = map.addTilesetImage('police_tile', 'police');

        map.createLayer('Suelo', [paredes, calle, suelo, suelo_disco, suelo_exterior, hierba], 0, 0);
        
        map.createLayer('Cosmeticos_suelo', [paredes, arboles, lamp_down, lamp_right], 0, 0);
        var vacio_layer = map.createLayer('Vacio', paredes, 0, 0);
        var paredes_layer = map.createLayer('Paredes', [paredes, calle, arboles, lamp_down, lamp_right, taxi, 
            ambulance, civic_1, civic_2, brown_coupe, yellow_coupe, supercar, suv, jeep, bus, luxury, police], 0, 0);
        var colisiones_layer = map.createLayer('Colisiones', calle, 0, 0);
        
        colisiones_layer.setVisible(false);
        paredes_layer.setCollisionByExclusion([-1],true);
        colisiones_layer.setCollisionByExclusion([-1],true);
        vacio_layer.setCollisionByExclusion([-1],true);

        const startX = map.widthInPixels / 2;
        const startY = map.heightInPixels / 2;

        this.player = new Player(this, startX-270, startY+1320);
        this.player.speed = 200;

        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setRoundPixels(true);
        this.cameras.main.setZoom(2);
        this.cameras.main.centerOn(this.player.x, this.player.y);

        this.physics.add.collider(this.player, colisiones_layer);
        this.physics.add.collider(this.player, paredes_layer);
        this.physics.add.collider(this.player, vacio_layer);

        this.anims.create({
            key: 'chest_idle_anim',
            frames: [
                { key: 'chest_idle', frame: 0 },
                { key: 'chest_idle', frame: 0 },
                { key: 'chest_idle', frame: 0 },
                { key: 'chest_idle', frame: 1 },
                { key: 'chest_idle', frame: 2 },
                { key: 'chest_idle', frame: 2 },
                { key: 'chest_idle', frame: 2 },
                { key: 'chest_idle', frame: 3 },
                { key: 'chest_idle', frame: 4 },
                { key: 'chest_idle', frame: 4 },
                { key: 'chest_idle', frame: 4 },
                { key: 'chest_idle', frame: 5 },
            ],
            frameRate: 3,
            repeat: -1
        });

        this.createChest(map);
    }

    createChest(map){
        var objetosArr = map.createFromObjects('Cofres', {gid: 8830, classType: Chest});
        for (var i = 0; i < objetosArr.length; i++){
            objetosArr[i].configure(this.player);
            this.physics.add.collider(this.player, objetosArr[i]);
            objetosArr[i].play('chest_idle_anim');
        }
    }
}