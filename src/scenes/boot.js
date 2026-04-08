import Phaser from 'phaser'


import platform from '../../assets/sprites/platform.png'
import base from '../../assets/sprites/base.png'
import star from '../../assets/sprites/star.png'
import player from '../../assets/sprites/player.png'

import inventario from '../../assets/sprites/inventarioPrueba.jpeg'

import dia from '../../assets/sprites/dia/UIDaySinRueda.png'
import tiendaDia from '../../assets/sprites/dia/UITiendaSinRueda.png'
import cubatita from '../../assets/sprites/cubatita.png'
import ruedaSprite from '../../assets/sprites/dia/UIrueda.png'
import ruedaSprite2 from '../../assets/sprites/dia/UIruedatienda.png'
import patas from '../../assets/sprites/dia/patas.png'


import dialogoMenuImg from '../../assets/sprites/menu/dialogoMenu_50.png'
import tiendaMenuImg from '../../assets/sprites/menu/tiendaMenu_50.png'
import accionMenuImg from '../../assets/sprites/menu/accionMenu_50.png'
import pezImg from '../../assets/sprites/menu/pez.png'



import onlyMenuImg1 from '../../assets/sprites/menu/onlyMenu1.png'
import onlyMenuImg12 from '../../assets/sprites/menu/onlyMenu1.2.png'
import onlyMenuImg13 from '../../assets/sprites/menu/onlyMenu1.3.png'
import onlyMenuImg14 from '../../assets/sprites/menu/onlyMenu1.4.png'
import onlyMenuImg15 from '../../assets/sprites/menu/onlyMenu1.5.png'
import onlyMenuImg16 from '../../assets/sprites/menu/onlyMenu1.6.png'
import onlyMenuImg17 from '../../assets/sprites/menu/onlyMenu1.7.png'
import onlyMenuImg18 from '../../assets/sprites/menu/onlyMenu1.8.png'
import onlyMenuImg2 from '../../assets/sprites/menu/onlyMenu2.png'

import catBox from '../../assets/sprites/dia/Box3.png'


import WidgetSpriteImg1 from '../../assets/sprites/menu/widget1Menu.png'
import WidgetSpriteImg2 from '../../assets/sprites/menu/widget2Menu.png'

import accionIcon1 from '../../assets/sprites/dia/accionIconAnimation1.png'
import accionIcon2 from '../../assets/sprites/dia/accionIconAnimation2.png'
import accionIcon3 from '../../assets/sprites/dia/accionIconAnimation3.png'
import accionIcon4 from '../../assets/sprites/dia/accionIconAnimation4.png'

import dialogoIcon1 from '../../assets/sprites/dia/dialogoIconAnimation1.png'
import dialogoIcon2 from '../../assets/sprites/dia/dialogoIconAnimation2.png'
import dialogoIcon3 from '../../assets/sprites/dia/dialogoAnimation3.png'

import tiendaIcon from '../../assets/sprites/dia/tiendaIconScene.png'

/*
 * Escena para la precarga de los assets que se usarán en el juego.
 * Esta escena se puede mejorar añadiendo una imagen del juego y una 
 * barra de progreso de carga de los assets
 * @see {@link https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/} como ejemplo
 * sobre cómo hacer una barra de progreso.
 */
export default class Boot extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'boot' });
  }

  /**
   * Carga de los assets del juego
   */
  preload() {
    // Con setPath podemos establecer el prefijo que se añadirá a todos los load que aparecen a continuación
    //this.load.setPath('assets/sprites/');
    this.load.image('platform', platform);
    this.load.image('base', base);
    this.load.image('star', star);
    this.load.image('player', player);
    this.load.image('dia', dia)
    this.load.image('tienda_dia', tiendaDia)
    this.load.image('cubatita', cubatita)    

    this.load.image('inventario', inventario);
    this.load.image('dialogoMenu', dialogoMenuImg);
    this.load.image('tiendaMenu', tiendaMenuImg);
    this.load.image('accionMenu', accionMenuImg);
    this.load.image('pez', pezImg);

    this.load.image('rueda', ruedaSprite);
    this.load.image('rueda_tienda', ruedaSprite2);
    this.load.image('patas', patas);

    this.load.image("onlyMenu1", onlyMenuImg1);
    this.load.image("onlyMenu1.2", onlyMenuImg12);
    this.load.image("onlyMenu1.3", onlyMenuImg13);
    this.load.image("onlyMenu1.4", onlyMenuImg14);
    this.load.image("onlyMenu1.5", onlyMenuImg15);
    this.load.image("onlyMenu1.6", onlyMenuImg16);
    this.load.image("onlyMenu1.7", onlyMenuImg17);
    this.load.image("onlyMenu1.8", onlyMenuImg18);
    this.load.image("onlyMenu2", onlyMenuImg2);

    this.load.spritesheet('catBox', catBox, { frameWidth: 90, frameHeight: 90 });

    this.load.image("widget1", WidgetSpriteImg1);
    this.load.image("widget2", WidgetSpriteImg2);

    this.load.image('accionIcon1', accionIcon1);
    this.load.image('accionIcon2', accionIcon2);
    this.load.image('accionIcon3', accionIcon3);
    this.load.image('accionIcon4', accionIcon4);

    this.load.image('dialogoIcon1', dialogoIcon1);
    this.load.image('dialogoIcon2', dialogoIcon2);
    this.load.image('dialogoIcon3', dialogoIcon3);

    this.load.image('tiendaIcon', tiendaIcon);
  }

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
  create() {
    Promise.all([
      document.fonts.load('16px "Toonway"'),
      document.fonts.load('16px "Keneric"'),
      document.fonts.load('16px "PixelAE-Regular"'),
      document.fonts.load('16px "PixelAE-Bold"'),
      document.fonts.load('16px "ToonwayEmpty"'),
      document.fonts.load('16px "BKFreakyHand"')
    ]).then(() => {
      this.scene.start('phone-tutorial');
    });
    
  }
}