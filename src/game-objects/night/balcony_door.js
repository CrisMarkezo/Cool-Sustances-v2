import InteractableObject from "../../InteractableObject";
import Phaser from "phaser";

export default class Balcony_Door extends InteractableObject {

    constructor(scene, x, y, sprite, frame) {
        super(scene, x, y, sprite, frame);
        this.interactionRadius = 50;
    }

    configure(player, restoPuertas){
        this.isOpen = false;
        this.player = player;
        this.restoPuertas = restoPuertas;
        this.body.allowGravity = false;
        this.body.immovable = true;
        this.setDepth(200);
    }   

    preUpdate(t, dt){
        super.preUpdate(t, dt);

        // La puerta ya se abrió o no hay jugador
        if (this.isOpen || !this.player) 
            return;

        // Distancia exacta entre el jugador y la puerta
        const distancia = Phaser.Math.Distance.Between(this.x, this.y, this.player.x, this.player.y);

        // El jugador entra en el radio
        if (distancia < this.interactionRadius) {
            if (!this.player.nearbyInteractable || this.player.nearbyInteractable === this) {
                this.player.nearbyInteractable = this;
            }
            else {
                const otroObjeto = this.player.nearbyInteractable;
                const distanciaOtro = Phaser.Math.Distance.Between(this.player.x, this.player.y, otroObjeto.x, otroObjeto.y);
                
                // Priorizamos la puerta mas cercano
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
        if(player.llave_balcon)
            this.open_door();
        this.player.nearbyInteractable = null;
        
    }

    open_door() {
        if (this.isOpen) 
            return;
        this.isOpen = true;

        // Recorremos todos los pedazos de la puerta y los destruimos
        this.restoPuertas.forEach(pedazo => {
            // Verificamos que el pedazo exista y no haya sido destruido ya
            if (pedazo && pedazo.active) {
                pedazo.destroy();
            }
        });
    }
}