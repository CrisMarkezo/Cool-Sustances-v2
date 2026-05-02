import GameEntity from './game-objects/night/gameEntity.js';
import Phone from './Phone.js';

export default class Scratcher extends GameEntity {

    constructor(scene, x, y) {
        super(scene, x, y, 'rascador', 0);
        this.setScale(2);
        
        scene.physics.add.existing(this);
        this.body.setImmovable(true);
        this.body.setAllowGravity(false);
        this.isScratching = false;

        this.hasDropped = false;

        this.hurtbox = scene.add.rectangle(x, y, 10, 10);
        scene.physics.add.existing(this.hurtbox);
        this.hurtbox.body.setSize(10, 10);
        this.hurtbox.body.setAllowGravity(false);
        this.hurtbox.body.moves = false;
        this.hurtbox.setVisible(false); 
        this.hurtbox.setDepth(5);
    }

    scratch() {
        if (this.isScratching) return;
        this.isScratching = true;
        
        this.anims.play('rascador_scratch');

        this.once('animationcomplete', () => {

            if (!this.hasDropped) {
                this.hasDropped = true;

                const phone = new Phone(this.scene, this.x, this.y - 20);
                phone.setScale(0.5);

                phone.body.setAllowGravity(true);
                phone.body.setVelocityY(100);

                this.scene.tweens.add({
                    targets: phone,
                    angle: 720,
                    duration: 300,
                    ease: 'Linear'
                });

                this.scene.time.delayedCall(300, () => {
                    if (phone.body) {
                        phone.body.setAllowGravity(false);
                        phone.body.setVelocity(0);
                    }
                });

                this.scene.interactables.add(phone);
            }

            this.anims.stop();
            this.setFrame(0);
            this.isScratching = false;
        });
    }
}