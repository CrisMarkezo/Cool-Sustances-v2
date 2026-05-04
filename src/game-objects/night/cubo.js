import InteractableObject from "../../InteractableObject.js";

export default class Cubo extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setImmovable(false);
        this.body.setAllowGravity(false);
    }  

}