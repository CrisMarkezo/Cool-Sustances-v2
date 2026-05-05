import Phaser from 'phaser';
import Player from '../game-objects/night/player.js';
import Monster from '../game-objects/night/monster.js';
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
import Adornos_1 from '../../assets/dungeon/decorations.png';
import Adornos_2 from '../../assets/dungeon/decorations_2.png';
import Banio from '../../assets/dungeon/dirty_publicbathroom_set_withshadow.png';
import Decorative from '../../assets/dungeon/decorative.png';
import Estrella from '../../assets/dungeon/estrella.png';
import Suelo_Boss from '../../assets/dungeon/mainlevbuild.png';
import Fondo_Boss from '../../assets/dungeon/Space Background.png'

// Objetos
import Boss from '../game-objects/night/boss.js';
import Chest_IDLE from '../../assets/dungeon/Chest_Idle.png';
import Chest_EMPTY from '../../assets/dungeon/Chest_Opening_Empty.png';
import Chest_GOLD from '../../assets/dungeon/Chest_Opening_Gold.png';
import Llave_Boss from '../../assets/dungeon/llave_boss.png';
import Barrote from '../../assets/dungeon/barrote_boss.png';
import Cubo_png from '../../assets/dungeon/cubo.png';
import Puerta_1 from '../../assets/dungeon/puerta_1.png';

import Chest from '../game-objects/night/chest.js';
import Boss_Door from '../game-objects/night/boss_door.js';
import Cubo from '../game-objects/night/cubo.js';
import Garbage_Door from '../game-objects/night/garbage_door.js';
import Balcony_Door from '../game-objects/night/balcony_door.js';
import Warehouse_Door from '../game-objects/night/warehouse_door.js';

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

        this.load.image('arbol', Arbol);
        this.load.image('paredes', Paredes);
        this.load.image('suelo', Suelo);
        this.load.image('suelo_exterior', Suelo_Exterior);
        this.load.image('suelo_disco', Suelo_Disco);
        this.load.image('suelo_boss', Suelo_Boss);
        this.load.image('hierba', Hierba);
        this.load.image('calle', Calle);
        this.load.image('poste_down', Poste_Down);
        this.load.image('poste_right', Poste_Right);
        this.load.image('adornos_1', Adornos_1);
        this.load.image('adornos_2', Adornos_2);
        this.load.image('banio', Banio);
        this.load.image('estrella', Estrella);
        this.load.image('decorative', Decorative);
        this.load.image('fondo', Fondo_Boss);
        this.load.image('suelo_boss', Suelo_Boss);
        this.load.image('barrote', Barrote);
        this.load.image('llave_boss', Llave_Boss);

        this.load.spritesheet('puerta_1', Puerta_1, {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet('cubo', Cubo_png, {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet('chest_idle', Chest_IDLE, {
            frameWidth: 64,
            frameHeight: 64
        });
         this.load.spritesheet('chest_empty', Chest_EMPTY, {
            frameWidth: 64,
            frameHeight: 64
        });
         this.load.spritesheet('chest_gold', Chest_GOLD, {
            frameWidth: 64,
            frameHeight: 64
        });

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
        var decoraciones = map.addTilesetImage('decoraciones', 'adornos_1');
        var decoraciones_2 = map.addTilesetImage('decoraciones_2', 'adornos_2');
        var estrella = map.addTilesetImage('estrella3', 'estrella');
        var decorative = map.addTilesetImage('CATacombs', 'decorative');
        var fondo = map.addTilesetImage('fondo_infierno', 'fondo');
        var banio = map.addTilesetImage('baño_publico', 'banio');
        var suelo_boss = map.addTilesetImage('Suelo', 'suelo_boss');

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

        var suelo = map.createLayer('Suelo', [paredes, calle, suelo, suelo_disco, suelo_exterior, hierba, banio, suelo_boss, decorative], 0, 0);
        var fondo_layer = map.createLayer('Fondo', [fondo, estrella, suelo_exterior, banio], 0, 0);
        var cosmeticos_suelo = map.createLayer('Cosmeticos_suelo', [paredes, arboles, lamp_down, lamp_right, 
            decoraciones, decoraciones_2, banio, suelo_boss, decorative, calle], 0, 0);
        var vacio_layer = map.createLayer('Vacio', [paredes, banio, suelo_boss], 0, 0);
        var colisiones_layer = map.createLayer('Colisiones', calle, 0, 0);
        var paredes_layer = map.createLayer('Paredes', [paredes, calle, arboles, lamp_down, lamp_right, taxi, 
            ambulance, civic_1, civic_2, brown_coupe, yellow_coupe, supercar, suv, jeep, bus, luxury, police, 
            banio, suelo_boss, decorative, decoraciones_2, suelo_exterior], 0, 0);
        
        cosmeticos_suelo.setDepth(20);
        colisiones_layer.setVisible(false);
        paredes_layer.setCollisionByExclusion([-1],true);
        colisiones_layer.setCollisionByExclusion([-1],true);

        const startX = map.widthInPixels / 2;
        const startY = map.heightInPixels / 2;

        this.player = new Player(this, startX-265, startY+1220);
        this.player.speed = 200;

        this.gameOverImage = this.add.image(this.player.x, this.player.y, 'gameover');
        this.gameOverImage.setDepth(99999);
        this.gameOverImage.setVisible(false);
        this.gameOverImage.setScale(0.23);
        
        // Enemigos
        this.monsters = [];
        this.monsters.push(new Monster(this, startX - 270, startY + 1040));
        this.monsters.push(new Monster(this, startX - 350, startY + 1050));
        this.monsters.push(new Monster(this, startX - 900, startY + 1050));
        this.monsters.push(new Monster(this, startX + 100, startY + 1020));
        this.monsters.push(new Monster(this, startX + 300, startY + 900));
        this.monsters.push(new Monster(this, startX + 500, startY + 1040));
        this.monsters.push(new Monster(this, startX + 700, startY + 1040));
        this.monsters.push(new Monster(this, startX + 800, startY + 800));
        this.monsters.push(new Monster(this, startX + 800, startY + 500));
        this.monsters.push(new Monster(this, startX + 500, startY + 600));
        this.monsters.push(new Monster(this, startX + 660, startY + 100));
        this.monsters.push(new Monster(this, startX + 720, startY + 100));
        this.monsters.push(new Monster(this, startX + 350, startY+90));
        this.monsters.push(new Monster(this, startX + 290, startY+90));
        this.monsters.push(new Monster(this, startX + 150, startY+60));
        this.monsters.push(new Monster(this, startX + 100, startY+400));
        this.monsters.push(new Monster(this, startX - 100, startY+400));
        this.monsters.push(new Monster(this, startX - 100, startY+600));
        this.monsters.push(new Monster(this, startX - 350, startY+600));
        this.monsters.push(new Monster(this, startX - 500, startY+400));
        this.monsters.push(new Monster(this, startX - 900, startY+600));
        this.monsters.push(new Monster(this, startX - 900, startY+450));
        this.monsters.push(new Monster(this, startX - 750, startY));
        this.monsters.push(new Monster(this, startX -1000, startY));
        this.monsters.push(new Monster(this, startX, startY+300));
        this.monsters.push(new Monster(this, startX + 540, startY + 100));
        this.monsters.push(new Monster(this, startX + 340, startY + 500));
        this.monsters.push(new Monster(this, startX + 200, startY + 800));
        this.monsters.push(new Monster(this, startX , startY + 800));
        this.monsters.push(new Monster(this, startX-500 , startY + 800));
        this.monsters.push(new Monster(this, startX +1100, startY + 300));
        this.monsters.push(new Monster(this, startX +1100, startY));
        this.monsters.push(new Monster(this, startX +1150, startY-100));
        this.monsters.push(new Monster(this, startX, startY-250));
        this.monsters.push(new Monster(this, startX+300, startY-250));
        this.monsters.push(new Monster(this, startX+300, startY-500));
        this.monsters.push(new Monster(this, startX, startY-500));
        this.monsters.push(new Monster(this, startX, startY-700));
        this.monsters.push(new Monster(this, startX-350, startY-700));
        this.monsters.push(new Monster(this, startX-350, startY-400));
        this.monsters.push(new Monster(this, startX-350, startY+50));
        
        this.monsters.forEach(monster => {
        this.physics.add.collider(monster, colisiones_layer);
        this.physics.add.collider(monster, paredes_layer);

        this.physics.add.overlap(this.player, monster, this.handlePlayerMonsterContact, null, this);
        this.physics.add.overlap(this.player.attackHitbox, monster, this.hitMonster, null, this);
        });


        // --- BOSS (EL CAMBIO IMPORTANTE ESTÁ AQUÍ) ---
        this.boss = new Boss(this, startX - 800, startY-250);
        
        // Si la clase Boss no lo hace en su constructor, hay que forzarlo:
        this.add.existing(this.boss); 
        this.physics.add.existing(this.boss);

        // Colisiones y Daño para el Boss
        this.physics.add.collider(this.boss, colisiones_layer);
        this.physics.add.collider(this.boss, paredes_layer);
        this.physics.add.overlap(this.player, this.boss, this.handlePlayerMonsterContact, null, this);
        this.physics.add.overlap(this.player.attackHitbox, this.boss, this.hitMonster, null, this);   

        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setZoom(4);
        this.cameras.main.setRoundPixels(true);
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

        this.anims.create({
            key: 'chest_opening_gold_anim',
            frames: [
                { key: 'chest_gold', frame: 0 },
                { key: 'chest_gold', frame: 1 },
                { key: 'chest_gold', frame: 2 },
                { key: 'chest_gold', frame: 3 },
                { key: 'chest_gold', frame: 4 },
                { key: 'chest_gold', frame: 5 },
            ],
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'chest_empty_anim',
            frames: [
                { key: 'chest_empty', frame: 0 },
                { key: 'chest_empty', frame: 1 },
                { key: 'chest_empty', frame: 2 },
                { key: 'chest_empty', frame: 3 },
                { key: 'chest_empty', frame: 4 },
                { key: 'chest_empty', frame: 5 },
            ],
            frameRate: 10,
            repeat: 0
        });

        this.createChest(map);
        this.createPuertaBoss(map);
        this.createCubos(map, paredes_layer);
        this.createPuertaBasura(map);
        this.createPuertaBalcon(map);
        this.createPuertaAlmacen(map);
    }

    update() {
        const cam = this.cameras.main;
        if (!this.isGameOver && this.player.health <= 0) {
            this.triggerGameOver();
        }

        if (this.isGameOver) {
            this.gameOverImage.setPosition(cam.worldView.centerX, cam.worldView.centerY);
            return;
        }

        if (this.monsters) {
            this.monsters.forEach(monster => {
                monster.update(this.player);
            });
        }
        if (this.boss && this.boss.active) {
            this.boss.update(this.player);
        }

        if (this.boss && this.boss.health <= 0) {
            this.scene.start('start-menu');
        }

        if (this.player && this.player.health <= 0) {
            this.scene.restart();
            this.player.revive();
        }
    }


    createChest(map){
        var objetosArr = map.createFromObjects('Cofres', {gid: 8830, classType: Chest});
        for (var i = 0; i < objetosArr.length; i++){
            objetosArr[i].configure(this.player);
            this.physics.add.collider(this.player, objetosArr[i]);
            objetosArr[i].play('chest_idle_anim');
        }
    }

    createPuertaBoss(map){
        var objetosArr = map.createFromObjects('Puerta_Boss', {gid: 10477, classType: Boss_Door, key: 'barrote'});
        for (var i = 0; i < objetosArr.length; i++){
            objetosArr[i].configure(this.player, objetosArr);
            this.physics.add.collider(this.player, objetosArr[i]);
        }
    }

    createPuertaBasura(map){
        var objetosArr = map.createFromObjects('Puerta_Basurero', {gid: 1131, classType: Garbage_Door, key: 'puerta_1'});
        for (var i = 0; i < objetosArr.length; i++){
            objetosArr[i].configure(this.player, objetosArr);
            this.physics.add.collider(this.player, objetosArr[i]);
        }
    }

    createPuertaBalcon(map){
        var objetosArr = map.createFromObjects('Puerta_Balcon', {id: 97, classType: Balcony_Door, key: 'puerta_1'});
        for (var i = 0; i < objetosArr.length; i++){
            objetosArr[i].configure(this.player, objetosArr);
            this.physics.add.collider(this.player, objetosArr[i]);
        }
    }

    createPuertaAlmacen(map){
        var objetosArr = map.createFromObjects('Puerta_Almacen', {id: 100, classType: Warehouse_Door, key: 'puerta_1'});
        for (var i = 0; i < objetosArr.length; i++){
            objetosArr[i].configure(this.player, objetosArr);
            this.physics.add.collider(this.player, objetosArr[i]);
        }
    }

    createCubos(map, paredes){
        var objetosArr = map.createFromObjects('Cubos', {gid: 9072, classType: Cubo, key: 'cubo'});
        for (var i = 0; i < objetosArr.length; i++){
            this.physics.add.collider(paredes, objetosArr[i]);
            this.physics.add.collider(this.player, objetosArr[i], this.pushCube, null, this);
            objetosArr[i].setDrag(1000);
        }
    }

    pushCube(player, cubo){
        player.isPushing = true;

        let blocked = false;

        if (player.body.touching.right && cubo.body.blocked.right) 
            blocked = true;
        else if (player.body.touching.left && cubo.body.blocked.left) 
            blocked = true;
        else if (player.body.touching.down && cubo.body.blocked.down) 
            blocked = true;
        else if (player.body.touching.up && cubo.body.blocked.up) 
            blocked = true;

        // Si está atrapado, el cubo se vuelve inamovible.
        // Si vas por el otro lado y lo arrastras a un lugar libre, atrapado será false y volverá a moverse.
        cubo.setImmovable(blocked);
    }

    hitMonster(hitbox, monster) {
        if (this.player.isAttacking && monster.canBeHit && hitbox.body.enable) {
            monster.receiveHit(this.player);
            hitbox.body.enable = false;
        }
    }

    triggerGameOver() {
        this.isGameOver = true;
        this.physics.pause();
        this.player.body.setVelocity(0, 0);
        this.gameOverImage.setVisible(true);
        this.gameOverImage.setPosition(
            this.cameras.main.worldView.centerX,
            this.cameras.main.worldView.centerY
        );

    }
}