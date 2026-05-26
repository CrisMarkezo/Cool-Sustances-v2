import PowerUp from "./powerup";
import Phaser from 'phaser';

export default class Kebab extends PowerUp {
    constructor(scene, x, y) {
        super(scene, x, y, 'kebab', 'health', 50);
    }

    applyEffect(player) {
        player.health = Math.min(player.health + this.parameter, player.maxHealth);
       
        // Actualizamos la data del jugador
        const sourceData = this.scene.registry.get('playerData');
        sourceData.health = player.health;
        this.scene.registry.set('playerData', sourceData); 

        this.infoText.destroy();
        this.destroy();
    }
}