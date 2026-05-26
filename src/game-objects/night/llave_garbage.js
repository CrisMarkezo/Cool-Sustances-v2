import InteractableObject from "../../InteractableObject.js";

// Llave que solo se encuentra por la noche
export default class Llave_Garbage extends InteractableObject {

    constructor(scene, x, y) {
        super(scene, x, y, 'llave_basurero', 0);

        // Texto flotante de la interfaz
        this.infoText = scene.add.text(x, y - 20, "Llave del Basurero", {
            fontFamily: '"Toonway", sans-serif',
            fontSize: '8px',
            color: '#ffffff',
            backgroundColor: '#000000aa',
            padding: { x: 8, y: 4 },
            align: 'center',             
            resolution: 4                     
        });

        this.infoText.setOrigin(0.5, 1);
        this.infoText.setVisible(false);
        this.infoText.setDepth(100);
    }

    configure(player){
        this.player = player;
        this.body.allowGravity = false;
        this.body.immovable = true;
        this.interactionRadius = 50;
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
        player.setVelocity(0);

        player.anims.play('cat_grabbing', true);

        player.once('animationcomplete', () => {
            player.isGrabbing = false;
            player.anims.play('cat_idle', true);
        });
        player.llave_garbage = true;
        player.nearbyInteractable = null;

        this.infoText.destroy();
        this.destroy();
    }
}