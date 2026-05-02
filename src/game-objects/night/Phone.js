import InteractableObject from '../../InteractableObject.js';

export default class Phone extends InteractableObject {

    constructor(scene, x, y) {
        super(scene, x, y, 'telefono', 0);
    }

    interact(player) {

        if (player.isGrabbing) return;

        const added = player.inventory.addItem({
            id: 'phone',
            name: 'Teléfono',
            texture: 'telefono',
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
            this.destroy();
        }
    }
}