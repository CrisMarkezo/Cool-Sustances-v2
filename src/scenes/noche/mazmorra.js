import Phaser from 'phaser';
import Player from './player.js';
import Monster from './monster.js';

export class Mazmorra extends Phaser.Scene {
    constructor() {
        super({ key: 'Mazmorra' });
    }

    init(data) {
        this.spawnX = data.spawnX || 400; 
        this.spawnY = data.spawnY || 300;

        // Enemigos especiales definidos a mano (puedes pasar esto por "data" desde otra escena)
        this.enemigosEspeciales = data.enemigosEspeciales || [
            { x: 800, y: 800, textura: 'boss_golem', drop: 'llave_dorada' },
            { x: 1500, y: 300, textura: 'boss_fantasma', drop: 'pocion_maxima' }
        ];

        // Configuración de los comunes
        this.tiempoSpawn = 3000; 
        this.maxEnemigosComunes = 15;   
    }

    preload() {
        // Carga de assets (enemigos, items, etc.)
    }

    create() {
        this.physics.world.setBounds(0, 0, 2000, 2000);

        this.player = new Player(this, this.spawnX, this.spawnY);
        this.add.existing(this.player);
        this.physics.add.existing(this.player);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        
        // GRUPOS
        this.grupoEnemigos = this.physics.add.group({ classType: Monster, runChildUpdate: false });
        this.grupoItems = this.physics.add.group(); // Grupo para los objetos que caen

        // COLISIONES
        this.physics.add.collider(this.grupoEnemigos, this.grupoEnemigos);
        this.physics.add.overlap(this.player.attackHitbox, this.grupoEnemigos, (hitbox, enemigo) => {
            if (this.player.isAttacking && enemigo.active && enemigo.canBeHit) {
                enemigo.receiveHit(this.player);
            }
        });

        // Detectar si el jugador está sobre un ítem para poder interactuar (tecla E)
        this.physics.add.overlap(this.player, this.grupoItems, (jugador, item) => {
            jugador.nearbyInteractable = item;
        });

        // 1. COLOCAR ENEMIGOS ESPECIALES
        this.enemigosEspeciales.forEach(datos => {
            this.crearEnemigoEspecial(datos.x, datos.y, datos.textura, datos.drop);
        });

        // 2. TEMPORIZADOR PROCEDURAL (Solo comunes)
        this.eventoSpawn = this.time.addEvent({
            delay: this.tiempoSpawn,
            callback: this.generarEnemigoProcedural,
            callbackScope: this,
            loop: true
        });
    }

    update(time, delta) {
        // Limpiamos el interactuable del jugador en cada frame. 
        // Si sigue tocando el ítem, el 'overlap' de físicas lo volverá a asignar casi de inmediato.
        this.player.nearbyInteractable = null;

        this.grupoEnemigos.getChildren().forEach(enemigo => {
            if (enemigo.active) {
                enemigo.update(this.player);
            }
        });
    }

    // --- LÓGICA DE ENEMIGOS ESPECIALES Y DROPS ---

    crearEnemigoEspecial(x, y, textura, tipoDrop) {
        let especial = new Monster(this, x, y, textura);
        
        // "Buffeamos" al enemigo especial
        especial.maxHealth = 150;
        especial.health = 150;
        especial.speed = 25;
        especial.damage = 25;
        especial.setScale(1.5);

        // Añadimos al grupo
        this.grupoEnemigos.add(especial, true);

        // MAGIA AQUÍ: Sobrescribimos temporalmente su método die() para que suelte el ítem
        const dieOriginal = especial.die.bind(especial);
        
        especial.die = () => {
            this.soltarItem(especial.x, especial.y, tipoDrop);
            dieOriginal(); // Llama al die() normal para que desaparezca
        };
    }

    soltarItem(x, y, tipoDrop) {
        // Creamos el sprite del ítem en el suelo
        let item = this.grupoItems.create(x, y, tipoDrop);
        
        // Le añadimos la función interact() que tu Player.js espera llamar
        item.interact = (jugador) => {
            console.log(`¡Has recogido: ${tipoDrop}!`);
            
            // Aquí llamarías a la lógica de tu inventario:
            // jugador.inventory.addItem(tipoDrop);
            
            jugador.nearbyInteractable = null;
            item.destroy(); // El ítem desaparece del suelo
        };

        // Pequeña animación para que se note que cayó un objeto (salta un poquito)
        this.tweens.add({
            targets: item,
            y: item.y - 20,
            duration: 250,
            yoyo: true,
            ease: 'Sine.easeOut'
        });
    }

    // --- LÓGICA DE SPAWN COMÚN ---

    generarEnemigoProcedural() {
        if (this.grupoEnemigos.countActive(true) >= this.maxEnemigosComunes) return;

        const anguloAleatorio = Phaser.Math.FloatBetween(0, Math.PI * 2);
        const distanciaAleatoria = Phaser.Math.Between(300, 600);
        let spawnX = Phaser.Math.Clamp(this.player.x + Math.cos(anguloAleatorio) * distanciaAleatoria, 20, 1980);
        let spawnY = Phaser.Math.Clamp(this.player.y + Math.sin(anguloAleatorio) * distanciaAleatoria, 20, 1980);

        let enemigo = this.grupoEnemigos.getFirstDead(false);

        if (enemigo) {
            enemigo.setTexture('slime');
            enemigo.setPosition(spawnX, spawnY);
            enemigo.setActive(true).setVisible(true);
            enemigo.body.enable = true;
            enemigo.health = enemigo.maxHealth = 50; 
            enemigo.waypoints = [{ x: spawnX, y: spawnY }, { x: spawnX + 100, y: spawnY }];
            enemigo.currentWaypointIndex = 0;
        } else {
            enemigo = new Monster(this, spawnX, spawnY, 'slime');
            this.grupoEnemigos.add(enemigo, true);
        }
        enemigo.setCollideWorldBounds(true);
    }
}