import Phaser from 'phaser';
import InteractableObject from './InteractableObject';

export default class PowerUp extends InteractableObject {

    constructor(scene, x, y, texture, type, num) {
        super(scene, x, y, texture);

        scene.physics.add.existing(this);
        scene.add.existing(this);

        this.body.setSize(100, 100);
        
        this.type = type;
        this.parameter = num;
        this.interactionRadius = 50; 
    }

    configure(player){
        this.player = player;
        this.body.allowGravity = false;
        this.body.immovable = true;
    }   

    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        if (!this.player) return;

        const distancia = Phaser.Math.Distance.Between(this.x, this.y, this.player.x, this.player.y);

        if (distancia < this.interactionRadius) {
            if (!this.player.nearbyInteractable || this.player.nearbyInteractable === this) {
                this.player.nearbyInteractable = this;
            }
        } else if (this.player.nearbyInteractable === this) {
            this.player.nearbyInteractable = null;
        }
    }

    interact(player) {

        if (player.isGrabbing) 
            return;

        player.isGrabbing = true;
        player.body.setVelocity(0);

        player.anims.play('cat_grabbing', true);

        player.once('animationcomplete', () => {   
            player.isGrabbing = false;
            player.anims.play('cat_idle', true);
        });
        player.nearbyInteractable = null;

        this.applyEffect(player);
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