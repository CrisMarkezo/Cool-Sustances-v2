import Phaser from 'phaser';

export default class GameEntity extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setCollideWorldBounds(true);
        this.body.setAllowGravity(false);

        this.isInteractable = false; 

        this.maxHealth = 100;
        this.health = 100;
        
        this.healthBarGraphics = scene.add.graphics();
        this.healthBarGraphics.setDepth(3000); 
        this.healthBarGraphics.setScrollFactor(1); 

        // 🔥 FIX IMPORTANTE AQUÍ
        this.uiBarGraphics = scene.add.graphics();
        this.uiBarGraphics.setDepth(9999); 
        this.uiBarGraphics.setScrollFactor(0); // ✅ ahora es UI real
    }

    drawHealthBar(x, y, width, height) {
        this.healthBarGraphics.clear();

        if (this.scene.inventoryOpen || this.health <= 0) return;

        const percentage = this.health / this.maxHealth;

        this.healthBarGraphics.fillStyle(0x000000);
        this.healthBarGraphics.fillRect(x - 1, y - 1, width + 2, height + 2);

        this.healthBarGraphics.fillStyle(0xff0000); 
        this.healthBarGraphics.fillRect(x, y, width * percentage, height);
    }

    drawUIHealthBar(x, y, width, height) {
        this.uiBarGraphics.clear();

        if (this.scene.inventoryOpen || this.health <= 0) return;

        const percentage = this.health / this.maxHealth;

        this.uiBarGraphics.fillStyle(0x000000);
        this.uiBarGraphics.fillRect(x - 0.5, y - 0.5, width + 1, height + 1);

        this.uiBarGraphics.fillStyle(0x00ff00); 
        this.uiBarGraphics.fillRect(x, y, width * percentage, height);
    }

    pushBack(direction, force = 100) {
        if (this.isImmovable()) return;

        const velocity = new Phaser.Math.Vector2(direction.x, direction.y)
            .normalize()
            .scale(force);

        this.body.setVelocity(velocity.x, velocity.y);
    }

    isImmovable() {
        return this.body.immovable || this.isInteractable;
    }
}