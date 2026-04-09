import Phaser from 'phaser';

export default class PowerUp extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture, type, num) {
        super(scene, x, y, texture);

        scene.add.existing(this);

        this.type = type;
        this.parameter = num; 
    }

    interact(player) {

        if (player.isGrabbing) return;

        player.isGrabbing = true;
        player.setVelocity(0);
        this.applyEffect(player);

        player.anims.play('cat_grabbing', true);

        player.once('animationcomplete', () => {   
            player.isGrabbing = false;
            player.anims.play('cat_idle', true);
        });
        this.destroy();
    }

    // Método que se llama cuando el jugador consigue el objeto
    applyEffect(player) {
        switch (this.type) {
            case 'max_health':
                player.maxHealth += this.parameter; 
                player.health +=  this.parameter;
                break;

            case 'health':
                player.health = Math.min(player.health + this.parameter, player.maxHealth);
                break;

            case 'speed':
                player.speed += this.parameter; 
                break;

            case 'damage':
                player.damage += this.parameter;
                break;

            case 'attack_speed':
                player.attackCooldown = Math.max(0, player.attackCooldown - this.parameter);
                break;
        }
        this.destroy();
    }
}