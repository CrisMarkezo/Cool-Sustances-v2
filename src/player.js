
import Phaser from 'phaser';

/**
 * Clase que representa el jugador para un juego Top-Down (estilo Isaac).
 */
export default class Player extends Phaser.GameObjects.Sprite {

    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, x, y) {
        super(scene, x, y, 'player');
        this.score = 0;

        // Añadimos a la escena y a las físicas
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        // --- AJUSTES FÍSICOS TOP-DOWN ---
        this.body.setCollideWorldBounds(); // No salir del mapa
        
        // Importante: Si tu configuración global tiene gravedad, esto la anula para el jugador
        this.body.setAllowGravity(false); 
        
        // Hacemos el hitbox un poco más pequeño para que sea más fácil esquivar (estilo Isaac)
        // Suponiendo que el sprite es de 32x32, ajustamos el cuerpo
        // this.body.setSize(20, 20); 
        // this.body.setOffset(6, 12); 

        // Atributos de juego
        this.speed = 300; // Velocidad de movimiento
        
        // UI de Puntuación
        this.label = this.scene.add.text(10, 10, "", { fontSize: 20 });
        this.updateScore();

        // Controles: Añadimos WASD además de cursores (típico en PC)
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.wasd = this.scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });
    }

    point() {
        this.score++;
        this.updateScore();
    }

    updateScore() {
        this.label.text = 'Score: ' + this.score;
        // Aseguramos que el texto se quede fijo en la pantalla si la cámara se mueve
        this.label.setScrollFactor(0); 
    }

    /**
     * Lógica de movimiento Top-Down
     * @override
     */
    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        // 1. Reseteamos la velocidad cada frame para que pare si no pulsamos nada
        this.body.setVelocity(0);

        // 2. Variables para detectar la dirección
        let velocityX = 0;
        let velocityY = 0;

        // --- MOVIMIENTO HORIZONTAL (X) ---
        if (this.cursors.left.isDown || this.wasd.left.isDown) {
            velocityX = -1;
            this.setFlipX(true); // Girar sprite a la izquierda
        } 
        else if (this.cursors.right.isDown || this.wasd.right.isDown) {
            velocityX = 1;
            this.setFlipX(false); // Girar sprite a la derecha
        }

        // --- MOVIMIENTO VERTICAL (Y) ---
        // Aquí está el cambio principal respecto al plataformas: control total del eje Y
        if (this.cursors.up.isDown || this.wasd.up.isDown) {
            velocityY = -1;
        } 
        else if (this.cursors.down.isDown || this.wasd.down.isDown) {
            velocityY = 1;
        }

        // 3. Aplicar velocidad y Normalizar
        // Si nos movemos en diagonal, velocityX y velocityY serán 1 (o -1).
        // Si aplicamos velocidad directamente, la hipotenusa sería mayor (velocidad * 1.41).
        // Phaser nos ayuda a normalizar esto automáticamente.
        
        if (velocityX !== 0 || velocityY !== 0) {
            // Creamos un vector, lo normalizamos y lo escalamos a la velocidad del jugador
            const velocity = new Phaser.Math.Vector2(velocityX, velocityY).normalize().scale(this.speed);
            
            this.body.setVelocity(velocity.x, velocity.y);

            // Opcional: Reproducir animación de caminar
            // if(this.anims) this.anims.play('walk', true);
        } else {
            // Opcional: Parar animación o poner 'idle'
            // if(this.anims) this.anims.play('idle', true);
        }
    }
}