import Phaser from "phaser";

export default class SpriteBase extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,Sprite){
        super(scene,x,y,Sprite);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
    }

}