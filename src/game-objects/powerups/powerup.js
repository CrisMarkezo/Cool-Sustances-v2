import Phaser from 'phaser';
import InteractableObject from '../../InteractableObject';

export default class PowerUp extends InteractableObject {

    constructor(scene, x, y, texture, type, num) {
        super(scene, x, y, texture);

        scene.physics.add.existing(this);
        scene.add.existing(this);

        this.body.setSize(100, 100);
        
        this.type = type;
        this.parameter = num;

        // Texto flotante de la interfaz
        this.infoText = scene.add.text(x, y - 20, this.getDescription(), {
            fontFamily: 'monospace',
            fontSize: '14px',
            color: '#ffffff',
            backgroundColor: '#000000aa',
            padding: { x: 8, y: 4 },
            align: 'center'
        });

        this.infoText.setOrigin(0.5, 1);
        this.infoText.setVisible(false);
        this.infoText.setDepth(100);
    }

    getDescription() {
        switch(this.type) {
            case 'health': 
                return `+${this.parameter} Vida\n(Pulsa E para coger)`;
            case 'speed': 
                return `+${this.parameter} Velocidad\n(Pulsa E para coger)`;
            case 'damage': 
                return `+${this.parameter} Daño\n(Pulsa E para coger)`;
            case 'attack_speed': 
                return `+${this.parameter} Velocidad de ataque\n(Pulsa E para coger)`;
            default: 
                return `Objeto desconocido\n(Pulsa E para coger)`;
        }
    }

    configure(player){
        this.player = player;
        this.body.allowGravity = false;
        this.body.immovable = true;
        this.interactionRadius = 30;
        this.intefaceRadius = 100;
    }   

    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        if (!this.player) return;

        const distancia = Phaser.Math.Distance.Between(this.x, this.y, this.player.x, this.player.y);

        if (distancia < this.interactionRadius) {
            if (!this.player.nearbyInteractable || this.player.nearbyInteractable === this) {
                this.player.nearbyInteractable = this;
                this.infoText.setVisible(true);
            }
        } else if (this.player.nearbyInteractable === this) {
            this.player.nearbyInteractable = null;
            this.infoText.setVisible(false);
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

        this.infoText.setVisible(false);
        this.applyEffect(player);
    }

    // Método que se llama cuando el jugador consigue el objeto
    applyEffect(player) {
        // Método abstracto
        throw new Error('Debes implementar applyEffect()');
    }
}