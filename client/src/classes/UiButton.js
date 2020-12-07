import * as Phaser from 'phaser';

export default class UiButton extends Phaser.GameObjects.Container {
  constructor(scene, x, y, key, hoverKey, text, targetCallback) {
    super(scene, x, y);
    this.scene = scene; // the scene this container will be added to
    this.x = x; // the x position of our container
    this.y = y; // the y position of our container
    this.key = key; // the background image of our button
    this.hoverKey = hoverKey; // the image that will be displayed when the player hovers on
    this.text = text; // the text that will be displayed on the button
    // the function that will be called when the player presses the button
    this.targetCallback = targetCallback;

    // create the ui button
    this.createButton();
    // add this container to our scene
    this.scene.add.existing(this);
  }

  createButton() {
    // create play game button
    this.button = this.scene.add.image(0, 0, 'button1');
    this.button.setInteractive();
    this.button.setScale(1.4);

    // create button text
    this.buttonText = this.scene.add.text(0, 0, this.text, { fontSize: '26px', fill: '#fff' });
    // center the button text inside the ui button
    Phaser.Display.Align.In.Center(this.buttonText, this.button);

    // add the 2 game objects to the container
    this.add(this.button);
    this.add(this.buttonText);

    // listen for events
    this.button.on('pointerdown', () => {
      this.targetCallback();
    });

    this.button.on('pointerover', () => {
      this.button.setTexture(this.hoverKey);
    });

    this.button.on('pointerout', () => {
      this.button.setTexture(this.key);
    });
  }
}
