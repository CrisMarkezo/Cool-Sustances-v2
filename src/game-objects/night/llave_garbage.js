import InteractableObject from "../../InteractableObject.js";

// Llave que solo se encuentra por el dia
export default class Llave_Garbage extends InteractableObject {

    constructor(scene, x, y) {
        super(scene, x, y, 'llave_basurero', 0);
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

    // Cambiar seguramente
    interact(player) {
        if (player.isGrabbing) 
            return;

        // Falta probar que se añada al inventario
        const added = player.inventory.addItem({
            id: 'llave_basurero',
            name: 'Llave',
            texture: 'llave_basurero',
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
            player.llave_basura = true;
            player.nearbyInteractable = null;

            this.destroy();
        }
    }
}