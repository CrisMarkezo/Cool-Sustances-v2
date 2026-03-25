import Phaser from 'phaser'

export default class dialogTextSprite extends Phaser.GameObjects.Container {
    
    static create(scene, x, y, lines, style) {
        return new dialogTextSprite(scene, x, y, lines, style);
    }

    constructor(scene, x, y, lines, style) {
        super(scene, x, y);
        scene.add.existing(this);

        this.lines = Array.isArray(lines) ? lines : [String(lines)];
        this.text = scene.add.text(0, 0, '', style).setOrigin(0.5);
        this.add(this.text);

        this.line = [];
        this.wordIndex = 0;
        this.lineIndex = 0;
        this.wordDelay = 120;
        this.lineDelay = 400;
        this.isComplete = false;

        this.nextLine();
    }

    nextLine() {

        if (this.lineIndex >= this.lines.length)
        {
            //  We're finished
            this.isComplete = true;
            this.emit('complete');
            return;
        }

        //  Split the current line on spaces, so one word per array element
        this.line = this.lines[this.lineIndex].split(' ');

        //  Reset the word index to zero (the first word in the line)
        this.wordIndex = 0;

        //  Call the 'nextWord' function once for each word in the line (line.length)
        this.scene.time.addEvent({
            delay: this.wordDelay,
            repeat: Math.max(this.line.length - 1, 0),
            callback: this.nextWord,
            callbackScope: this
        });

        //  Advance to the next line
        this.lineIndex++;

    }

    nextWord() {

        //  Add the next word onto the text string, followed by a space
        this.text.text = this.text.text.concat(this.line[this.wordIndex] + " ");

        //  Advance the word index to the next word in the line
        this.wordIndex++;

        //  Last word?
        if (this.wordIndex === this.line.length)
        {
            //  Add a carriage return
            this.text.text = this.text.text.concat("\n");

            //  Get the next line after the lineDelay amount of ms has elapsed
            this.scene.time.delayedCall(this.lineDelay, this.nextLine, [], this);
        }
    }

}