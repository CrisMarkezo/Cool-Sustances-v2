import InteractableObject from "../../InteractableObject.js";


export default class Llave_Boss extends InteractableObject {

    constructor(scene, x, y) {
        super(scene, x, y, 'llave_boss', 0);
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
            }
        } else if (this.player.nearbyInteractable === this) {
            this.player.nearbyInteractable = null;
        }
    }

    interact(player) {
        if (player.isGrabbing) 
            return;

        // Falta probar que se añada al inventario
        const added = player.inventory.addItem({
            id: 'llave_boss',
            name: 'Llave',
            texture: 'llave_boss',
            frame: 0
        });

        if (added) {
            player.isGrabbing = true;
            player.setVelocity(0);

            player.anims.play('cat_grabbing', true);

            player.once('animationcomplete', () => {
                player.isGrabbing = false;
                player.anims.play('cat_idle', true);
            });
            player.llave_boss = true;
            player.nearbyInteractable = null;

            this.destroy();
        }
    }
}