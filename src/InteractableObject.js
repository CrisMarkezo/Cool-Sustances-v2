import Phaser from 'phaser';

export default class InteractableObject extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setImmovable(true);
        this.body.setAllowGravity(false);

        this.isInteractable = true;
    }

    interact(player) {
        throw new Error('Debes implementar interact()');
    }
}