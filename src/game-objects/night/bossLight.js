import Phaser from 'phaser';

export default class BossLight extends Phaser.GameObjects.Sprite {
    /**
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {Phaser.GameObjects.GameObject} target - El gato (jugador)
     * @param {number} frameId - ID del sprite en bossPhase.png
     */
    constructor(scene, x, y, target, frameId) {
        super(scene, x, y, 'bossPhase', frameId);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.target = target;
        this.frameId = frameId;
        
        // Estáticas: funcionan como baldosas o zonas
        this.body.setImmovable(true);
        this.setAlpha(0.8);

        // Efecto visual de pulsación para que el jugador sepa dónde ponerse
        scene.tweens.add({
            targets: this,
            scale: { from: 0.9, to: 1.2 },
            alpha: { from: 0.5, to: 0.9 },
            duration: 600,
            yoyo: true,
            repeat: -1
        });
    }

    // Comprueba si el gato está pisando la luz
    isPlayerInside() {
        return Phaser.Geom.Intersects.RectangleToRectangle(this.getBounds(), this.target.getBounds());
    }
}