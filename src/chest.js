import InteractableObject from "./InteractableObject";
import Phaser from "phaser";
import PowerUp from "./powerup";

export default class Chest extends InteractableObject {

    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
        this.isOpen = false;
        this.interactionRadius = 30;
    }

    configure(player){
        this.player = player;
        this.body.allowGravity = false;
        this.body.immovable = true;
        this.empty = this.data.values.empty;
        if(!this.empty)
            this.tipo = this.data.values.tipo;
        this.body.setSize(20, 20);
    }   

    preUpdate(t, dt){
        super.preUpdate(t, dt);

        // El cofre ya se abrió o no hay jugador
        if (this.isOpen || !this.player) 
            return;

        // Distancia exacta entre el jugador y el cofre
        const distancia = Phaser.Math.Distance.Between(this.x, this.y, this.player.x, this.player.y);

        // El jugador entra en el radio
        if (distancia < this.interactionRadius) {
            if (!this.player.nearbyInteractable || this.player.nearbyInteractable === this) {
                this.player.nearbyInteractable = this;
            }
            else {
                const otroObjeto = this.player.nearbyInteractable;
                const distanciaOtro = Phaser.Math.Distance.Between(this.player.x, this.player.y, otroObjeto.x, otroObjeto.y);
                
                // Priorizamos el cofre mas cercano
                if (distancia < distanciaOtro) {
                    this.player.nearbyInteractable = this;
                }
            }
        } 
        // el jugador se aleja
        else if (this.player.nearbyInteractable === this) {
            this.player.nearbyInteractable = null;
        }
    }

    interact(player){
        this.isOpen = true;
        this.player.nearbyInteractable = null;
        if (!this.empty){
            this.anims.play('chest_opening_gold_anim',true);
            // Añadir que el jugador obtenga el objeto que esta dentro del cofre
            this.spawnPowerUp(player);
        }   
        else 
            this.anims.play('chest_empty_anim',true);
    }

    spawnPowerUp(player) {
        this.objeto = new PowerUp(this.scene, this.x, this.y - 10, 'yanotekomo', this.tipo, 100);
        this.objeto.setScale(0.15);
        this.objeto.configure(player);
    }
}