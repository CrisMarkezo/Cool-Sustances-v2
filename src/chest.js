import InteractableObject from "./InteractableObject";

export default class Chest extends InteractableObject {

    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
    }

    configure(player){
        this.player = player;
        this.scene.physics.add.overlap(this, this.player, this.interact, null, null)
        this.body.allowGravity = false;
        this.body.setSize(20, 20);
    }   

    interact(Player){
        // A implementar
    }
}