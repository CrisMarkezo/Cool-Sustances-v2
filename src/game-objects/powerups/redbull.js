import PowerUp from "./powerup";
import Phaser from 'phaser';

export default class Redbull extends PowerUp {
    constructor(scene, x, y) {
        super(scene, x, y, 'redbull', 'speed', 10);
    }

    applyEffect(player) {
        player.speed += this.parameter;
        
        // Actualizamos la data del jugador
        const sourceData = this.scene.registry.get('playerData');
        sourceData.speed = player.speed;
        this.scene.registry.set('playerData', sourceData); 

        this.infoText.destroy();
        this.destroy();
    }
}