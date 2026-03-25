import Phaser from 'phaser'
import MenuSprite from '../../game-objects/menuSprite.js'
import widgetSprite from '../../game-objects/widgetSprite.js'

export default class Menu extends Phaser.Scene {

    constructor(){
        super({key: 'phone'});
    }

    create(){
        // Inicializar el paso del tutorial si no existe
        if (!this.registry.has('step')) {
            this.registry.set('step', 0);
        }
        const currentStep = this.registry.get('step');
        if(!this.registry.has('position')){
            this.registry.set('position', 1);
        }
        const position = this.registry.get('position');
        if (!this.registry.has('selectedPath')){
            this.registry.set('selectedPath', []);
        }
        const selectedPath = this.registry.get('selectedPath');

        const getNodePosition = (stepIndex, positionIndex) => {
            const xByPosition = [410, 500, 590];
            const yByStep = [450, 390, 330, 260, 200];

            if (stepIndex < 0 || stepIndex >= yByStep.length) return null;
            if (positionIndex < 0 || positionIndex >= xByPosition.length) return null;

            return { x: xByPosition[positionIndex], y: yByStep[stepIndex] };
        };

        const drawSelectedPath = () => {
            const points = [];

            selectedPath.forEach((node, stepIndex) => {
                if (!node || typeof node.position !== 'number') return;
                const point = getNodePosition(stepIndex, node.position);
                if (point) points.push(point);
            });

            if (points.length > 1) {
                const graphics = this.add.graphics();
                graphics.lineStyle(5, 0xf4d35e, 0.9);
                graphics.beginPath();
                graphics.moveTo(points[0].x, points[0].y);

                for (let i = 1; i < points.length; i++) {
                    graphics.lineTo(points[i].x, points[i].y);
                }

                graphics.strokePath();
            }

            points.forEach((point) => {
                this.add.image(point.x, point.y, 'pez').setScale(0.35).setDepth(5);
            });
        };

        const goToStepScene = (nextStep, nextPosition, sceneKey) => {
            const updatedPath = [...this.registry.get('selectedPath')];
            updatedPath[currentStep] = { position: nextPosition };
            this.registry.set('selectedPath', updatedPath);
            this.registry.set('step', nextStep);
            this.registry.set('position', nextPosition);
            this.scene.start(sceneKey);
        };

        // mostrar onlyMenu de fondo 
        this.menuSprite = new MenuSprite(this, 500, 350);
        drawSelectedPath();

        //PRIMERA LINEA 
        // boton de accion 
        const accionBtnPrimer1 = this.add.image(410, 450, 'accionMenu').setInteractive();
        accionBtnPrimer1.on('pointerdown', () => {
            if (currentStep === 0) {
                console.log('Acción clickeada');
                goToStepScene(1, 0, 'accion-primera-1');
            }
        });

        // boton de dialogo
        const dialogoBtnPrimer1 = this.add.image(500, 450, 'dialogoMenu').setInteractive();
        dialogoBtnPrimer1.on('pointerdown', () => {
            if (currentStep === 0) {
                console.log('Dialogo clickead0');
                goToStepScene(1, 1, 'dialogo-primera-1');
            }
        });
        
        // boton de accion
        const accionBtnPrimer2 = this.add.image(590, 450, 'accionMenu').setInteractive();
        accionBtnPrimer2.on('pointerdown', () => {
            if (currentStep === 0) {
                console.log('Acción clickeada');
                goToStepScene(1, 2, 'accion-primera-2');
            }
        });

        //SEGUNDA LINEA

        // boton de dialogo
        const dialogoBtnSegun1 = this.add.image(410, 390, 'dialogoMenu').setInteractive();
        dialogoBtnSegun1.on('pointerdown', () => {
            if (currentStep === 1 && (position === 1 || position === 0)) {
                console.log('Dialogo clickead0');
                goToStepScene(2, 0, 'dialogo-segunda-1');
            }
        });

        const accionBtnSegun1 = this.add.image(500, 390, 'accionMenu').setInteractive();
        accionBtnSegun1.on('pointerdown', () => {
            if (currentStep === 1) {
                console.log('Acción clickeada');
                goToStepScene(2, 1, 'accion-segunda-1');
            }
        });

        
        // boton de escena de dialogo
        const accionBtnSegun2 = this.add.image(590, 390, 'accionMenu').setInteractive();
        accionBtnSegun2.on('pointerdown', () => {
            if (currentStep === 1 && (position === 1 || position === 2)) {
                console.log('Acción clickeada');
                goToStepScene(2, 2, 'accion-segunda-2');
            }
        });

        //TERCERA LINEA
        // boton de dialogo
        const tiendaBtnTercer1 = this.add.image(410, 330, 'tiendaMenu').setInteractive();
        tiendaBtnTercer1.on('pointerdown', () => {
            if (currentStep === 2 && (position === 1 || position === 0)) {
                console.log('Dialogo clickead0');
                goToStepScene(3, 0, 'tienda-tercera-1');
            }
        });

        const tiendaBtnTercer2 = this.add.image(500, 330, 'tiendaMenu').setInteractive();
        tiendaBtnTercer2.on('pointerdown', () => {
            if (currentStep === 2) {
                console.log('Acción clickeada');
                goToStepScene(3, 1, 'tienda-tercera-2');
            }
        });

        
        // boton de escena de dialogo
        const dialogoBtnTercer1 = this.add.image(590, 330, 'dialogoMenu').setInteractive();
        dialogoBtnTercer1.on('pointerdown', () => {
            if (currentStep === 2 && (position === 1 || position === 2)) {
                console.log('Acción clickeada');
                goToStepScene(3, 2, 'dialogo-tercera-1');
            }
        });

        //CUARTA LINEA
        // boton de dialogo
        const accionBtnCuart1 = this.add.image(410, 260, 'accionMenu').setInteractive();
        accionBtnCuart1.on('pointerdown', () => {
            if (currentStep === 3 && (position === 0 || position === 1)) {
                console.log('Acción clickeada');
                goToStepScene(4, 0, 'accion-cuarta-1');
            }
        });

        const dialogoBtnCuart1 = this.add.image(500, 260, 'dialogoMenu').setInteractive();
        dialogoBtnCuart1.on('pointerdown', () => {
            if (currentStep === 3) {
                console.log('Dialogo clickeado');
                goToStepScene(4, 1, 'dialogo-cuarta-1');
            }
        });

        
        // boton de escena de dialogo
        const tiendaBtnCuart1 = this.add.image(590, 260, 'tiendaMenu').setInteractive();
        tiendaBtnCuart1.on('pointerdown', () => {
            if (currentStep === 3 && (position === 2 || position === 1)) {
                console.log('Tienda clickeada');
                goToStepScene(4, 2, 'tienda-cuarta-1');
            }
        });

        //QUINTA LINEA
        const dialogoBtnQuint1 = this.add.image(410, 200, 'dialogoMenu').setInteractive();
        dialogoBtnQuint1.on('pointerdown', () => {
            if (currentStep === 4 && (position === 0 || position === 1)) {
                console.log('Dialogo clickeado');
                goToStepScene(5, 0, 'dialogo-quinta-1');
            }
        });

        // boton de accion
        const accionBtnQuint1 = this.add.image(500, 200, 'accionMenu').setInteractive();
        accionBtnQuint1.on('pointerdown', () => {
            if (currentStep === 4) {
                console.log('Acción clickeada');
                goToStepScene(5, 1, 'accion-quinta-1');
            }
        });

        const dialogoBtnQuint2 = this.add.image(590, 200, 'dialogoMenu').setInteractive();
        dialogoBtnQuint2.on('pointerdown', () => {
            if (currentStep === 4 && (position === 2 || position === 1)) {
                console.log('Dialogo clickeado');
                goToStepScene(5, 2, 'dialogo-quinta-2');
            }
        });


        //boton de dungeon pero es la continuación del lore en este caso
        this.widgetSprite = new widgetSprite(this, 500, 120).setInteractive({ useHandCursor: true });
        this.widgetSprite.on('pointerdown', () => {
            if (currentStep === 5) {
                console.log('Salir del tutorial clickeado');
                this.scene.start('mazmorra');
            }
        });

        //anuncio en el menú de decoracion, pero podría usarse para otra cosa, como un easter egg o algo así
        this.add.text(520, 550, 'Do not fret if you want to hurt yourself!', {
            fontFamily: '"pixelAE-Bold", monospace',
            fontSize: '10px',
            fill: '#000000',
            align: 'center'
        }).setOrigin(0.5);
        this.add.text(520, 570, 'Call or text the number 667 if you need asistance', {
            fontFamily: '"pixelAE-Regular", monospace',
            fontSize: '9px',
            fill: '#000000',
            align: 'center',
            wordWrap: { width: 200 },
        }).setOrigin(0.5);
        
    }
}