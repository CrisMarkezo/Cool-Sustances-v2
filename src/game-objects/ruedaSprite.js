import Phaser from 'phaser'

export default class RuedaSprite extends Phaser.GameObjects.Sprite {
    static create(scene, x, y, textureKey = 'rueda', segundos = 20) {
        const rueda = new RuedaSprite(scene, x, y, textureKey);
        rueda.startSpin(segundos);
        return rueda;
    }

    constructor(scene, x, y, rueda) {
        super(scene, x, y, rueda);
        scene.add.existing(this);
        this.setOrigin(0.5, 0.5);
        this.spinTween = null;
    }

    startSpin(segundos = 20) {
        if (this.spinTween) {
            this.spinTween.stop();
        }

        this.scene.tweens.add({
            targets: this,
            angle: '+=360',
            duration: segundos * 1000,
            repeat: -1
        });

        this.spinTween = this.scene.tweens.getTweensOf(this)[0] ?? null;
    }

    destroy(fromScene) {
        if (this.spinTween) {
            this.spinTween.stop();
            this.spinTween = null;
        }

        super.destroy(fromScene);
    }
}